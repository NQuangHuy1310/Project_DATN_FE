import { useLocation } from 'react-router-dom'

import routes from '@/configs/routes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { FaBell } from 'react-icons/fa'

function UserHeader() {
    const location = useLocation()
    const route = location.pathname

    const getTitle = (): string => {
        switch (route) {
            case routes.overview:
                return 'Hi, Nguyen Tu Tai'
            case routes.exploreCourses:
                return 'Explore Courses'
            case routes.myCourse:
                return 'My Courses'
            case routes.mentor:
                return 'Mentors'
            default:
                return 'Hi, Nguyen Tu Tai'
        }
    }
    return (
        <header className="py-4 flex justify-between items-center px-[30px] fixed w-[calc(100%-16rem)] bg-white z-50">
            <div>
                <h2 className="text-2xl font-semibold">{getTitle()}</h2>
            </div>
            <div className="flex gap-5 items-center">
                <div>
                    <FaBell className="size-5" />
                </div>
                <div>
                    <Avatar>
                        <AvatarImage src="../public/ảnh.jpg" alt="" />
                        <AvatarFallback>TT</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}

export default UserHeader
