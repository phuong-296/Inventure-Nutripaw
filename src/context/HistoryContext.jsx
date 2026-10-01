import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { DAILY_CHECK_LIMIT } from '../data/mealOptions.js'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from './AuthContext.jsx'
import { useToast } from './ToastContext.jsx'

const STORAGE_KEY = 'nutripaw.history'
const MIGRATED_KEY_PREFIX = 'nutripaw.historyMigrated.'
const HistoryContext = createContext(null)

// Đọc lịch sử đã lưu trong localStorage (nếu có) để dùng làm state ban đầu
// - giúp app hiện được dữ liệu ngay cả khi Supabase chưa kịp phản hồi
function loadInitialHistory() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// So sánh 2 mốc thời gian có cùng ngày (năm/tháng/ngày) hay không - dùng để
// tính số lượt kiểm tra đã dùng "hôm nay"
function isSameDay(isoA, isoB) {
  const a = new Date(isoA)
  const b = new Date(isoB)
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

// Chuyển 1 dòng dữ liệu từ bảng meal_checks (snake_case) sang object
// entry dùng trong app (camelCase)
function rowToEntry(row) {
  return {
    id: row.id,
    petId: row.pet_id,
    petName: row.pet_name,
    items: row.items ?? [],
    kcal: row.kcal,
    status: row.status,
    statusLabel: row.status_label,
    note: row.note,
    createdAt: row.created_at,
  }
}

// Chiều ngược lại: chuyển entry trong app thành 1 dòng để ghi vào Supabase
function entryToRow(entry, userId) {
  return {
    id: entry.id,
    user_id: userId,
    pet_id: entry.petId,
    pet_name: entry.petName,
    items: entry.items,
    kcal: entry.kcal,
    status: entry.status,
    status_label: entry.statusLabel,
    note: entry.note,
    created_at: entry.createdAt,
  }
}

/**
 * "Cơ sở dữ liệu" lịch sử kiểm tra bữa ăn. localStorage luôn là nguồn dữ
 * liệu đáng tin cậy và có sẵn ngay - addCheck/deleteCheck cập nhật nó ngay
 * lập tức nên các hành động này chạy tức thì dù Supabase đã cấu hình xong
 * hay chưa. Khi xác nhận có session Supabase thật, dữ liệu server được coi
 * là chuẩn và tự đồng bộ ngầm (tải về nếu server đã có sẵn dữ liệu, đẩy lên
 * 1 lần nếu là tài khoản mới toanh còn dữ liệu local cần chuyển). Sự cố
 * mạng/cấu hình với Supabase không bao giờ chặn hay xóa mất dữ liệu local.
 */
export function HistoryProvider({ children }) {
  const { user, loading } = useAuth()
  const { showToast } = useToast()
  const [history, setHistory] = useState(loadInitialHistory)
  // Bản sao history mới nhất, đọc được ngay trong effect mà không cần khai
  // báo history làm dependency (tránh effect chạy lại mỗi khi history đổi)
  const historyRef = useRef(history)
  // Đánh dấu đã đồng bộ xong cho user.id nào rồi, để không lặp lại việc gọi
  // Supabase mỗi lần component render lại
  const syncedFor = useRef(null)

  // Mỗi khi history đổi: cập nhật bản sao ref và ghi lại vào localStorage
  useEffect(() => {
    historyRef.current = history
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch {
      // Bỏ qua lỗi ghi (vd giới hạn dung lượng ở chế độ duyệt ẩn danh).
    }
  }, [history])

  useEffect(() => {
    if (loading) return // chưa quyết định gì cả khi còn đang kiểm tra session

    if (!user) {
      // Chắc chắn đã đăng xuất - không hiện lịch sử cũ trong cache, và
      // không để lộ nó cho người tiếp theo đăng nhập trên cùng máy này.
      syncedFor.current = null
      setHistory([])
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        // bỏ qua
      }
      return
    }

    // Đã đồng bộ cho đúng user này trong phiên này rồi thì thôi, không gọi lại
    if (syncedFor.current === user.id) return
    syncedFor.current = user.id

    supabase
      .from('meal_checks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.warn('[NutriPaw] Không đồng bộ được lịch sử từ Supabase, dùng dữ liệu trên máy:', error.message)
          return
        }
        if (data && data.length > 0) {
          setHistory(data.map(rowToEntry))
          return
        }

        // Supabase không có gì cho tài khoản này. Chỉ đẩy cache local lên
        // đúng 1 lần đầu tiên duy nhất - đánh dấu theo từng tài khoản (không
        // phải theo phiên) - nếu không thì việc xóa hết mọi lượt (từ server,
        // hoặc từ thiết bị khác) sẽ bị "hồi sinh" âm thầm từ localStorage cũ
        // trên máy này ở lần tải trang sau.
        const migratedKey = MIGRATED_KEY_PREFIX + user.id
        let alreadyMigrated = false
        try {
          alreadyMigrated = window.localStorage.getItem(migratedKey) === '1'
        } catch {
          // bỏ qua
        }

        // Đã từng di chuyển dữ liệu rồi -> Supabase trống lần này là thật
        // (do đã xóa), không phải tài khoản mới -> không đẩy cache lên nữa
        if (alreadyMigrated) {
          setHistory([])
          return
        }

        // Đánh dấu đã xử lý migration cho tài khoản này, dù bên dưới có dữ
        // liệu để đẩy lên hay không - để không lặp lại bước này về sau
        try {
          window.localStorage.setItem(migratedKey, '1')
        } catch {
          // bỏ qua
        }

        const local = historyRef.current
        if (local.length > 0) {
          supabase
            .from('meal_checks')
            .insert(local.map((entry) => entryToRow(entry, user.id)))
            .then(({ error: insertError }) => {
              if (insertError) {
                // eslint-disable-next-line no-console
                console.warn('[NutriPaw] Không đồng bộ được lịch sử lên Supabase:', insertError.message)
              }
            })
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('[NutriPaw] Không kết nối được Supabase, dùng dữ liệu trên máy:', err?.message)
      })
  }, [user, loading])

  const value = useMemo(() => {
    const now = new Date().toISOString()
    // Đếm số lượt đã kiểm tra trong hôm nay để tính còn lại bao nhiêu lượt
    // miễn phí (giới hạn DAILY_CHECK_LIMIT lượt/ngày)
    const checksToday = history.filter((entry) => isSameDay(entry.createdAt, now)).length
    const remaining = Math.max(0, DAILY_CHECK_LIMIT - checksToday)

    return {
      // Sắp xếp mới nhất lên đầu khi trả ra ngoài, không đổi thứ tự lưu trong state
      history: [...history].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      remaining,
      limit: DAILY_CHECK_LIMIT,

      // Lưu 1 lượt kiểm tra mới: cập nhật local ngay lập tức (luôn thành
      // công), rồi mới thử đồng bộ lên Supabase ở nền nếu có tài khoản
      addCheck(entry) {
        const record = { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
        setHistory((prev) => [...prev, record])
        showToast('Đã lưu lượt kiểm tra bữa ăn thành công')

        if (user) {
          supabase
            .from('meal_checks')
            .insert(entryToRow(record, user.id))
            .then(({ error }) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.warn('[NutriPaw] Đã lưu trên máy, chưa đồng bộ lịch sử lên Supabase:', error.message)
              }
            })
        }

        return record
      },

      // Xóa 1 lượt kiểm tra: cập nhật local ngay, đồng bộ xóa trên Supabase ở nền
      deleteCheck(id) {
        setHistory((prev) => prev.filter((entry) => entry.id !== id))
        showToast('Đã xóa lượt kiểm tra thành công')

        if (user) {
          supabase
            .from('meal_checks')
            .delete()
            .eq('id', id)
            .then(({ error }) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.warn('[NutriPaw] Đã xóa trên máy, chưa đồng bộ xóa lên Supabase:', error.message)
              }
            })
        }
      },

      getEntry(id) {
        return history.find((entry) => entry.id === id)
      },
    }
  }, [history, user])

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}

export function useHistory() {
  const ctx = useContext(HistoryContext)
  if (!ctx) throw new Error('useHistory must be used within a HistoryProvider')
  return ctx
}
