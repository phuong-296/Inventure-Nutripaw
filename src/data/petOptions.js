// Danh sách lựa chọn dùng chung cho wizard tạo hồ sơ, trang chủ và form
// sửa hồ sơ. Khớp với các lựa chọn trong khung Figma "Hồ sơ thú cưng".
import { DogIcon, CatIcon, PawIcon } from '../components/icons.jsx'

export const SPECIES = [
  { value: 'dog', label: 'Chó', icon: DogIcon },
  { value: 'cat', label: 'Mèo', icon: CatIcon },
]

// "Khác" (giống tự nhập) được xử lý riêng trong StepBasicInfo.jsx bằng 1 ô
// nhập tự do - không liệt kê ở đây vì nó không phải 1 giá trị giống thật.
export const BREEDS_BY_SPECIES = {
  dog: [
    'Chó cỏ Việt Nam',
    'Poodle',
    'Pug',
    'Corgi',
    'Husky',
    'Golden Retriever',
    'Chihuahua',
    'Phốc sóc',
    'Bulldog',
    'Shiba Inu',
    'Dachshund',
    'Rottweiler',
  ],
  cat: [
    'Mèo ta',
    'Mèo Anh lông ngắn',
    'Mèo Ba Tư',
    'Mèo Xiêm',
    'Maine Coon',
    'Munchkin',
    'Ragdoll',
    'Bengal',
    'Sphynx',
    'Scottish Fold',
  ],
}

export const AGE_GROUPS = [
  { value: 'puppy', label: 'Bé con', hint: '< 1 tuổi' },
  { value: 'adult', label: 'Trưởng thành', hint: '1-7 tuổi' },
  { value: 'senior', label: 'Lớn tuổi', hint: '> 7 tuổi' },
]

export const WEIGHT_GOALS = [
  { value: 'lose', label: 'Giảm cân', hint: 'Bé cần giảm cân nặng' },
  { value: 'maintain', label: 'Giữ nguyên', hint: 'Duy trì cân nặng hiện tại' },
  { value: 'gain', label: 'Tăng cân', hint: 'Bé cần tăng cân nặng' },
]

export const HEALTH_ISSUES = [
  'Đã triệt sản',
  'Dễ tăng cân',
  'Vấn đề thận',
  'Tiểu đường',
  'Vấn đề xương khớp',
  'Vấn đề da liễu',
  'Tiêu hóa nhạy cảm',
  'Vấn đề tim mạch',
]

export const ALLERGIES = ['Thịt gà', 'Thịt bò', 'Cá', 'Sữa', 'Trứng', 'Lúa mì', 'Đậu nành', 'Hải sản']

// Nền gradient theo từng loài cho khung avatar thú cưng - dùng chung giữa
// PetCard và PetProfile để cả 2 nơi hiện đúng cùng 1 kiểu theo loài.
export const SPECIES_GRADIENT = {
  dog: 'linear-gradient(135deg, rgb(183,238,196) 0%, rgb(255,235,223) 100%)',
  cat: 'linear-gradient(135deg, rgb(255,235,223) 0%, rgb(183,238,196) 100%)',
}

export const MAX_PETS = 5

// Trạng thái khởi tạo của form tạo hồ sơ mới (wizard) - mọi trường rỗng/mặc định
export const EMPTY_PET_DRAFT = {
  name: '',
  species: 'dog',
  breed: '',
  ageGroup: 'adult',
  weight: 10,
  weightGoal: 'maintain',
  healthIssues: [],
  allergies: [],
  photoUrl: '',
}

// Các hàm tra cứu nhãn/icon từ value đã lưu (vd 'dog', 'puppy'...) - luôn
// có giá trị mặc định hợp lý phòng khi value lạ/không khớp

export function speciesLabel(value) {
  return SPECIES.find((s) => s.value === value)?.label ?? value
}

export function speciesIcon(value) {
  return SPECIES.find((s) => s.value === value)?.icon ?? PawIcon
}

export function ageGroupLabel(value) {
  return AGE_GROUPS.find((a) => a.value === value)?.label ?? value
}

export function weightGoalLabel(value) {
  return WEIGHT_GOALS.find((g) => g.value === value)?.label ?? value
}
