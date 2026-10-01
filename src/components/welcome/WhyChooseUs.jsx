import { HeartIcon, ClockIcon, PawIcon, GiftIcon } from '../icons.jsx'
import Reveal from '../Reveal.jsx'

const items = [
  {
    title: 'Yên tâm mỗi bữa ăn',
    description:
      'Không còn lo lắng cho bé ăn sai - biết rõ thức ăn có đủ chất, có gây dị ứng hay quá nhiều calo hay không.',
    icon: HeartIcon,
    tone: 'green',
  },
  {
    title: 'Tiết kiệm thời gian',
    description: 'Chỉ cần 10 giây kiểm tra, không cần ngồi đọc thành phần từng dòng hay tính toán phức tạp.',
    icon: ClockIcon,
    tone: 'orange',
  },
  {
    title: 'Phù hợp từng bé',
    description: 'Chó hay mèo, già hay trẻ, béo hay gầy - gợi ý dinh dưỡng luôn được điều chỉnh theo từng bé.',
    icon: PawIcon,
    tone: 'green',
  },
  {
    title: 'Dùng miễn phí mỗi ngày',
    description: 'Mỗi ngày được kiểm tra 5 lượt miễn phí, đủ để theo dõi các bữa chính cho bé yêu của bạn.',
    icon: GiftIcon,
    tone: 'orange',
  },
]

const toneClasses = {
  green: 'bg-brand-light text-brand-dark',
  orange: 'bg-[#ffcfb6] text-[#a03400]',
}

export default function WhyChooseUs() {
  return (
    <section id="tai-sao-chon" className="relative scroll-mt-24 overflow-hidden bg-cream-dark/50 px-4 py-24 sm:px-6">
      <span className="pointer-events-none absolute -right-16 top-0 size-72 animate-blob rounded-full bg-[#ffcfb6]/30 blur-3xl [animation-delay:1s]" />
      <span className="pointer-events-none absolute -left-20 bottom-0 size-64 animate-blob rounded-full bg-brand-light/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-[#ffcfb6]/50 bg-[#ffebdfcc] px-4 py-1.5 text-xs font-bold tracking-wide text-[#a40000]">
            Tại sao chọn NutriPaw
          </span>
          <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
            Chăm sóc bé yêu <span className="text-[#e70000]">dễ hơn bao giờ hết</span>
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 100}
              className="rounded-[20px] border border-border-light bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <span
                className={`mb-4 flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 ${toneClasses[item.tone]}`}
              >
                <item.icon className="size-6" />
              </span>
              <h3 className="mb-2 font-heading text-sm font-bold text-ink">{item.title}</h3>
              <p className="text-xs leading-relaxed text-ink-body">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
