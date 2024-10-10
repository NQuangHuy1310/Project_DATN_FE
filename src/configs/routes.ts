const routes = {
    home: '/',

    // User authentication routes
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',

    notification: '/notifications',

    // User dashboard routes
    userDashboard: '/user/dashboard',

    // Course management routes
    course: '/courses',
    myCourses: '/courses/my',
    searchCourses: '/courses/search',
    courseDetail: '/courses/:slug',
    courseLeaning: '/leaning/:slug',

    // Instructor routes
    instructor: '/instructors',
    instructorDetail: '/instructors/:slug',

    // Account management routes
    account: '/account',
    accountProfile: '/account/profile',
    accountHelp: '/account/help',
    accountSettings: '/account/settings',
    accountNotifications: '/account/notifications',

    // Post management routes
    posts: '/posts',
    newPost: '/posts/new',
    myPosts: '/posts/me',
    myBookmarks: '/posts/me/bookmarks',

    // Instructor dashboard
    instructorDashboard: '/instructor/dashboard',

    // Course instructor routes
    instructorCourses: '/instructor/courses',
    createCourse: '/instructor/courses/new',

    // Instructor communication
    instructorQa: '/instructor/communication/qa',
    instructorMessage: '/instructor/communication/message',
    instructorAssignments: '/instructor/communication/assignments',
    instructorAnnouncements: '/instructor/communication/announcements/',

    // Instructor performance
    instructorPerformance: '/instructor/performance'
}

export default routes
