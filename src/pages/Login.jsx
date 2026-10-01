import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import FormField from '../components/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { MailIcon, LockIcon, ArrowRightIcon } from '../components/icons.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}

  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email.'
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Email không hợp lệ.'
  }

  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu.'
  } else if (values.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.'
  }

  return errors
}

function authErrorMessage(error) {
  const msg = error?.message ?? ''
  if (/invalid login credentials/i.test(msg)) return 'Email hoặc mật khẩu không đúng.'
  if (/email not confirmed/i.test(msg)) return 'Email chưa được xác nhận. Kiểm tra hộp thư để lấy mã xác nhận.'
  return 'Không thể đăng nhập, vui lòng thử lại.'
}

export default function Login() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleChange(field) {
    return (event) => {
      const value = event.target.value
      setValues((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      await signIn(values.email.trim(), values.password)
      const redirectTo = location.state?.from?.pathname ?? '/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setErrors((prev) => ({ ...prev, password: authErrorMessage(error) }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="text-[28px] font-bold leading-tight text-ink sm:text-[30px]">Đăng nhập</h1>
        <p className="text-sm font-medium text-ink-secondary">Nhập email và mật khẩu để đăng nhập.</p>
      </div>

      <div className="mb-4 rounded-xl border border-brand/30 bg-brand-light px-4 py-3 text-center text-xs font-medium text-ink-secondary">
        Demo: <span className="font-semibold text-ink">nutripawdemo@gmail.com</span>/ MK:{' '}
        <span className="font-semibold text-ink">NutriPaw@Demo2026</span>
      </div>

      <Card className="w-full p-6 sm:p-8">
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Email"
            type="email"
            name="email"
            placeholder="ban@example.com"
            autoComplete="email"
            icon={<MailIcon className="size-5" />}
            value={values.email}
            onChange={handleChange('email')}
            error={errors.email}
          />

          <div className="flex flex-col gap-2">
            <FormField
              label="Mật khẩu"
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              autoComplete="current-password"
              icon={<LockIcon className="size-5" />}
              value={values.password}
              onChange={handleChange('password')}
              error={errors.password}
            />
            <Link
              to="/forgot-password"
              className="self-end text-xs font-bold text-brand-dark underline underline-offset-2"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            size="md"
            disabled={submitting}
            icon={<ArrowRightIcon className="size-4" />}
            iconPosition="right"
            className="mt-1"
          >
            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>

          <p className="text-center text-sm font-medium text-ink-secondary">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-bold text-brand-dark underline underline-offset-2">
              Đăng ký
            </Link>
          </p>
        </form>
      </Card>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-label">
        Bằng việc đăng nhập, bạn đồng ý với{' '}
        <a href="#" className="font-semibold text-brand-dark">
          Điều khoản
        </a>{' '}
        và{' '}
        <a href="#" className="font-semibold text-brand-dark">
          Chính sách
        </a>{' '}
        của NutriPaw.
      </p>
    </AuthLayout>
  )
}
