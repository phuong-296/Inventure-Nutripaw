import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import HistoryDetailModal from '../components/meal/HistoryDetailModal.jsx'
import { useHistory } from '../context/HistoryContext.jsx'
import { foodCategory } from '../data/mealOptions.js'
import { formatRelativeTime } from '../utils/time.js'
import { ArrowLeftIcon, HistoryIcon, UtensilsIcon } from '../components/icons.jsx'

const STATUS_STYLES = {
  good: 'bg-brand-soft text-brand-dark',
  warning: 'bg-[#ffe8d1] text-accent-orange',
  bad: 'bg-red-100 text-red-500',
}


export default function CheckHistory() {
  const { history } = useHistory()
  const navigate = useNavigate()
  const [activeEntry, setActiveEntry] = useState(null)

  return (
    <AppLayout>
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-secondary hover:text-ink"
      >
        <ArrowLeftIcon className="size-5" />
        Quay lại
      </button>

      <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Lịch sử kiểm tra</h1>
      <p className="mt-2 text-sm text-ink-secondary">Tất cả bữa ăn đã kiểm tra cho các bé của bạn</p>

      {history.length === 0 ? (
        <Card className="mt-8 flex flex-col items-center gap-3 border-dashed p-12 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
            <HistoryIcon className="size-7" />
          </span>
          <p className="font-heading text-lg font-bold text-ink">Chưa có lượt kiểm tra nào</p>
          <p className="max-w-xs text-sm text-ink-secondary">
            Kiểm tra bữa ăn đầu tiên để bắt đầu lưu lại lịch sử dinh dưỡng cho bé.
          </p>
          <Button className="mt-2" onClick={() => navigate('/check')}>
            Kiểm tra bữa ăn ngay
          </Button>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {history.map((entry) => {
            const title = entry.items.length === 1 ? entry.items[0].label : `Bữa ăn ${entry.items.length} món`
            const grams = entry.items.reduce((sum, item) => sum + item.grams, 0)
            const style = STATUS_STYLES[entry.status] ?? STATUS_STYLES.good
            const EntryIcon = foodCategory(entry.items[0]?.categoryId)?.icon ?? UtensilsIcon

            return (
              <button key={entry.id} type="button" onClick={() => setActiveEntry(entry)} className="text-left">
                <Card className="flex gap-4 p-5 hover:border-brand/40">
                  <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${style}`}>
                    <EntryIcon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-bold text-ink">{title}</p>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`}>
                        {entry.statusLabel}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink-label">{formatRelativeTime(entry.createdAt)}</p>
                    <p className="mt-1.5 line-clamp-2 text-xs text-ink-secondary">{entry.note}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink-label">
                        {grams}g • {entry.kcal} kcal
                      </span>
                      <span className="text-xs font-bold text-brand-dark">Xem chi tiết →</span>
                    </div>
                  </div>
                </Card>
              </button>
            )
          })}
        </div>
      )}

      <HistoryDetailModal entry={activeEntry} onClose={() => setActiveEntry(null)} />
    </AppLayout>
  )
}
