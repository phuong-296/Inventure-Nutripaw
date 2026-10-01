// Bộ icon SVG dùng chung cho toàn app - gom lại 1 chỗ để các trang không
// phải tự viết tay path SVG riêng lẻ. Icon "thuần" (không dùng emoji) cho
// mọi chỗ mang tính chức năng: loài thú cưng, danh mục món ăn, gợi ý chat...

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.333 5.833A1.667 1.667 0 0 1 5 4.167h10A1.667 1.667 0 0 1 16.667 5.833v8.334A1.667 1.667 0 0 1 15 15.833H5a1.667 1.667 0 0 1-1.667-1.666V5.833Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="m4.167 6.25 5.833 4.167 5.833-4.167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LockIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4.167" y="9.167" width="11.667" height="7.5" rx="1.667" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.667 9.167v-2.5a3.333 3.333 0 1 1 6.666 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function UserIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10" cy="6.667" r="3.333" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.75 16.25a6.25 6.25 0 0 1 12.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function EyeIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.667 10S4.167 4.167 10 4.167 18.333 10 18.333 10 15.833 15.833 10 15.833 1.667 10 1.667 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function EyeOffIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.5 2.5l15 15M8.36 8.36a2.5 2.5 0 0 0 3.28 3.28M6.1 6.14C3.6 7.6 2 10 2 10s2.5 5.833 8.333 5.833c1.31 0 2.45-.29 3.42-.75M11.9 4.32A8.8 8.8 0 0 1 18.333 10s-.62 1.45-1.9 2.78"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.333 8H2.667M2.667 8 7.333 3.333M2.667 8l4.666 4.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2.667 8h10.666M9.333 3.333 14 8l-4.667 4.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PawIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 12.19c1.56 0 3.13 1.06 3.13 2.5a1.25 1.25 0 0 1-1.25 1.25c-.63 0-1.06-.38-1.88-.38s-1.25.38-1.88.38a1.25 1.25 0 0 1-1.25-1.25c0-1.44 1.57-2.5 3.13-2.5Z" />
      <circle cx="6.56" cy="8.75" r="1.31" />
      <circle cx="13.44" cy="8.75" r="1.31" />
      <circle cx="8.25" cy="6.38" r="1.13" />
      <circle cx="11.75" cy="6.38" r="1.13" />
    </svg>
  )
}

export function HomeIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.333 8.333 10 3.333l6.667 5V15.83a1.667 1.667 0 0 1-1.667 1.667h-10a1.667 1.667 0 0 1-1.667-1.667V8.333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7.5 17.5v-5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckMealIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.875 10 2.25 2.25 4.375-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HistoryIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 5.833V10l3.333 1.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function HeartIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 17.083s-6.25-3.858-6.25-8.541A3.542 3.542 0 0 1 10 6.4a3.542 3.542 0 0 1 6.25 2.142c0 4.683-6.25 8.541-6.25 8.541Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function QuestionIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.708 7.917a2.292 2.292 0 1 1 3.209 2.1c-.65.29-.917.847-.917 1.316V11.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="14.167" r="0.833" fill="currentColor" />
    </svg>
  )
}

