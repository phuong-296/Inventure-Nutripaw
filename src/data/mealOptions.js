// Danh mục món ăn + công thức tính dinh dưỡng đơn giản cho luồng "Kiểm tra
// bữa ăn". Không có backend nhận diện ảnh/dinh dưỡng thật - đây là số liệu
// demo hợp lý cho từng danh mục, đủ để luồng tự tính ra 1 kết luận tin cậy
// được, đúng tinh thần khung "Kết quả" trong Figma.
import {
  KibbleBowlIcon,
  CanIcon,
  ChickenLegIcon,
  FishIcon,
  RiceBowlIcon,
  CarrotIcon,
  BoneIcon,
  EggIcon,
} from '../components/icons.jsx'

// Ảnh món ăn thật, tự host tại public/food/ (tải từ Wikimedia Commons, giấy
// phép public domain/CC) - phục vụ từ chính server của app nên không bao
// giờ hết hạn hay hỏng, khác với link CDN Figma cũ đã thay thế.
export const FOOD_CATEGORIES = [
  {
    id: 'hatkho',
    icon: KibbleBowlIcon,
    photo: '/food/hatkho.jpg',
    label: 'Hạt khô',
    kcalPerGram: 3.8,
    protein: 'Cao',
    fat: 'Trung bình',
    sodium: 'Trung bình',
  },
  {
    id: 'pate',
    icon: CanIcon,
    photo: '/food/pate.jpg',
    label: 'Pate',
    kcalPerGram: 1.2,
    protein: 'Cao',
    fat: 'Trung bình',
    sodium: 'Trung bình',
  },
  {
    id: 'thitga',
    icon: ChickenLegIcon,
    photo: '/food/thitga.jpg',
    label: 'Thịt gà',
    kcalPerGram: 1.65,
    protein: 'Cao',
    fat: 'Thấp',
    sodium: 'Thấp',
    allergen: 'Thịt gà',
  },
  {
    id: 'ca',
    icon: FishIcon,
    photo: '/food/ca.jpg',
    label: 'Cá',
    kcalPerGram: 2.0,
    protein: 'Cao',
    fat: 'Trung bình',
    sodium: 'Thấp',
    allergen: 'Cá',
  },
  {
    id: 'com',
    icon: RiceBowlIcon,
    photo: '/food/com.jpg',
    label: 'Cơm',
    kcalPerGram: 1.3,
    protein: 'Thấp',
    fat: 'Thấp',
    sodium: 'Thấp',
  },
  {
    id: 'rau',
    icon: CarrotIcon,
    photo: '/food/rau.jpg',
    label: 'Rau',
    kcalPerGram: 0.4,
    protein: 'Thấp',
    fat: 'Thấp',
    sodium: 'Thấp',
  },
  {
    id: 'snack',
    icon: BoneIcon,
    photo: '/food/snack.jpg',
    label: 'Snack',
    kcalPerGram: 4.2,
    protein: 'Trung bình',
    fat: 'Cao',
    sodium: 'Cao',
  },
  {
    id: 'trung',
    icon: EggIcon,
    photo: '/food/trung.jpg',
    label: 'Trứng',
    kcalPerGram: 1.5,
    protein: 'Cao',
    fat: 'Trung bình',
    sodium: 'Thấp',
    allergen: 'Trứng',
  },
]

export const DAILY_CHECK_LIMIT = 5
export const MIN_PORTION = 10
export const MAX_PORTION = 500
export const DEFAULT_PORTION = 50

// Tìm object danh mục đầy đủ theo id (dùng ở khắp nơi trong app để tra icon,
// ảnh, số liệu dinh dưỡng từ 1 categoryId đã lưu)
export function foodCategory(id) {
  return FOOD_CATEGORIES.find((c) => c.id === id)
}

// Hệ số hoạt động theo độ tuổi, nhân thêm vào công thức RER bên dưới -
// bé con/lớn tuổi có nhu cầu năng lượng khác trưởng thành
const AGE_ACTIVITY_FACTOR = { puppy: 2.2, adult: 1.6, senior: 1.3 }

/** Ước tính nhu cầu năng lượng/ngày (kcal) theo công thức RER đơn giản - đủ dùng cho demo, không thay thế tư vấn thú y. */
export function dailyKcalNeed(pet) {
  if (!pet?.weight) return 0
  const rer = 70 * Math.pow(pet.weight, 0.75) // công thức RER chuẩn: 70 × cân nặng(kg)^0.75
  const factor = AGE_ACTIVITY_FACTOR[pet.ageGroup] ?? 1.6
  return Math.round(rer * factor)
}

