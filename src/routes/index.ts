import routes from '@/configs/routes'

import Dashboard from '@/layouts/UserLayouts/Dashboard'
import HomeLayout from '@/layouts/AuthLayouts/HomeLayout'
import ProfileLayout from '@/layouts/UserLayouts/ProfileLayout'

import Home from '@/views/user/Home'

// Authentication
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'

// Account
import AccountHelp from '@/views/user/AccountHelp'
import ForgotPassword from '@/views/user/ForgotPassword'
import AccountProfile from '@/views/user/AccountProfile'
import AccountSettings from '@/views/user/AccountSettings'
import AccountNotifications from '@/views/user/AccountNotifications'

// course
import MyCourse from '@/views/course/MyCourse'
import Notifications from '@/views/user/Notification/Notifications'
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
    { path: routes.accountProfile, layout: ProfileLayout, element: AccountProfile },
    { path: routes.exploreCourses, layout: Dashboard, element: ExploreCourses },
    { path: routes.accountSetting, layout: ProfileLayout, element: AccountSettings },
    { path: routes.accountNotification, layout: ProfileLayout, element: AccountNotifications },
    { path: routes.accountHelp, layout: ProfileLayout, element: AccountHelp },
    { path: routes.notification, layout: Dashboard, element: Notifications },
    { path: routes.myCourse, layout: Dashboard, element: MyCourse }
]
