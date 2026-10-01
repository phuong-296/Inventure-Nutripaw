import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import FormField from '../components/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { MailIcon, LockIcon, UserIcon, ArrowRightIcon } from '../components/icons.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}

  if (!values.username.trim()) {
    errors.username = 'Vui lòng nhập tên người dùng.'
  } else if (values.username.trim().length < 2) {
    errors.username = 'Tên người dùng quá ngắn.'
  }

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

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Vui lòng xác nhận mật khẩu.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp.'
  }

  return errors
}


function authErrorMessage(error) {
  const msg = error?.message ?? ''
  if (/already registered|already exists/i.test(msg)) return 'Email này đã được đăng ký.'
  if (/password/i.test(msg)) return 'Mật khẩu phải có ít nhất 6 ký tự.'
  return 'Không thể tạo tài khoản, vui lòng thử lại.'
}



export default function Register() {
  const [values, setValues] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

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
      await signUp(values.email.trim(), values.password, values.username.trim())
      navigate('/verify-email', { state: { username: values.username, email: values.email } })
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: authErrorMessage(error) }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="text-[28px] font-bold leading-tight text-ink sm:text-[30px]">Tạo tài khoản</h1>
        <p className="text-sm font-medium text-ink-secondary">Đăng ký tài khoản mới, hoàn toàn miễn phí.</p>
      </div>

      <Card className="w-full p-6 sm:p-8">
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <FormField
              label="Tên người dùng"
              type="text"
              name="username"
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              icon={<UserIcon className="size-5" />}
              value={values.username}
              onChange={handleChange('username')}
              error={errors.username}
            />

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

            <FormField
              label="Mật khẩu"
              type="password"
              name="password"
              placeholder="Tối thiểu 6 ký tự"
              autoComplete="new-password"
              icon={<LockIcon className="size-5" />}
              value={values.password}
              onChange={handleChange('password')}
              error={errors.password}
            />

            <FormField
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              icon={<LockIcon className="size-5" />}
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
            />

            <Button
              type="submit"
              fullWidth
              size="md"
              disabled={submitting}
              icon={<ArrowRightIcon className="size-4" />}
              iconPosition="right"
              className="mt-1"
            >
              {submitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
            </Button>

            <p className="text-center text-sm font-medium text-ink-secondary">
              Đã có tài khoản?{' '}
              <Link to="/login" className="font-bold text-brand-dark underline underline-offset-2">
                Đăng nhập
              </Link>
            </p>
          </form>
      </Card>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-label">
        Bằng việc đăng ký, bạn đồng ý với{' '}
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
