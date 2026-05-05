'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { getCurrentUser } = await import('@/lib/auth-client')
        const user = await getCurrentUser()

        if (user) {
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Auth check error:', error)
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Aibox2</h1>
                <p className="text-sm text-gray-600">AI-powered application</p>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="text-gray-700 hover:text-gray-900">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="text-gray-700 hover:text-gray-900">
                      Login
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 flex items-center justify-center py-12">
            <div className="max-w-3xl mx-auto text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Welcome to Aibox2
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Experience the power of AI with our cutting-edge application.
                Sign in to access your personalized dashboard and explore all features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Started
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <p className="text-center text-sm text-gray-600">
                © 2024 Aibox2. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
