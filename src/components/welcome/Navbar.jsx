import { useEffect, useState } from 'react'
import Logo from '../Logo.jsx'
import Button from '../Button.jsx'

const MENU_LINKS = [
  { href: '#cach-hoat-dong', label: 'Cách hoạt động' },
  { href: '#tai-sao-chon', label: 'Vì sao chọn NutriPaw' },
  { href: '#dang-ky-nhan-tin', label: 'Mẹo dinh dưỡng' },
]

/**
 * Thanh điều hướng cố định trên cùng của trang chủ - trong suốt/chữ trắng
 * khi ở đầu trang (nổi trên ảnh hero), chuyển sang nền trắng/chữ tối khi
 * người dùng cuộn xuống, để luôn đọc được dù nền bên dưới đổi màu.
 */
export default function Navbar() {
  // true khi đã cuộn xuống quá 1 ngưỡng nhỏ - dùng để đổi giao diện thanh nav
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48)
    }
    onScroll() // gọi ngay 1 lần để có đúng trạng thái ban đầu (vd khi load giữa trang)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border-light/70 bg-cream/90 shadow-[0_4px_20px_-8px_rgba(6,7,8,0.15)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between py-0 pl-[7px] pr-3 sm:pr-4 lg:pr-6">
        <Logo size="xl" variant={scrolled ? 'dark' : 'light'} />

        <nav className="hidden items-center gap-8 lg:flex">
          {MENU_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-300 ${
                scrolled ? 'text-ink-secondary hover:text-ink' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            to="/login"
            variant="outline"
            size="sm"
            className={`!h-8 !px-3 !text-xs transition-colors duration-300 ${
              scrolled ? '' : '!border-white/40 !bg-white/10 !text-white backdrop-blur-sm hover:!bg-white/20'
            }`}
          >
            Đăng nhập
          </Button>
          <Button to="/register" variant="primary" size="sm" className="!h-8 !px-3 !text-xs">
            Đăng ký
          </Button>
        </div>
      </div>
    </header>
  )
}
