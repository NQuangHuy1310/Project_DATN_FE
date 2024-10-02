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
import InstructorDetail from '@/views/user/Instructors/InstructorDetail'

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
    { path: routes.accountHelp, layout: ProfileLayout, element: AccountHelp, title: 'Hỗ trợ' },
    { path: routes.accountProfile, layout: ProfileLayout, element: AccountProfile, title: 'Thông tin cá nhân' },
    { path: routes.accountSetting, layout: ProfileLayout, element: AccountSettings, title: 'Cài đặt' },
    { path: routes.accountNotification, layout: ProfileLayout, element: AccountNotifications, title: 'Thông báo' },

    { path: routes.myCourse, layout: DashboardLayout, element: MyCourse, title: 'Khóa học của tôi' },
    { path: routes.course, layout: DashboardLayout, element: CourseExplore, title: 'Khám phá khóa học' },
    { path: routes.searchCourses, layout: DashboardLayout, element: CourseMyCourses, title: 'Tìm kiếm khóa học' },
    { path: routes.courseDetail, layout: DashboardLayout, element: CourseDetail, title: 'Chi tiết khóa học' },

    { path: routes.dashboard, layout: DashboardLayout, element: Dashboard, title: 'Xin chào ...' },
    { path: routes.instructor, layout: DashboardLayout, element: Instructor, title: 'Giảng viên' },
    { path: routes.instructorDetail, layout: DashboardLayout, element: InstructorDetail, title: 'Chi tiết giảng viên' },
    { path: routes.notification, layout: DashboardLayout, element: Notifications, title: 'Thông báo' }
]
