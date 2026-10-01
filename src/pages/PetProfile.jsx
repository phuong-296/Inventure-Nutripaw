import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import EditPetModal from '../components/EditPetModal.jsx'
import DeletePetModal from '../components/DeletePetModal.jsx'
import HistoryDetailModal from '../components/meal/HistoryDetailModal.jsx'
import { usePets } from '../context/PetsContext.jsx'
import { useHistory } from '../context/HistoryContext.jsx'
import { dailyKcalNeed, foodCategory } from '../data/mealOptions.js'
import { speciesIcon, speciesLabel, ageGroupLabel, weightGoalLabel, SPECIES_GRADIENT } from '../data/petOptions.js'
import { formatRelativeTime } from '../utils/time.js'
import { ArrowLeftIcon, ArrowRightIcon, EditIcon, TrashIcon, CheckMealIcon, HistoryIcon, UtensilsIcon } from '../components/icons.jsx'

const STATUS_STYLES = {
  good: 'bg-brand-soft text-brand-dark',
  warning: 'bg-[#ffe8d1] text-accent-orange',
  bad: 'bg-red-100 text-red-500',
}


export default function PetProfile() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const { getPet, updatePet, removePet } = usePets()
  const { history } = useHistory()

  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [activeEntry, setActiveEntry] = useState(null)

  const pet = getPet(petId)

  useEffect(() => {
    if (!pet) navigate('/dashboard', { replace: true })
  }, [pet, navigate])

  if (!pet) return null

  const gradient = SPECIES_GRADIENT[pet.species] ?? SPECIES_GRADIENT.dog
  const SpeciesIcon = speciesIcon(pet.species)
  const kcalNeed = dailyKcalNeed(pet)
  const petHistory = history.filter((entry) => entry.petId === pet.id).slice(0, 5)

  function handleDeleteConfirm(id) {
    removePet(id)
    navigate('/dashboard', { replace: true })
  }

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

      <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-4">
          <span
            className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-light/40 text-4xl"
            style={{ backgroundImage: gradient }}
          >
            {pet.photoUrl ? (
              <img src={pet.photoUrl} alt={pet.name} className="size-full object-cover" />
            ) : (
              <SpeciesIcon className="size-8 text-ink" />
            )}
          </span>
          <div>
            <h1 className="font-heading text-2xl font-bold text-ink sm:text-3xl">{pet.name}</h1>
            <p className="mt-1 text-sm text-ink-label">
              {pet.breed} · {ageGroupLabel(pet.ageGroup)}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label={`Sửa hồ sơ ${pet.name}`}
            className="flex size-10 items-center justify-center rounded-xl border border-border text-ink-secondary hover:bg-cream-dark"
          >
            <EditIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeleting(true)}
            aria-label={`Xóa hồ sơ ${pet.name}`}
            className="flex size-10 items-center justify-center rounded-xl border border-border text-red-500 hover:bg-red-50"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
      </Card>

      <button
        type="button"
        onClick={() => navigate(`/check/${pet.id}`)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-4 text-sm font-bold text-white shadow-btn transition-transform hover:scale-[1.01] hover:bg-brand-dark sm:w-auto"
      >
        <CheckMealIcon className="size-4" />
        Kiểm tra bữa ăn cho {pet.name}
        <ArrowRightIcon className="size-3.5" />
      </button>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-heading text-base font-bold text-ink">Thông tin cơ bản</h3>
          <div className="divide-y divide-border-light text-sm">
            <div className="flex items-center justify-between py-2.5">
              <span className="text-ink-secondary">Loài</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-ink">
                <SpeciesIcon className="size-4" />
                {speciesLabel(pet.species)}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-ink-secondary">Giống</span>
              <span className="font-bold text-ink">{pet.breed || ' - '}</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-ink-secondary">Độ tuổi</span>
              <span className="font-bold text-ink">{ageGroupLabel(pet.ageGroup)}</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-ink-secondary">Cân nặng</span>
              <span className="font-bold text-ink">{pet.weight}kg</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-ink-secondary">Mục tiêu cân nặng</span>
              <span className="font-bold text-ink">{weightGoalLabel(pet.weightGoal)}</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col p-5">
          <h3 className="mb-4 font-heading text-base font-bold text-ink">Nhu cầu dinh dưỡng</h3>
          <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-brand-soft py-6 text-center">
            <span className="font-heading text-3xl font-bold text-brand-dark">{kcalNeed}</span>
            <span className="text-xs font-semibold text-brand-dark">kcal / ngày</span>
          </div>
          <p className="mt-3 text-center text-xs leading-relaxed text-ink-label">
            Ước tính dựa trên cân nặng và độ tuổi của {pet.name}, không thay thế tư vấn thú y.
          </p>
        </Card>
      </div>

      <Card className="mt-4 p-5">
        <h3 className="mb-4 font-heading text-base font-bold text-ink">Sức khỏe &amp; dị ứng</h3>
        {pet.healthIssues.length === 0 && pet.allergies.length === 0 ? (
          <p className="text-sm text-ink-secondary">Chưa ghi nhận vấn đề sức khỏe hay dị ứng nào.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pet.healthIssues.map((issue) => (
              <span key={issue} className="rounded-full bg-cream-dark px-3 py-1.5 text-xs font-semibold text-ink-secondary">
                {issue}
              </span>
            ))}
            {pet.allergies.map((allergy) => (
              <span key={allergy} className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                Dị ứng: {allergy}
              </span>
            ))}
          </div>
        )}
      </Card>

      <Card className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-ink">Lịch sử kiểm tra gần đây</h3>
          <Link to="/history" className="text-xs font-bold text-brand-dark hover:text-brand">
            Xem tất cả →
          </Link>
        </div>

        {petHistory.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
              <HistoryIcon className="size-5" />
            </span>
            <p className="text-sm font-semibold text-ink">Chưa có lượt kiểm tra nào cho {pet.name}</p>
            <Button size="sm" className="mt-1" onClick={() => navigate(`/check/${pet.id}`)}>
              Kiểm tra ngay
            </Button>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border-light">
            {petHistory.map((entry) => {
              const title = entry.items.length === 1 ? entry.items[0].label : `Bữa ăn ${entry.items.length} món`
              const style = STATUS_STYLES[entry.status] ?? STATUS_STYLES.good
              const EntryIcon = foodCategory(entry.items[0]?.categoryId)?.icon ?? UtensilsIcon

              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setActiveEntry(entry)}
                  className="flex items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
                >
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${style}`}>
                    <EntryIcon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{title}</p>
                    <p className="text-xs text-ink-label">{formatRelativeTime(entry.createdAt)}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`}>
                    {entry.statusLabel}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </Card>

      <EditPetModal
        key={editing ? pet.id : 'closed'}
        pet={editing ? pet : null}
        onClose={() => setEditing(false)}
        onSave={(id, updates) => updatePet(id, updates)}
      />
      <DeletePetModal pet={deleting ? pet : null} onClose={() => setDeleting(false)} onConfirm={handleDeleteConfirm} />
      <HistoryDetailModal entry={activeEntry} onClose={() => setActiveEntry(null)} />
    </AppLayout>
  )
}
