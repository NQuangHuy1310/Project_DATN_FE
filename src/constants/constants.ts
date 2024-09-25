/* eslint-disable no-unused-vars */
import { FaUserCog } from 'react-icons/fa'
import { TbUserHexagon } from 'react-icons/tb'
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
