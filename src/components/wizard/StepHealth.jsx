import { useState } from 'react'
import ChoiceCard from '../ChoiceCard.jsx'
import ChoiceTag from '../ChoiceTag.jsx'
import { PlusIcon } from '../icons.jsx'
import { WEIGHT_GOALS, HEALTH_ISSUES, ALLERGIES } from '../../data/petOptions.js'

// Bật/tắt 1 giá trị trong mảng: có rồi thì bỏ ra, chưa có thì thêm vào -
// dùng chung cho việc chọn/bỏ chọn tag vấn đề sức khỏe và dị ứng
function toggleValue(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

/** Ô nhập tự do "tự thêm mục riêng" cho tag vấn đề sức khỏe/dị ứng không có sẵn trong danh sách. */
function AddCustomTag({ placeholder, onAdd }) {
  const [value, setValue] = useState('') // nội dung đang gõ trong ô nhập

  // Thêm mục vừa gõ vào danh sách rồi xóa trắng ô nhập, bỏ qua nếu rỗng
  function submit() {
    const v = value.trim()
    if (!v) return
    onAdd(v)
    setValue('')
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          // Cho phép bấm Enter để thêm luôn, không bắt buộc phải bấm nút "+"
          if (e.key === 'Enter') {
            e.preventDefault()
            submit()
          }
        }}
        placeholder={placeholder}
        className="h-9 w-full max-w-[220px] rounded-full border border-border bg-white px-3.5 text-xs text-ink-input placeholder:text-ink-label focus:border-brand focus:outline-none"
      />
      <button
        type="button"
        onClick={submit}
        aria-label="Thêm"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand text-brand-dark hover:bg-brand-soft"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  )
}

/**
 * Cân nặng, mục tiêu cân nặng, vấn đề sức khỏe và dị ứng thức ăn - bước 3
 * của wizard ("Cân nặng & sức khỏe"), cũng dùng lại trong form sửa hồ sơ.
 */
export default function StepHealth({ draft, setDraft }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wide text-ink-label">Cân nặng (kg)</span>
        <div className="flex items-center gap-4">
          <div className="flex h-[54px] w-24 shrink-0 items-center justify-center rounded-xl border border-border bg-cream">
            <input
              type="number"
              min={0.5}
              max={100}
              step={0.5}
              value={draft.weight}
              onChange={(e) => setDraft((d) => ({ ...d, weight: Number(e.target.value) || 0 }))}
              className="w-14 bg-transparent text-center text-lg font-bold text-ink-input outline-none"
            />
          </div>
          <span className="text-sm font-semibold text-ink-input">kg</span>
          <input
            type="range"
            min={0.5}
            max={60}
            step={0.5}
            value={draft.weight}
            onChange={(e) => setDraft((d) => ({ ...d, weight: Number(e.target.value) }))}
            className="h-2 flex-1 cursor-pointer accent-brand"
            aria-label="Cân nặng"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wide text-ink-label">Mục tiêu cân nặng</span>
        <div className="flex gap-2">
          {WEIGHT_GOALS.map((goal) => (
            <ChoiceCard
              key={goal.value}
              title={goal.label}
              hint={goal.hint}
              selected={draft.weightGoal === goal.value}
              onClick={() => setDraft((d) => ({ ...d, weightGoal: goal.value }))}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wide text-ink-label">Vấn đề sức khỏe (nếu có)</span>
        <div className="flex flex-wrap gap-2">
          {HEALTH_ISSUES.map((issue) => (
            <ChoiceTag
              key={issue}
              selected={draft.healthIssues.includes(issue)}
              onClick={() => setDraft((d) => ({ ...d, healthIssues: toggleValue(d.healthIssues, issue) }))}
            >
              {issue}
            </ChoiceTag>
          ))}
          {/* Các mục người dùng tự gõ thêm (không có trong danh sách mặc
              định) - luôn hiện ở trạng thái đã chọn, bấm vào để bỏ chọn */}
          {draft.healthIssues
            .filter((issue) => !HEALTH_ISSUES.includes(issue))
            .map((issue) => (
              <ChoiceTag
                key={issue}
                selected
                onClick={() => setDraft((d) => ({ ...d, healthIssues: toggleValue(d.healthIssues, issue) }))}
              >
                {issue}
              </ChoiceTag>
            ))}
        </div>
        <AddCustomTag
          placeholder="Vấn đề khác..."
          onAdd={(v) =>
            setDraft((d) => ({ ...d, healthIssues: d.healthIssues.includes(v) ? d.healthIssues : [...d.healthIssues, v] }))
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wide text-ink-label">Dị ứng với thức ăn (nếu có)</span>
        <div className="flex flex-wrap gap-2">
          {ALLERGIES.map((allergy) => (
            <ChoiceTag
              key={allergy}
              variant="danger"
              selected={draft.allergies.includes(allergy)}
              onClick={() => setDraft((d) => ({ ...d, allergies: toggleValue(d.allergies, allergy) }))}
            >
              {allergy}
            </ChoiceTag>
          ))}
          {/* Tương tự phía trên: dị ứng tự thêm luôn hiện đã chọn */}
          {draft.allergies
            .filter((allergy) => !ALLERGIES.includes(allergy))
            .map((allergy) => (
              <ChoiceTag
                key={allergy}
                variant="danger"
                selected
                onClick={() => setDraft((d) => ({ ...d, allergies: toggleValue(d.allergies, allergy) }))}
              >
                {allergy}
              </ChoiceTag>
            ))}
        </div>
        <AddCustomTag
          placeholder="Dị ứng khác..."
          onAdd={(v) => setDraft((d) => ({ ...d, allergies: d.allergies.includes(v) ? d.allergies : [...d.allergies, v] }))}
        />
      </div>
    </>
  )
}
