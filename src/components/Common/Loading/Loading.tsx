import iconLoading from '@/assets/loading.svg'

const Loading = () => {
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4">
                <div className="h-[80px] w-[80px]">
                    <img src={iconLoading} />
                </div>
                <p className="text-black">Đang tải dữ liệu, vui lòng chờ...</p>
            </div>
        </div>
    )
}

export default Loading
