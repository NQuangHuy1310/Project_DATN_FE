import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { getAccessTokenFromLocalStorage } from '@/utils'
import { privateRoutes, publicRoutes } from '@/constants'

import Login from '@/views/user/Auth/Login'
import Dashboard from '@/app/layouts/UserLayouts/Dashboard'
import HomeLayout from '@/app/layouts/AuthLayouts/HomeLayout'
import NotFound from '@/views/user/NotFound'

function App() {
    const isLoggedIn = getAccessTokenFromLocalStorage()

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
                                    isLoggedIn ? (
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
