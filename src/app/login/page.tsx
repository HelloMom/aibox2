'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')

    try {
      // 使用硬编码的值避免环境变量问题
      const supabaseUrl = 'https://pgypxuiafruqartrmfua.supabase.co'
      const redirectUri = encodeURIComponent('http://localhost:3000/api/auth/callback/google')

      // 构建 OAuth URL
      const oauthUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectUri}`

      console.log('Redirecting to:', oauthUrl)

      // 直接重定向
      window.location.href = oauthUrl

    } catch (err: any) {
      console.error('Sign in error:', err)
      setError(`Failed to start sign in: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Aibox2</h1>
          <p className="mt-2 text-gray-600">Sign in to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded text-red-600">
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-2">Check browser console for details</p>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          <div className="text-center text-sm text-gray-600">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Troubleshooting Tips:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Make sure Google OAuth is enabled in Supabase</li>
            <li>• Check Client ID and Secret are correct</li>
            <li>• Ensure redirect URL is authorized in Google Console</li>
            <li>• Check browser console for specific error messages</li>
          </ul>
        </div>
      </div>
    </div>
  )
}