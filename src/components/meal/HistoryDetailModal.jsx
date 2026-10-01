import { useEffect, useState } from 'react'
import Modal from '../Modal.jsx'
import Button from '../Button.jsx'
import { foodCategory, dailyKcalNeed } from '../../data/mealOptions.js'
import { formatRelativeTime } from '../../utils/time.js'
import { CheckIcon, AlertIcon, TrashIcon } from '../icons.jsx'
import { usePets } from '../../context/PetsContext.jsx'
import { useHistory } from '../../context/HistoryContext.jsx'

const STATUS_STYLES = {
  good: 'bg-brand-soft text-brand-dark',
  warning: 'bg-[#ffe8d1] text-accent-orange',
  bad: 'bg-red-100 text-red-500',
}

// Thứ tự xếp hạng mức độ để so sánh (Cao > Trung bình > Thấp)
const LEVEL_RANK = { Cao: 3, 'Trung bình': 2, Thấp: 1 }

// Tìm mức cao nhất (vd Protein/Chất béo/Muối) trong số các món ăn của 1 lượt
// kiểm tra - vd nếu bữa có 1 món "Protein: Cao" và 1 món "Protein: Thấp" thì
// trả về "Cao" vì đó là mức đáng chú ý nhất
function worstLevel(items, key) {
  let best = null
  for (const item of items) {
    const level = foodCategory(item.categoryId)?.[key]
    if (level && (!best || LEVEL_RANK[level] > LEVEL_RANK[best])) best = level
  }
  return best ?? '-'
}

/**
 * "Chi tiết kiểm tra" - dùng lại cho mọi lượt trong lịch sử, tham số hóa
 * bằng entry được bấm vào (thay vì phải làm riêng từng frame Figma cho mỗi
 * món ăn).
 */
export default function HistoryDetailModal({ entry, onClose }) {
  const { getPet } = usePets()
  const { deleteCheck } = useHistory()
  // Bấm "Xóa" lần 1 chỉ chuyển sang trạng thái xác nhận, bấm lần 2 mới xóa
  // thật - tránh xóa nhầm do bấm lỡ tay
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  // Mỗi lần đổi sang xem 1 lượt khác thì reset lại trạng thái xác nhận xóa
  useEffect(() => {
    setConfirmingDelete(false)
  }, [entry])

  if (!entry) return null

  function handleDelete() {
    if (!confirmingDelete) {
      setConfirmingDelete(true)
      return
    }
    deleteCheck(entry.id)
    onClose()
  }

  const pet = getPet(entry.petId)
  const style = STATUS_STYLES[entry.status] ?? STATUS_STYLES.good
  const title = entry.items.length === 1 ? entry.items[0].label : `Bữa ăn ${entry.items.length} món`
  const grams = entry.items.reduce((sum, item) => sum + item.grams, 0)
  const allergens = [...new Set(entry.items.map((item) => foodCategory(item.categoryId)?.allergen).filter(Boolean))]

  return (
    <Modal open={Boolean(entry)} onClose={onClose} title="Chi tiết kiểm tra" className="max-h-[85vh] max-w-md overflow-y-auto">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-bold text-ink">Chi tiết kiểm tra</h2>
        <p className="text-xs text-ink-label">{formatRelativeTime(entry.createdAt)}</p>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border-light bg-cream-dark/40 p-6 text-center">
        <span className={`flex size-14 items-center justify-center rounded-full ${style}`}>
          {entry.status === 'good' ? <CheckIcon className="size-6" /> : <AlertIcon className="size-6" />}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-ink-secondary">
          {entry.statusLabel}
        </span>
        <h3 className="font-heading text-lg font-bold text-ink">{title}</h3>
        <p className="text-xs leading-relaxed text-ink-secondary">{entry.note}</p>
      </div>

      <div className="mt-4 rounded-2xl border border-border-light">
        <h4 className="px-4 pt-4 text-xs font-bold uppercase tracking-wide text-ink-label">Khẩu phần &amp; Năng lượng</h4>
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="rounded-xl bg-cream-dark px-3 py-2.5">
            <p className="text-xs text-ink-label">Khẩu phần</p>
            <p className="font-heading text-lg font-bold text-ink">{grams}g</p>
          </div>
          <div className="rounded-xl bg-cream-dark px-3 py-2.5">
            <p className="text-xs text-ink-label">Năng lượng</p>
            <p className="font-heading text-lg font-bold text-ink">{entry.kcal} kcal</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border-light">
        <h4 className="px-4 pt-4 text-xs font-bold uppercase tracking-wide text-ink-label">Thành phần dinh dưỡng</h4>
        <div className="flex flex-col gap-2 p-4">
          {[
            ['Protein', worstLevel(entry.items, 'protein')],
            ['Chất béo', worstLevel(entry.items, 'fat')],
            ['Muối (Sodium)', worstLevel(entry.items, 'sodium')],
          ].map(([label, level]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-ink-secondary">{label}</span>
              <span className="rounded-full bg-cream-dark px-2.5 py-1 text-xs font-bold text-ink-secondary">{level}</span>
            </div>
          ))}
        </div>
      </div>

      {pet && (
        <div className="mt-4 rounded-2xl border border-border-light">
          <h4 className="px-4 pt-4 text-xs font-bold uppercase tracking-wide text-ink-label">Thông tin bé</h4>
          <div className="grid grid-cols-2 gap-3 p-4">
            <div className="rounded-xl bg-cream-dark px-3 py-2.5">
              <p className="text-xs text-ink-label">Cân nặng lúc kiểm tra</p>
              <p className="font-heading text-lg font-bold text-ink">{pet.weight}kg</p>
            </div>
            <div className="rounded-xl bg-cream-dark px-3 py-2.5">
              <p className="text-xs text-ink-label">Nhu cầu / ngày</p>
              <p className="font-heading text-lg font-bold text-ink">{dailyKcalNeed(pet)}kcal</p>
            </div>
          </div>
        </div>
      )}

      {allergens.length > 0 && (
        <div className="mt-4 rounded-2xl border border-border-light p-4">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-label">Dị ứng đã kiểm tra</h4>
          <div className="flex flex-wrap gap-2">
            {allergens.map((a) => (
              <span key={a} className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-500">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Đóng
        </Button>
        <Button
          className={`flex-1 !shadow-none ${
            confirmingDelete ? '!bg-red-500 hover:!bg-red-600' : '!bg-red-50 !text-red-500 hover:!bg-red-100'
          }`}
          icon={<TrashIcon className="size-4" />}
          onClick={handleDelete}
        >
          {confirmingDelete ? 'Xác nhận xóa' : 'Xóa lượt này'}
        </Button>
      </div>
    </Modal>
  )
}
