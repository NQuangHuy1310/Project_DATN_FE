const BANNER_URL = 'banners/'
const LEARNING_PATH = 'learning-path/'

export const bannerUri = {
    BANNER: `${BANNER_URL}`
}

export const learningPathUri = {
    LIST_CATE_LEANING_PATH: `${LEARNING_PATH}list-category`,
    LIST_COURSE_LEANING_PATH: (cate: string) => `${LEARNING_PATH}list-course-by-learning-path/${cate}`
}
export const chatAIUri = {
    CHAT_AI: 'user/qna/ask',
    FILTER_CHAT_AI: (status: string) => `user/qna?status=${status}`
}

export const searchUri = {
    SEARCH: (value: string) => `search?q=${value}`
}