// Số calo của 1 món đã thêm vào bữa ăn - ưu tiên số liệu của danh mục (luôn
// đúng và cập nhật theo thời gian thực), phòng khi thiếu thì mới dùng số đã
// lưu sẵn trên item lúc thêm (dữ liệu lịch sử cũ)
export function itemKcal(item) {
  const cat = foodCategory(item.categoryId)
  const perGram = cat?.kcalPerGram ?? item.kcalPerGram ?? 1.5
  return Math.round(perGram * item.grams)
}

// Tổng calo của cả bữa ăn (cộng dồn từng món)
export function totalKcal(items) {
  return items.reduce((sum, item) => sum + itemKcal(item), 0)
}

/**
 * Tính kết luận + checklist cho khung "Kết quả", theo đúng cấu trúc của
 * khung kết quả trong Figma (huy hiệu trạng thái, từng mục đạt/không đạt,
 * và 1 đoạn giải thích ngắn "vì sao").
 */
export function evaluateMeal(items, pet) {
  const daily = dailyKcalNeed(pet)
  const target = daily * 0.2 // ước tính ~1 bữa, giả định mỗi ngày ăn vài bữa
  const kcal = totalKcal(items)
  // Tỷ lệ giữa lượng calo thực tế và mức khuyến nghị cho 1 bữa - nền tảng
  // để đánh giá bữa ăn nhiều/ít/vừa đủ bên dưới
  const ratio = target > 0 ? kcal / target : 1

  // Các món có chứa chất bé bị dị ứng (so khớp allergen của danh mục với
  // danh sách dị ứng đã khai trong hồ sơ)
  const allergyHits = items
    .map((item) => foodCategory(item.categoryId))
    .filter((cat) => cat?.allergen && pet?.allergies?.includes(cat.allergen))

  const hasHighProtein = items.some((item) => foodCategory(item.categoryId)?.protein === 'Cao')
  const hasHighFat = items.some((item) => foodCategory(item.categoryId)?.fat === 'Cao')
  const hasHighSodium = items.some((item) => foodCategory(item.categoryId)?.sodium === 'Cao')

  // Xếp loại trạng thái: có dị ứng hoặc lệch quá xa mức khuyến nghị -> xấu;
  // lệch vừa hoặc mặn -> cần chú ý; còn lại -> tốt
  let status = 'good'
  if (allergyHits.length > 0 || ratio > 1.8 || ratio < 0.3) {
    status = 'bad'
  } else if (ratio > 1.3 || ratio < 0.7 || hasHighSodium) {
    status = 'warning'
  }

  const statusMeta = {
    good: { label: 'Phù hợp', color: 'brand', title: 'Bữa ăn tổng hợp tốt cho bé' },
    warning: { label: 'Cần chú ý', color: 'orange', title: 'Bữa ăn cần điều chỉnh một chút' },
    bad: { label: 'Không nên dùng', color: 'red', title: 'Bữa ăn chưa phù hợp cho bé' },
  }[status]

  // 4 mục kiểm tra hiện trong bảng "Kết quả" - mỗi mục tự tính đạt/không
  // đạt (ok) và câu giải thích ngắn tương ứng
  const checklist = [
    {
      key: 'chat',
      label: 'Đủ chất không?',
      ok: ratio >= 0.7,
      detail: ratio >= 0.7 ? 'Bữa ăn cung cấp đầy đủ vitamin, khoáng chất cho bé' : 'Khẩu phần hơi thấp so với nhu cầu của bé',
    },
    {
      key: 'beo',
      label: 'Quá béo không?',
      ok: !hasHighFat || ratio <= 1.3,
      detail:
        !hasHighFat || ratio <= 1.3
          ? 'Khẩu phần năng lượng cân đối với cân nặng bé'
          : 'Khẩu phần năng lượng hơi cao, nên giảm bớt',
    },
    {
      key: 'protein',
      label: 'Thiếu protein không?',
      ok: hasHighProtein,
      detail: hasHighProtein ? 'Lượng protein đủ cho bé trưởng thành' : 'Nên thêm nguồn đạm (thịt, cá, trứng)',
    },
    {
      key: 'man',
      label: 'Mặn quá không?',
      ok: !hasHighSodium,
      detail: !hasHighSodium ? 'Lượng muối ổn định, an toàn cho thận' : 'Có món nhiều muối, nên hạn chế dùng thường xuyên',
    },
  ]

  // Câu giải thích "vì sao" hiện dưới huy hiệu trạng thái - ưu tiên nói về
  // dị ứng nếu có, rồi mới đến chuyện lệch calo
  let why = `Bữa ăn tổng cộng ${kcal} calo, phù hợp với nhu cầu dinh dưỡng của ${pet?.name ?? 'bé'}.`
  if (allergyHits.length > 0) {
    why = `Bữa ăn có ${allergyHits.map((c) => c.label).join(', ')} - nằm trong danh sách dị ứng của ${pet?.name ?? 'bé'}.`
  } else if (status === 'warning') {
    why = `Bữa ăn tổng cộng ${kcal} calo, ${ratio > 1 ? 'hơi cao' : 'hơi thấp'} so với khuyến nghị (~${Math.round(target)} kcal/bữa) cho ${pet?.name ?? 'bé'}.`
  }

  // Danh sách gợi ý cải thiện bữa ăn, tối đa 3 mục (cắt ở return bên dưới)
  const suggestions = []
  if (ratio < 0.7) {
    // Suy ra khối lượng cần tăng thêm dựa trên tỷ lệ calo/gram hiện tại của
    // cả bữa, để gợi ý ra đúng con số gram thay vì chỉ nói chung chung
    const targetGrams = Math.round((target / (kcal / (items.reduce((s, i) => s + i.grams, 0) || 1))) || 0)
    suggestions.push(`Tăng tổng khẩu phần lên khoảng ${targetGrams || Math.round(target / 1.5)}g để đủ dinh dưỡng`)
  }
  if (!hasHighProtein) suggestions.push('Thêm một nguồn đạm như thịt, cá hoặc trứng cho bữa ăn')
  if (hasHighSodium) suggestions.push('Hạn chế các món nhiều muối, chỉ dùng làm phần thưởng nhỏ')
  suggestions.push('Đảm bảo bữa ăn có đủ nước hoặc thức ăn ướt để bé uống đủ')

  return {
    status,
    statusMeta,
    kcal,
    target: Math.round(target),
    daily,
    ratio,
    checklist,
    why,
    suggestions: suggestions.slice(0, 3),
    portionAssessment:
      ratio >= 0.7 && ratio <= 1.3
        ? 'Phù hợp với khuyến nghị'
        : ratio < 0.7
          ? `Thấp hơn khuyến nghị (${Math.round(target)}g tương đương)`
          : `Cao hơn khuyến nghị (${Math.round(target)}g tương đương)`,
  }
}

