import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 font-body font-bold text-sm rounded-2xl transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

const variants = {
  primary: 'bg-brand text-white shadow-btn hover:bg-brand-dark',
  outline: 'bg-white text-ink border border-border hover:bg-cream-dark',
  ghost: 'bg-cream-dark text-ink hover:bg-border/60',
  link: 'text-brand-dark font-bold underline decoration-from-font underline-offset-2 hover:text-brand p-0',
}

const sizes = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-12 px-5',
  lg: 'h-[52px] px-7 text-base',
}

/**
 * Nút dùng chung cho toàn bộ luồng Khách - render `<Link>` nếu có `to`,
 * ngược lại render `<button>` thường. `fullWidth` khớp với CTA trong thẻ
 * đăng nhập/đăng ký theo Figma.
 */
export default function Button({
  as,
  to,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  const classes = [
    base,
    variant === 'link' ? '' : sizes[size],
    variants[variant] ?? variants.primary,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  const Component = as || 'button'

  return (
    <Component type={Component === 'button' ? type : undefined} className={classes} {...rest}>
      {content}
    </Component>
  )
}
