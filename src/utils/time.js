// Định dạng thời gian tương đối cho các lượt trong lịch sử ("Hôm nay
// 14:30", "Hôm qua 18:00", "3 ngày trước", "1 tuần trước") - khớp với thẻ
// "Lịch sử kiểm tra" trong Figma.

// Thêm số 0 phía trước nếu chỉ có 1 chữ số (vd 9 -> "09")
function pad(n) {
  return String(n).padStart(2, '0')
}

// Giờ:phút dạng 2 chữ số, vd "14:05"
function timeOfDay(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function formatRelativeTime(iso) {
  const date = new Date(iso)
  const now = new Date()
  // Bỏ qua giờ/phút/giây, chỉ so ngày - để "hôm qua lúc 23h" và "hôm nay
  // lúc 1h sáng" tính đúng là cách nhau 1 ngày, không phải vài giờ
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const days = Math.round((startOfDay(now) - startOfDay(date)) / 86_400_000)

  if (days <= 0) return `Hôm nay, ${timeOfDay(date)}`
  if (days === 1) return `Hôm qua, ${timeOfDay(date)}`
  if (days < 7) return `${days} ngày trước, ${timeOfDay(date)}`
  const weeks = Math.floor(days / 7)
  if (weeks === 1) return `1 tuần trước, ${timeOfDay(date)}`
  if (weeks < 5) return `${weeks} tuần trước, ${timeOfDay(date)}`
  const months = Math.floor(days / 30)
  return `${months} tháng trước, ${timeOfDay(date)}`
}
