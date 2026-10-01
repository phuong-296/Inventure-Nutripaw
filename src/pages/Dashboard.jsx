import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Modal from '../components/Modal.jsx'
import PetCard from '../components/PetCard.jsx'
import EditPetModal from '../components/EditPetModal.jsx'
import DeletePetModal from '../components/DeletePetModal.jsx'
import { usePets } from '../context/PetsContext.jsx'
import { MAX_PETS } from '../data/petOptions.js'
import { PawIcon, PlusIcon } from '../components/icons.jsx'

export default function Dashboard() {
  const { pets, isFull, updatePet, removePet } = usePets()
  const [editingPet, setEditingPet] = useState(null)
  const [deletingPet, setDeletingPet] = useState(null)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const navigate = useNavigate()

  function handleAddClick() {
    if (isFull) {
      setShowLimitModal(true)
      return
    }
    navigate('/pets/new')
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-ink">Chào bạn!</h1>
        <p className="mt-1 text-sm text-ink-secondary">Cùng kiểm tra bữa ăn hôm nay cho các bé nhé.</p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-ink">Hồ sơ của bạn</h2>
        <Button size="sm" onClick={handleAddClick} icon={<PlusIcon className="size-4" />} iconPosition="left">
          Thêm thú cưng
        </Button>
      </div>

      {pets.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 border-dashed p-12 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
            <PawIcon className="size-7" />
          </span>
          <p className="font-heading text-lg font-bold text-ink">Bạn chưa có thú cưng nào</p>
          <p className="max-w-xs text-sm text-ink-secondary">
            Tạo hồ sơ đầu tiên để NutriPaw bắt đầu kiểm tra bữa ăn cho bé.
          </p>
          <Button className="mt-2" onClick={handleAddClick}>
            Tạo hồ sơ ngay
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onEdit={setEditingPet} onDelete={setDeletingPet} />
          ))}
        </div>
      )}

      <EditPetModal
        key={editingPet?.id ?? 'closed'}
        pet={editingPet}
        onClose={() => setEditingPet(null)}
        onSave={(id, updates) => updatePet(id, updates)}
      />

      <DeletePetModal
        pet={deletingPet}
        onClose={() => setDeletingPet(null)}
        onConfirm={(id) => removePet(id)}
      />

      <Modal open={showLimitModal} onClose={() => setShowLimitModal(false)} title="Đã đạt giới hạn hồ sơ" className="max-w-sm text-center">
        <h2 className="font-heading text-lg font-bold text-ink">Tối đa {MAX_PETS} hồ sơ thú cưng</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
          Bạn đã tạo đủ {MAX_PETS} hồ sơ. Hãy xóa một hồ sơ hiện có nếu muốn thêm bé mới.
        </p>
        <Button className="mt-6" onClick={() => setShowLimitModal(false)}>
          Đã hiểu
        </Button>
      </Modal>
    </AppLayout>
  )
}