// Thẻ gợi ý sản phẩm thay thế tĩnh, hiện ở cột phải trang Kết quả - cùng ý
// tưởng với thẻ "Gợi ý thay thế" trong Figma (nội dung demo, không lấy từ
// catalog sản phẩm thật).
export const ALTERNATIVE_SUGGESTIONS = [
  { name: 'Pate gan gà', match: 92, note: 'Thơm ngon, bổ sung nước cho bé', price: '25K - 40K' },
  { name: 'Hạt khô cao cấp', match: 88, note: 'Đầy đủ vitamin và khoáng chất', price: '200K - 350K' },
  { name: 'Cá hồi nướng', match: 85, note: 'Giàu omega-3, tốt cho da và lông', price: '50K - 80K' },
]

// Kho nguyên liệu cho thẻ "Công thức AI cá nhân hóa" (Figma SECTION-285/255).
// Không có backend AI/LLM thật cho bản demo - cùng tinh thần với
// evaluateMeal ở trên: 1 bộ quy tắc cố định khoác áo "AI", chọn nguyên liệu
// luôn tôn trọng dị ứng/vấn đề sức khỏe đã khai của bé.
const PROTEIN_OPTIONS = [
  { name: 'Ức gà', allergen: 'Thịt gà', kcalPerGram: 1.65 },
  { name: 'Cá hồi', allergen: 'Cá', kcalPerGram: 2.0 },
  { name: 'Thịt bò nạc', allergen: 'Thịt bò', kcalPerGram: 1.8 },
  { name: 'Trứng luộc', allergen: 'Trứng', kcalPerGram: 1.5 },
  { name: 'Đậu phụ', allergen: 'Đậu nành', kcalPerGram: 0.8 },
]

const CARB_OPTIONS = [
  { name: 'Cơm trắng', lightCarb: false, kcalPerGram: 1.3 },
  { name: 'Khoai lang hấp', lightCarb: true, kcalPerGram: 0.9 },
  { name: 'Bí đỏ hấp', lightCarb: true, kcalPerGram: 0.4 },
  { name: 'Yến mạch nấu chín', lightCarb: true, kcalPerGram: 0.7 },
]

const VEGGIE_OPTIONS = [
  { name: 'Cà rốt hấp', kcalPerGram: 0.35 },
  { name: 'Bông cải xanh hấp', kcalPerGram: 0.3 },
  { name: 'Rau bina hấp', kcalPerGram: 0.25 },
  { name: 'Đậu que hấp', kcalPerGram: 0.3 },
]

// Chọn ngẫu nhiên 1 phần tử trong mảng - dùng để mỗi lần bấm "Tạo công thức
// khác" ra kết quả khác nhau, cảm giác như đang gợi ý mới thật sự
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

