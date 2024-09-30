import routes from '@/configs/routes'

import DashboardLayout from '@/layouts/UserLayouts/Dashboard'
import HomeLayout from '@/layouts/AuthLayouts/HomeLayout'
import ProfileLayout from '@/layouts/UserLayouts/ProfileLayout'

import Home from '@/views/user/Home'

// Authentication
import Login from '@/views/user/Auth/Login'
import Register from '@/views/user/Auth/Register'
import ForgotPassword from '@/views/user/Auth/ForgotPassword'

// Account
import AccountHelp from '@/views/user/Account/AccountHelp'
import AccountProfile from '@/views/user/Account/AccountProfile'
import AccountSettings from '@/views/user/Account/AccountSettings'
import AccountNotifications from '@/views/user/Account/AccountNotifications'

// course
import MyCourse from '@/views/user/Courses/MyCourse'
import CourseExplore from '@/views/user/Courses/CourseExplore'
import CourseMyCourses from '@/views/user/Courses/CourseSearch'
import CourseDetail from '@/views/user/Courses/CourseDetail'

import Dashboard from '@/views/user/Dashboard'
import Instructor from '@/views/user/Instructors'
import Notifications from '@/views/user/Notifications'

// Routes không cần đăng nhập
export const publicRoutes = [
    { path: routes.home, layout: HomeLayout, element: Home },
    { path: routes.login, layout: HomeLayout, element: Login },
    { path: routes.register, layout: HomeLayout, element: Register },
    { path: routes.forgotPassword, layout: HomeLayout, element: ForgotPassword }
]

// Routes cần đăng nhập
export const privateRoutes = [
    // Account
    { path: routes.accountHelp, layout: ProfileLayout, element: AccountHelp },
    { path: routes.accountProfile, layout: ProfileLayout, element: AccountProfile },
    { path: routes.accountSetting, layout: ProfileLayout, element: AccountSettings },
    { path: routes.accountNotification, layout: ProfileLayout, element: AccountNotifications },

    { path: routes.myCourse, layout: DashboardLayout, element: MyCourse },
    { path: routes.course, layout: DashboardLayout, element: CourseExplore },
    { path: routes.searchCourses, layout: DashboardLayout, element: CourseMyCourses },
    { path: routes.courseDetail, layout: DashboardLayout, element: CourseDetail },

    { path: routes.dashboard, layout: DashboardLayout, element: Dashboard },
    { path: routes.instructor, layout: DashboardLayout, element: Instructor },
    { path: routes.notification, layout: DashboardLayout, element: Notifications }
]
