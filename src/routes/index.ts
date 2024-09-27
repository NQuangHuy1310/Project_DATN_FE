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
import Notification from '@/views/user/Notification/Notification'
import CourseExplore from '@/views/user/CourseExplore'
import CourseMyCourses from '@/views/user/CourseSearch'

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
    { path: routes.accountSetting, layout: ProfileLayout, element: AccountSettings },
    { path: routes.accountNotification, layout: ProfileLayout, element: AccountNotifications },
    { path: routes.accountHelp, layout: ProfileLayout, element: AccountHelp },
    { path: routes.notification, layout: Dashboard, element: Notification },
    { path: routes.exploreCourses, layout: Dashboard, element: CourseExplore },
    { path: routes.course, layout: Dashboard, element: CourseExplore },
    { path: routes.searchCourses, layout: Dashboard, element: CourseMyCourses }
]
