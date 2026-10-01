import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import FormField from '../components/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { LockIcon, ArrowRightIcon, CheckMealIcon } from '../components/icons.jsx'

function validate(values) {
  const errors = {}

  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu mới.'
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

export default function ResetPassword() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email
  const { updatePassword } = useAuth()

  const [values, setValues] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

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
      await updatePassword(values.password)
      setDone(true)
    } catch {
      setErrors((prev) => ({
        ...prev,
        password: 'Không thể đặt lại mật khẩu. Link có thể đã hết hạn, hãy yêu cầu link mới.',
      }))
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <AuthLayout>
        <div className="flex w-full flex-col items-center text-center">
          <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
            <CheckMealIcon className="size-7" />
          </span>
          <h1 className="text-[26px] font-bold leading-tight text-ink sm:text-[28px]">Đặt lại mật khẩu thành công!</h1>
          <p className="mt-2 max-w-sm text-sm font-medium text-ink-secondary">
            Mật khẩu của bạn đã được cập nhật. Hãy đăng nhập lại với mật khẩu mới.
          </p>
          <Button className="mt-8" onClick={() => navigate('/login')} icon={<ArrowRightIcon className="size-4" />} iconPosition="right">
            Đăng nhập ngay
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="text-[28px] font-bold leading-tight text-ink sm:text-[30px]">Đặt lại mật khẩu</h1>
        <p className="text-sm font-medium text-ink-secondary">
          {email ? `Tạo mật khẩu mới cho ${email}.` : 'Tạo mật khẩu mới cho tài khoản của bạn.'}
        </p>
      </div>

      <Card className="w-full p-6 sm:p-8">
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Mật khẩu mới"
            type="password"
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
            placeholder="Nhập lại mật khẩu mới"
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
            {submitting ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'}
          </Button>

          <p className="text-center text-sm font-medium text-ink-secondary">
            <Link to="/login" className="font-bold text-brand-dark underline underline-offset-2">
              Quay lại đăng nhập
            </Link>
          </p>
        </form>
      </Card>
    </AuthLayout>
  )
}
