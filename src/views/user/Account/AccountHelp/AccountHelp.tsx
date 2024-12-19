import { IoIosArrowForward } from 'react-icons/io'

import { AccountHelps } from '@/constants'

const AccountHelp = () => {
    return (
        <div className="flex flex-col gap-7">
            <h4 className="text-lg font-bold">Hỗ trợ và trợ giúp</h4>
            {AccountHelps.map((item, index) => (
                <div className="flex items-center justify-between py-5" key={index}>
                    <div className="flex items-center gap-5">
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary hover:opacity-85">
                            <item.icon className="size-5 cursor-pointer text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h6 className="text-base font-medium">{item.title}</h6>
                            <p className="text-sm text-darkGrey">{item.description}</p>
                        </div>
                    </div>
                    <IoIosArrowForward className="size-5 cursor-pointer" />
                </div>
            ))}
        </div>
    )
}

export default AccountHelp
