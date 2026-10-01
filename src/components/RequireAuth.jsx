import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

/**
 * "Chốt chặn" route cho khu vực cần đăng nhập (trang chủ, tạo hồ sơ thú
 * cưng, kiểm tra bữa ăn, lịch sử). Điều hướng sang /login (nhớ luôn trang
 * đang định vào để quay lại sau khi đăng nhập xong) một khi đã chắc chắn
 * không có session; trong lúc còn đang kiểm tra session lần đầu thì không
 * render gì cả, để tránh nháy màn hình Login rồi mới vào được trang thật.
 */
export default function RequireAuth({ children }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  // Đang chờ AuthContext kiểm tra session lần đầu (gọi Supabase) -> chưa
  // biết đã đăng nhập hay chưa, cứ hiện loading, không quyết định vội
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm font-semibold text-ink-secondary">Đang tải...</p>
      </div>
    )
  }

  // Đã kiểm tra xong mà không có session -> chưa đăng nhập, đá về /login,
  // kèm theo location hiện tại để Login.jsx biết đường quay lại sau khi
  // đăng nhập thành công
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Có session hợp lệ -> cho render nội dung trang thật
  return children
}
