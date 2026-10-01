import { MIN_PORTION, MAX_PORTION, foodCategory, itemKcal, totalKcal } from '../../data/mealOptions.js'
import { XIcon } from '../icons.jsx'

/**
 * Thanh tóm tắt "Bữa ăn của bé (N món)" hiện phía trên các tab khi đã có ít
 * nhất 1 món được thêm - khớp khung Figma "Kiểm tra 2 món". Khối lượng có
 * thể sửa trực tiếp ngay tại đây, để món thêm từ tab "Chọn món" (vốn không
 * có bước chọn khối lượng riêng) vẫn chỉnh sửa được sau khi đã thêm.
 */
export default function SelectedItemsBar({ items, onRemove, onUpdateGrams }) {
  if (items.length === 0) return null

  return (
    <div className="mb-6 rounded-2xl border border-border-light bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-ink">Bữa ăn của bé ({items.length} món)</h3>
        <span className="rounded-full bg-cream-dark px-3 py-1 text-xs font-bold text-ink-secondary">
          Tổng {totalKcal(items)} kcal
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => {
          const ItemIcon = foodCategory(item.categoryId)?.icon
          return (
          <div key={item.id} className="flex items-center gap-2 rounded-xl bg-cream-dark px-3 py-2">
            {ItemIcon && <ItemIcon className="size-4 shrink-0 text-ink-secondary" />}
            <div className="leading-tight">
              <p className="text-xs font-bold text-ink">{item.label}</p>
              <div className="flex items-center gap-1 text-[11px] text-ink-label">
                <input
                  type="number"
                  min={MIN_PORTION}
                  max={MAX_PORTION}
                  step={5}
                  value={item.grams}
                  onChange={(e) => onUpdateGrams(item.id, Number(e.target.value) || 0)}
                  aria-label={`Khối lượng ${item.label}`}
                  className="w-10 rounded border border-transparent bg-transparent text-right font-semibold text-ink-secondary outline-none focus:border-brand focus:bg-white"
                />
                <span>g · {itemKcal(item)} kcal</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label={`Xóa ${item.label}`}
              className="ml-1 flex size-5 items-center justify-center rounded-full text-ink-label hover:bg-white hover:text-red-500"
            >
              <XIcon className="size-3" />
            </button>
          </div>
          )
        })}
      </div>
    </div>
  )
}
