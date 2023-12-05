import 'bootstrap';

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
import VueCookies from "vue-cookies";

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '1d26fb7fa9ddcb77c1f8',
    cluster: 'eu',
    wsHost: window.location.hostname,
    wsPort: 6001,
    disableStats: true,
    encrypted: true,
    auth: {
        headers: {
            Authorization: 'Bearer ' + VueCookies.get('access_token')
        },
    },
});

