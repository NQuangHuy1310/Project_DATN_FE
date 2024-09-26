import routes from '@/configs/routes'

import Dashboard from '@/layouts/UserLayouts/Dashboard'
import HomeLayout from '@/layouts/AuthLayouts/HomeLayout'
import ProfileLayout from '@/layouts/UserLayouts/ProfileLayout'

import Home from '@/views/user/Home'
import Login from '@/views/user/Login'
import Profile from '@/views/user/Profile'
import Register from '@/views/user/Register'
import ForgotPassword from '@/views/user/ForgotPassword'
import ExploreCourses from '@/views/course/ExploreCourses/ExploreCourses'

// Routes không cần đăng nhập
export const publicRoutes = [
    { path: routes.home, layout: HomeLayout, element: Home },
    { path: routes.login, layout: HomeLayout, element: Login },
    { path: routes.register, layout: HomeLayout, element: Register },
    { path: routes.forgotPassword, layout: HomeLayout, element: ForgotPassword }
]

// Routes cần đăng nhập
export const privateRoutes = [
    { path: routes.profile, layout: ProfileLayout, element: Profile },
    { path: routes.exploreCourses, layout: Dashboard, element: ExploreCourses }
]
