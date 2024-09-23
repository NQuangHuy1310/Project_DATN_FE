/* eslint-disable no-unused-vars */
import { IProfile, IUser } from '@/types'
import { create } from 'zustand'

interface UserState {
    user: IUser | null
    profile: IProfile | null
    setUser: (user: IUser) => void
    setProfile: (profile: IProfile) => void
    clearUser: () => void
    clearProfile: () => void
}

export const useUserStore = create<UserState>((set) => ({
    user: JSON.parse(localStorage.getItem('user_data') || 'null'),
    profile: JSON.parse(localStorage.getItem('user_profile') || 'null'),
    setUser: (user) => {
        set({ user })
        localStorage.setItem('user_data', JSON.stringify(user))
    },
    setProfile: (profile) => {
        set({ profile })
        localStorage.setItem('user_profile', JSON.stringify(profile))
    },
    clearUser: () => {
        set({ user: null })
        localStorage.removeItem('user_data')
    },
    clearProfile: () => {
        set({ profile: null })
        localStorage.removeItem('user_profile')
    }
}))
