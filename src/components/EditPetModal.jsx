import { useState } from 'react'
import Modal from './Modal.jsx'
import Button from './Button.jsx'
import StepName from './wizard/StepName.jsx'
import StepBasicInfo from './wizard/StepBasicInfo.jsx'
import StepHealth from './wizard/StepHealth.jsx'

/**
 * "Sửa hồ sơ" - dùng lại các bước của wizard tạo hồ sơ (tên / thông tin cơ
 * bản / sức khỏe) gộp vào 1 form cuộn được, vì thú cưng đã tồn tại sẵn.
 *
 * Nơi gọi component này phải remount lại mỗi lần mở (vd `key={pet?.id ?? 'closed'}`)
 * thay vì dựa vào effect để đồng bộ `draft` khi `pet` đổi - effect sẽ chạy
 * sau lần render đầu tiên, khiến `draft.name` bên dưới bị đọc lúc còn null/cũ.
 */
export default function EditPetModal({ pet, onClose, onSave }) {
  const [draft, setDraft] = useState(pet)

  if (!pet) return null

  function handleSave(event) {
    event.preventDefault()
    onSave(pet.id, draft)
    onClose()
  }

  return (
    <Modal open={Boolean(pet)} onClose={onClose} title={`Sửa hồ sơ ${pet.name}`} className="max-w-lg">
      <form onSubmit={handleSave} className="flex max-h-[80vh] flex-col gap-5 overflow-y-auto pr-1">
        <h2 className="font-heading text-lg font-bold text-ink">Sửa hồ sơ {pet.name}</h2>

        <StepName draft={draft} setDraft={setDraft} />
        <StepBasicInfo draft={draft} setDraft={setDraft} />
        <StepHealth draft={draft} setDraft={setDraft} />

        <div className="mt-2 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit" disabled={!draft.name.trim() || !draft.breed}>
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </Modal>
  )
}
