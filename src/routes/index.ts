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

import UserDashboard from '@/views/user/Dashboard'
import Instructor from '@/views/user/Instructors'
import Notifications from '@/views/user/Notifications'
import InstructorDetail from '@/views/user/Instructors/InstructorDetail'
import InstructorDashboardLayout from '@/layouts/InstructorLayouts/InstructorDashboard'

// Instructor
import InstructorDashboard from '@/views/instructor/Dashboard'

// Routes không cần đăng nhập
export const publicRoutes = [
    { path: routes.home, layout: HomeLayout, element: Home },
    { path: routes.login, layout: HomeLayout, element: Login },
    { path: routes.register, layout: HomeLayout, element: Register },
    { path: routes.forgotPassword, layout: HomeLayout, element: ForgotPassword }
]

// Routes cần đăng nhập
export const privateRoutes = [
    // User dashboard
    { path: routes.accountHelp, layout: ProfileLayout, element: AccountHelp, title: 'Hỗ trợ' },
    { path: routes.accountProfile, layout: ProfileLayout, element: AccountProfile, title: 'Thông tin cá nhân' },
    { path: routes.accountSettings, layout: ProfileLayout, element: AccountSettings, title: 'Cài đặt' },
    { path: routes.accountNotifications, layout: ProfileLayout, element: AccountNotifications, title: 'Thông báo' },

    { path: routes.myCourses, layout: DashboardLayout, element: MyCourse, title: 'Khoá học của tôi' },
    { path: routes.course, layout: DashboardLayout, element: CourseExplore, title: 'Khám phá khoá học' },
    { path: routes.searchCourses, layout: DashboardLayout, element: CourseMyCourses, title: 'Tìm kiếm khoá học' },
    { path: routes.courseDetail, layout: DashboardLayout, element: CourseDetail, title: 'Chi tiết ...' },

    { path: routes.userDashboard, layout: DashboardLayout, element: UserDashboard, title: 'Xin chào ...' },
    { path: routes.instructor, layout: DashboardLayout, element: Instructor, title: 'Giảng viên' },
    { path: routes.instructorDetail, layout: DashboardLayout, element: InstructorDetail, title: 'Người hướng dẫn...' },
    { path: routes.notification, layout: DashboardLayout, element: Notifications, title: 'Thông báo' },

    // Instructor Dashboard
    { path: routes.instructorDashboard, layout: InstructorDashboardLayout, element: InstructorDashboard }
]
