import Button from '../Button.jsx'
import { ArrowRightIcon } from '../icons.jsx'
import Reveal from '../Reveal.jsx'

// Ảnh avatar trang trí, tự host tại public/brand/
const CTA_IMAGE_URL = '/brand/cta-avatar.jpg'

/**
 * Khối kêu gọi hành động cuối trang chủ, mời người dùng tạo hồ sơ hoặc
 * đăng nhập.
 */
export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#dffae5] py-24">
      <span className="pointer-events-none absolute left-1/4 top-0 size-80 animate-blob rounded-full bg-white/40 blur-3xl" />

      <Reveal className="relative mx-auto flex max-w-lg flex-col items-center px-4 text-center sm:px-6">
        <span
          className="mb-6 flex size-20 animate-float items-center justify-center overflow-hidden rounded-full border-2 border-brand-light/50 p-0.5"
          style={{ backgroundImage: 'linear-gradient(135deg, rgb(183,238,196) 0%, rgb(255,235,223) 100%)' }}
        >
          <img src={CTA_IMAGE_URL} alt="" className="size-full rounded-full object-cover" />
        </span>
        <h2 className="font-heading text-[30px] font-bold text-ink">Bắt đầu với NutriPaw</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-body">
          Tạo hồ sơ cho bé và nhận đánh giá dinh dưỡng phù hợp riêng, hoàn toàn miễn phí.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/register" variant="primary" icon={<ArrowRightIcon className="size-4" />} iconPosition="right">
            Tạo hồ sơ ngay
          </Button>
          <Button to="/login" variant="outline">
            Đăng nhập
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
