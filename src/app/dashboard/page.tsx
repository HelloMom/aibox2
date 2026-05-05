'use client'

import { getCurrentUser, signOut } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface UserProfile {
  id: string
  email?: string
  full_name?: string
  avatar_url?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        if (currentUser) {
          // Note: getUserProfile needs to be imported from auth-client
          // For now, we'll create a basic profile object
          const profileData = {
            id: currentUser.id,
            email: currentUser.email,
            full_name: currentUser.user_metadata?.full_name,
            avatar_url: currentUser.user_metadata?.avatar_url,
          }
          setProfile(profileData)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = '/login'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not Authenticated</h1>
          <p className="mb-4">Please sign in to view the dashboard</p>
          <Button onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back!</p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">User Information</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                <div>
                  <strong>User ID:</strong> {user.id}
                </div>
                <div>
                  <strong>Provider:</strong> {user.app_metadata?.provider || 'Unknown'}
                </div>
              </div>
            </div>

            {profile && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Profile</h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div>
                    <strong>Full Name:</strong> {profile.full_name || 'Not set'}
                  </div>
                  {profile.avatar_url && (
                    <div>
                      <strong>Avatar:</strong>
                      <div className="mt-2">
                        <img
                          src={profile.avatar_url}
                          alt="Profile"
                          className="w-16 h-16 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold mb-2">Session</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>
                  <strong>Access Token:</strong> {user.access_token ? 'Present' : 'Not available'}
                </p>
                <p className="mt-1">
                  <strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}