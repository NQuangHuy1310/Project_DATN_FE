import { useParams, useLocation } from 'react-router-dom'

type Params = {
    [key: string]: string | undefined
}

export const getUrlParams = (paramName?: string): string | undefined => {
    const pathParams = useParams<Params>()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    if (paramName) {
        return pathParams[paramName] || queryParams.get(paramName) || undefined
    }

    return undefined
}
