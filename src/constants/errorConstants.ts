export const MessageErrors = {
    requiredField: 'Vui lòng nhập các trường bắt buộc.',
    invalidEmail: 'Email không hợp lệ. Vui lòng kiểm tra lại.',
    passwordTooShort: 'Mật khẩu phải có ít nhất 8 ký tự.',
    passwordsDoNotMatch: 'Mật khẩu không khớp. Vui lòng kiểm tra lại.',
    networkError: 'Lỗi mạng. Vui lòng kiểm tra kết nối của bạn.',
    unauthorizedAccess: 'Bạn không có quyền truy cập vào tài nguyên này.',
    notFound: 'Không tìm thấy tài nguyên yêu cầu.',
    invalidInput: 'Dữ liệu nhập vào không hợp lệ. Vui lòng kiểm tra lại.',
    actionNotAllowed: 'Hành động này không được phép.',
    genericError: 'Đã xảy ra một lỗi không xác định. Vui lòng thử lại sau.',
    maxSizeImage: 'Vui lòng tải ảnh có kích thước dưới 2MB.',
    maxSizeVideo: 'Vui lòng tải video có kích thước dưới 2BG.',
    uploadFile: 'Tải file không thành công vui lòng thử lại.',
    phoneTooShort: 'Số điện thoại quá ngắn.',
    phoneTooLong: 'Số diện thoại quá dài.',
    descriptionTooShort: 'Nội dung quá ngắn, độ dài tối thiểu là 200 từ.',
    limitAnswers: 'Bạn chỉ có thể thêm tối đa 5 đáp án cho câu hỏi.',
    minAnswers: 'Bạn cần giữ lại ít nhất 2 câu trả lời.'
}

export const ApiMessages = {
    success: {
        getData: 'Dữ liệu đã được tải thành công.',
        created: 'Tài liệu đã được tạo thành công.'
    },
    error: {
        notFound: 'Không tìm thấy tài nguyên yêu cầu.',
        unauthorized: 'Bạn không có quyền truy cập vào tài nguyên này.',
        forbidden: 'Hành động này bị cấm.',
        serverError: 'Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.',
        timeout: 'Yêu cầu đã hết thời gian chờ.',
        networkError: 'Lỗi mạng. Vui lòng kiểm tra kết nối của bạn.',
        sessionExpired: 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.'
    }
}

export const MessageConfig = {
    loading: 'Đang tải dữ liệu, xin vui lòng chờ một chút...',
    noData: 'Không có dữ liệu để hiển thị.',
    retry: 'Đã xảy ra lỗi. Nhấn vào đây để thử lại.',
    actionSuccess: 'Hành động của bạn đã được thực hiện thành công!',
    actionFailed: 'Rất tiếc, hành động không thành công. Xin vui lòng thử lại.'
}

export const ConfirmationMessages = {
    deleteConfirmation: 'Bạn có chắc chắn muốn xóa tài liệu này?',
    logoutConfirmation: 'Bạn có chắc chắn muốn đăng xuất?'
}
