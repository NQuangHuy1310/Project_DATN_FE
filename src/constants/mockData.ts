import { ICourse, ITeacher } from '@/types'
import { CourseLevel, TeacherStatus } from '@/constants/constants'
import { INotificationMessage } from '@/types/notificationmessage'

export const courses: ICourse[] = [
    {
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'UX Design : How To Implement Usability Testing',
        star: 4.5,
        studentCount: 100,
        totalVideo: 10,
        totalTime: '5 giờ',
        level: CourseLevel.Beginner,
        createdBy: {
            id: 1,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    },
    {
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Animation is the Key of Successfull UI/UX Design',
        star: 4.5,
        studentCount: 100,
        totalVideo: 10,
        totalTime: '5 giờ',
        level: CourseLevel.Intermediate,
        createdBy: {
            id: 1,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: '',
            is_active: true,
            user_type: 'member'
        }
    }
]

export const mockTeachers: ITeacher[] = [
    {
        image: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nguyễn Quang Huy',
        job: 'UI UX . Design',
        totalCourse: 5,
        reviewStart: 4.5,
        totalReview: 100,
        status: TeacherStatus.follow
    },
    {
        image: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nguyễn Quang Huy',
        job: 'Web developer',
        totalCourse: 5,
        reviewStart: 4.5,
        totalReview: 100,
        status: TeacherStatus.followed
    },
    {
        image: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Nguyễn Quang Huy',
        job: 'Backend developer',
        totalCourse: 5,
        reviewStart: 4.5,
        totalReview: 100,
        status: TeacherStatus.unFollow
    }
]
export const notificationMessages: INotificationMessage[] = [
    {
        isRead: false,
        title: 'Welcome to our platform!',
        time: 945, // 9:45 AM
        description: 'We are excited to have you join our community. Explore our courses and start learning!'
    },
    {
        isRead: true,
        title: 'Your weekly progress report',
        time: 1630, // 4:30 PM
        description: 'Check out your progress for the past week in your enrolled courses.'
    },
    {
        isRead: false,
        title: 'New message from support',
        time: 1140, // 11:40 AM
        description: 'You have a new message from our support team. Please check your inbox for details.'
    },
    {
        isRead: true,
        title: 'Upcoming system maintenance',
        time: 2230, // 10:30 PM
        description: 'Our platform will undergo maintenance on Saturday from 12:00 AM to 4:00 AM UTC.'
    },
    {
        isRead: false,
        title: 'Course recommendation: Advanced React',
        time: 810, // 8:10 AM
        description: 'Based on your recent activity, we recommend the Advanced React course to enhance your skills.'
    },
    {
        isRead: true,
        title: 'Special offer: 50% off on new courses',
        time: 1330, // 1:30 PM
        description: 'For a limited time, enjoy 50% off on all new courses. Start learning today!'
    },
    {
        isRead: false,
        title: 'Reminder: Upcoming webinar on AI',
        time: 1000, // 10:00 AM
        description: 'Don’t forget to join the upcoming webinar on AI and Machine Learning this Friday at 11:00 AM.'
    }
]
export const myCourses: ICourse[] = [
    {
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction Basic Programming HTML & CSS',
        star: 4.5,
        level: CourseLevel.Intermediate,
        progressLesson: 66,
        totalLesson: 90,
        createdBy: {
            id: 1,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    },
    {
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction Basic Programming HTML & CSS',
        star: 4.7,
        level: CourseLevel.Beginner,
        progressLesson: 80,
        totalLesson: 178,
        createdBy: {
            id: 2,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    },
    {
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction Basic Programming HTML & CSS',
        star: 4.9,
        level: CourseLevel.Beginner,
        progressLesson: 146,
        totalLesson: 220,
        createdBy: {
            id: 3,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    },
    {
        image: 'https://i.pinimg.com/564x/ac/27/1d/ac271de883faa03617b212beeda73db3.jpg',
        name: 'Introduction Basic Programming HTML & CSS',
        star: 4.8,
        level: CourseLevel.Intermediate,
        progressLesson: 87,
        totalLesson: 160,
        createdBy: {
            id: 4,
            name: 'Nguyễn Quang Huy',
            email: 'Huy@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            is_active: true,
            user_type: 'member'
        }
    }
]
