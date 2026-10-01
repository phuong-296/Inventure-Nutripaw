import { useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../context/AuthContext.jsx'
import { CameraIcon } from './icons.jsx'

const MAX_SIZE_MB = 5

/**
 * Ô chọn ảnh thú cưng hình tròn, dùng ở wizard tạo hồ sơ (StepName) và form
 * sửa hồ sơ. Upload thẳng lên bucket Storage `pet-photos` của Supabase (đọc
 * công khai, ghi giới hạn trong thư mục `${user.id}/` của chính người dùng -
 * xem supabase/schema.sql) rồi trả URL công khai qua `onChange`, nên hàng
 * `pets` chỉ cần lưu 1 URL như mọi trường khác.
 */
export default function PetAvatarUpload({ photoUrl, onChange }) {
  const { user } = useAuth()
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(photoUrl || '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Ảnh tối đa ${MAX_SIZE_MB}MB.`)
      return
    }

    setError('')
    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)
    setUploading(true)

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('pet-photos').upload(path, file, {
        cacheControl: '3600',
        contentType: file.type,
      })
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('pet-photos').getPublicUrl(path)
      onChange(data.publicUrl)
    } catch {
      setError('Không tải được ảnh lên, vui lòng thử lại.')
      setPreview(photoUrl || '')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="group relative flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-cream-dark/60 transition-colors hover:border-brand/50"
      >
        {preview ? (
          <img src={preview} alt="Ảnh thú cưng" className="size-full object-cover" />
        ) : (
          <CameraIcon className="size-7 text-ink-label" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <CameraIcon className="size-6 text-white" />
        </span>
        {uploading && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-[11px] font-semibold text-white">
            Đang tải...
          </span>
        )}
      </button>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-xs font-semibold text-brand-dark hover:text-brand"
      >
        {preview ? 'Đổi ảnh' : 'Thêm ảnh thú cưng'}
      </button>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
