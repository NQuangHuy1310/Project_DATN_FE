export const getAccessTokenFromLocalStorage = () => {
    const accessToken = localStorage.getItem('access_token') || null
    return accessToken
}

export const setAccessToken = (token: string) => {
    if (!token) return
    localStorage.setItem('access_token', token)
}

export const removeAccessToken = (): void => {
    localStorage.removeItem('access_token')
}
