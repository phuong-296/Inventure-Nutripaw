import { createContext, useCallback, useContext, useState } from 'react'
import { CheckIcon, AlertIcon } from '../components/icons.jsx'

const ToastContext = createContext(null)
let idCounter = 0 // tăng dần để mỗi toast có id riêng, phân biệt được với nhau

/**
 * Ngăn xếp thông báo toast dùng chung toàn app - dùng để xác nhận các hành
 * động CRUD (thêm/sửa/xóa thú cưng, lưu/xóa lượt kiểm tra bữa ăn) thật sự
 * đã xảy ra, vì các hành động đó vốn cập nhật âm thầm qua state local.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Thêm 1 toast mới rồi tự động xóa sau 3 giây
  const showToast = useCallback((message, type = 'success') => {
    const id = ++idCounter
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-fade-in-up pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg ${
              t.type === 'error' ? 'bg-red-500' : 'bg-ink'
            }`}
          >
            {t.type === 'error' ? <AlertIcon className="size-4 shrink-0" /> : <CheckIcon className="size-4 shrink-0" />}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
