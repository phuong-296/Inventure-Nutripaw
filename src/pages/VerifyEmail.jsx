import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import FormField from '../components/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { MailIcon, LockIcon, ArrowRightIcon, CheckIcon } from '../components/icons.jsx'

const CODE_RE = /^\d{6}$/

/** Chuyển lỗi OTP tiếng Anh từ Supabase thành thông báo tiếng Việt. */
function otpErrorMessage(error) {
  const msg = error?.message ?? ''
  if (/expired/i.test(msg)) return 'Mã xác nhận đã hết hạn, hãy bấm "Gửi lại mã".'
  if (/invalid|token|otp/i.test(msg))
    return 'Mã xác nhận không đúng. Kiểm tra lại email - có thể Supabase gửi link thay vì mã (xem hướng dẫn bên dưới).'
  return 'Không thể xác nhận mã, vui lòng thử lại.'
}

/**
 * "Xác nhận email" - xử lý 2 luồng xác nhận của Supabase:
 *
 * 1. OTP (mã 6 số): Supabase template dùng {{ .Token }} → user nhập mã vào đây.
 * 2. Magic link: Supabase template dùng {{ .ConfirmationURL }} (mặc định) →
 *    user click link trong email, redirect về /verify-email với session đã được
 *    set bởi detectSessionInUrl → component tự detect và chuyển sang màn thành công.
 */
export default function VerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const { username, email } = location.state || {}
  const { session, verifySignupOtp, resendSignupOtp } = useAuth()

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [verified, setVerified] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [resent, setResent] = useState(false)
  const [resending, setResending] = useState(false)

  
  useEffect(() => {
    if (session?.user) {
      setVerified(true)
    }
  }, [session])



  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setVerified(true)
      }
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!email && !session) navigate('/register', { replace: true })
  }, [email, session, navigate])

  if (!email && !session) return null

  async function handleSubmit(event) {
    event.preventDefault()
    if (!CODE_RE.test(code)) {
      setError('Mã xác nhận phải gồm đúng 6 chữ số.')
      return
    }
    setSubmitting(true)
    try {
      await verifySignupOtp(email, code)
      setVerified(true)
    } catch (err) {
      setError(otpErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResend() {
    setError('')
    setResent(false)
    setResending(true)
    try {
      await resendSignupOtp(email)
      setResent(true)
    } catch {
      setError('Không thể gửi lại mã, vui lòng thử lại sau.')
    } finally {
      setResending(false)
    }
  }

  if (verified) {
    return (
      <AuthLayout>
        <Card className="w-full max-w-[420px] p-8 text-center sm:p-10">
          <span
            className="mx-auto flex size-24 items-center justify-center rounded-full"
            style={{ backgroundImage: 'linear-gradient(135deg, rgb(0,164,35) 0%, rgb(244,49,0) 100%)' }}
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-white">
              <CheckIcon className="size-9 text-brand" />
            </span>
          </span>

          <h1 className="mt-5 font-heading text-2xl font-bold leading-tight text-ink">
            Tài khoản đã
            <br />
            đăng kí thành công !
          </h1>

          <p className="mt-4 text-sm font-medium text-ink-secondary">
            Chào mừng <span className="font-semibold text-ink">{username || session?.user?.user_metadata?.username || 'bạn'}</span> đến với NutriPaw!
          </p>
          <p className="mt-1 text-xs text-ink-label">Cùng chăm sóc dinh dưỡng cho bé yêu của bạn nhé.</p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-4 text-xs font-semibold text-ink-label underline"
          >
            Về trang chủ
          </button>

          <div className="my-6 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-border" />
            <span className="size-2 rounded-full bg-[#ffa177]" />
            <span className="size-1.5 rounded-full bg-[#78d694]" />
            <span className="size-2 rounded-full bg-[#ffa177]" />
            <span className="h-px w-12 bg-border" />
          </div>

          <Button
            fullWidth
            onClick={() => navigate('/login')}
            icon={<ArrowRightIcon className="size-4" />}
            iconPosition="right"
          >
            Đăng nhập
          </Button>
        </Card>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="text-[28px] font-bold leading-tight text-ink sm:text-[30px]">Tạo tài khoản</h1>
        <p className="text-sm font-medium text-ink-secondary">Đăng ký tài khoản mới, hoàn toàn miễn phí.</p>
      </div>

      <Card className="w-full p-6 sm:p-8">
        <div className="mb-5 flex flex-col items-center gap-1.5 text-center">
          <span className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-brand-light">
            <MailIcon className="size-6 text-ink" />
          </span>
          <h2 className="font-heading text-base font-bold text-ink">Xác nhận email</h2>
          <p className="text-xs font-medium text-ink-secondary">
            Email xác nhận đã được gửi đến{' '}
            <span className="font-semibold text-ink-input">{email}</span>.
          </p>
          <p className="text-xs text-ink-label">Kiểm tra hộp thư (kể cả thư mục Spam).</p>
        </div>

        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Mã xác nhận (6 số)"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            className="[&_input]:text-center [&_input]:tracking-[0.5em]"
            icon={<LockIcon className="size-5" />}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
              if (error) setError('')
            }}
            error={error}
          />

          <Button
            type="submit"
            fullWidth
            size="md"
            disabled={submitting || code.length < 6}
            icon={<ArrowRightIcon className="size-4" />}
            iconPosition="right"
          >
            {submitting ? 'Đang xác nhận...' : 'Xác nhận mã'}
          </Button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-center text-sm font-semibold text-brand-dark hover:text-brand disabled:opacity-50"
          >
            {resending ? 'Đang gửi...' : resent ? '✅ Đã gửi lại mã mới!' : 'Gửi lại mã'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-center text-sm font-semibold text-ink-secondary hover:text-ink"
          >
            Quay lại điền thông tin
          </button>
        </form>



        <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800">
          <p className="font-bold mb-1"> Nhận được email có link thay vì mã số?</p>
          <p className="leading-relaxed">
            Click vào link trong email để xác nhận tự động,{' '}
            <span className="font-semibold">hoặc</span> vào Supabase Dashboard → Authentication → Email Templates →
            Confirm signup → đổi <code className="bg-amber-100 px-1 rounded">{`{{ .ConfirmationURL }}`}</code> thành{' '}
            <code className="bg-amber-100 px-1 rounded">{`{{ .Token }}`}</code> để nhận mã 6 số.
          </p>
        </div>
      </Card>
    </AuthLayout>
  )
}
