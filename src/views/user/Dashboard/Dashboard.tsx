const Dashboard = () => {
    return (
        <div className="flex flex-wrap items-start gap-7">
            <div className="flex flex-1 flex-col gap-7 rounded-lg bg-white p-7">
                <div className="w-full">
                    <h5 className="text-2xl font-medium text-black">Người hướng dẫn nổi bật theo tháng</h5>
                    <div className="w-full"></div>
                </div>
                <div className="">
                    <h5 className="text-2xl font-medium text-black">Khoá học nổi bật theo tháng</h5>
                </div>
            </div>
            <div className="w-full max-w-[400px] rounded-lg bg-white p-7">
                <div className="">
                    <p>Today</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
