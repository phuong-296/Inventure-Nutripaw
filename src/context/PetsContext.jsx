import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { MAX_PETS } from '../data/petOptions.js'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from './AuthContext.jsx'
import { useToast } from './ToastContext.jsx'

const STORAGE_KEY = 'nutripaw.pets'
const MIGRATED_KEY_PREFIX = 'nutripaw.petsMigrated.'
const PetsContext = createContext(null)

// Đọc danh sách thú cưng đã lưu trong localStorage để dùng làm state ban
// đầu - app có dữ liệu để hiện ngay, không cần chờ Supabase phản hồi
function loadInitialPets() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Chuyển 1 dòng dữ liệu từ bảng pets (snake_case) sang object pet dùng
// trong app (camelCase)
function rowToPet(row) {
  return {
    id: row.id,
    name: row.name,
    species: row.species,
    breed: row.breed,
    ageGroup: row.age_group,
    weight: row.weight,
    weightGoal: row.weight_goal,
    healthIssues: row.health_issues ?? [],
    allergies: row.allergies ?? [],
    photoUrl: row.photo_url ?? '',
    createdAt: row.created_at,
  }
}

// Chiều ngược lại: chuyển pet trong app thành 1 dòng để ghi vào Supabase
function petToRow(pet, userId) {
  return {
    id: pet.id,
    user_id: userId,
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age_group: pet.ageGroup,
    weight: pet.weight,
    weight_goal: pet.weightGoal,
    health_issues: pet.healthIssues ?? [],
    allergies: pet.allergies ?? [],
    photo_url: pet.photoUrl || null,
  }
}

/**
 * "Cơ sở dữ liệu" hồ sơ thú cưng. localStorage luôn là nguồn dữ liệu đáng
 * tin cậy và có sẵn ngay - add/edit/delete cập nhật nó ngay lập tức nên
 * các hành động này chạy tức thì dù Supabase đã cấu hình xong hay chưa.
 * Khi xác nhận có session Supabase thật, dữ liệu server được coi là chuẩn
 * và tự đồng bộ ngầm (tải về nếu server đã có sẵn dữ liệu, đẩy lên 1 lần
 * nếu là tài khoản mới toanh còn dữ liệu local cần chuyển). Sự cố
 * mạng/cấu hình với Supabase không bao giờ chặn hay xóa mất dữ liệu local.
 */
export function PetsProvider({ children }) {
  const { user, loading } = useAuth()
  const { showToast } = useToast()
  const [pets, setPets] = useState(loadInitialPets)
  // Bản sao pets mới nhất, đọc được ngay trong effect mà không cần khai báo
  // pets làm dependency (tránh effect chạy lại mỗi khi pets đổi)
  const petsRef = useRef(pets)
  // Đánh dấu đã đồng bộ xong cho user.id nào rồi, để không gọi lại Supabase
  // mỗi lần component render lại
  const syncedFor = useRef(null)

  // Mỗi khi pets đổi: cập nhật bản sao ref và ghi lại vào localStorage
  useEffect(() => {
    petsRef.current = pets
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pets))
    } catch {
      // Bỏ qua lỗi ghi (vd giới hạn dung lượng ở chế độ duyệt ẩn danh).
    }
  }, [pets])

  useEffect(() => {
    if (loading) return // chưa quyết định gì cả khi còn đang kiểm tra session

    if (!user) {
      // Chắc chắn đã đăng xuất - không hiện thú cưng cũ trong cache, và
      // không để lộ nó cho người tiếp theo đăng nhập trên cùng máy này.
      syncedFor.current = null
      setPets([])
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
      .from('pets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.warn('[NutriPaw] Không đồng bộ được thú cưng từ Supabase, dùng dữ liệu trên máy:', error.message)
          return
        }
        if (data && data.length > 0) {
          setPets(data.map(rowToPet))
          return
        }

        // Supabase không có gì cho tài khoản này. Chỉ đẩy cache local lên
        // đúng 1 lần đầu tiên duy nhất - đánh dấu theo từng tài khoản (không
        // phải theo phiên) - nếu không thì việc xóa hết mọi hồ sơ (từ
        // server, hoặc từ thiết bị khác) sẽ bị "hồi sinh" âm thầm từ
        // localStorage cũ trên máy này ở lần tải trang sau.
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
          setPets([])
          return
        }

        // Đánh dấu đã xử lý migration cho tài khoản này, dù bên dưới có dữ
        // liệu để đẩy lên hay không - để không lặp lại bước này về sau
        try {
          window.localStorage.setItem(migratedKey, '1')
        } catch {
          // bỏ qua
        }

        const local = petsRef.current
        if (local.length > 0) {
          supabase
            .from('pets')
            .insert(local.map((p) => petToRow(p, user.id)))
            .then(({ error: insertError }) => {
              if (insertError) {
                // eslint-disable-next-line no-console
                console.warn('[NutriPaw] Không đồng bộ được hồ sơ lên Supabase:', insertError.message)
              }
            })
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('[NutriPaw] Không kết nối được Supabase, dùng dữ liệu trên máy:', err?.message)
      })
  }, [user, loading])

  const value = useMemo(
    () => ({
      pets,
      isFull: pets.length >= MAX_PETS,

      // Tạo hồ sơ mới: cập nhật local ngay lập tức (luôn thành công), rồi
      // mới thử đồng bộ lên Supabase ở nền nếu có tài khoản
      addPet(petDraft) {
        const pet = { ...petDraft, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
        setPets((prev) => [...prev, pet])
        showToast(`Đã tạo hồ sơ ${pet.name} thành công`)

        if (user) {
          supabase
            .from('pets')
            .insert(petToRow(pet, user.id))
            .then(({ error }) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.warn('[NutriPaw] Đã lưu trên máy, chưa đồng bộ lên Supabase:', error.message)
              }
            })
        }

        return pet
      },

      // Sửa hồ sơ đã có: cập nhật local ngay, đồng bộ chỉnh sửa lên Supabase ở nền
      updatePet(id, updates) {
        setPets((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
        showToast(`Đã cập nhật hồ sơ ${updates.name || 'thú cưng'} thành công`)

        if (user) {
          supabase
            .from('pets')
            .update(petToRow({ ...updates, id }, user.id))
            .eq('id', id)
            .then(({ error }) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.warn('[NutriPaw] Đã lưu trên máy, chưa đồng bộ chỉnh sửa lên Supabase:', error.message)
              }
            })
        }
      },

      // Xóa hồ sơ: cập nhật local ngay, đồng bộ xóa lên Supabase ở nền
      removePet(id) {
        // Lấy tên trước khi xóa khỏi state, để toast báo đúng tên thú cưng vừa xóa
        const removed = pets.find((p) => p.id === id)
        setPets((prev) => prev.filter((p) => p.id !== id))
        showToast(`Đã xóa hồ sơ ${removed?.name || 'thú cưng'} thành công`)

        if (user) {
          supabase
            .from('pets')
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

      getPet(id) {
        return pets.find((p) => p.id === id)
      },
    }),
    [pets, user],
  )

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>
}

export function usePets() {
  const ctx = useContext(PetsContext)
  if (!ctx) throw new Error('usePets must be used within a PetsProvider')
  return ctx
}
