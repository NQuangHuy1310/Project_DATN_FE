import { userApis } from '@/app/services/accounts'
import { useUserStore } from '@/app/store/userStore'
import routes from '@/configs/routes'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useRegisterTeacher = () => {
    const navigate = useNavigate()
    const setUserProfile = useUserStore((state) => state.setUser)
    return useMutation<any, Error>({
        mutationFn: async () => {
            return userApis.registerTeacher()
        },
        onSuccess() {
            localStorage.removeItem('selectedOptions')
            localStorage.removeItem('currentQuestion')
            const userData = localStorage.getItem('user_data')
            if (userData) {
                const parsedUserData = JSON.parse(userData)
                parsedUserData.user_type = 'teacher'
                localStorage.setItem('user_data', JSON.stringify(parsedUserData))
                setUserProfile(parsedUserData)
            }
            navigate(routes.instructorDashboard)
        }
    })
}
