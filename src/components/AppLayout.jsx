import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import ChatWidget from './ChatWidget.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import {
  HomeIcon,
  CheckMealIcon,
  HistoryIcon,
  LogoutIcon,
} from './icons.jsx'

const navItems = [
  { label: 'Trang chủ', to: '/dashboard', icon: HomeIcon },
  { label: 'Kiểm tra', to: '/check', icon: CheckMealIcon },
  { label: 'Lịch sử', to: '/history', icon: HistoryIcon },
]

function NavItem({ item }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? 'bg-brand text-white' : 'text-ink-secondary hover:bg-cream-dark'}`
      }
    >
      <item.icon className="size-5 shrink-0" />
      <span className="flex-1 text-left">{item.label}</span>
    </NavLink>
  )
}

/**
 * Khung giao diện cho khu vực đã đăng nhập (trang chủ thú cưng, wizard tạo
 * hồ sơ, luồng kiểm tra bữa ăn): sidebar cố định trên desktop, thu gọn
 * thành thanh trên cùng + thanh dưới cùng trên mobile.
 */
export default function AppLayout({ children }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await signOut()
    } finally {
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-cream">
      {/* Sidebar cho desktop */}
      <aside className="hidden w-[220px] shrink-0 flex-col border-r border-border-light bg-white px-4 py-6 lg:flex">
        <div className="px-2 pb-8">
          <Logo size="lg" to="/dashboard" />
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink-secondary hover:bg-cream-dark"
        >
          <LogoutIcon className="size-5 shrink-0" />
          Đăng xuất
        </button>
      </aside>

      {/* Thanh trên cùng cho mobile */}
      <div className="fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-border-light bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <Logo size="md" to="/dashboard" />
        <button type="button" onClick={handleLogout} className="flex items-center gap-1.5 text-xs font-semibold text-ink-secondary">
          <LogoutIcon className="size-4" />
          Đăng xuất
        </button>
      </div>

      <main className="flex-1 pb-36 pt-16 lg:pb-0 lg:pt-0">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </main>

      {/* Thanh điều hướng dưới cùng cho mobile - thay thế sidebar desktop */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-border-light bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[11px] font-semibold transition-colors ${isActive ? 'text-brand' : 'text-ink-secondary'}`
            }
          >
            <item.icon className="size-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <ChatWidget />
    </div>
  )
}
