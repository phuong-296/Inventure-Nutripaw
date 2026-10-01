import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import ChooseFoodTab from '../components/meal/ChooseFoodTab.jsx'
import PhotoTab from '../components/meal/PhotoTab.jsx'
import NameTab from '../components/meal/NameTab.jsx'
import SelectedItemsBar from '../components/meal/SelectedItemsBar.jsx'
import { usePets } from '../context/PetsContext.jsx'
import { useHistory } from '../context/HistoryContext.jsx'
import { DEFAULT_PORTION, DAILY_CHECK_LIMIT } from '../data/mealOptions.js'
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, SearchIcon, CameraIcon, UserIcon } from '../components/icons.jsx'
import { speciesIcon } from '../data/petOptions.js'

const TABS = [
  { id: 'choose', label: 'Chọn món', icon: SearchIcon },
  { id: 'photo', label: 'Chụp ảnh', icon: CameraIcon },
  { id: 'name', label: 'Nhập tên', icon: UserIcon },
]


export default function CheckMeal() {
  const { petId } = useParams()
  const { pets } = usePets()
  const { remaining } = useHistory()
  const navigate = useNavigate()

  const [activePetId, setActivePetId] = useState(petId || pets[0]?.id || null)
  const [tab, setTab] = useState('choose')
  const [items, setItems] = useState([])

  useEffect(() => {
    if (pets.length === 0) {
      navigate('/dashboard', { replace: true })
    } else if (!activePetId) {
      setActivePetId(pets[0].id)
    }
  }, [pets, activePetId, navigate])

  const pet = pets.find((p) => p.id === activePetId)
  const PetSpeciesIcon = speciesIcon(pet?.species)

  function addItem(category, grams = DEFAULT_PORTION, labelOverride) {
    if (!category) return
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), categoryId: category.id, label: labelOverride || category.label, grams },
    ])
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function updateItemGrams(id, grams) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, grams } : item)))
  }

  if (!pet) return null

  const usedToday = DAILY_CHECK_LIMIT - remaining

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

      <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Kiểm tra bữa ăn</h1>
      <p className="mt-2 text-sm text-ink-secondary">Xây dựng bữa ăn cho {pet.name}</p>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {pets.length > 1 ? (
          <div className="relative">
            <select
              value={activePetId}
              onChange={(e) => {
                setActivePetId(e.target.value)
                setItems([])
              }}
              className="h-[46px] appearance-none rounded-full border border-border bg-white py-2 pl-4 pr-10 text-sm font-bold text-ink focus:border-brand focus:outline-none"
            >
              {pets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.breed})
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-label" />
          </div>
        ) : (
          <span className="inline-flex h-[46px] items-center gap-2 rounded-full border border-border bg-white px-4 text-sm font-bold text-ink">
            <PetSpeciesIcon className="size-4" />
            {pet.name} <span className="font-medium text-ink-label">({pet.breed})</span>
          </span>
        )}
      </div>

      <div className="mt-6 max-w-xs">
        <div className="flex gap-1.5">
          {Array.from({ length: DAILY_CHECK_LIMIT }).map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-full ${i < usedToday ? 'bg-accent-orange' : 'bg-border'}`}
            />
          ))}
        </div>
        <p className="mt-2 text-xs font-semibold text-ink-label">Còn {remaining} lượt hôm nay</p>
      </div>

      <SelectedItemsBar items={items} onRemove={removeItem} onUpdateGrams={updateItemGrams} />

      {remaining === 0 && items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center">
          <p className="font-heading text-lg font-bold text-ink">Bạn đã dùng hết lượt kiểm tra hôm nay</p>
          <p className="mt-2 text-sm text-ink-secondary">Quay lại vào ngày mai để tiếp tục kiểm tra bữa ăn cho {pet.name} nhé.</p>
        </div>
      ) : (
        <>
          <div className="mb-8 mt-2 flex w-full gap-1 rounded-2xl border border-border-light bg-white p-1 sm:inline-flex sm:w-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold transition-colors sm:flex-none sm:justify-start sm:gap-2 sm:px-4 sm:text-sm ${
                  tab === t.id ? 'bg-brand text-white' : 'text-ink-secondary hover:bg-cream-dark'
                }`}
              >
                <t.icon className="size-4 shrink-0" />
                <span className="truncate">{t.label}</span>
              </button>
            ))}
          </div>

          {tab === 'choose' && <ChooseFoodTab onAdd={(category, grams) => addItem(category, grams)} />}
          {tab === 'photo' && <PhotoTab onAdd={addItem} />}
          {tab === 'name' && <NameTab onAdd={addItem} />}
        </>
      )}

      {items.length > 0 && (
        <div className="sticky bottom-4 mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/check/result', { state: { petId: pet.id, items } })}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand px-8 text-sm font-bold text-white shadow-btn hover:bg-brand-dark"
          >
            Kiểm tra bữa ăn ({items.length} món)
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      )}
    </AppLayout>
  )
}
