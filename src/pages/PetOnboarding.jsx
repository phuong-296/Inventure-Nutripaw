import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import WizardShell from '../components/wizard/WizardShell.jsx'
import WizardIntro from '../components/wizard/WizardIntro.jsx'
import StepName from '../components/wizard/StepName.jsx'
import StepBasicInfo from '../components/wizard/StepBasicInfo.jsx'
import StepHealth from '../components/wizard/StepHealth.jsx'
import StepConfirm from '../components/wizard/StepConfirm.jsx'
import { usePets } from '../context/PetsContext.jsx'
import { EMPTY_PET_DRAFT, MAX_PETS } from '../data/petOptions.js'

const STEP_META = {
  1: { title: 'Tạo hồ sơ cho bé', subtitle: 'Hãy cho NutriPaw biết về bé để nhận đánh giá dinh dưỡng phù hợp riêng.' },
  2: { title: 'Thông tin cơ bản' },
  3: { title: 'Cân nặng & sức khỏe' },
  4: { title: 'Xác nhận hồ sơ', center: true },
}

export default function PetOnboarding() {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState(EMPTY_PET_DRAFT)
  const { pets, addPet, isFull } = usePets()
  const navigate = useNavigate()

  function handleNext() {
    if (step === 4) {
      addPet(draft)
      navigate('/dashboard')
      return
    }
    setStep((s) => s + 1)
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1))
  }

  const nextDisabled =
    (step === 1 && !draft.name.trim()) || (step === 2 && !draft.breed)

  if (isFull && pets.length >= MAX_PETS) {
    return (
      <AppLayout>
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
          <h2 className="font-heading text-xl font-bold text-ink">Đã đạt giới hạn hồ sơ</h2>
          <p className="text-sm text-ink-secondary">
            Tối đa {MAX_PETS} hồ sơ thú cưng. Hãy xóa một hồ sơ hiện có trước khi thêm hồ sơ mới.
          </p>
        </div>
      </AppLayout>
    )
  }

  if (step === 0) {
    return (
      <AppLayout>
        <WizardIntro onStart={() => setStep(1)} />
      </AppLayout>
    )
  }

  const meta = STEP_META[step]

  return (
    <AppLayout>
      <WizardShell
        step={step}
        title={meta.title}
        subtitle={meta.subtitle}
        centerTitle={meta.center}
        onQuit={() => navigate('/dashboard')}
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={nextDisabled}
        nextLabel={step === 4 ? 'Hoàn thành' : 'Tiếp tục'}
        finalStep={step === 4}
      >
        {step === 1 && <StepName draft={draft} setDraft={setDraft} />}
        {step === 2 && <StepBasicInfo draft={draft} setDraft={setDraft} />}
        {step === 3 && <StepHealth draft={draft} setDraft={setDraft} />}
        {step === 4 && <StepConfirm draft={draft} />}
      </WizardShell>
    </AppLayout>
  )
}
