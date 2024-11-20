const POST_URL = 'posts/'
export const postUri = {
    POST: `${POST_URL}`,
    MY_POST: 'user/posts',
    GET_POST_BY_USER_ID: (userId: string) => `user/posts/${userId}`,
    DELETE_POST: (postSlug: string) => `${POST_URL}${postSlug}`,
    COMMENT: (slug: string) => `comments/comment-post/${slug}`,
    ADD_COMMENT: 'comments/add-comment-post',
    FEATURED_POST: 'post-outstanding',
    SAVE_POST: (slug: string) => `${POST_URL}save/${slug}`,
    UN_SAVE_POST: (slug: string) => `${POST_URL}unsave/${slug}`,
    CHECK_SAVE_POST: (slug: string) => `${POST_URL}check-saved/${slug}`,
    LIKE_POST: (slug: string) => `${POST_URL}like/${slug}`,
    UNLIKE_POST: (slug: string) => `${POST_URL}unlike/${slug}`,
    CHECK_LIKED_POST: (slug: string) => `${POST_URL}check-like/${slug}`,
    GET_POST_BY_CATEGORY: (slug: string) => `${POST_URL}by-category-posts/${slug}`
}
