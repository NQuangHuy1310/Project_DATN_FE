import { useParams, useLocation } from 'react-router-dom'

type Params = {
    [key: string]: string | undefined
}

export const useGetSlugParams = (paramName?: string): string | undefined => {
    const pathParams = useParams<Params>()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    if (paramName) {
        return pathParams[paramName] || queryParams.get(paramName) || undefined
    }

    return undefined
}

export const useGetIdParams = (paramName?: string): number | undefined => {
    const pathParams = useParams<Params>()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    if (paramName) {
        const value = pathParams[paramName] || queryParams.get(paramName)
        if (value) {
            const parsedValue = Number(value)
            return isNaN(parsedValue) ? undefined : parsedValue
        }
    }

    return undefined
}
