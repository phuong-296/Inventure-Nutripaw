import { useNavigate } from 'react-router-dom'
import Card from './Card.jsx'
import { speciesIcon, ageGroupLabel, SPECIES_GRADIENT } from '../data/petOptions.js'
import { EditIcon, TrashIcon, CheckMealIcon, ArrowRightIcon } from './icons.jsx'

/**
 * Thẻ tóm tắt 1 thú cưng trên trang chủ, kèm nút sửa/xóa. Bấm vào
 * avatar/tên sẽ mở trang hồ sơ đầy đủ (PetProfile.jsx).
 */
export default function PetCard({ pet, onEdit, onDelete }) {
  // Nền gradient theo loài (chó/mèo) cho khung avatar, mặc định về "chó"
  // nếu species lạ/chưa set
  const gradient = SPECIES_GRADIENT[pet.species] ?? SPECIES_GRADIENT.dog
  // Icon loài (DogIcon/CatIcon) dùng làm avatar khi chưa có ảnh thật
  const SpeciesIcon = speciesIcon(pet.species)
  const navigate = useNavigate()

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        {/* Bấm vào avatar/tên -> sang trang hồ sơ chi tiết của bé */}
        <button
          type="button"
          onClick={() => navigate(`/pets/${pet.id}`)}
          className="flex min-w-0 items-center gap-3 text-left"
        >
          <span
            className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-light/40 text-3xl"
            style={{ backgroundImage: gradient }}
          >
            {/* Ưu tiên ảnh thú cưng thật đã upload, chưa có thì dùng icon loài */}
            {pet.photoUrl ? (
              <img src={pet.photoUrl} alt={pet.name} className="size-full object-cover" />
            ) : (
              <SpeciesIcon className="size-6 text-ink" />
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate font-heading text-base font-bold text-ink hover:text-brand-dark">{pet.name}</p>
            <p className="truncate text-xs text-ink-label">
              {pet.breed} · {ageGroupLabel(pet.ageGroup)}
            </p>
          </div>
        </button>

        {/* Nút sửa/xóa - tách riêng khỏi nút điều hướng ở trên để bấm không
            bị nhầm sang trang hồ sơ */}
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(pet)}
            aria-label={`Sửa hồ sơ ${pet.name}`}
            className="flex size-8 items-center justify-center rounded-lg text-ink-secondary hover:bg-cream-dark"
          >
            <EditIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(pet)}
            aria-label={`Xóa hồ sơ ${pet.name}`}
            className="flex size-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Các tag thông tin nhanh: cân nặng luôn hiện, "Đã triệt sản" và
          dị ứng chỉ hiện khi có dữ liệu tương ứng */}
      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className="rounded-full bg-cream-dark px-2.5 py-1 font-semibold text-ink-secondary">
          {pet.weight} kg
        </span>
        {pet.healthIssues.includes('Đã triệt sản') && (
          <span className="rounded-full bg-cream-dark px-2.5 py-1 font-semibold text-ink-secondary">
            Đã triệt sản
          </span>
        )}
        {pet.allergies.length > 0 && (
          <span className="rounded-full bg-red-50 px-2.5 py-1 font-semibold text-red-500">
            Dị ứng: {pet.allergies.join(', ')}
          </span>
        )}
      </div>

      {/* Lối tắt vào luôn luồng "Kiểm tra bữa ăn" cho đúng bé này */}
      <button
        type="button"
        onClick={() => navigate(`/check/${pet.id}`)}
        className="flex items-center justify-center gap-2 rounded-xl bg-brand-soft px-4 py-2.5 text-sm font-bold text-brand-dark hover:bg-brand-light"
      >
        <CheckMealIcon className="size-4" />
        Kiểm tra bữa ăn
        <ArrowRightIcon className="size-3.5" />
      </button>
    </Card>
  )
}
