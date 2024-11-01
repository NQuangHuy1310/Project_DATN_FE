const RATING_URL = 'ratings/'
export const ratingUri = {
    GET_RATING_HOME: () => `${RATING_URL}rating-home-page`,
    GET_RATING_FOR_COURSE: (id: number) => `${RATING_URL}rating-course/${id}`,
    ADD_RATING: `${RATING_URL}add-rating-course`,
    CHECK_RATING_USER: (userId: number, courseId: number) => `${RATING_URL}check-rating/${userId}/${courseId}`
}
