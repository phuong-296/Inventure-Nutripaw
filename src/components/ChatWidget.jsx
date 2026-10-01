import { useEffect, useRef, useState } from 'react'
import { usePets } from '../context/PetsContext.jsx'
import { useHistory } from '../context/HistoryContext.jsx'
import { dailyKcalNeed, DAILY_CHECK_LIMIT } from '../data/mealOptions.js'
import { LOGO_MARK_URL } from './Logo.jsx'
import { SendIcon, XIcon, SparkleIcon, FireIcon, AlertIcon, RepeatIcon, PawIcon } from './icons.jsx'

const SUGGESTIONS = [
  { icon: FireIcon, text: 'Bé cần bao nhiêu calo mỗi ngày?' },
  { icon: AlertIcon, text: 'Sao phải kiểm tra dị ứng?' },
  { icon: RepeatIcon, text: 'Mỗi ngày kiểm tra được mấy lần?' },
  { icon: PawIcon, text: 'Làm sao thêm thú cưng mới?' },
]


/**
 * Bộ trả lời "AI" dựa trên quy tắc - không có backend LLM thật cho bản demo
 * này, cùng tinh thần với evaluateMeal/generateAiRecipe: so khớp từ khóa
 * trên vài câu hỏi thường gặp, cá nhân hóa bằng dữ liệu thú cưng/lịch sử
 * hiện có. Nếu không khớp câu nào thì trả lời chung chung thân thiện.
 */
function getAiReply(message, { pets, remaining }) {
  const text = message.toLowerCase()
  const pet = pets[0]

  if (/(chào|hi|hello|xin chào)/.test(text)) {
    return pet
      ? `Chào bạn! Mình là trợ lý NutriPaw, sẵn sàng hỗ trợ chăm sóc dinh dưỡng cho ${pet.name} 🐾`
      : 'Chào bạn! Mình là trợ lý NutriPaw. Bạn có thể hỏi mình về dinh dưỡng, dị ứng hay cách dùng app nhé.'
  }

  if (/(cảm ơn|thanks|thank you)/.test(text)) {
    return 'Không có gì đâu, có gì cứ hỏi mình tiếp nhé! 💚'
  }

  if (/(calo|năng lượng|bao nhiêu.*ăn|khẩu phần)/.test(text)) {
    if (pet) {
      return `Theo hồ sơ hiện tại, ${pet.name} (${pet.weight}kg) cần khoảng ${dailyKcalNeed(pet)} kcal/ngày, chia đều cho các bữa. Bạn có thể vào "Kiểm tra bữa ăn" để mình tính chi tiết cho từng bữa nhé.`
    }
    return 'Nhu cầu calo phụ thuộc vào cân nặng, độ tuổi và mức vận động của bé. Tạo hồ sơ thú cưng để mình tính chính xác giúp bạn nhé!'
  }

  if (/(dị ứng|allergen|dễ dị ứng)/.test(text)) {
    return 'Mỗi khi bạn kiểm tra bữa ăn, hệ thống tự so khớp thành phần món ăn với danh sách dị ứng trong hồ sơ của bé và cảnh báo ngay nếu trùng. Bạn nhớ cập nhật đầy đủ mục "Dị ứng" trong hồ sơ để mình theo dõi chính xác nhé.'
  }

  if (/(mấy lần|giới hạn|bao nhiêu lượt|lượt kiểm tra)/.test(text)) {
    return `Mỗi ngày bạn được ${DAILY_CHECK_LIMIT} lượt kiểm tra bữa ăn miễn phí. Hôm nay bạn còn ${remaining} lượt đó!`
  }

  if (/(thêm thú cưng|tạo hồ sơ|thêm bé)/.test(text)) {
    return 'Vào "Trang chủ" rồi bấm "Thêm thú cưng" ở góc phải - chỉ mất khoảng 2 phút để tạo hồ sơ mới cho bé.'
  }

  if (/(lịch sử|đã kiểm tra)/.test(text)) {
    return 'Bạn xem lại tất cả các lượt kiểm tra ở mục "Lịch sử" trên thanh menu bên trái nhé.'
  }

  if (/(công thức|nấu ăn|nấu)/.test(text)) {
    return 'Sau khi kiểm tra một bữa ăn, bạn sẽ thấy thẻ "Công thức AI cá nhân hóa" ở trang Kết quả - bấm vào đó để mình gợi ý một công thức nấu tại nhà phù hợp cho bé.'
  }

  return 'Mình chưa chắc hiểu ý bạn lắm - bạn thử hỏi về dinh dưỡng, dị ứng, hoặc cách dùng các tính năng của NutriPaw xem sao? 🐾'
}

