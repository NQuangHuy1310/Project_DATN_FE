import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import routes from '@/configs/routes'
import { setAccessToken } from '@/lib'
import { backendUrl } from '@/configs/baseUrl'
import { useUserStore } from '@/app/store'

const GoogleLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const setUser = useUserStore((state) => state.setUser)
    const setProfile = useUserStore((state) => state.setProfile)

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const response = await fetch(`${backendUrl}auth/google/callback${location.search}`)
                const data = await response.json()

                if (data.access_token) {
                    window.close()
                    setUser(data.user)
                    setProfile(data.profile)
                    setAccessToken(data.access_token)
                    window.opener.location.reload()                    
                    // navigate(routes.userDashboard)
                    // toast.success('Đăng nhập thành công!, Chào mừng bạn quay trở lại.')
                } else {
                    console.error('error:', data)
                }
            } catch (error) {
                console.error('Error callback:', error)
            }
        }

        handleCallback()
    }, [location.search, navigate])
}

export default GoogleLogin
