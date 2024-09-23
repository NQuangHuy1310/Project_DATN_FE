import { useEffect } from 'react'
import { useUserStore } from '@/store'

const useGetUserProfile = () => {
    const user = useUserStore((state) => state.user)
    const profile = useUserStore((state) => state.profile)
    const setUser = useUserStore((state) => state.setUser)
    const setProfile = useUserStore((state) => state.setProfile)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const storedProfile = localStorage.getItem('profile')

        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        if (storedProfile) {
            setProfile(JSON.parse(storedProfile))
        }
    }, [setUser, setProfile])

    return { user, profile }
}

export default useGetUserProfile
