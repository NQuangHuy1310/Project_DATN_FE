import routes from '@/configs/routes'

import HomeLayout from '@/layouts/AuthLayouts/HomeLayout'

import Home from '@/views/user/Home'
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import ForgotPassword from '@/views/user/ForgotPassword'

// Routes không cần đăng nhập
export const publicRoutes = [
    { path: routes.home, layout: HomeLayout, element: Home },
    { path: routes.login, layout: HomeLayout, element: Login },
    { path: routes.register, layout: HomeLayout, element: Register },
    { path: routes.forgotPassword, layout: HomeLayout, element: ForgotPassword }
]

// Routes cần đăng nhập
