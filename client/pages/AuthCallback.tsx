import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { setToken, me } from '@/lib/auth'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const token = params.get('token')
        if (token) {
          setToken(token)
          const user = await me()
          if (user) {
            toast.success('Successfully signed in!')
            navigate('/')
            return
          }
          toast.error('Failed to load user profile')
          navigate('/login')
          return
        }
        toast.error('Missing token in callback')
        navigate('/login')
      } catch (error) {
        toast.error('Something went wrong. Please try again.')
        navigate('/login')
      }
    }

    handleAuthCallback()
  }, [navigate, params])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Completing sign in...
          </h2>
          <p className="text-muted-foreground text-center">
            Please wait while we complete your authentication.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
