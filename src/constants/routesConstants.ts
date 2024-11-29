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
import CourseLearning from '@/views/user/Courses/CourseLearning'
import CourseMyCourses from '@/views/user/Courses/CourseSearch'
import CourseDetail from '@/views/user/Courses/CourseDetail'

import UserDashboard from '@/views/user/Dashboard'
import Instructor from '@/views/user/Instructors'
import Notifications from '@/views/user/Notifications'
import InstructorDetail from '@/views/user/Instructors/InstructorDetail'

// Instructor
import CreateCourse from '@/views/instructor/Course/CreateCourse'
import InstructorDashboard from '@/views/instructor/Dashboard'
import CommunicateMessage from '@/views/instructor/Communicate/CommunicateMessage'
import InstructorWallet from '@/views/instructor/Wallet'

// Post
import Posts from '@/views/user/Posts/Posts'
import MyPosts from '@/views/user/Posts/MyPosts'
import NewPost from '@/views/user/Posts/NewPosts'
import MyBookmarks from '@/views/user/Posts/MyBookmarks'

import Transaction from '@/views/user/wallet/transaction/Transaction'
import PostDetail from '@/views/user/Posts/PostDetail'
import CourseDetailNoLogin from '@/views/user/Courses/CourseDetailNoLogin/CourseDetailNoLogin'
import PerformanceOverview from '@/views/instructor/Performance/PerformanceOverview'

import InstructorRegis from '@/views/user/InstructorRegis/InstrcutorRegisTeacher/InstructorRegisTeacher'
import InstructorRegisQuestion from '@/views/user/InstructorRegis/InstructorRegisQuestion/InstructorRegisQuestion'
import CourseOutstanding from '@/views/user/Courses/CourseOutstanding'
import PostFeatured from '@/views/user/Posts/PostFeatured'
import CourseWishList from '@/views/user/Courses/CourseWishList'
import PerformanceStudents from '@/views/instructor/Performance/PerformanceStudents'
import Certification from '@/views/user/Certification/Certification'
import CourseHistory from '@/views/user/Courses/CourseHistory'
import LearningPath from '@/views/user/LearningPath'
import LearningPathCourse from '@/views/user/LearningPath/LearningPathCourse'
import PerformanceRatings from '@/views/instructor/Performance/PerformanceRatings'
import Communicate from '@/views/user/ComunicateAi/Communicate'
import Discount from '@/views/user/Discount/Discount'
import Profile from '@/views/user/Profile'

// Routes không cần đăng nhập
export const publicRoutes = [
    { path: routes.home, layout: HomeLayout, element: Home },
    { path: routes.login, layout: HomeLayout, element: Login },
    { path: routes.register, layout: HomeLayout, element: Register },
    { path: routes.forgotPassword, layout: HomeLayout, element: ForgotPassword },
    { path: routes.courseDetailNoLogin, layout: HomeLayout, element: CourseDetailNoLogin },
    { path: routes.courseOutstanding, layout: HomeLayout, element: CourseOutstanding },
    { path: routes.postFeatured, layout: HomeLayout, element: PostFeatured }
]

