import { Link } from 'react-router-dom'

// Logo mark tự host tại public/brand/ (tải về từ Figma trước khi link hết hạn).
// Export riêng để nơi khác (vd ChatWidget) dùng lại chỉ mỗi icon, không cần
// chữ "NutriPaw" hay bọc <Link>.
export const LOGO_MARK_URL = '/brand/logo-mark.png'

const sizes = {
  sm: { box: 'size-7 rounded-[9px]', text: 'text-base' },
  md: { box: 'size-8 rounded-xl', text: 'text-lg' },
  lg: { box: 'size-16 rounded-2xl', text: 'text-base' },
  xl: { box: 'size-20 rounded-2xl', text: 'text-lg' },
}

/**
 * Logo chữ NutriPaw: icon mark + tên. Dùng ở navbar, thẻ auth và footer.
 */
export default function Logo({ size = 'md', to = '/', className = '', variant = 'dark' }) {
  const s = sizes[size] ?? sizes.md

  const content = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={LOGO_MARK_URL}
        alt="NutriPaw"
        className={`shrink-0 object-cover backdrop-blur-[2px] ${s.box}`}
      />
      <span
        className={`font-heading font-bold tracking-tight ${s.text} ${variant === 'light' ? 'text-white' : 'text-ink'}`}
      >
        NutriPaw
      </span>
    </span>
  )

  if (!to) return content

  return (
    <Link to={to} aria-label="NutriPaw - về trang chủ">
      {content}
    </Link>
  )
}
