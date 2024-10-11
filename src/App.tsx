import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { getAccessTokenFromLocalStorage } from '@/lib'
import { privateRoutes, publicRoutes } from '@/constants'

import Login from '@/views/user/Auth/Login'
import Dashboard from '@/app/layouts/UserLayouts/Dashboard'
import HomeLayout from '@/app/layouts/AuthLayouts/HomeLayout'
import NotFound from '@/views/user/NotFound'

function App() {
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const isLoggedIn = getAccessTokenFromLocalStorage()
        if (isLoggedIn) setIsLogin(!!isLoggedIn)
    }, [])

    return (
        <Router>
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

                    {privateRoutes?.map((route, index) => {
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
                                    isLogin ? (
                                        <Layout title={route?.title}>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <HomeLayout>
                                            <Login />
                                        </HomeLayout>
                                    )
                                }
                            />
                        )
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
