export const getAccessTokenFromLocalStorage = () => {
    const accessToken = localStorage.getItem('access_token') || null
    return accessToken
}
