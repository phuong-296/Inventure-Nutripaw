
/**
 * Ô lựa chọn lớn dùng cho loài, độ tuổi và mục tiêu cân nặng trong wizard
 * tạo hồ sơ (viền/nền xanh khi được chọn).
 */
export default function ChoiceCard({ selected, onClick, title, hint, icon: Icon, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'flex flex-1 flex-col items-start gap-0.5 rounded-xl border-2 p-3.5 text-left transition-colors',
        selected
          ? 'border-brand bg-brand-soft/60 shadow-btn'
          : 'border-border bg-cream hover:border-brand/40',
        className,
      ].join(' ')}
    >
      {Icon && <Icon className="size-6 text-ink-input" />}
      <span className="text-sm font-bold text-ink-input">{title}</span>
      {hint && <span className="text-[10px] font-medium text-ink-label">{hint}</span>}
    </button>
  )
}
