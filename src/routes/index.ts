import router from '@/configs/routes'

import Home from '@/views/user/Home'

import HomeLayout from '@/layouts/AuthLayouts/HomeLayout'

// Routes không cần đăng nhập
export const publicRoutes = [{ path: router.home, layout: HomeLayout, element: Home }]

// Routes cần đăng nhập
