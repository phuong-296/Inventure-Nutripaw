import Logo from '../Logo.jsx'
import { QuestionIcon } from '../icons.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-border-light bg-white pb-8 pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-[10px] font-medium text-ink-label">© {new Date().getFullYear()}</span>
          </div>
          <nav className="flex items-center gap-6 text-[11px] font-medium text-ink-label">
            <a href="#" className="hover:text-ink">
              Điều khoản
            </a>
            <a href="#" className="hover:text-ink">
              Chính sách
            </a>
            <a href="#" className="hover:text-ink">
              Liên hệ
            </a>
          </nav>
        </div>

        <div className="mt-5 flex items-start justify-center gap-2 text-center">
          <QuestionIcon className="mt-0.5 size-3.5 shrink-0 text-ink-label" />
          <p className="max-w-md text-[10px] leading-relaxed text-ink-label">
            NutriPaw không thay thế khám thú y. Kết quả chỉ mang tính tham khảo dựa trên dữ liệu dinh dưỡng. Nếu bé
            có triệu chứng bất thường, hãy đưa bé đi khám ngay.
          </p>
        </div>
      </div>
    </footer>
  )
}
