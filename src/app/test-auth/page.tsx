'use client'

import { useState } from 'react'

export default function TestAuthPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const signInWithGoogle = async () => {
    setLoading(true)
    setError('')

    try {
      // 直接使用 Supabase 的 URL 构建 OAuth URL
      const supabaseUrl = 'https://pgypxuiafruqartrmfua.supabase.co'
      const redirectUri = encodeURIComponent('http://localhost:3000/api/auth/callback/google')
      const provider = 'google'

      // 构建 OAuth URL
      const oauthUrl = `${supabaseUrl}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUri}`

      console.log('OAuth URL:', oauthUrl)

      // 尝试直接重定向
      window.location.href = oauthUrl

    } catch (err: any) {
      setError(`Error: ${err.message}`)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <h1 className="text-3xl font-bold text-center">Test Google OAuth</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded text-red-600">
            {error}
          </div>
        )}

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Sign in with Google (Direct)'}
        </button>

        <div className="text-center text-sm text-gray-600">
          <p>This will attempt to sign in directly with Google OAuth</p>
          <p className="mt-2">Check browser console for any errors</p>
        </div>
      </div>
    </div>
  )
}