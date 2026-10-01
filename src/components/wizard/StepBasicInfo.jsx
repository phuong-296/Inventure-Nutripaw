import ChoiceCard from '../ChoiceCard.jsx'
import ChoiceTag from '../ChoiceTag.jsx'
import { SPECIES, BREEDS_BY_SPECIES, AGE_GROUPS } from '../../data/petOptions.js'

/**
 * Loài + giống + độ tuổi - bước 2 của wizard, cũng được dùng lại trong form
 * sửa hồ sơ.
 */
export default function StepBasicInfo({ draft, setDraft }) {
  const breeds = BREEDS_BY_SPECIES[draft.species] ?? []
  const breedLabel = draft.species === 'cat' ? 'Giống mèo' : 'Giống chó'
  // true khi giống hiện tại không nằm trong danh sách có sẵn -> đang ở chế
  // độ nhập tay (đã bấm "Khác" hoặc gõ giống riêng)
  const isCustomBreed = Boolean(draft.breed) && !breeds.includes(draft.breed)

  // Đổi loài (chó/mèo) thì phải xóa giống đã chọn, vì danh sách giống của
  // 2 loài khác nhau hoàn toàn
  function setSpecies(species) {
    setDraft((d) => ({ ...d, species, breed: '' }))
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wide text-ink-label">Bé là chó hay mèo?</span>
        <div className="flex gap-3">
          {SPECIES.map((s) => (
            <ChoiceCard
              key={s.value}
              icon={s.icon}
              title={s.label}
              selected={draft.species === s.value}
              onClick={() => setSpecies(s.value)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wide text-ink-label">{breedLabel}</span>
        <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1">
          {breeds.map((breed) => (
            <ChoiceTag
              key={breed}
              selected={draft.breed === breed}
              onClick={() => setDraft((d) => ({ ...d, breed }))}
            >
              {breed}
            </ChoiceTag>
          ))}
          {/* Tag "Khác" bật chế độ nhập tự do - chỉ xóa breed để hiện ô nhập
              khi CHƯA ở chế độ tự do, tránh xóa mất chữ người dùng đang gõ */}
          <ChoiceTag
            selected={isCustomBreed}
            onClick={() => !isCustomBreed && setDraft((d) => ({ ...d, breed: '' }))}
          >
            Khác
          </ChoiceTag>
        </div>
        {/* Hiện ô nhập tự do khi đang ở chế độ "Khác", hoặc khi chưa chọn
            giống nào cả (breed rỗng) */}
        {(isCustomBreed || draft.breed === '') && (
          <input
            type="text"
            value={isCustomBreed ? draft.breed : ''}
            onChange={(e) => setDraft((d) => ({ ...d, breed: e.target.value }))}
            placeholder="Nhập giống của bé..."
            className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink-input placeholder:text-ink-label focus:border-brand focus:outline-none"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wide text-ink-label">Độ tuổi</span>
        <div className="flex gap-2">
          {AGE_GROUPS.map((age) => (
            <ChoiceCard
              key={age.value}
              title={age.label}
              hint={age.hint}
              selected={draft.ageGroup === age.value}
              onClick={() => setDraft((d) => ({ ...d, ageGroup: age.value }))}
            />
          ))}
        </div>
      </div>
    </>
  )
}
