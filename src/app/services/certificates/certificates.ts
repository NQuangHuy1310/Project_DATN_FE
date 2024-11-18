import { certificateUri } from '@/app/services/Uri/certificates/certificates'
import axiosClient from '@/configs/axiosClient'
import { CertificateData } from '@/types/others'

export const certificationApis = {
    postCertification: async (id_Course: number): Promise<any> => {
        return axiosClient.post(certificateUri.POST_CERTIFICATION(id_Course))
    },
    getCertification: async (code_certification: string): Promise<CertificateData> => {
        return axiosClient.get(certificateUri.GET_CERTIFICATION(code_certification))
    },
    getCertificationImage: async (code_certification: string, type: string): Promise<any> => {
        return axiosClient.get(certificateUri.GET_CERTIFICATION_IMAGE(code_certification, type))
    }
}
