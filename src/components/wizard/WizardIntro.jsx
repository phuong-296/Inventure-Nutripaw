import Button from '../Button.jsx'
import { PawIcon, ArrowRightIcon } from '../icons.jsx'

/**
 * Màn chào trước khi vào form 4 bước (khung "Tạo hồ sơ"): lời chào, giới
 * thiệu ngắn và 1 nút CTA duy nhất để bắt đầu wizard.
 */
export default function WizardIntro({ onStart }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
      <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent-orange/20 bg-accent-orange/10 px-4 py-1.5 text-xs font-bold text-accent-orange">
        Bắt đầu nào
      </span>
      <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Chào bạn!</h1>
      <p className="mt-1.5 text-sm text-ink-secondary">Tạo hồ sơ cho bé để bắt đầu sử dụng NutriPaw.</p>

      <div className="mt-10 flex w-full flex-col items-center rounded-3xl border-2 border-dashed border-border bg-white px-8 py-12">
        <span className="mb-5 flex size-24 items-center justify-center rounded-full border-2 border-brand-light/40 bg-gradient-to-br from-brand-light to-white">
          <PawIcon className="size-10 text-brand-dark" />
        </span>
        <h3 className="font-heading text-2xl font-bold text-ink">Tạo hồ sơ cho bé</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-secondary">
          Cho NutriPaw biết về bé để nhận đánh giá chính xác nhất, phù hợp riêng cho từng bé.
        </p>
        <Button
          className="mt-6"
          onClick={onStart}
          icon={<ArrowRightIcon className="size-4" />}
          iconPosition="right"
        >
          Tạo hồ sơ ngay
        </Button>
      </div>
    </div>
  )
}
