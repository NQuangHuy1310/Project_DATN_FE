import useGetUserProfile from '@/hooks/useGetUser'

const Home = () => {
    const { user, profile } = useGetUserProfile()

    return (
        <div>
            {JSON.stringify(user)}
            {JSON.stringify(profile)}
            <img src="http://localhost:8000/storage/avatars/avatar_1727016343.jpg" alt="" className="size-10" />
        </div>
    )
}

export default Home
