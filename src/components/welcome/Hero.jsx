import Button from '../Button.jsx'
import { ArrowRightIcon, SparkleIcon, ClockIcon, PawIcon } from '../icons.jsx'

// Ảnh nền hero, tự host tại public/brand/
const HERO_IMAGE_URL = '/brand/hero.jpg'

// 3 chỉ số ngắn hiện dưới nút CTA để tăng độ tin cậy ngay từ màn đầu
const STATS = [
  { label: 'Dữ liệu khoa học', icon: SparkleIcon },
  { label: 'Kết quả 10 giây', icon: ClockIcon },
  { label: 'Phù hợp riêng 100%', icon: PawIcon },
]

/**
 * Banner đầu trang chủ (landing page) - ảnh nền, tiêu đề, mô tả ngắn và
 * 2 nút CTA chính (Bắt đầu miễn phí / Đăng nhập).
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[560px] items-center justify-center px-4 py-24 text-center sm:min-h-[680px] sm:px-6">
        <img
          src={HERO_IMAGE_URL}
          alt="Chó con và mèo con nằm cạnh nhau giữa hoa"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5 px-4">
          <span
            className="animate-fade-in-up rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold tracking-wide text-white backdrop-blur-md"
            style={{ animationDelay: '0ms' }}
          >
            <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-[#f43100] align-middle" />
            Dinh dưỡng thông minh cho thú cưng
          </span>

          <h1
            className="animate-fade-in-up font-heading text-4xl font-normal leading-tight tracking-tight text-white sm:text-5xl lg:text-[64px]"
            style={{ animationDelay: '90ms' }}
          >
            Chăm sóc bé yêu <br className="hidden sm:block" />
            <span className="text-[#f43100]">dễ hơn bao giờ hết</span>
          </h1>

          <p
            className="animate-fade-in-up max-w-md text-base font-medium leading-relaxed text-white/80 sm:text-lg"
            style={{ animationDelay: '180ms' }}
          >
            Kiểm tra bữa ăn trong 10 giây - biết ngay có đủ chất, quá béo, hay gây dị ứng cho bé
            không.
          </p>

          <div className="mt-2 flex animate-fade-in-up flex-col gap-3 sm:flex-row" style={{ animationDelay: '270ms' }}>
            <Button
              to="/register"
              variant="primary"
              size="lg"
              icon={<ArrowRightIcon className="size-4" />}
              iconPosition="right"
              className="!bg-[#e70000] !shadow-[0px_4px_6px_-4px_rgba(231,0,0,0.3),0px_10px_15px_-3px_rgba(231,0,0,0.3)] hover:!scale-[1.03] hover:!bg-[#cc0000]"
            >
              Bắt đầu miễn phí
            </Button>
            <Button
              to="/login"
              variant="outline"
              size="lg"
              className="!border-white/30 !bg-white !text-ink hover:!scale-[1.03] hover:!bg-white/90"
            >
              Đăng nhập
            </Button>
          </div>

          <div
            className="mt-4 flex animate-fade-in-up flex-wrap items-center justify-center gap-6"
            style={{ animationDelay: '360ms' }}
          >
            {STATS.map((stat) => (
              <span key={stat.label} className="flex items-center gap-2 text-xs font-medium text-white/75">
                <span className="flex size-7 items-center justify-center rounded-full border border-white/25 bg-white/20 backdrop-blur-sm">
                  <stat.icon className="size-3.5 text-white" />
                </span>
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
