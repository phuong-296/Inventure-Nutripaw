import { ClockIcon, SparkleIcon, HeartIcon, GiftIcon } from '../icons.jsx'
import Reveal from '../Reveal.jsx'

// 4 chỉ số nổi bật hiện ngay dưới ảnh hero, tăng độ tin cậy cho trang chủ
const stats = [
  {
    value: '10s',
    title: 'Kiểm tra siêu nhanh',
    description: 'Chụp ảnh hoặc chọn thức ăn, nhận kết quả ngay lập tức',
    icon: ClockIcon,
  },
  {
    value: 'AI',
    title: 'Phân tích thông minh',
    description: 'Dữ liệu khoa học được đào tạo chuyên biệt cho dinh dưỡng thú cưng',
    icon: SparkleIcon,
  },
  {
    value: '1:1',
    title: 'Riêng từng bé',
    description: 'Mỗi bé có thể trạng khác nhau, gợi ý dinh dưỡng điều chỉnh theo từng bé',
    icon: HeartIcon,
  },
  {
    value: '0đ',
    title: 'Miễn phí cơ bản',
    description: '5 lượt kiểm tra mỗi ngày hoàn toàn miễn phí, không cần thẻ tín dụng',
    icon: GiftIcon,
  },
]

/**
 * Dải 4 thẻ chỉ số ngắn, đè lên phần dưới ảnh hero (margin âm) để tạo hiệu
 * ứng 2 khối chồng nhau như thiết kế Figma.
 */
export default function StatsBar() {
  return (
    <Reveal className="relative z-10 mx-auto -mt-14 max-w-5xl px-4 sm:px-6">
      <div
        className="grid grid-cols-2 gap-6 rounded-3xl border border-border-light bg-white p-6 shadow-[0_20px_45px_-20px_rgba(6,7,8,0.25)] sm:grid-cols-4 sm:gap-8 sm:p-8"
        style={{
          backgroundImage:
            'linear-gradient(166deg, rgba(223,250,229,0.4) 0%, rgba(0,0,0,0) 50%, rgba(255,235,223,0.3) 100%)',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.value}
            className="flex flex-col items-center gap-1 text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="mb-2 flex size-11 items-center justify-center rounded-2xl border border-brand-light/40 bg-brand-light transition-transform duration-300">
              <stat.icon className="size-5 text-brand-dark" />
            </span>
            <span className="font-heading text-2xl font-normal text-brand-dark sm:text-[28px]">{stat.value}</span>
            <span className="text-xs font-bold text-ink-input">{stat.title}</span>
            <span className="max-w-[140px] text-[10px] leading-relaxed text-ink-secondary">{stat.description}</span>
          </div>
        ))}
      </div>
    </Reveal>
  )
}
