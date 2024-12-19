import ReactDOM from 'react-dom'
import iconLoading from '@/assets/loading.svg'

interface LoadingProps {
    message?: string
}

const Loading = ({ message }: LoadingProps) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4">
                <div className="h-[80px] w-[80px]">
                    <img src={iconLoading} alt="Loading" />
                </div>
                <p className="text-black">{message ?? 'Đang tải dữ liệu, vui lòng chờ...'}</p>
            </div>
        </div>,
        document.body
    )
}

export default Loading
