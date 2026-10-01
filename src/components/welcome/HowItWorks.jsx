import Button from '../Button.jsx'
import { ArrowRightIcon, PawIcon, CameraIcon, CheckMealIcon } from '../icons.jsx'
import Reveal from '../Reveal.jsx'

// Ảnh minh họa từng bước, tự host tại public/brand/
const STEP_IMAGES = ['/brand/step-1.jpg', '/brand/step-2.jpg', '/brand/step-3.jpg']

const steps = [
  {
    number: '01',
    title: 'Tạo hồ sơ bé',
    description: 'Cho NutriPaw biết tên, giống, tuổi, cân nặng và tình trạng sức khỏe của bé trong 2 phút.',
    icon: PawIcon,
    image: STEP_IMAGES[0],
  },
  {
    number: '02',
    title: 'Chụp hoặc chọn món',
    description: 'Chọn loại thức ăn bé đang ăn - hạt khô, pate, thịt gà, cá, cơm, rau... cực nhanh.',
    icon: CameraIcon,
    image: STEP_IMAGES[1],
  },
  {
    number: '03',
    title: 'Nhận kết quả tức thì',
    description: 'Biết ngay bữa ăn có phù hợp không, cần điều chỉnh gì, và gợi ý thay thế tốt hơn.',
    icon: CheckMealIcon,
    image: STEP_IMAGES[2],
  },
]

/**
 * Khối "Cách hoạt động" ở trang chủ - 3 bước sử dụng app, mỗi bước 1 ảnh
 * minh họa + icon + mô tả ngắn.
 */
export default function HowItWorks() {
  return (
    <section id="cach-hoat-dong" className="relative scroll-mt-24 overflow-hidden bg-cream-dark px-4 py-24 sm:px-6">
      <span className="pointer-events-none absolute -left-24 top-10 size-72 animate-blob rounded-full bg-brand-light/40 blur-3xl" />
      <span className="pointer-events-none absolute -right-20 bottom-0 size-64 animate-blob rounded-full bg-[#ffcfb6]/40 blur-3xl [animation-delay:2s]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-brand-light/50 bg-brand-light px-4 py-2 text-xs font-bold tracking-wide text-[#005c00]">
            Cách hoạt động
          </span>
          <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
            Kiểm tra bữa ăn chỉ trong <span className="text-brand-dark">3 bước</span>
          </h2>
          <p className="text-ink-body">Đơn giản, nhanh chóng, không cần kiến thức dinh dưỡng</p>
        </Reveal>

        <div className="relative grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 120} className="relative">
              <div className="group overflow-hidden rounded-3xl border border-border-light bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={step.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-xl bg-white px-3 py-1.5 font-heading text-xs text-ink shadow-sm">
                    {step.number}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-light/40 bg-brand-light">
                      <step.icon className="size-4 text-brand-dark" />
                    </span>
                    <h3 className="font-heading text-base font-bold text-ink">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-body">{step.description}</p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <span className="absolute -right-4 top-[88px] z-10 hidden size-8 items-center justify-center rounded-full border border-brand-light/50 bg-brand-light sm:flex">
                  <ArrowRightIcon className="size-4 text-brand-dark" />
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-12 flex justify-center">
          <Button to="/register" variant="primary" size="lg" icon={<ArrowRightIcon className="size-4" />} iconPosition="right">
            Bắt đầu kiểm tra ngay
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
