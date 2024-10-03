const routes = {
    home: '/',

    // Routes for user
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',

    notification: '/notification',

    dashboard: '/dashboard',

    course: '/course',
    myCourse: '/course/my-course',
    searchCourses: '/course/search-courses',
    courseDetail: '/course/:slug',

    // Account routes
    account: '/account/',
    accountProfile: '/account/profile',
    accountHelp: '/account/help',
    accountSetting: '/account/settings',
    accountNotification: '/account/notifications',

    // Post
    post: '/new-post',
    mePost: '/me/post',
    meBookmark: 'me/bookmark',

    // Routes for teacher
    instructor: '/instructor',
    instructorDetail: '/instructor/detail/:slug'
}

export default routes
