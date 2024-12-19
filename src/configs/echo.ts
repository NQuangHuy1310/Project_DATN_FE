import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
;import { PUSHER_KEY } from './pusher';
import { backendUrl } from './baseUrl';
(window as any).Pusher = Pusher

const echo = new Echo({
    broadcaster: 'pusher',
    key: PUSHER_KEY,
    cluster: 'ap1',
    forceTLS: true,
    authEndpoint: `${backendUrl}broadcasting/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    }
})

export default echo
