const CERTIFICATE_URL = 'certificates/'

export const certificateUri = {
    POST_CERTIFICATION: (idCourse: number) => `${CERTIFICATE_URL}${idCourse}/certificate`,
    GET_CERTIFICATION: (code_certificate: string) => `${CERTIFICATE_URL}${code_certificate}/preview-certificate`,
    GET_CERTIFICATION_IMAGE: (code_certificate: string, type: string) =>
        `${CERTIFICATE_URL}${code_certificate}/download-certificate?type=${type}`
}