// Routes cần đăng nhập
export const privateRoutes = [
    // User dashboard
    { path: routes.accountHelp, layout: ProfileLayout, element: AccountHelp, title: 'Hỗ trợ' },
    { path: routes.accountProfile, layout: ProfileLayout, element: AccountProfile, title: 'Thông tin cá nhân' },
    { path: routes.accountSettings, layout: ProfileLayout, element: AccountSettings, title: 'Cài đặt' },
    { path: routes.accountNotifications, layout: ProfileLayout, element: AccountNotifications, title: 'Thông báo' },

    { path: routes.profileUser, layout: UserDashboardLayout, element: Profile, title: 'Trang cá nhân' },
    { path: routes.myCourses, layout: UserDashboardLayout, element: MyCourse, title: 'Khoá học của tôi' },
    { path: routes.wishList, layout: UserDashboardLayout, element: CourseWishList, title: 'Khoá học yêu thích' },
    { path: routes.course, layout: UserDashboardLayout, element: CourseExplore, title: 'Khám phá khoá học' },
    { path: routes.searchCourses, layout: UserDashboardLayout, element: CourseMyCourses, title: 'Tìm kiếm khoá học' },
    { path: routes.courseDetail, layout: UserDashboardLayout, element: CourseDetail, title: 'Chi tiết khoá học' },
    { path: routes.courseHistory, layout: UserDashboardLayout, element: CourseHistory, title: 'Lịch sử học tập' },
    { path: routes.courseLeaning, layout: CourseLayout, element: CourseLearning },

    {
        path: routes.userDashboard,
        layout: UserDashboardLayout,
        element: UserDashboard,
        title: localStorage.getItem('user_data')
            ? `Xin chào, ${JSON.parse(localStorage.getItem('user_data')!)?.name}`
            : 'Xin chào'
    },
    { path: routes.instructor, layout: UserDashboardLayout, element: Instructor, title: 'Giảng viên' },
    { path: routes.instructorDetail, layout: UserDashboardLayout, element: InstructorDetail, title: 'Người hướng dẫn' },
    { path: routes.notification, layout: UserDashboardLayout, element: Notifications, title: 'Thông báo' },

    { path: routes.newPost, layout: UserDashboardLayout, element: NewPost, title: 'Tạo bài viết' },
    { path: routes.editPost, layout: UserDashboardLayout, element: NewPost, title: 'Chỉnh sửa bài viết' },
    { path: routes.posts, layout: UserDashboardLayout, element: Posts, title: 'Danh sách bài viết' },
    { path: routes.myPosts, layout: UserDashboardLayout, element: MyPosts, title: 'Bài viết của tôi' },
    { path: routes.myBookmarks, layout: UserDashboardLayout, element: MyBookmarks, title: 'Bài viết đã lưu' },
    { path: routes.postsDetail, layout: UserDashboardLayout, element: PostDetail, title: 'Chi tiết bài viết' },

    // Instructor register
    {
        path: routes.instructorRegister,
        layout: UserDashboardLayout,
        element: InstructorRegis,
        title: 'Đăng kí trở thành giảng viên'
    },
    {
        path: routes.instructorRegisterQuestion,
        layout: UserDashboardLayout,
        element: InstructorRegisQuestion,
        title: 'Khảo sát'
    },
    // wallet
    { path: routes.wallet, layout: UserDashboardLayout, element: Transaction, title: 'Nạp tiền vào tài khoản' },
    { path: routes.communicate, layout: UserDashboardLayout, element: Communicate, title: 'Chat AI' },
    // LearningPath
    { path: routes.learningPaths, layout: UserDashboardLayout, element: LearningPath, title: 'Lộ trình học tập' },
    {
        path: routes.courseLeaningPath,
        layout: UserDashboardLayout,
        element: LearningPathCourse,
        title: 'Lộ trình học tập'
    },

    // Certification
    { path: routes.certification, layout: UserDashboardLayout, element: Certification, title: 'Chứng chỉ' },

    //Payment
    { path: routes.discount, layout: UserDashboardLayout, element: Discount, title: 'Mã giảm giá của bạn' },

    // Instructor Dashboard
    {
        path: routes.instructorDashboard,
        layout: InstructorDashboardLayout,
        element: InstructorDashboard,
        title: 'Quản lý khoá học'
    },
    { path: routes.createCourse, layout: InstructorDashboardLayout, element: CreateCourse, title: 'Tạo mới khoá học' },
    {
        path: routes.instructorMessage,
        layout: InstructorDashboardLayout,
        element: CommunicateMessage,
        title: 'Tin nhắn'
    },
    {
        path: routes.instructorPerformanceOverview,
        layout: InstructorPerformance,
        element: PerformanceOverview,
        title: 'Tổng quan thống kê'
    },
    {
        path: routes.instructorPerformanceStudent,
        layout: InstructorPerformance,
        element: PerformanceStudents,
        title: 'Học viên'
    },
    {
        path: routes.instructorPerformanceRating,
        layout: InstructorPerformance,
        element: PerformanceRatings,
        title: 'Đánh giá'
    },
    {
        path: routes.instructorWallet,
        layout: InstructorDashboardLayout,
        element: InstructorWallet,
        title: 'Quản lý giao dịch'
    }
]

export const validRoutesMember = [
    routes.userDashboard,
    routes.course,
    routes.myCourses,
    routes.searchCourses,
    routes.courseDetail,
    routes.courseLeaning,
    routes.courseDetailNoLogin,
    routes.courseOutstanding,
    routes.instructor,
    routes.instructorDetail,
    routes.account,
    routes.accountProfile,
    routes.accountHelp,
    routes.accountSettings,
    routes.accountNotifications,
    routes.wallet,
    routes.transaction,
    routes.discount,
    routes.posts,
    routes.postsDetail,
    routes.newPost,
    routes.editPost,
    routes.myPosts,
    routes.myBookmarks,
    routes.postFeatured
]