/**
 * Tạo 1 công thức "AI" cá nhân hóa cho thú cưng, có thể được gợi ý thêm dựa
 * theo bữa ăn hiện tại. Quy tắc gần như cố định, chỉ random phần chọn
 * nguyên liệu để "Tạo công thức khác" luôn cảm giác mới mẻ, nhưng luôn né
 * các nguyên liệu bé đã biết bị dị ứng.
 */
export function generateAiRecipe(pet, items = []) {
  const allergies = pet?.allergies ?? []
  const healthIssues = pet?.healthIssues ?? []

  const isDiabetic = healthIssues.includes('Tiểu đường')
  const isKidneySensitive = healthIssues.includes('Vấn đề thận')
  const isWeightSensitive = healthIssues.includes('Dễ tăng cân') || pet?.weightGoal === 'lose'

  // Loại bỏ nguyên liệu đạm mà bé bị dị ứng trước khi chọn ngẫu nhiên; nếu
  // lọc xong không còn nguyên liệu nào thì đành chọn lại trong toàn bộ danh
  // sách (tránh crash khi bé dị ứng gần hết các lựa chọn)
  const proteinPool = PROTEIN_OPTIONS.filter((p) => !allergies.includes(p.allergen))
  const protein = pickRandom(proteinPool.length > 0 ? proteinPool : PROTEIN_OPTIONS)

  // Bé tiểu đường thì chỉ chọn trong nhóm tinh bột "nhẹ" (lightCarb)
  const carbPool = isDiabetic ? CARB_OPTIONS.filter((c) => c.lightCarb) : CARB_OPTIONS
  const carb = pickRandom(carbPool.length > 0 ? carbPool : CARB_OPTIONS)

  const veggie = pickRandom(VEGGIE_OPTIONS)

  // Nhắm tới ~1 bữa (18-22% nhu cầu cả ngày, giảm nhẹ nếu bé cần giảm cân)
  const daily = dailyKcalNeed(pet)
  const mealTarget = Math.round(daily * (isWeightSensitive ? 0.18 : 0.22)) || 180

  // Chia calo mục tiêu theo tỷ lệ đạm/tinh bột/rau (55/30/15), rồi quy đổi
  // ngược ra gram theo kcal/gram của từng nguyên liệu đã chọn ở trên
  const proteinGrams = Math.max(20, Math.round((mealTarget * 0.55) / protein.kcalPerGram))
  const carbGrams = Math.max(15, Math.round((mealTarget * 0.3) / carb.kcalPerGram))
  const veggieGrams = Math.max(15, Math.round((mealTarget * 0.15) / veggie.kcalPerGram))

  const totalKcal = Math.round(
    proteinGrams * protein.kcalPerGram + carbGrams * carb.kcalPerGram + veggieGrams * veggie.kcalPerGram,
  )

  // Ghi chú giải thích các lựa chọn ở trên, để người dùng hiểu vì sao công
  // thức lại như vậy chứ không phải chỉ đưa nguyên liệu suông
  const notes = []
  if (allergies.length > 0) {
    notes.push(`Đã tránh nguyên liệu bé dị ứng: ${allergies.join(', ')}.`)
  }
  if (isDiabetic) notes.push('Giảm tinh bột nhanh, ưu tiên rau củ giàu chất xơ vì bé có tiểu đường.')
  if (isKidneySensitive) notes.push('Không nêm muối, hạn chế đạm động vật quá nhiều vì bé có vấn đề về thận.')
  if (isWeightSensitive) notes.push('Khẩu phần giảm nhẹ để hỗ trợ mục tiêu cân nặng của bé.')
  if (items.some((item) => foodCategory(item.categoryId)?.sodium === 'Cao')) {
    notes.push('Bữa ăn gần đây khá mặn - công thức này không nêm thêm muối để cân bằng lại.')
  }
  if (notes.length === 0) notes.push('Công thức cân bằng dinh dưỡng, phù hợp cho bữa ăn hằng ngày của bé.')

  return {
    title: `${protein.name} sốt ${carb.name.toLowerCase()} & ${veggie.name.toLowerCase()}`,
    totalKcal,
    mealTarget,
    ingredients: [
      { name: protein.name, grams: proteinGrams },
      { name: carb.name, grams: carbGrams },
      { name: veggie.name, grams: veggieGrams },
    ],
    steps: [
      `Sơ chế ${protein.name.toLowerCase()} (${proteinGrams}g), rửa sạch, cắt miếng vừa ăn cho bé.`,
      `Hấp hoặc luộc chín ${protein.name.toLowerCase()}, không nêm muối hay gia vị.`,
      `Nấu chín ${carb.name.toLowerCase()} (${carbGrams}g) đến khi mềm.`,
      `Hấp ${veggie.name.toLowerCase()} (${veggieGrams}g) cho mềm, cắt nhỏ vừa miệng bé.`,
      'Trộn đều tất cả, để nguội bớt rồi cho bé thưởng thức.',
    ],
    notes,
  }
}
