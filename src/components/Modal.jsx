import { useEffect } from 'react'

/**
 * Modal căn giữa tối giản (lớp phủ nền + khung nội dung), dùng cho form sửa
 * hồ sơ, hộp thoại xác nhận xóa và thông báo "đã đạt giới hạn hồ sơ".
 */
export default function Modal({ open, onClose, title, children, className = '' }) {
  useEffect(() => {
    if (!open) return undefined

    function handleKey(event) {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Đóng"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
