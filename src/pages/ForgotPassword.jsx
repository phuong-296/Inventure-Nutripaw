import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import FormField from '../components/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { MailIcon, LockIcon, ArrowRightIcon } from '../components/icons.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TAGLINE = 'Đừng lo, nhập email là chúng mình gửi link đặt lại mật khẩu ngay. Bạn không đơn độc đâu!'


export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { requestPasswordReset } = useAuth()
  const navigate = useNavigate()

  const isValid = EMAIL_RE.test(email)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim()) {
      setError('Vui lòng nhập email.')
      return
    }
    if (!isValid) {
      setError('Email không hợp lệ.')
      return
    }

    setSubmitting(true)
    try {
      await requestPasswordReset(email.trim())
      navigate('/check-email', { state: { email } })
    } catch {
   
      
      setError('Không thể gửi email, vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout tagline={TAGLINE} backTo="/login" backLabel="Đăng nhập">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <span className="mb-2 flex size-16 items-center justify-center rounded-2xl bg-brand-light">
          <LockIcon className="size-7 text-ink" />
        </span>
        <h1 className="text-[28px] font-bold leading-tight text-ink sm:text-[30px]">Quên mật khẩu?</h1>
        <p className="text-sm font-medium text-ink-secondary">
          Nhập email đã đăng ký, chúng mình sẽ gửi link đặt lại mật khẩu cho bạn.
        </p>
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            error={error}
          />

          <Button
            type="submit"
            fullWidth
            size="md"
            disabled={submitting}
            icon={<ArrowRightIcon className="size-4" />}
            iconPosition="right"
            className={!isValid ? '!bg-border !text-ink-label !shadow-none' : ''}
          >
            {submitting ? 'Đang gửi...' : 'Gửi link đặt lại mật khẩu'}
          </Button>
        </form>
      </Card>
    </AuthLayout>
  )
}
