import { categoriesUri } from '@/app/services/Uri/categories/categories'
import axiosClient from '@/configs/axiosClient'
import { ICategory } from '@/types/category'

export const categoryApis = {
    getCategories: async (): Promise<ICategory[]> => {
        return axiosClient.get(categoriesUri.CATEGORIES)
    }
}
