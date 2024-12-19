import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { getAccessTokenFromLocalStorage } from '@/lib'
import { privateRoutes, privateRoutesInstructor, publicRoutes } from '@/constants'

import routes from '@/configs/routes'
import Login from '@/views/user/Auth/Login'
import NotFound from '@/views/user/NotFound'
import Forbidden from '@/views/user/Forbidden'
import ServerError from '@/views/user/ServerError'
import Dashboard from '@/app/layouts/UserLayouts/Dashboard'
import HomeLayout from '@/app/layouts/AuthLayouts/HomeLayout'

import { useUserStore } from '@/app/store/userStore'
import ScrollToTop from '@/components/shared/ScrollToTop/ScrollToTop'

function App() {
    const [isLogin, setIsLogin] = useState(false)
    const user = useUserStore((state) => state.user)
    const isLoggedIn = getAccessTokenFromLocalStorage()

    useEffect(() => {
        if (isLoggedIn) setIsLogin(!!isLoggedIn)
    }, [isLogin, setIsLogin, isLoggedIn])

    const privateRouter = user && privateRoutes(user)

    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout: React.ComponentType<any> = HomeLayout
                        if (route.layout) {
                            Layout = route.layout as React.ComponentType<any>
                        }
                        const Page = route.element

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}

                    {privateRouter &&
                        privateRouter?.map((route, index) => {
                            let Layout: React.ComponentType<any> = Dashboard || null
                            if (route.layout) {
                                Layout = route.layout as React.ComponentType<any>
                            }

                            const Page = route.element

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout title={route?.title}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}

                    {privateRoutesInstructor.map((route, index) => {
                        let Layout: React.ComponentType<any> = Dashboard || null
                        if (route.layout) {
                            Layout = route.layout as React.ComponentType<any>
                        }

                        const Page = route.element

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    user?.user_type === 'teacher' ? (
                                        <Layout title={route?.title}>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Forbidden />
                                    )
                                }
                            />
                        )
                    })}

                    <Route path="*" element={<NotFound />} />
                    <Route path={routes.forbidden} element={<Forbidden />} />
                    <Route path={routes.serverError} element={<ServerError />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
