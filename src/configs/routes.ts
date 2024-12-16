const routes = {
    home: '/',
    forbidden: '/forbidden',
    serverError: '/server-error',

    // User authentication routes
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',

    notification: '/notifications',

    // User dashboard routes
    userDashboard: '/user/dashboard',

    // Course management routes
    course: '/courses',
    myCourses: '/courses/my',
    searchCourses: '/courses/search',
    courseDetail: '/courses/:slug',
    courseLeaning: '/leaning/:slug',
    courseDetailNoLogin: '/course/:slug',
    courseOutstanding: '/course-outstanding',
    courseHistory: '/course-history',

    //CHAT AI
    communicate: '/communicate',

    // Instructor routes
    instructor: '/instructors',
    instructorDetail: '/instructors/:id',

    // Account management routes
    account: '/account',
    accountProfile: '/account/profile',
    accountHelp: '/account/help',
    accountSettings: '/account/settings',
    accountNotifications: '/account/notifications',

    //Profile
    profileUser: '/profile/:email',
    //WishList
    wishList: '/wish-list',
    // wallet
    wallet: '/wallet',
    transaction: '/transaction',

    // Leaning-path
    courseLeaningPath: '/learning-paths/:slug',

    //Payment
    discount: '/discount/:slug',

    // Certification
    certification: '/certification/:code',

    // Post management routes
    posts: '/posts',
    postsDetail: '/posts/:slug',
    newPost: '/posts/new/',
    editPost: '/posts/:slug/edit',
    myPosts: '/posts/me',
    myBookmarks: '/posts/bookmarks/me',
    postFeatured: '/posts-featured',

    // Instructor dashboard
    instructorDashboard: '/instructor/dashboard',
    instructorNotifications: '/instructor/notifications',

    // Course instructor routes
    instructorCourses: '/instructor/courses',
    createCourse: '/instructor/courses/:id/manage/goals',
    instructorRoadmap: '/instructor/learning-paths',
    instructorPurchaseHistory: '/instructor/purchase-history',

    // Instructor communication
    instructorQa: '/instructor/communication/qa',
    instructorMessage: '/instructor/communication/message',
    instructorAssignments: '/instructor/communication/assignments',
    instructorAnnouncements: '/instructor/communication/announcements/',

    // Instructor performance
    instructorPerformanceOverview: '/instructor/performance/overview',
    instructorPerformanceStudent: '/instructor/performance/students',
    instructorPerformanceRating: '/instructor/performance/ratings',

    // Instructor wallet
    instructorWallet: '/instructor/wallet',

    //Instructor register
    instructorRegister: '/instructor/register',
    instructorRegisterQuestion: '/instructor/register/question'
}

export default routes