export function LogoutIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 17.5h-3.333a1.667 1.667 0 0 1-1.667-1.667V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.333 14.167 17.5 10l-4.167-4.167M17.5 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 2.667v10.666M2.667 8h10.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function EditIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.333 2 14 4.667l-8.667 8.666-3.166.5.5-3.166L11.333 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m4.167 10.417 3.75 3.75 7.916-8.334" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CameraIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.5 6.667A1.667 1.667 0 0 1 4.167 5h1.25l.833-1.667h7.5L14.583 5h1.25a1.667 1.667 0 0 1 1.667 1.667v7.5A1.667 1.667 0 0 1 15.833 15.83H4.167A1.667 1.667 0 0 1 2.5 14.167v-7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10.417" r="2.917" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function ImageIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2.5" y="3.333" width="15" height="13.333" rx="1.667" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6.667" cy="7.5" r="1.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m3.75 14.167 3.958-3.959a1.25 1.25 0 0 1 1.767 0l1.192 1.192a1.25 1.25 0 0 0 1.766 0l1.15-1.15a1.25 1.25 0 0 1 1.767 0l1.65 1.65"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="9.167" cy="9.167" r="5.833" stroke="currentColor" strokeWidth="1.5" />
      <path d="m17.5 17.5-3.917-3.917" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function XIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 4 4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 2.5c.42 2.5 1.25 4.08 3.75 4.58-2.5.5-3.33 2.08-3.75 4.58-.42-2.5-1.25-4.08-3.75-4.58 2.5-.5 3.33-2.08 3.75-4.58ZM16.25 11.667c.25 1.5.75 2.45 2.25 2.75-1.5.3-2 1.25-2.25 2.75-.25-1.5-.75-2.45-2.25-2.75 1.5-.3 2-1.25 2.25-2.75Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AlertIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.575 3.213 2.058 15a1.667 1.667 0 0 0 1.442 2.5h13.033a1.667 1.667 0 0 0 1.442-2.5L11.458 3.213a1.667 1.667 0 0 0-2.883 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 8.333v3.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.167" r="0.833" fill="currentColor" />
    </svg>
  )
}

export function ClockIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5.833V10l3.333 1.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GiftIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3.333" y="8.333" width="13.333" height="8.333" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.333v8.334M3.333 8.333h13.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M10 8.333H7.083a2.083 2.083 0 1 1 0-4.166c1.75 0 2.917 4.166 2.917 4.166ZM10 8.333h2.917a2.083 2.083 0 1 0 0-4.166c-1.75 0-2.917 4.166-2.917 4.166Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TrashIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.667 4.667h10.666M6.667 7.333v4M9.333 7.333v4M3.333 4.667l.667 8A1.333 1.333 0 0 0 5.33 14h5.34a1.333 1.333 0 0 0 1.33-1.333l.667-8M6 4.667v-2a.667.667 0 0 1 .667-.667h2.666A.667.667 0 0 1 10 2.667v2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChatIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17.5 9.583a6.75 6.75 0 0 1-6.997 6.75c-.9-.03-1.77-.2-2.573-.5L3.75 17.083l1.28-3.633a6.7 6.7 0 0 1-.53-2.617A6.75 6.75 0 1 1 17.5 9.583Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.875" cy="9.583" r="0.938" fill="currentColor" />
      <circle cx="10" cy="9.583" r="0.938" fill="currentColor" />
      <circle cx="13.125" cy="9.583" r="0.938" fill="currentColor" />
    </svg>
  )
}

