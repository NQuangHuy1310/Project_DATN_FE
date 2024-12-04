import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function createQueryParams(
    search?: string,
    category?: string,
    level?: string,
    arrange?: string,
    page?: number,
    perPage?: number
): string {
    const params: string[] = []

    if (category) params.push(`category=${category}`)
    if (level) params.push(`level=${level}`)
    if (arrange) params.push(`arrange=${arrange}`)
    if (page) params.push(`page=${page}`)
    if (perPage) params.push(`perPage=${perPage}`)
    if (search) params.push(`search=${search}`)

    return params.length ? `?${params.join('&')}` : ''
}
