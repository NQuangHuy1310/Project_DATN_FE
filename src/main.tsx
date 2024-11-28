import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'highlight.js/styles/an-old-hope.min.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 1
        }
    }
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <Toaster
                position="top-right"
                toastOptions={{
                    unstyled: false,
                    classNames: {
                        title: 'text-sm text-white',
                        description: 'text-xs',
                        error: 'bg-red-400 text-white',
                        success: 'bg-primary text-white',
                        warning: 'text-white bg-secondaryYellow',
                        info: 'bg-blue-400'
                    },
                    duration: 2000
                }}
            />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
)