export function SendIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17.5 2.5 9.167 10.833M17.5 2.5 12.083 17.5l-2.916-6.667L2.5 7.917 17.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DogIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.25 8.333c-1.667-1.25-3.333-.833-3.333.834 0 1.25 1.25 2.083 2.5 2.083M13.75 8.333c1.667-1.25 3.333-.833 3.333.834 0 1.25-1.25 2.083-2.5 2.083"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5.417c2.762 0 5 1.968 5 4.895 0 3.5-2.238 5.771-5 5.771s-5-2.271-5-5.77c0-2.928 2.238-4.896 5-4.896Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.333 10.417h.009M11.667 10.417h.009" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.167 12.5c.277.278.555.417.833.417s.556-.14.833-.417" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CatIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m5.417 4.167 1.25 3.541M14.583 4.167l-1.25 3.541"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.667 7.708h6.666c1.75 0 2.917 1.98 2.917 4.209 0 2.75-1.875 4.416-6.25 4.416s-6.25-1.666-6.25-4.416c0-2.23 1.167-4.209 2.917-4.209Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.333 12.083h.009M11.667 12.083h.009" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.167 13.75c.277.278.555.417.833.417s.556-.14.833-.417" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2.5 11.667h2.083M17.5 11.667h-2.083" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function KibbleBowlIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.333 10h13.334c0 3.222-2.985 5.833-6.667 5.833S3.333 13.222 3.333 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7.083" cy="7.083" r="1.25" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10.417" cy="5.833" r="1.25" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="13.333" cy="7.5" r="1.25" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function CanIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.583 6.25h10.834v9.167a1.25 1.25 0 0 1-1.25 1.25H5.833a1.25 1.25 0 0 1-1.25-1.25V6.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M3.75 6.25h12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M5.417 6.25V4.167c0-.46.373-.834.833-.834h7.5c.46 0 .833.373.833.834V6.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6.667 9.583h6.666M6.667 12.5h6.666" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function ChickenLegIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.5 11.5c-2-2-2.1-5.2.2-7.1 1.9-1.6 4.4-1.1 5.5 1 1 1.9.4 4.2-1.2 5.9l-1.7 1.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 11.5 4.9 15.1a1.55 1.55 0 1 0 2.2 2.2l3.6-3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.9 15.1c-.5-.5-1.4-.5-2.1 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function FishIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.5 10c2.5-3.333 5.833-5 9.167-5 2.5 0 4.166 1.667 5.833 3.333-1.667 1.667-3.333 3.334-5.833 3.334C8.333 15 5 13.333 2.5 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M17.5 8.333 15.833 10l1.667 1.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.25" cy="9.167" r="0.833" fill="currentColor" />
      <path d="M5.417 12.083c1.111.417 2.222.417 3.333 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function RiceBowlIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.333 9.167h13.334c0 3.452-2.985 6.25-6.667 6.25s-6.667-2.798-6.667-6.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2.5 9.167h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M8.333 5.833c-.555-.555-.555-1.111 0-1.666M11.667 5.833c-.556-.555-.556-1.111 0-1.666"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CarrotIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.167 8.333c1.925 0 3.264 1.885 2.815 3.75l-.98 4.079a1.667 1.667 0 0 1-3.245 0l-.98-4.08c-.449-1.864.89-3.75 2.39-3.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.167 8.333c-.417-1.666.417-2.5.417-2.5s1.25.417 2.083 1.25c.417.417 1.666-.417 2.5 0 0 0-.417 1.667-1.666 2.084-.417.833-.417 1.666-.417 1.666"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BoneIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.417 8.333a1.667 1.667 0 1 0-2.362 2.362 1.667 1.667 0 0 0-.221 2.585 1.667 1.667 0 0 0 2.583-.221 1.667 1.667 0 0 0 2.361-2.362l4.444-4.444a1.667 1.667 0 0 0 2.362-2.361 1.667 1.667 0 0 0 .221-2.585 1.667 1.667 0 0 0-2.583.221 1.667 1.667 0 0 0-2.362 2.361L5.417 8.334Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EggIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 17.083c3.222 0 5.417-2.315 5.417-5.833C15.417 7.5 12.5 2.917 10 2.917S4.583 7.5 4.583 11.25c0 3.518 2.195 5.833 5.417 5.833Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7.083 11.667c0 1.15.84 2.083 1.875 2.083" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function FireIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 2.5s3.333 3.333 3.333 6.25a3.333 3.333 0 1 1-6.666 0c0-.694.277-1.389.833-2.083.14 1.041.834 1.666.834 1.666-.417-2.083.833-3.75 1.666-5.833Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 11.667a3.75 3.75 0 1 0 7.5 0c0-.98-.278-1.755-.694-2.5.324 2.153-1.181 3.541-2.223 3.958.417-1.041 0-1.875 0-1.875-1.25 1.25-2.917 1.25-4.583.417Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function UtensilsIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.833 2.5v6.667M4.167 2.5v4.167a1.667 1.667 0 0 0 3.333 0V2.5M5.833 9.167V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M14.167 2.5c-1.15 0-2.084 1.119-2.084 2.5v3.333c0 1.15.934 1.667 2.084 1.667V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function RepeatIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.667 9.167A6.667 6.667 0 0 0 5.058 5.833M3.333 10.833a6.667 6.667 0 0 0 11.609 3.334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 3.333v2.917H2.083M15 16.667v-2.917h2.917" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
