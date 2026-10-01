import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { usePets } from '../context/PetsContext.jsx'
import { useHistory } from '../context/HistoryContext.jsx'
import { evaluateMeal, itemKcal, foodCategory, generateAiRecipe, ALTERNATIVE_SUGGESTIONS } from '../data/mealOptions.js'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, AlertIcon, SparkleIcon } from '../components/icons.jsx'

const STATUS_STYLES = {
  good: { ring: 'bg-brand-soft text-brand-dark', dot: 'bg-brand' },
  warning: { ring: 'bg-[#ffe8d1] text-accent-orange', dot: 'bg-accent-orange' },
  bad: { ring: 'bg-red-100 text-red-500', dot: 'bg-red-500' },
}


/**
 * "Kết quả" - nhận danh sách món ăn từ CheckMeal.jsx qua router state, tự
 * tính kết luận (evaluateMeal) rồi lưu vào lịch sử đúng 1 lần duy nhất khi
 * trang này mount. Nếu bị vào thẳng trang này mà không có dữ liệu bữa ăn
 * hợp lệ (vd F5 lại trang, hoặc gõ URL trực tiếp) thì tự điều hướng ngược
 * về bước Kiểm tra bữa ăn.
 */
export default function CheckResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const { getPet } = usePets()
  const { addCheck } = useHistory()
  // Cờ chống lưu trùng lặp - effect bên dưới có thể chạy lại (StrictMode,
  // re-render) nhưng chỉ được gọi addCheck đúng 1 lần cho mỗi lượt kiểm tra
  const saved = useRef(false)
  const [recipe, setRecipe] = useState(null)
  const [generatingRecipe, setGeneratingRecipe] = useState(false)

  const draft = location.state // { petId, items } do CheckMeal.jsx truyền qua khi navigate
  const pet = draft ? getPet(draft.petId) : null

  const items = useMemo(() => draft?.items ?? [], [draft])

  // Tính kết luận 1 lần, chỉ tính lại khi pet hoặc items thực sự đổi (tránh
  // tính toán lại không cần thiết mỗi lần component render)
  const evaluation = useMemo(() => (pet && items.length ? evaluateMeal(items, pet) : null), [pet, items])

  // Lưu lượt kiểm tra vào lịch sử ngay khi có đủ dữ liệu - chỉ 1 lần nhờ cờ saved
  useEffect(() => {
    if (!pet || items.length === 0 || saved.current || !evaluation) return
    saved.current = true
    addCheck({
      petId: pet.id,
      petName: pet.name,
      items,
      kcal: evaluation.kcal,
      status: evaluation.status,
      statusLabel: evaluation.statusMeta.label,
      note: evaluation.why,
    })
  }, [pet, items, evaluation, addCheck])

  // Bảo vệ: thiếu dữ liệu bữa ăn hợp lệ (vào thẳng trang này) thì quay lại
  // bước kiểm tra bữa ăn thay vì hiện trang trắng/lỗi
  useEffect(() => {
    if (!draft || !pet || items.length === 0) {
      navigate('/check', { replace: true })
    }
  }, [draft, pet, items, navigate])

  if (!pet || items.length === 0 || !evaluation) return null

  const style = STATUS_STYLES[evaluation.status]

  function handleGenerateRecipe() {
    setGeneratingRecipe(true)
    // Không có backend AI thật cho bản demo - trì hoãn 1 chút để bộ tạo
    // công thức dựa trên quy tắc (generateAiRecipe) có cảm giác đang "suy nghĩ".
    setTimeout(() => {
      setRecipe(generateAiRecipe(pet, items))
      setGeneratingRecipe(false)
    }, 1100)
  }

  return (
    <AppLayout>
      <button
        type="button"
        onClick={() => navigate('/check')}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-secondary hover:text-ink"
      >
        <ArrowLeftIcon className="size-5" />
        Quay lại
      </button>

      <Card className="mb-6 flex flex-col items-center gap-4 p-10 text-center">
        <span className={`flex size-16 items-center justify-center rounded-full ${style.ring}`}>
          {evaluation.status === 'good' ? <CheckIcon className="size-7" /> : <AlertIcon className="size-7" />}
        </span>
        <span className={`inline-flex items-center gap-2 rounded-full bg-cream-dark px-4 py-1.5 text-xs font-bold text-ink-secondary`}>
          <span className={`size-2 rounded-full ${style.dot}`} />
          {evaluation.statusMeta.label}
        </span>
        <h1 className="font-heading text-2xl font-bold text-ink sm:text-3xl">{evaluation.statusMeta.title}</h1>
      </Card>

      <Card className="mb-6 p-6">
        <h3 className="mb-4 font-heading text-base font-bold text-ink">Chi tiết từng món ({items.length})</h3>
        <div className="divide-y divide-border-light">
          {items.map((item, i) => {
            const ItemIcon = foodCategory(item.categoryId)?.icon
            return (
              <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cream-dark font-heading text-sm font-bold text-ink-secondary">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
                      {ItemIcon && <ItemIcon className="size-4 text-ink-secondary" />}
                      {item.label}
                    </p>
                    <p className="text-xs font-semibold text-ink-label">{itemKcal(item)} kcal</p>
                  </div>
                  <p className="mt-1 text-xs text-ink-label">{item.grams}g</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border-light pt-3">
          <p className="text-sm font-bold text-ink">Tổng bữa ăn</p>
          <p className="font-heading text-lg font-bold text-ink">{evaluation.kcal} kcal</p>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h3 className="mb-4 font-heading text-base font-bold text-ink">Kiểm tra bữa ăn cho {pet.name}</h3>
            <div className="flex flex-col gap-4">
              {evaluation.checklist.map((check) => (
                <div key={check.key} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
                      check.ok ? 'bg-brand-soft text-brand-dark' : 'bg-[#ffe8d1] text-accent-orange'
                    }`}
                  >
                    {check.ok ? <CheckIcon className="size-3.5" /> : <AlertIcon className="size-3.5" />}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{check.label}</p>
                    <p className="text-sm text-ink-secondary">{check.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-heading text-base font-bold text-ink">Khẩu phần &amp; năng lượng</h3>
            <div className="divide-y divide-border-light text-sm">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-ink-secondary">Tổng khẩu phần</span>
                <span className="font-bold text-ink">{items.reduce((s, i) => s + i.grams, 0)}g</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-ink-secondary">Năng lượng bữa ăn</span>
                <span className="font-bold text-ink">{evaluation.kcal} kcal</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-ink-secondary">Nhu cầu/ngày của {pet.name}</span>
                <span className="font-bold text-ink">{evaluation.daily} kcal</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-ink-secondary">Đánh giá khẩu phần</span>
                <span className="font-bold text-ink">{evaluation.portionAssessment}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-2 font-heading text-base font-bold text-ink">Vì sao vậy?</h3>
            <p className="text-sm leading-relaxed text-ink-secondary">{evaluation.why}</p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-heading text-base font-bold text-ink">Gợi ý cho {pet.name}</h3>
            <div className="flex flex-col gap-3">
              {evaluation.suggestions.map((tip) => (
                <div key={tip} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                    <SparkleIcon className="size-3.5" />
                  </span>
                  <p className="text-sm leading-relaxed text-ink-secondary">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="mb-3 font-heading text-base font-bold text-ink">Gợi ý thay thế</h3>
            <div className="flex flex-col gap-3">
              {ALTERNATIVE_SUGGESTIONS.map((alt) => (
                <Card key={alt.name} className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-ink">{alt.name}</h4>
                    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand-dark">
                      {alt.match}%
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-ink-secondary">{alt.note}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-ink-label">{alt.price}</span>
                    <span className="font-bold text-brand-dark">Xem nơi mua →</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Button fullWidth icon={<ArrowRightIcon className="size-4" />} iconPosition="right" onClick={() => navigate('/check')}>
            Kiểm tra bữa ăn khác
          </Button>
          <Button fullWidth variant="outline" onClick={() => navigate('/dashboard')}>
            Về trang chủ
          </Button>

          <Card className="p-6">
            <h3 className="mb-2 flex items-center gap-2 font-heading text-base font-bold text-ink">
              <SparkleIcon className={`size-5 text-brand-dark ${generatingRecipe ? 'animate-spin' : ''}`} />
              Công thức AI cá nhân hóa
            </h3>
            <p className="mb-4 text-xs leading-relaxed text-ink-secondary">
              AI phân tích hồ sơ của {pet.name} và bữa ăn hiện tại để tạo công thức nấu tự nấu hoàn toàn riêng cho bé.
            </p>

            {!recipe && (
              <Button
                fullWidth
                variant="ghost"
                disabled={generatingRecipe}
                icon={<SparkleIcon className={`size-4 ${generatingRecipe ? 'animate-spin' : ''}`} />}
                onClick={handleGenerateRecipe}
              >
                {generatingRecipe ? `AI đang phân tích hồ sơ của ${pet.name}...` : `Tạo công thức AI cho ${pet.name}`}
              </Button>
            )}

            {recipe && (
              <div className="animate-fade-in-up rounded-2xl border border-brand-light/50 bg-brand-soft/30 p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h4 className="font-heading text-sm font-bold text-ink">{recipe.title}</h4>
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-brand-dark">
                    {recipe.totalKcal} kcal
                  </span>
                </div>

                <ul className="mb-3 flex flex-col gap-1.5">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.name} className="flex items-center justify-between text-xs text-ink-secondary">
                      <span>{ing.name}</span>
                      <span className="font-semibold text-ink">{ing.grams}g</span>
                    </li>
                  ))}
                </ul>

                <ol className="mb-3 flex flex-col gap-1.5 border-t border-brand-light/40 pt-3">
                  {recipe.steps.map((step, i) => (
                    <li key={step} className="flex gap-2 text-xs leading-relaxed text-ink-secondary">
                      <span className="font-bold text-brand-dark">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>

                {recipe.notes.length > 0 && (
                  <div className="mb-3 flex flex-col gap-1 border-t border-brand-light/40 pt-3">
                    {recipe.notes.map((note) => (
                      <p key={note} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-ink-label">
                        <SparkleIcon className="mt-0.5 size-3 shrink-0 text-brand-dark" />
                        {note}
                      </p>
                    ))}
                  </div>
                )}

                <Button
                  fullWidth
                  size="sm"
                  variant="ghost"
                  disabled={generatingRecipe}
                  icon={<SparkleIcon className={`size-4 ${generatingRecipe ? 'animate-spin' : ''}`} />}
                  onClick={handleGenerateRecipe}
                >
                  {generatingRecipe ? 'AI đang tạo công thức khác...' : 'Tạo công thức khác'}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
