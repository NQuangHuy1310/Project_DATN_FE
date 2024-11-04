import routes from '@/configs/routes'

import HomeLayout from '@/app/layouts/AuthLayouts/HomeLayout'
import CourseLayout from '@/app/layouts/AuthLayouts/CourseLayouts'
import ProfileLayout from '@/app/layouts/UserLayouts/ProfileLayout'
import UserDashboardLayout from '@/app/layouts/UserLayouts/Dashboard'
import InstructorDashboardLayout from '@/app/layouts/InstructorLayouts/InstructorDashboard'
import InstructorPerformance from '@/app/layouts/InstructorLayouts/InstructorPerformance'

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
import CourseLearning from '@/views/user/Courses/CourseLeaning'

import UserDashboard from '@/views/user/Dashboard'
import Instructor from '@/views/user/Instructors'
import Notifications from '@/views/user/Notifications'
import InstructorDetail from '@/views/user/Instructors/InstructorDetail'

// Instructor
import CreateCourse from '@/views/instructor/Course/CreateCourse'
import InstructorDashboard from '@/views/instructor/Dashboard'
import InstructorCommunicate from '@/app/layouts/InstructorLayouts/InstructorCommunicate'
import CommunicateQa from '@/views/instructor/Communicate/CommunicateQa'
import CommunicateMessage from '@/views/instructor/Communicate/CommunicateMessage'
import CommunicateAnnoucement from '@/views/instructor/Communicate/CommunicateAnnoucement'
import CommunicateAssiment from '@/views/instructor/Communicate/CommunicateAssiment'
import InsstructorWallet from '@/views/instructor/Wallet'

// Post
import Posts from '@/views/user/Posts/Posts'
import MyPosts from '@/views/user/Posts/MyPosts'
import NewPost from '@/views/user/Posts/NewPosts'
import MyBookmarks from '@/views/user/Posts/MyBookmarks'

import Payment from '@/views/user/Payment/Payment'
import PostDetail from '@/views/user/Posts/PostDetail'
import CourseDetailNoLogin from '@/views/user/Courses/CourseDetailNoLogin/CourseDetailNoLogin'
import Transaction from '@/views/user/wallet/Transaction'
import PerformanceOverview from '@/views/instructor/Performance/PerformanceOverview'

// Routes không cần đăng nhập
export const publicRoutes = [
    { path: routes.home, layout: HomeLayout, element: Home },
    { path: routes.login, layout: HomeLayout, element: Login },
    { path: routes.register, layout: HomeLayout, element: Register },
    { path: routes.forgotPassword, layout: HomeLayout, element: ForgotPassword },
    { path: routes.courseDetailNoLogin, layout: HomeLayout, element: CourseDetailNoLogin }
]

// Routes cần đăng nhập
export const privateRoutes = [
    // User dashboard
    { path: routes.accountHelp, layout: ProfileLayout, element: AccountHelp, title: 'Hỗ trợ' },
    { path: routes.accountProfile, layout: ProfileLayout, element: AccountProfile, title: 'Thông tin cá nhân' },
    { path: routes.accountSettings, layout: ProfileLayout, element: AccountSettings, title: 'Cài đặt' },
    { path: routes.accountNotifications, layout: ProfileLayout, element: AccountNotifications, title: 'Thông báo' },

    { path: routes.myCourses, layout: UserDashboardLayout, element: MyCourse, title: 'Khoá học của tôi' },
    { path: routes.course, layout: UserDashboardLayout, element: CourseExplore, title: 'Khám phá khoá học' },
    { path: routes.searchCourses, layout: UserDashboardLayout, element: CourseMyCourses, title: 'Tìm kiếm khoá học' },
    { path: routes.courseDetail, layout: UserDashboardLayout, element: CourseDetail, title: 'Chi tiết ...' },
    { path: routes.courseLeaning, layout: CourseLayout, element: CourseLearning },

    { path: routes.userDashboard, layout: UserDashboardLayout, element: UserDashboard, title: 'Xin chào ...' },
    { path: routes.instructor, layout: UserDashboardLayout, element: Instructor, title: 'Giảng viên' },
    { path: routes.instructorDetail, layout: UserDashboardLayout, element: InstructorDetail, title: 'Người hướng dẫn' },
    { path: routes.notification, layout: UserDashboardLayout, element: Notifications, title: 'Thông báo' },

    { path: routes.newPost, layout: UserDashboardLayout, element: NewPost, title: 'Tạo bài viết' },
    { path: routes.editPost, layout: UserDashboardLayout, element: NewPost, title: 'Chỉnh sửa bài viết' },
    { path: routes.posts, layout: UserDashboardLayout, element: Posts, title: 'Danh sách bài viết' },
    { path: routes.myPosts, layout: UserDashboardLayout, element: MyPosts, title: 'Bài viết của tôi' },
    { path: routes.myBookmarks, layout: UserDashboardLayout, element: MyBookmarks, title: 'Bài viết đã lưu' },
    { path: routes.postsDetail, layout: UserDashboardLayout, element: PostDetail, title: 'Chi tiết bài viết' },

    // wallet
    { path: routes.wallet, layout: UserDashboardLayout, element: Transaction, title: 'Nạp tiền vào tài khoản' },

    //Payment
    { path: routes.payment, layout: UserDashboardLayout, element: Payment, title: 'Thanh toán' },

    // Instructor Dashboard
    {
        path: routes.instructorDashboard,
        layout: InstructorDashboardLayout,
        element: InstructorDashboard,
        title: 'Quản lý khoá học'
    },
    { path: routes.createCourse, layout: InstructorDashboardLayout, element: CreateCourse, title: 'Tạo mới khoá học' },
    { path: routes.instructorQa, layout: InstructorCommunicate, element: CommunicateQa, title: 'Hỏi đáp' },
    { path: routes.instructorMessage, layout: InstructorCommunicate, element: CommunicateMessage, title: 'Tin nhắn' },
    {
        path: routes.instructorPerformanceOverview,
        layout: InstructorPerformance,
        element: PerformanceOverview,
        title: 'Hiệu suất'
    },
    {
        path: routes.instructorAnnouncements,
        layout: InstructorCommunicate,
        element: CommunicateAnnoucement,
        title: 'Thông báo'
    },
    {
        path: routes.instructorAssignments,
        layout: InstructorCommunicate,
        element: CommunicateAssiment,
        title: 'Bài tập'
    },
    {
        path: routes.instructorWallet,
        layout: InstructorDashboardLayout,
        element: InsstructorWallet,
        title: 'Ví của tôi'
    }
]
