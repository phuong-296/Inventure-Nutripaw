import { useState } from 'react'
import { FOOD_CATEGORIES, DEFAULT_PORTION } from '../../data/mealOptions.js'
import { ArrowRightIcon } from '../icons.jsx'
import PortionSlider from './PortionSlider.jsx'

/**
 * Tab "Nhập tên" - gõ tự do tên món ăn + chọn 1 thẻ phân loại (dùng để tính
 * dinh dưỡng ước tính) + thanh chọn khối lượng, khớp với khung Figma.
 */
export default function NameTab({ onAdd }) {
  const [name, setName] = useState('') // tên món do người dùng tự gõ
  const [categoryId, setCategoryId] = useState(null) // phân loại đã chọn, để lấy số liệu dinh dưỡng
  const [grams, setGrams] = useState(DEFAULT_PORTION)

  const category = FOOD_CATEGORIES.find((c) => c.id === categoryId)
  // Chỉ cho thêm khi đã gõ tên VÀ đã chọn phân loại
  const canAdd = name.trim().length > 0 && category

  return (
    <div className="max-w-2xl">
      <h3 className="mb-4 font-heading text-base font-bold text-ink">Nhập tên món ăn</h3>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-ink-secondary" htmlFor="food-name">
          Tên món ăn
        </label>
        <input
          id="food-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ví dụ: Ức gà luộc"
          className="h-[50px] w-full rounded-2xl border border-border bg-white px-4 text-sm text-ink-input placeholder:text-ink-label focus:border-brand focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-ink-secondary">Phân loại</label>
        <div className="grid grid-cols-2 gap-2">
          {FOOD_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryId(c.id)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                categoryId === c.id
                  ? 'border-brand bg-brand-soft text-brand-dark'
                  : 'border-border bg-white text-ink-secondary hover:bg-cream-dark'
              }`}
            >
              <c.icon className="size-4" />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1">
          <PortionSlider value={grams} onChange={setGrams} />
        </div>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => {
            onAdd(category, grams, name.trim())
            setName('')
            setCategoryId(null)
            setGrams(DEFAULT_PORTION)
          }}
          className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand px-6 text-sm font-bold text-white shadow-btn hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Thêm vào bữa ăn
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
