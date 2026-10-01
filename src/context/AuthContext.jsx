import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const AuthContext = createContext(null)

/**
 * Bọc mỏng quanh Supabase Auth. Giữ session hiện tại (null trong lúc còn
 * đang kiểm tra lần đầu, sau đó là session thật hoặc null) và cung cấp các
 * hành động auth mà luồng Khách cần dùng. Không có backend riêng - trình
 * duyệt gọi thẳng tới API Auth do Supabase host sẵn.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // true trong lúc đang kiểm tra session lần đầu (gọi getSession()) - dùng
  // để RequireAuth biết khi nào chưa nên quyết định điều hướng vội
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cờ để tránh setState sau khi component đã unmount (vd người dùng
    // chuyển trang nhanh trong lúc getSession() còn đang chạy)
    let mounted = true

    // Kiểm tra session hiện có (vd người dùng đã đăng nhập từ trước, load
    // lại trang thì vẫn còn đăng nhập nhờ token lưu trong trình duyệt)
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setLoading(false)
    })

    // Lắng nghe mọi thay đổi trạng thái đăng nhập sau đó: đăng nhập, đăng
    // xuất, token tự làm mới, hoặc bấm link xác nhận trong email
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,

      /**
       * Tạo user auth. Supabase tự gửi email xác nhận - hoặc mã OTP 6 số
       * (nếu template dùng {{ .Token }}) hoặc link ma thuật (mặc định). Cả
       * 2 luồng đều được xử lý: OTP ở VerifyEmail, link ma thuật qua
       * emailRedirectTo -> /verify-email tự nhận diện session.
       */
      async signUp(email, password, username) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/verify-email`,
          },
        })
        if (error) throw error
        return data
      },

      async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        return data
      },

      async signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      },

      /** Xác nhận mã 6 số từ email "Confirm signup" (VerifyEmail.jsx). */
      async verifySignupOtp(email, token) {
        const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'signup' })
        if (error) throw error
        return data
      },

      async resendSignupOtp(email) {
        const { error } = await supabase.auth.resend({ type: 'signup', email })
        if (error) throw error
      },

      async requestPasswordReset(email) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) throw error
      },

      /** Gọi sau khi người dùng đã vào được /reset-password qua link khôi phục trong email. */
      async updatePassword(password) {
        const { error } = await supabase.auth.updateUser({ password })
        if (error) throw error
      },
    }),
    [session, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
