/**
 * Nút tag dạng viên thuốc bo tròn, dùng cho danh sách giống loài, vấn đề
 * sức khỏe và dị ứng. `variant="danger"` cho trạng thái đã chọn màu đỏ
 * (khớp thiết kế Figma cho dị ứng), các trường hợp khác dùng màu xanh brand.
 */
export default function ChoiceTag({ selected, onClick, children, variant = 'default' }) {
  const selectedClasses =
    variant === 'danger'
      ? 'border-red-300 bg-red-50 text-red-600'
      : 'border-brand bg-brand-soft/70 text-brand-dark'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'rounded-full border px-4 py-2 text-xs font-bold transition-colors',
        selected ? selectedClasses : 'border-border bg-cream text-ink-secondary hover:border-brand/40',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
