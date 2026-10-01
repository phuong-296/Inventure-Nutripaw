import Modal from './Modal.jsx'
import Button from './Button.jsx'
import { TrashIcon } from './icons.jsx'

/**
 * Hộp thoại xác nhận "Xóa hồ sơ?", theo đúng nội dung khung "Xóa" trong Figma.
 */
export default function DeletePetModal({ pet, onClose, onConfirm }) {
  if (!pet) return null

  return (
    <Modal open={Boolean(pet)} onClose={onClose} title="Xóa hồ sơ?" className="max-w-sm text-center">
      <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-red-50 text-red-500">
        <TrashIcon className="size-5" />
      </span>
      <h2 className="font-heading text-lg font-bold text-ink">Xóa hồ sơ?</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
        Hồ sơ của <span className="font-semibold text-ink">{pet.name}</span> sẽ bị xóa vĩnh viễn. Hành
        động này không thể hoàn tác.
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button
          onClick={() => {
            onConfirm(pet.id)
            onClose()
          }}
          className="!bg-red-500 hover:!bg-red-600"
        >
          Xóa
        </Button>
      </div>
    </Modal>
  )
}
