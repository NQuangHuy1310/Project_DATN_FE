/* eslint-disable no-unused-vars */
import { LuUserCircle } from 'react-icons/lu'
import { TbUserHexagon } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'
import { FaUserCog, FaRegBell } from 'react-icons/fa'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { HiOutlineTemplate, HiBookOpen } from 'react-icons/hi'

import routes from '@/configs/routes'

export const sidebarList = [
    {
        title: 'Tổng quan',
        icon: HiOutlineTemplate,
        path: routes.overview
    },
    {
        title: 'Khoá học',
        icon: HiBookOpen,
        path: routes.course,
        children: [
            {
                title: 'Khám phá khoá học',
                path: routes.exploreCourses
            },
            {
                title: 'Khoá học của tôi',
                path: routes.myCourse
            }
        ]
    },
    {
        title: 'Giảng viên',
        icon: TbUserHexagon,
        path: routes.teacher
    },
    {
        title: 'Cài đặt',
        icon: FaUserCog,
        path: routes.settings
    }
]

export const accountAside = [
    {
        title: 'Thông tin cá nhân',
        icon: LuUserCircle,
        path: routes.profile
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

export enum CourseLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Master = 'Master'
}

export enum TeacherStatus {
    follow = 'Theo dõi',
    followed = 'Đã theo dõi',
    unFollow = 'Huỷ theo dõi'
}
