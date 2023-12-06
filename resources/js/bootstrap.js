import 'bootstrap';
import axios from 'axios';
import Echo from 'laravel-echo';
import VueCookies from "vue-cookies";

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */


window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '269059c8aa88da40ece3',
    cluster: 'eu',
    wsHost: window.location.hostname,
    wsPort: 443,
    encrypted: true,
    auth: {
        headers: {
            Authorization: 'Bearer ' + VueCookies.get('access_token'),
        },
    },
});

