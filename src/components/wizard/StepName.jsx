import FormField from '../FormField.jsx'
import PetAvatarUpload from '../PetAvatarUpload.jsx'
import { UserIcon } from '../icons.jsx'

/**
 * Ô upload ảnh đại diện + trường "Tên bé yêu" - dùng cho bước 1 của wizard
 * và bên trong form sửa hồ sơ.
 */
export default function StepName({ draft, setDraft }) {
  return (
    <>
      <PetAvatarUpload
        photoUrl={draft.photoUrl}
        onChange={(photoUrl) => setDraft((d) => ({ ...d, photoUrl }))}
      />
      <FormField
        label="Tên bé yêu"
        placeholder="Lucky"
        icon={<UserIcon className="size-5" />}
        value={draft.name}
        onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
      />
    </>
  )
}
