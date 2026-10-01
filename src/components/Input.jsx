import { forwardRef } from 'react'

/**
 * Input bậc thấp, style theo Figma (nền cream, viền 1px, bo góc 12px, chừa
 * chỗ cho icon bên trái và 1 nút hành động bên phải như nút hiện/ẩn mật
 * khẩu). Component `FormField` mới là cái các trang nên dùng; `Input` này
 * export riêng cho vài chỗ dùng 1 lần (vd ô email newsletter) không cần
 * label/lỗi kèm theo.
 *
 * Dùng forwardRef vì FormField cần forward ref xuống <input> thật (để các
 * thư viện form ngoài, hoặc focus() thủ công, hoạt động được).
 */
const Input = forwardRef(function Input(
  { icon = null, rightElement = null, error = false, className = '', ...rest },
  ref,
) {
  return (
    <div className="relative w-full">
      {/* Icon bên trái, chỉ hiện khi có truyền vào - không nhận sự kiện chuột
          (pointer-events-none) để click vẫn rơi xuống ô input bên dưới */}
      {icon && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-secondary">
          {icon}
        </span>
      )}
      <input
        ref={ref}
        className={[
          'h-[50px] w-full rounded-xl border bg-cream text-sm font-semibold text-ink-input placeholder:text-ink-secondary placeholder:font-normal outline-none transition-colors',
          // Chừa khoảng đệm trái/phải tùy có icon/rightElement hay không,
          // để chữ không bị icon đè lên
          icon ? 'pl-11' : 'pl-4',
          rightElement ? 'pr-11' : 'pr-4',
          // Viền đỏ khi có lỗi validate, ngược lại viền thường
          error ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-brand',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
      {/* Nút/hành động bên phải, vd icon con mắt hiện/ẩn mật khẩu */}
      {rightElement && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2">{rightElement}</span>
      )}
    </div>
  )
})

export default Input
