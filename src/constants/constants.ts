/* eslint-disable no-unused-vars */
import { BiBook } from 'react-icons/bi'
import { BsPlayBtn } from 'react-icons/bs'
import { LuUserCircle } from 'react-icons/lu'
import { PiStudentBold } from 'react-icons/pi'
import { IoWalletSharp } from 'react-icons/io5'
import { PiArticleMediumLight } from 'react-icons/pi'
import { MdSecurity, MdArticle } from 'react-icons/md'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { TbMessageDots, TbUserHexagon } from 'react-icons/tb'
import { HiBookOpen, HiOutlineTemplate } from 'react-icons/hi'
import { IoMdHelpCircleOutline, IoMdHome } from 'react-icons/io'
import { FaAddressBook, FaRegBell, FaUserCog } from 'react-icons/fa'
import { IoSettingsOutline, IoChatboxEllipsesOutline } from 'react-icons/io5'
import { FaRegCircleQuestion, FaRegCircleCheck, FaChartSimple, FaBookAtlas } from 'react-icons/fa6'

import routes from '@/configs/routes'
import { RiBloggerLine } from 'react-icons/ri'

export const sidebarList = [
    {
        title: 'Tổng quan',
        icon: HiOutlineTemplate,
        path: routes.userDashboard
    },
    {
        title: 'Khoá học',
        icon: HiBookOpen,
        path: routes.course,
        children: [
            {
                title: 'Khoá học của tôi',
                icon: FaAddressBook,
                path: routes.myCourses
            },
            {
                title: 'Tìm kiếm khoá học',
                icon: FaBookAtlas,
                path: routes.searchCourses
            }
        ]
    },
    {
        title: 'Người hướng dẫn',
        icon: TbUserHexagon,
        path: routes.instructor
    },
    {
        title: 'Bài viết',
        icon: MdArticle,
        path: routes.posts,
        children: [
            {
                title: 'Viết Blog',
                icon: RiBloggerLine,
                path: routes.newPost
            },
            {
                title: 'Bài viết của tôi',
                icon: RiBloggerLine,
                path: routes.myPosts
            },
            {
                title: 'Bài viết đã lưu',
                icon: PiArticleMediumLight,
                path: routes.myBookmarks
            }
        ]
    },
    {
        title: 'Ví',
        icon: IoWalletSharp,
        path: routes.wallet
    },
    {
        title: 'Tài khoản',
        icon: FaUserCog,
        path: routes.accountProfile
    }
]

export const sidebarListInstructor = [
    {
        title: 'Khoá học',
        icon: BsPlayBtn,
        path: routes.instructorDashboard
    },
    {
        title: 'Giao tiếp',
        icon: IoChatboxEllipsesOutline,
        path: routes.instructorQa
    },
    {
        title: 'Hiệu xuất',
        icon: FaChartSimple,
        path: routes.instructorPerformanceOverview
    },
    {
        title: 'Quản lý ví',
        icon: IoWalletSharp,
        path: routes.instructorWallet
    }
]

export const accountAside = [
    {
        title: 'Thông tin cá nhân',
        icon: LuUserCircle,
        path: routes.accountProfile
    },
    {
        title: 'Cài đặt tài khoản',
        icon: IoSettingsOutline,
        path: routes.accountSettings
    },
    {
        title: 'Thông báo',
        icon: FaRegBell,
        path: routes.accountNotifications
    },
    {
        title: 'Hỗ trợ',
        icon: IoMdHelpCircleOutline,
        path: routes.accountHelp
    }
]

export const instructorAside = [
    {
        title: 'Hỏi đáp',
        icon: AiOutlineQuestionCircle,
        path: routes.instructorQa
    },
    {
        title: 'Tin nhắn',
        icon: TbMessageDots,
        path: routes.instructorMessage
    },
    {
        title: 'Bài tập',
        icon: BiBook,
        path: routes.instructorAssignments
    },
    {
        title: 'Thông báo',
        icon: FaRegBell,
        path: routes.instructorAnnouncements
    }
]

export const instructorPerformanceAside = [
    {
        title: 'Tổng quan',
        icon: HiOutlineTemplate,
        path: routes.instructorPerformanceOverview
    },
    {
        title: 'Học viên',
        icon: PiStudentBold,
        path: routes.instructorPerformanceStudent
    }
]

export const homeSidebar = [
    {
        title: 'Trang chủ',
        icon: IoMdHome,
        path: routes.home
    }
]

export const AccountHelps = [
    {
        title: 'Coursea là gì',
        description: 'Lần đầu tiên đến đây? Khám phá cách Coursea có thể giúp bạn phát triển bản thân.',
        icon: FaRegCircleQuestion
    },
    {
        title: 'Điều khoản & Điều kiện',
        description: 'Cập nhật chính sách bảo mật của bạn để bao gồm các điều khoản và điều kiện mới nhất.',
        icon: MdSecurity
    },
    {
        title: 'Bắt đầu',
        description: 'Tất cả những thông tin cần thiết để bạn có thể bắt đầu hành trình học tập với Coursea.',
        icon: FaRegCircleCheck
    }
]

export const lessonOptions = [
    {
        name: 'Video bài giảng',
        type: 'video'
    },
    {
        name: 'Tài liệu',
        type: 'document'
    },
    {
        name: 'Bài tập trắc nghiệm',
        type: 'quizzes'
    },
    {
        name: 'Bài tập coding',
        type: 'coding'
    }
]

export enum CourseLevel {
    Beginner = 'Sơ cấp',
    Intermediate = 'Trung cấp',
    Master = 'Chuyên gia'
}

export enum TeacherStatus {
    follow = 'Theo dõi',
    unFollow = 'Đã theo dõi'
}

export enum notificationTypes {
    system = 'System',
    instructor = 'Instructor',
    user = 'User'
}
