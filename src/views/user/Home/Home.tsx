import useGetUserProfile from '@/hooks/useGetUser'

const Home = () => {
    const { user, profile } = useGetUserProfile()

    return (
        <div>
            {JSON.stringify(user)}
            {JSON.stringify(profile)}
            <img src={user?.avatar || undefined} alt="" className="size-10" />
        </div>
    )
}

export default Home
