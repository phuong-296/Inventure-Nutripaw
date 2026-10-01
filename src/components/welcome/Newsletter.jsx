import { useState } from 'react'
import Input from '../Input.jsx'
import { MailIcon } from '../icons.jsx'
import Reveal from '../Reveal.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Form đăng ký nhận bản tin ở cuối trang chủ. Chưa có backend thật để lưu
 * email - chỉ validate rồi hiện lời cảm ơn trên giao diện (không gửi đi
 * đâu cả), đủ cho bản demo.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false) // đã "đăng ký" thành công (chỉ ở giao diện)

  const isValid = EMAIL_RE.test(email)

  function handleSubmit(event) {
    event.preventDefault()

    if (!isValid) {
      setError('Vui lòng nhập một email hợp lệ.')
      return
    }

    setError('')
    // Chưa có backend thật - chỉ xác nhận trên giao diện, không lưu/gửi đi đâu.
    setSubscribed(true)
  }

  return (
    <Reveal as="section" id="dang-ky-nhan-tin" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-[28px] border border-border-light bg-white p-10 text-center sm:p-14">
        <span className="pointer-events-none absolute -right-10 -top-10 size-40 animate-float rounded-full bg-[#dffae5]/60 blur-2xl" />
        <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-[#dffae5]">
          <MailIcon className="size-7 text-brand-dark" />
        </span>
        <h2 className="font-heading text-[28px] font-bold text-ink sm:text-[34px]">Nhận tips dinh dưỡng miễn phí</h2>
        <p className="mx-auto mt-3 max-w-md text-base text-ink-secondary">
          Mỗi tuần một email với mẹo chăm sóc dinh dưỡng, cảnh báo thực phẩm nguy hiểm và công thức ăn ngon cho bé
        </p>

        {subscribed ? (
          <p className="mt-8 text-sm font-semibold text-brand-dark">Cảm ơn bạn đã đăng ký!</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="nhap@email.com"
                icon={<MailIcon className="size-5" />}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                error={Boolean(error)}
                aria-label="Email"
              />
              {error && <p className="mt-1.5 text-left text-xs font-medium text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className={`h-[50px] shrink-0 rounded-2xl px-8 text-sm font-bold transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] ${
                isValid ? 'bg-brand text-white shadow-btn hover:bg-brand-dark' : 'bg-border text-ink-label'
              }`}
            >
              Đăng ký
            </button>
          </form>
        )}

        <p className="mt-4 text-[10px] text-ink-label">Không spam. Hủy đăng ký bất cứ lúc nào.</p>
      </div>
    </Reveal>
  )
}
