/* eslint-disable no-unused-vars */
export enum ApiStatusCode {
    Success = 200 /** Yêu cầu thành công */,

    Created = 201 /** Tạo dữ liệu thành công */,

    NoContent = 204 /** Không có nội dung để trả về */,

    BadRequest = 400 /** Yêu cầu không hợp lệ */,

    Unauthorized = 401 /** Người dùng chưa được xác thực */,

    NotFound = 404 /** Tài nguyên không tìm thấy */,

    InternalServerError = 500 /** Lỗi máy chủ */,

    GatewayTimeout = 504 /** Thời gian chờ của máy chủ đã hết */
}
