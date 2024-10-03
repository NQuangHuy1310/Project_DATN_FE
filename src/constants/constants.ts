/* eslint-disable no-unused-vars */
import { LuUserCircle } from 'react-icons/lu'
import { TbUserHexagon } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'
import { FaRegBell, FaUserCog } from 'react-icons/fa'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { MdSecurity, MdArticle } from 'react-icons/md'
import { HiBookOpen, HiOutlineTemplate } from 'react-icons/hi'
import { FaRegCircleQuestion, FaRegCircleCheck } from 'react-icons/fa6'

import routes from '@/configs/routes'

export const sidebarList = [
    {
        title: 'Tổng quan',
        icon: HiOutlineTemplate,
        path: routes.dashboard
    },
    {
        title: 'Khoá học',
        icon: HiBookOpen,
        path: routes.course,
        children: [
            {
                title: 'Khoá học của tôi',
                path: routes.myCourse
            },
            {
                title: 'Tìm kiếm khoá học',
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
        path: routes.post,
        children: [
            {
                title: 'Bài viết của tôi',
                path: routes.mePost
            },
            {
                title: 'Bài viết đã lưu',
                path: routes.meBookmark
            }
        ]
    },
    {
        title: 'Tài khoản',
        icon: FaUserCog,
        path: routes.accountProfile
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
        path: routes.accountSetting
    },
    {
        title: 'Thông báo',
        icon: FaRegBell,
        path: routes.accountNotification
    },
    {
        title: 'Hỗ trợ',
        icon: IoMdHelpCircleOutline,
        path: routes.accountHelp
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

export enum CourseLevel {
    Beginner = 'Sơ cấp',
    Intermediate = 'Trung cấp',
    Master = 'Chuyên gia'
}

export enum TeacherStatus {
    follow = 'Theo dõi',
    followed = 'Đã theo dõi',
    unFollow = 'Huỷ theo dõi'
}

export enum notificationTypes {
    system = 'System',
    instructor = 'Instructor',
    user = 'User'
}
