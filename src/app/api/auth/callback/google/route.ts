import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Google auth error:', error)
      return NextResponse.redirect(new URL('/login?error=google_auth_failed', request.url))
    }

    // 获取用户信息
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user?.id)
      .single()

    // 如果用户不存在，创建用户档案
    if (userError) {
      const { data: insertedProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: data.user?.id,
          email: data.user?.email,
          full_name: data.user?.user_metadata?.full_name,
          avatar_url: data.user?.user_metadata?.avatar_url,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Profile creation error:', insertError)
        return NextResponse.redirect(new URL('/login?error=profile_creation_failed', request.url))
      }
    }
  }

  return NextResponse.redirect(new URL(next, request.url))
}