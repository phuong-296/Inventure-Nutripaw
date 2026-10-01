import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[NutriPaw] Thiếu VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Sao chép .env.example thành .env ' +
      'và điền URL + anon key lấy từ Supabase Dashboard > Settings > API, rồi khởi động lại `npm run dev`.',
  )
}

/**
 * Client Supabase dùng chung cho cả Auth + Postgres (pets, meal_checks) -
 * gọi thẳng từ trình duyệt, không qua server backend riêng nào.
 * `persistSession`/`detectSessionInUrl` giữ người dùng đăng nhập qua các
 * lần tải lại trang, và giúp link email đặt lại mật khẩu tự đăng nhập
 * người dùng ngay khi họ quay lại /reset-password.
 */
// Dùng giá trị tạm khi thiếu .env để createClient không throw (gây màn hình trắng).
// App vẫn hiển thị, nhưng đăng nhập/lưu dữ liệu chỉ chạy khi có .env thật.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
)