export default function ChatWidget() {
  const { pets } = usePets()
  const { remaining } = useHistory()

  const [open, setOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 'greeting',
      role: 'ai',
      text: 'Chào bạn! Mình là trợ lý AI của NutriPaw. Bạn cần hỗ trợ gì về dinh dưỡng cho bé không? 🐾',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)
  const openRef = useRef(open)

  useEffect(() => {
    openRef.current = open
    if (open) setHasUnread(false)
  }, [open])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, typing, open])

  function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)

    setTimeout(
      () => {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: 'ai', text: getAiReply(trimmed, { pets, remaining }) },
        ])
        setTyping(false)
        if (!openRef.current) setHasUnread(true)
      },
      500 + Math.random() * 500,
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 lg:bottom-5 lg:right-5">
      {open && (
        <div className="flex h-[min(500px,75vh)] w-[350px] max-w-[calc(100vw-2.5rem)] origin-bottom-right animate-pop-in flex-col overflow-hidden rounded-[26px] border border-border-light bg-white shadow-[0_25px_60px_-15px_rgba(0,88,0,0.35)]">
          {/* Phần đầu */}
          <div className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-[#005c00] px-4 py-4">
            <span className="pointer-events-none absolute -right-6 -top-8 size-28 animate-blob rounded-full bg-white/10 blur-2xl" />
            <span className="pointer-events-none absolute -bottom-10 -left-6 size-24 animate-blob rounded-full bg-white/10 blur-2xl [animation-delay:3s]" />

            <div className="relative flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 p-1.5 backdrop-blur-sm">
                  <span className="absolute inset-0 animate-wobble-ring rounded-full bg-white/20" />
                  <img src={LOGO_MARK_URL} alt="" className="relative size-full rounded-full object-cover" />
                </span>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-bold text-white">
                    Trợ lý AI NutriPaw
                    <SparkleIcon className="size-3.5 text-white/90" />
                  </p>
                  <p className="flex items-center gap-1 text-[10px] text-white/75">
                    <span className="size-1.5 animate-pulse rounded-full bg-[#7dffa0]" />
                    Đang hoạt động
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Đóng chat"
                className="flex size-8 items-center justify-center rounded-full text-white/85 transition-all hover:rotate-90 hover:bg-white/15"
              >
                <XIcon className="size-4" />
              </button>
            </div>
          </div>

          {/* Danh sách tin nhắn */}
          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto p-4"
            style={{
              backgroundImage:
                'radial-gradient(circle at top right, rgba(183,238,196,0.25), transparent 55%), radial-gradient(circle at bottom left, rgba(255,235,223,0.3), transparent 55%)',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex animate-fade-in-up ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'ai' && (
                  <span className="mr-1.5 mt-auto flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                    <SparkleIcon className="size-3 text-brand-dark" />
                  </span>
                )}
                <p
                  className={`max-w-[78%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                    message.role === 'user'
                      ? 'rounded-br-sm bg-gradient-to-br from-brand to-brand-dark text-white'
                      : 'rounded-bl-sm border border-border-light bg-white text-ink-secondary'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}

            {typing && (
              <div className="flex animate-fade-in-up justify-start">
                <span className="mr-1.5 mt-auto flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                  <SparkleIcon className="size-3 animate-spin text-brand-dark" />
                </span>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border-light bg-white px-4 py-3 shadow-sm">
                  <span className="size-1.5 animate-bounce rounded-full bg-brand [animation-delay:-0.3s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-brand [animation-delay:-0.15s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-brand" />
                </div>
              </div>
            )}

            {messages.length <= 1 && !typing && (
              <div className="flex flex-col gap-1.5 pt-1">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={s.text}
                    type="button"
                    onClick={() => sendMessage(s.text)}
                    style={{ animationDelay: `${i * 80}ms` }}
                    className="flex animate-fade-in-up items-center gap-2 rounded-xl border border-border-light bg-white px-3 py-2.5 text-left text-xs font-semibold text-ink-secondary shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand-dark hover:shadow-md"
                  >
                    <s.icon className="size-4 shrink-0 text-brand-dark" />
                    {s.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ô nhập */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border-light bg-white p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="h-11 flex-1 rounded-full border border-border bg-cream px-4 text-xs text-ink-input outline-none transition-colors focus:border-brand focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Gửi"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-white shadow-btn transition-transform hover:scale-110 hover:rotate-6 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:rotate-0"
            >
              <SendIcon className="size-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Đóng trợ lý AI' : 'Mở trợ lý AI'}
        className="group relative flex size-14 items-center justify-center"
      >
        {!open && (
          <>
            <span className="absolute inset-0 animate-wobble-ring rounded-full bg-brand" />
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/40 [animation-duration:2.5s]" />
          </>
        )}

        <span
          className={`relative flex size-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand via-brand to-[#005c00] text-white shadow-[0_10px_25px_-8px_rgba(0,136,0,0.6)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-active:scale-95`}
        >
          {open ? (
            <XIcon className="size-5" />
          ) : (
            <img src={LOGO_MARK_URL} alt="" className="size-full rounded-full object-cover p-2.5" />
          )}
        </span>

        {hasUnread && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#f43100] text-[9px] font-bold text-white ring-2 ring-cream">
            •
          </span>
        )}
      </button>
    </div>
  )
}
