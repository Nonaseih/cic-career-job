'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = (formData.get('next') as string) || '/mypage'

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return 'メールアドレスまたはパスワードが正しくありません。'
    }
    return 'ログインに失敗しました。しばらくしてから再度お試しください。'
  }

  redirect(next)
}

export async function register(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    if (error.message.includes('already registered')) {
      return 'このメールアドレスはすでに登録されています。'
    }
    if (error.message.includes('Password should be')) {
      return 'パスワードは6文字以上で入力してください。'
    }
    return '登録に失敗しました。しばらくしてから再度お試しください。'
  }

  redirect('/register/confirm')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
