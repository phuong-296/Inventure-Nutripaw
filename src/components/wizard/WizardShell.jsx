import Button from '../Button.jsx'
import Card from '../Card.jsx'
import { ArrowLeftIcon, ArrowRightIcon, CheckMealIcon } from '../icons.jsx'

const TOTAL_STEPS = 4

/**
 * Khung giao diện dùng chung cho 4 bước của wizard: link "Quay lại", thanh
 * tiến trình 4 đoạn, thẻ chứa nội dung từng bước, và phần chân trang gồm
 * nút Trước/Tiếp tục. Lặp lại đúng cấu trúc đầu/chân trang giống nhau ở cả
 * 4 khung Figma "Tạo tên", "Thông tin cơ bản", "Thông tin sk" và "Xác nhận
 * hồ sơ".
 */
export default function WizardShell({
  step,
  title,
  subtitle,
  centerTitle = false,
  onQuit,
  onBack,
  onNext,
  nextLabel = 'Tiếp tục',
  nextDisabled = false,
  finalStep = false,
  children,
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      <button
        type="button"
        onClick={onQuit}
        className="mb-4 flex items-center gap-1.5 self-start text-sm font-semibold text-ink-secondary hover:text-ink"
      >
        <ArrowLeftIcon className="size-4" />
        Quay lại
      </button>

      <div className="mb-8 flex gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-brand' : 'bg-border'}`}
          />
        ))}
      </div>

      <div className={`mb-6 flex flex-col gap-1 ${centerTitle ? 'items-center text-center' : ''}`}>
        <h2 className="font-heading text-xl font-bold text-ink sm:text-2xl">{title}</h2>
        {subtitle && <p className="text-sm text-ink-secondary">{subtitle}</p>}
      </div>

      <Card className="flex flex-col gap-5 p-5 sm:p-6">{children}</Card>

      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-semibold text-ink-secondary hover:text-ink"
          >
            <ArrowLeftIcon className="size-4" />
            Trước
          </button>
        ) : (
          <span />
        )}

        <Button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          icon={finalStep ? <CheckMealIcon className="size-4" /> : <ArrowRightIcon className="size-4" />}
          iconPosition="right"
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}
