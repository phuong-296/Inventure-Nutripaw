import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { ArrowLeftIcon } from './icons.jsx'

// Ảnh chó + mèo trang trí cho panel bên của màn auth, tự host tại public/brand/
const AUTH_ILLUSTRATION_URL = '/brand/anh-cho-meo-13.jpg'

const DEFAULT_TAGLINE =
  'Dinh dưỡng thông minh cho thú cưng - kiểm tra bữa ăn trong 10 giây, phù hợp riêng cho từng bé.'

/**
 * Khung 2 cột dùng chung cho các màn auth: panel minh họa trang trí ở màn
 * hình lớn (ẩn trên mobile theo đúng thiết kế Figma) và cột nội dung căn
 * giữa kèm nút "quay lại". `tagline`, `backTo` và `backLabel` cho phép từng
 * màn khớp đúng khung Figma riêng - màn Quên mật khẩu/Kiểm tra email dùng
 * tagline khác và trỏ nút "quay lại" về Đăng nhập thay vì trang chủ.
 */
export default function AuthLayout({ children, tagline = DEFAULT_TAGLINE, backTo = '/', backLabel = 'Trang chủ' }) {
  return (
    <div className="relative flex min-h-screen w-full bg-cream">
      {/* Panel trang trí - chỉ hiện trên desktop/tablet */}
      <div className="relative hidden w-2/5 shrink-0 overflow-hidden lg:flex">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(119deg, rgba(183,238,196,0.3) 0%, rgba(255,235,223,0.2) 50%, rgb(246,241,231) 100%)',
          }}
        />
        <div className="absolute -top-20 right-10 size-80 rounded-full bg-brand-light/40 blur-3xl" />
        <div className="absolute bottom-24 -left-16 size-72 rounded-full bg-accent-orange/25 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 size-96 rounded-full bg-brand-light/20 blur-3xl" />

        <div className="relative flex w-full flex-col items-center justify-center px-8 py-16">
          <div className="relative aspect-[3/2] w-full max-w-[480px] overflow-hidden rounded-xl3 border border-brand-light/40 shadow-sm">
            <img
              src={AUTH_ILLUSTRATION_URL}
              alt="Chó con và mèo con nằm cạnh nhau giữa hoa lá"
              className="absolute inset-0 size-full object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{
                backgroundImage:
                  'linear-gradient(to top, rgba(223,250,229,0.9) 0%, rgba(223,250,229,0.3) 50%, rgba(223,250,229,0) 100%)',
              }}
            />
          </div>

          <div className="mt-9 flex max-w-[340px] flex-col items-center gap-3 text-center">
            <Logo size="md" />
            <p className="text-sm leading-relaxed text-ink-secondary">{tagline}</p>
          </div>
        </div>
      </div>

      {/* Panel nội dung chính (form) */}
      <div className="relative flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <Button
          to={backTo}
          variant="ghost"
          size="sm"
          icon={<ArrowLeftIcon className="size-4" />}
          className="absolute left-4 top-6 !h-8 !px-3 sm:left-8 sm:top-7"
        >
          {backLabel}
        </Button>

        <div className="flex w-full max-w-[400px] flex-col items-center">{children}</div>
      </div>
    </div>
  )
}
