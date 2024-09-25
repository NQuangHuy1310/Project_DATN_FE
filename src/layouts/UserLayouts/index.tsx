import React from 'react'

import UserSibar from '@/layouts/UserLayouts/UserSibar/UserSibar'
import UserHeader from '@/layouts/UserLayouts/UserHeader/UserHeader'

const Userlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <UserSibar />
            <article className="ps-64 w-full">
                <UserHeader />
                <main className="max-w-screen-mainScreen h-screen mx-auto px-[30px] mt-[102px]">{children}</main>
            </article>
        </div>
    )
}

export default Userlayout
