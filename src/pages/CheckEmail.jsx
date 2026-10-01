import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { MailIcon, ArrowRightIcon } from '../components/icons.jsx'

const TAGLINE = 'Đừng lo, nhập email là chúng mình gửi link đặt lại mật khẩu ngay. Bạn không đơn độc đâu!'

/**
 * "Kiểm tra email" - xác nhận link đặt lại mật khẩu đã được gửi. Lấy email
 * từ router state (do ForgotPassword.jsx truyền sang); nếu ai đó vào thẳng
 * trang này mà không có email trong state thì tự điều hướng ngược lại
 * trang Quên mật khẩu.
 */
export default function CheckEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  useEffect(() => {
    if (!email) navigate('/forgot-password', { replace: true })
  }, [email, navigate])

  if (!email) return null

  return (
    <AuthLayout tagline={TAGLINE} backTo="/login" backLabel="Đăng nhập">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <span className="mb-2 flex size-16 items-center justify-center rounded-2xl bg-[#ffcfb6]">
          <MailIcon className="size-7 text-ink" />
        </span>
        <h1 className="text-[28px] font-bold leading-tight text-ink sm:text-[30px]">Kiểm tra email nhé!</h1>
        <p className="text-sm font-medium text-ink-secondary">
          Chúng mình đã gửi link đặt lại mật khẩu đến <span className="font-semibold text-ink">{email}</span>
        </p>
      </div>

      <Card className="w-full p-6 sm:p-8">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 rounded-xl border border-[#ffcfb680] bg-[#ffebdfcc] p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#ffcfb6]">
              <MailIcon className="size-5 text-ink" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-input">Lưu ý nho nhỏ</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-secondary">
                Nếu không thấy email, hãy kiểm tra thư mục spam hoặc thử lại sau vài phút. Link có hiệu
                lực trong 1 giờ.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm font-semibold text-ink-secondary hover:text-ink"
          >
            Gửi lại với email khác
          </button>

          <Button
            fullWidth
            onClick={() => navigate('/login')}
            icon={<ArrowRightIcon className="size-4" />}
            iconPosition="right"
          >
            Về trang đăng nhập
          </Button>
        </div>
      </Card>
    </AuthLayout>
  )
}
