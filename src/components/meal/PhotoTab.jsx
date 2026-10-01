import { useEffect, useRef, useState } from 'react'
import { FOOD_CATEGORIES, DEFAULT_PORTION } from '../../data/mealOptions.js'
import { CameraIcon, ImageIcon, ArrowRightIcon } from '../icons.jsx'
import PortionSlider from './PortionSlider.jsx'

/**
 * Tab "Chụp ảnh" - không có backend nhận diện ảnh thật, nên khi chụp/chọn
 * xong sẽ "nhận diện" 1 phân loại theo cách giả lập (băm tên file thành số,
 * lấy dư chia lấy phân loại tương ứng) - đủ để luồng demo cảm giác phản hồi
 * hợp lý mà không giả vờ có AI thật.
 *
 * Dùng camera thật qua getUserMedia thay vì phó mặc cho `<input type="file"
 * capture>` - vì thuộc tính đó chỉ là gợi ý, nhiều trình duyệt bỏ qua và mở
 * thẳng thư viện ảnh thay vì camera. Nút "Chọn ảnh từ thư viện" vẫn giữ lại
 * làm phương án dự phòng khi quyền camera bị từ chối hoặc không hỗ trợ.
 */
export default function PhotoTab({ onAdd }) {
  const inputRef = useRef(null) // input file ẩn, dùng cho "chọn từ thư viện"
  const videoRef = useRef(null) // thẻ <video> hiển thị luồng camera trực tiếp
  const streamRef = useRef(null) // MediaStream đang mở, để dừng lại khi xong

  const [mode, setMode] = useState('idle') // idle | camera | preview
  const [cameraError, setCameraError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('') // ảnh đã chụp/chọn, dạng URL để hiển thị
  const [fileName, setFileName] = useState('') // tên file giả lập, dùng để "nhận diện" phân loại
  const [categoryId, setCategoryId] = useState(null)
  const [grams, setGrams] = useState(DEFAULT_PORTION)

  // Tắt hẳn camera: dừng mọi track của stream đang mở
  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  // Đảm bảo camera luôn được tắt khi rời khỏi component (vd chuyển tab)
  useEffect(() => stopCamera, [])

  // Gắn luồng camera vào thẻ <video> ngay khi chuyển sang mode "camera"
  useEffect(() => {
    if (mode === 'camera' && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [mode])

  // "Nhận diện" phân loại món ăn từ tên file - chỉ là demo, băm tên file
  // thành 1 số rồi lấy dư chia cho số lượng phân loại để luôn ra cùng 1 kết
  // quả với cùng 1 tên file (không random mỗi lần)
  function detectFromName(name) {
    const hash = Array.from(name).reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
    setCategoryId(FOOD_CATEGORIES[hash % FOOD_CATEGORIES.length].id)
  }

  // Xin quyền camera và bắt đầu phát luồng trực tiếp
  async function startCamera() {
    setCameraError('')
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Trình duyệt này không hỗ trợ camera. Hãy chọn ảnh từ thư viện.')
      return
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      setMode('camera')
    } catch {
      setCameraError('Không mở được camera (có thể do quyền truy cập bị từ chối). Hãy chọn ảnh từ thư viện.')
    }
  }

  // Hủy xem camera, quay về màn hình ban đầu
  function cancelCamera() {
    stopCamera()
    setMode('idle')
  }

  // Chụp khung hình hiện tại của video vào canvas rồi chuyển thành ảnh JPEG
  function capturePhoto() {
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    stopCamera()

    const name = `chup-anh-${Date.now()}.jpg`
    setFileName(name)
    detectFromName(name)
    setPreviewUrl(canvas.toDataURL('image/jpeg', 0.85))
    setMode('preview')
  }

  // Người dùng chọn ảnh có sẵn từ thư viện thay vì chụp mới
  function handleLibraryFile(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    detectFromName(file.name)
    setPreviewUrl(URL.createObjectURL(file))
    setMode('preview')
  }

  // Bỏ ảnh vừa chụp/chọn, quay lại màn hình ban đầu để chụp lại
  function retake() {
    setPreviewUrl('')
    setFileName('')
    setCategoryId(null)
    setMode('idle')
  }

  // Sau khi thêm món vào bữa ăn thành công, dọn sạch toàn bộ state của tab này
  function reset() {
    retake()
    setGrams(DEFAULT_PORTION)
  }

  const detected = FOOD_CATEGORIES.find((c) => c.id === categoryId)

  return (
    <div className="max-w-2xl">
      <h3 className="mb-4 font-heading text-base font-bold text-ink">Chụp ảnh bữa ăn</h3>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleLibraryFile}
        className="hidden"
      />

      {mode === 'idle' && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-cream-dark/40 px-6 py-12 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
            <CameraIcon className="size-5" />
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={startCamera}
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-brand to-brand-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all duration-200 hover:scale-[1.04] hover:shadow-xl hover:shadow-brand/30 active:scale-[0.97]"
            >
              <CameraIcon className="size-4 transition-transform duration-200 group-hover:-rotate-6" />
              Mở camera
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/50 px-5 py-2.5 text-sm font-bold text-ink-secondary shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-[1.04] hover:border-brand/30 hover:bg-white/80 hover:text-ink active:scale-[0.97]"
            >
              <ImageIcon className="size-4 transition-transform duration-200 group-hover:scale-110" />
              Chọn ảnh từ thư viện
            </button>
          </div>
          {cameraError && <p className="max-w-xs text-xs text-red-500">{cameraError}</p>}
        </div>
      )}

      {mode === 'camera' && (
        <div className="flex flex-col items-center gap-3">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="aspect-video w-full rounded-2xl bg-black object-cover"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={cancelCamera}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-bold text-ink-secondary hover:bg-cream-dark"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={capturePhoto}
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
            >
              Chụp ảnh
            </button>
          </div>
        </div>
      )}

      {mode === 'preview' && (
        <div className="flex flex-col items-center gap-3">
          <img src={previewUrl} alt="Ảnh vừa chụp" className="aspect-video w-full rounded-2xl object-cover" />
          <button type="button" onClick={retake} className="text-xs font-semibold text-ink-secondary underline hover:text-ink">
            Chụp lại
          </button>
        </div>
      )}

      {fileName && detected && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-secondary">
          Nhận diện: <detected.icon className="size-4" />
          <span className="font-semibold text-ink">{detected.label}</span>
        </p>
      )}

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1">
          <PortionSlider value={grams} onChange={setGrams} />
        </div>
        <button
          type="button"
          disabled={!detected}
          onClick={() => {
            onAdd(detected, grams)
            reset()
          }}
          className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand px-6 text-sm font-bold text-white shadow-btn hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Thêm vào bữa ăn
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
