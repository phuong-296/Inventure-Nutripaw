// Bảng màu gradient theo từng danh mục món ăn - phương án nền ổn định thay
// cho ảnh CDN của Figma (loại link đó tự hết hạn sau 7 ngày)
const CATEGORY_GRADIENTS = {
  hatkho: 'linear-gradient(135deg, #f9e4b7 0%, #f5c842 100%)',
  pate: 'linear-gradient(135deg, #ffd4b2 0%, #ff8c42 100%)',
  thitga: 'linear-gradient(135deg, #ffe4b2 0%, #f4a830 100%)',
  ca: 'linear-gradient(135deg, #b2dcff 0%, #3b82f6 100%)',
  com: 'linear-gradient(135deg, #f0f0e8 0%, #d4c99a 100%)',
  rau: 'linear-gradient(135deg, #c8f5d0 0%, #4ade80 100%)',
  snack: 'linear-gradient(135deg, #e8d5ff 0%, #a855f7 100%)',
  trung: 'linear-gradient(135deg, #fff3b2 0%, #fbbf24 100%)',
}

/**
 * 1 ô danh mục món ăn trong lưới "Chọn món" - ảnh thật (tự host tại
 * public/food/) kèm viên icon + nhãn tên món phủ lên trên. Nếu ảnh thiếu
 * hoặc lỗi tải thì tự rơi về nền gradient theo màu riêng của danh mục.
 * `selected` bo viền xanh để bước chọn khối lượng bên dưới (ChooseFoodTab)
 * biết rõ đang gắn với món nào vừa bấm.
 */
export default function FoodCategoryCard({ category, selected, onClick }) {
  // Nếu category.id không có trong bảng màu (trường hợp hiếm) thì dùng
  // gradient xanh dương mặc định thay vì để trống
  const gradient = CATEGORY_GRADIENTS[category.id] ?? 'linear-gradient(135deg, #e8f4ff 0%, #93c5fd 100%)'

  return (
    <button
      type="button"
      onClick={() => onClick?.(category)}
      aria-pressed={selected}
      className={`group relative aspect-[349/262] w-full overflow-hidden rounded-2xl text-left shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${
        selected ? 'ring-4 ring-brand ring-offset-2' : ''
      }`}
    >
      <div className="absolute inset-0" style={{ backgroundImage: gradient }} />
      {category.photo && (
        <img
          src={category.photo}
          alt={category.label}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      {/* Lớp phủ tối để chữ bên dưới dễ đọc hơn */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 55%)' }}
      />
      {/* Viên nhãn tên món ở cuối thẻ */}
      <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
        <span className="flex size-7 items-center justify-center rounded-full bg-white/90 drop-shadow">
          <category.icon className="size-4 text-ink" />
        </span>
        <span className="text-sm font-bold text-white drop-shadow">{category.label}</span>
      </span>
    </button>
  )
}
