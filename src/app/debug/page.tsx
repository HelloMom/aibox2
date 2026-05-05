'use client'

import { useEffect, useState } from 'react'

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<any>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 检查环境变量
    const checkEnv = () => {
      const vars = {
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        // 注意：在客户端无法访问 GOOGLE_CLIENT_ID 和 GOOGLE_CLIENT_SECRET
      }
      setEnvVars(vars)

      // 检查必要的环境变量
      if (!vars.SUPABASE_URL || !vars.SUPABASE_ANON_KEY) {
        setError('Missing required Supabase environment variables')
      }
    }

    checkEnv()
  }, [])

  const testOAuth = async () => {
    try {
      const supabase = (await import('@/lib/auth-client')).getSupabaseClient()

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/callback/google`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      if (error) {
        setError(`OAuth error: ${error.message}`)
        console.error('OAuth error:', error)
      } else {
        console.log('OAuth URL:', data.url)
        // 应该会自动重定向，所以这里不会执行
      }
    } catch (err: any) {
      setError(`Test error: ${err.message}`)
      console.error('Test error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Authentication</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm">
              <pre>{JSON.stringify(envVars, null, 2)}</pre>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded">
              <h2 className="text-xl font-semibold mb-2 text-red-800">Error</h2>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-4">Test OAuth</h2>
            <button
              onClick={testOAuth}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test Google OAuth
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>确保在 Supabase 控制台中启用了 Google 提供商</li>
              <li>确保 Client ID 和 Client Secret 正确</li>
              <li>确保添加了 Authorized Redirect URL: <code className="bg-gray-200 px-1 rounded">http://localhost:3000/api/auth/callback/google</code></li>
              <li>检查 Google Cloud Console 中是否启用了 OAuth 2.0 API</li>
              <li>检查 Google Cloud Console 中的授权重定向 URI</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Links</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://pgypxuiafruqartrmfua.supabase.co/project/_/auth/providers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Go to Supabase Authentication Providers
                </a>
              </li>
              <li>
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Go to Google Cloud Console Credentials
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}