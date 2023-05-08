import {createInertiaApp} from "@inertiajs/react"
import Axios from "axios"
import {Setup, Resolve, Title} from "./_app"
import "./i18n"

//
// @ts-ignore
globalThis.Axios = Axios
// @ts-ignore
globalThis.Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

//
createInertiaApp({
    title: Title,
    resolve: Resolve,
    setup: Setup,
    progress: {
        // minimum: 0.1,
        // template:'',
        // parent: '#container',
        delay: 250,
        color: '#29d',
        includeCSS: true,
        showSpinner: true,
    },
}).then(r => (r)).catch(e=>(e))
