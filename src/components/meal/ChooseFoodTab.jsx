import { useState } from 'react'
import { FOOD_CATEGORIES, DEFAULT_PORTION } from '../../data/mealOptions.js'
import { SearchIcon, ArrowRightIcon } from '../icons.jsx'
import FoodCategoryCard from './FoodCategoryCard.jsx'
import PortionSlider from './PortionSlider.jsx'

/**
 * Tab "Chọn món" - ô tìm kiếm + lưới danh mục món ăn. Bấm vào 1 thẻ sẽ chỉ
 * chọn nó (viền xanh nổi lên) và hiện bước chọn khối lượng (kéo thanh trượt
 * hoặc gõ số) + nút xác nhận bên dưới lưới, giống luồng "chọn khối lượng
 * trước khi thêm" ở 2 tab Chụp ảnh/Nhập tên - thay vì thêm ngay với khối
 * lượng mặc định mà không hỏi.
 */
export default function ChooseFoodTab({ onAdd }) {
  const [query, setQuery] = useState('') // từ khóa tìm kiếm món ăn
  const [categoryId, setCategoryId] = useState(null) // id danh mục đang được chọn (nếu có)
  const [grams, setGrams] = useState(DEFAULT_PORTION) // khối lượng đang chọn cho danh mục đó

  // Lọc danh sách món theo từ khóa tìm kiếm (không phân biệt hoa/thường)
  const filtered = FOOD_CATEGORIES.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))
  // Object danh mục đầy đủ tương ứng với categoryId đang chọn
  const category = FOOD_CATEGORIES.find((c) => c.id === categoryId)

  // Bấm vào 1 thẻ món ăn: chọn nó và reset khối lượng về mặc định
  function handlePick(c) {
    setCategoryId(c.id)
    setGrams(DEFAULT_PORTION)
  }

  return (
    <div>
      <h3 className="mb-4 font-heading text-base font-bold text-ink">Chọn món bé ăn hôm nay</h3>

      <div className="relative mb-6 max-w-md">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-label" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm món ăn..."
          className="h-[46px] w-full rounded-2xl border border-border bg-white pl-11 pr-4 text-sm text-ink-input placeholder:text-ink-label focus:border-brand focus:outline-none"
        />
      </div>

      {/* Không tìm thấy món nào khớp từ khóa */}
      {filtered.length === 0 ? (
        <p className="text-sm text-ink-secondary">Không tìm thấy món nào phù hợp.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <FoodCategoryCard key={c.id} category={c} selected={c.id === categoryId} onClick={handlePick} />
          ))}
        </div>
      )}

      {/* Chỉ hiện khối này sau khi đã chọn 1 danh mục ở lưới trên */}
      {category && (
        <div className="mt-6 max-w-2xl rounded-2xl border border-border-light bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <category.icon className="size-5 text-brand-dark" />
            <span className="font-heading text-sm font-bold text-ink">Khối lượng {category.label}</span>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              <PortionSlider value={grams} onChange={setGrams} />
            </div>
            <button
              type="button"
              onClick={() => {
                // Thêm món vào bữa ăn rồi reset lại lựa chọn để chọn tiếp món khác
                onAdd(category, grams)
                setCategoryId(null)
                setGrams(DEFAULT_PORTION)
              }}
              className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand px-6 text-sm font-bold text-white shadow-btn hover:bg-brand-dark"
            >
              Thêm vào bữa ăn
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
