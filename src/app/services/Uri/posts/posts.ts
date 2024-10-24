const POST_URL = 'posts/'
export const postUri = {
    POST: `${POST_URL}`,
    MY_POST: 'user/posts',
    GET_POST_BY_USER_ID: (userId: string) => `user/posts/${userId}`,
    DELETE_POST: (postSlug: string) => `${POST_URL}${postSlug}`
}
