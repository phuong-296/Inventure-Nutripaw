import { useId, useState } from 'react'
import Input from './Input.jsx'
import { EyeIcon, EyeOffIcon } from './icons.jsx'

/**
 * Label + Input + thông báo lỗi, ghép lại đúng kiểu mỗi trường trong thẻ
 * Đăng nhập/Đăng ký. Tự xử lý nút ẩn/hiện mật khẩu, nên các trang chỉ cần
 * truyền `type="password"`.
 */
export default function FormField({
  label,
  type = 'text',
  icon = null,
  error,
  className = '',
  ...inputProps
}) {
  const [showPassword, setShowPassword] = useState(false)
  const autoId = useId()
  const id = inputProps.id || autoId
  const isPassword = type === 'password'
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold tracking-wide text-ink-label">
          {label}
        </label>
      )}
      <Input
        id={id}
        type={resolvedType}
        icon={icon}
        error={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        rightElement={
          isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="flex size-8 items-center justify-center rounded-lg text-ink-secondary hover:bg-cream-dark"
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
            </button>
          ) : null
        }
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
