import { MIN_PORTION, MAX_PORTION } from '../../data/mealOptions.js'

// Ép giá trị về đúng khoảng [MIN_PORTION, MAX_PORTION], dùng khi thanh trượt
// hoặc lúc rời khỏi ô nhập số (không ép ngay lúc đang gõ, để không cản việc
// gõ số nhiều chữ số)
function clamp(n) {
  return Math.min(MAX_PORTION, Math.max(MIN_PORTION, n))
}

/**
 * "Khẩu phần" (10g-500g) dùng chung cho tab Chụp ảnh và Nhập tên - có cả ô
 * nhập số trực tiếp lẫn thanh kéo, người dùng gõ số chính xác hoặc kéo tùy ý.
 */
export default function PortionSlider({ value, onChange }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink-secondary">Khẩu phần</span>
        <div className="flex items-baseline gap-0.5">
          <input
            type="number"
            min={MIN_PORTION}
            max={MAX_PORTION}
            step={5}
            value={value}
            onChange={(e) => onChange(Number(e.target.value) || 0)}
            onBlur={(e) => onChange(clamp(Number(e.target.value) || MIN_PORTION))}
            className="w-16 rounded-lg border border-transparent bg-transparent text-right font-heading text-2xl font-bold text-ink outline-none focus:border-brand focus:bg-white"
          />
          <span className="text-sm font-medium text-ink-label">g</span>
        </div>
      </div>
      <input
        type="range"
        min={MIN_PORTION}
        max={MAX_PORTION}
        step={5}
        value={clamp(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-brand"
      />
      <div className="mt-1.5 flex justify-between text-xs font-medium text-ink-label">
        <span>{MIN_PORTION}g</span>
        <span>{MAX_PORTION}g</span>
      </div>
    </div>
  )
}
