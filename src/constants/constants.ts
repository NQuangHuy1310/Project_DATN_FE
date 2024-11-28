/* eslint-disable no-unused-vars */
import { BiBook } from 'react-icons/bi'
import { BsPlayBtn } from 'react-icons/bs'
import { MdReviews } from 'react-icons/md'
import { GrHistory } from 'react-icons/gr'
import { LuUserCircle } from 'react-icons/lu'
import { PiStudentBold } from 'react-icons/pi'
import { IoChatboxOutline, IoWalletSharp } from 'react-icons/io5'
import { PiArticleMediumLight } from 'react-icons/pi'
import { MdSecurity, MdArticle } from 'react-icons/md'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { TbMessageDots, TbUserHexagon } from 'react-icons/tb'
import { HiBookOpen, HiOutlineTemplate } from 'react-icons/hi'
import { IoMdHelpCircleOutline, IoMdHome } from 'react-icons/io'
import { FaAddressBook, FaHeart, FaRegBell, FaRoad, FaUserCog } from 'react-icons/fa'
import { IoSettingsOutline, IoChatboxEllipsesOutline } from 'react-icons/io5'
import { FaRegCircleQuestion, FaRegCircleCheck, FaChartSimple, FaBookAtlas } from 'react-icons/fa6'

import routes from '@/configs/routes'
import { RiBloggerLine } from 'react-icons/ri'
import { QuestionTeacher } from '@/types/others'

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
                title: 'Khóa học yêu thích',
                icon: FaHeart,
                path: routes.wishList
            },
            {
                title: 'Lịch sử học tập',
                icon: GrHistory,
                path: routes.courseHistory
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
        title: 'Lộ trình',
        icon: FaRoad,
        path: routes.learningPaths
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
    },
    {
        title: 'Chat AI',
        icon: IoChatboxOutline,
        path: routes.communicate
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
        title: 'Hiệu suất',
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
        title: 'Tin nhắn',
        icon: TbMessageDots,
        path: routes.instructorMessage
    },
    {
        title: 'Hỏi đáp',
        icon: AiOutlineQuestionCircle,
        path: routes.instructorQa
    },
    {
        title: 'Bài tập',
        icon: BiBook,
        path: routes.instructorAssignments
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
    },
    {
        title: 'Đánh giá',
        icon: MdReviews,
        path: routes.instructorPerformanceRating
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

export const faceBookGroupUrl = 'https://www.facebook.com/share/g/1895SjEM68/?mibextid=WaXdOe'

export enum TeacherStatus {
    follow = 'Theo dõi',
    unFollow = 'Đã theo dõi'
}

export enum notificationTypes {
    system = 'System',
    instructor = 'Instructor',
    user = 'User'
}

export const questions: QuestionTeacher[] = [
    {
        id: 1,
        title: 'Kinh nghiệm Giảng dạy',
        description:
            'Hãy chia sẻ về kinh nghiệm giảng dạy trước đây của bạn, bao gồm cả việc giảng dạy trên các hệ thống học trực tuyến nếu bạn đã từng tham gia.',
        question: 'Bạn đã từng giảng dạy trên hệ thống học trực tuyến nào chưa?',
        options: ['Đã từng', 'Chưa từng']
    },
    {
        id: 2,
        title: 'Động lực Giảng dạy Trực tuyến',
        description:
            'Hãy chia sẻ động lực lớn nhất của bạn khi giảng dạy trong môi trường trực tuyến để chúng tôi hiểu rõ hơn về mục tiêu của bạn.',
        question: 'Động lực lớn nhất của bạn khi giảng dạy trong môi trường trực tuyến là gì?',
        options: [
            'Tạo điều kiện tiếp cận kiến thức dễ dàng cho nhiều người',
            'Linh hoạt về thời gian và không gian',
            'Phát triển kỹ năng giảng dạy hiện đại bằng các công nghệ và phương pháp giảng dạy mới',
            'Khác'
        ]
    },
    {
        id: 3,
        title: 'Vai trò trong Học tập Trực tuyến',
        description:
            'Chúng tôi muốn biết bạn nhìn nhận thế nào về vai trò của mình trong việc tạo ra trải nghiệm học tập tốt hơn cho học viên trực tuyến.',
        question:
            'Bạn nghĩ gì về vai trò của mình trong việc tạo ra trải nghiệm học tập tốt hơn cho học viên trực tuyến?',
        options: [
            'Giúp học viên dễ dàng tiếp cận và hiểu bài hơn',
            'Tạo không gian học tập linh hoạt và tiện lợi',
            'Đảm bảo cung cấp tài liệu và nguồn học tập chất lượng',
            'Khác'
        ]
    },
    {
        id: 4,
        title: 'Cập nhật Kiến thức và Phương pháp Giảng dạy',
        description:
            'Việc cập nhật kiến thức và phương pháp giảng dạy là rất quan trọng. Hãy cho chúng tôi biết bạn sẽ làm gì để luôn theo kịp các xu hướng mới nhất.',
        question: 'Bạn sẽ làm gì để đảm bảo rằng mình luôn cập nhật kiến thức và phương pháp giảng dạy mới nhất?',
        options: [
            'Tham gia các khóa đào tạo để cập nhật các phương pháp giảng dạy mới.',
            'Tham gia các diễn đàn và nhóm giảng viên trực tuyến để học hỏi kinh nghiệm từ đồng nghiệp.',
            'Tìm kiếm những nghiên cứu mới nhất về phương pháp sư phạm và ứng dụng công nghệ trong giảng dạy.'
        ]
    },
    {
        id: 5,
        title: 'Hỗ trợ Học viên',
        description:
            'Chúng tôi đánh giá cao việc hỗ trợ học viên. Hãy cho biết bạn có sẵn sàng giúp đỡ học viên khi họ gặp khó khăn trong quá trình học tập không.',
        question: 'Bạn có sẵn sàng hỗ trợ học viên khi gặp vướng mắc không?',
        options: ['Luôn sẵn sàng', 'Sẵn sàng trong khung giờ quy định', 'Chỉ hỗ trợ trong giờ học']
    }
]
