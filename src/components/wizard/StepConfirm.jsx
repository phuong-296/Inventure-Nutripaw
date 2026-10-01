import { speciesIcon, speciesLabel, ageGroupLabel, weightGoalLabel } from '../../data/petOptions.js'

// Ảnh chó/mèo mặc định, tự host tại public/brand/ - chỉ hiện khi người
// dùng CHƯA upload ảnh thật của bé (xem PetAvatarUpload.jsx)
const SPECIES_PHOTO = {
  dog: '/brand/species-dog.jpg',
  cat: '/brand/species-cat.jpg',
}

// 1 dòng thông tin dạng "nhãn: giá trị" trong bảng tóm tắt bên dưới
function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-cream-dark py-2 last:border-0">
      <span className="text-sm text-ink-secondary">{label}</span>
      <span className="text-sm font-bold text-ink-input">{value}</span>
    </div>
  )
}

/**
 * Bảng xem lại toàn bộ thông tin - bước 4 của wizard ("Xác nhận hồ sơ"),
 * hiện ngay trước khi lưu hồ sơ thật.
 */
export default function StepConfirm({ draft }) {
  const isNeutered = draft.healthIssues.includes('Đã triệt sản')
  // Tách riêng "Đã triệt sản" ra khỏi danh sách vấn đề sức khỏe vì nó được
  // hiện thành 1 dòng riêng (Row "Triệt sản") bên dưới
  const otherHealthIssues = draft.healthIssues.filter((i) => i !== 'Đã triệt sản')

  // Ưu tiên ảnh thật đã upload, chưa có thì dùng ảnh mặc định theo loài
  const photo = draft.photoUrl || SPECIES_PHOTO[draft.species]
  const SpeciesIcon = speciesIcon(draft.species)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="flex size-16 shrink-0 overflow-hidden rounded-2xl border border-brand-light/40">
          {photo ? (
            <img src={photo} alt="" className="size-full object-cover" />
          ) : (
            <span
              className="flex size-full items-center justify-center text-3xl"
              style={{ backgroundImage: 'linear-gradient(135deg, rgb(183,238,196) 0%, rgb(255,235,223) 100%)' }}
            >
              <SpeciesIcon className="size-8 text-ink" />
            </span>
          )}
        </span>
        <div>
          <p className="font-heading text-lg font-bold text-ink">{draft.name || 'Chưa đặt tên'}</p>
          <p className="text-xs text-ink-label">{draft.breed || 'Chưa chọn giống'}</p>
        </div>
      </div>

      <div>
        <Row
          label="Loài"
          value={
            <span className="inline-flex items-center gap-1.5">
              <SpeciesIcon className="size-4" />
              {speciesLabel(draft.species)}
            </span>
          }
        />
        <Row label="Giống" value={draft.breed || '-'} />
        <Row label="Độ tuổi" value={ageGroupLabel(draft.ageGroup)} />
        <Row label="Cân nặng" value={`${draft.weight} kg`} />
        <Row label="Mục tiêu" value={weightGoalLabel(draft.weightGoal)} />
        <Row label="Triệt sản" value={isNeutered ? 'Đã triệt sản' : 'Chưa triệt sản'} />
        <Row label="Vấn đề sức khỏe" value={otherHealthIssues.length ? otherHealthIssues.join(', ') : 'Không có'} />
        <Row label="Dị ứng" value={draft.allergies.length ? draft.allergies.join(', ') : 'Không có'} />
      </div>
    </div>
  )
}
