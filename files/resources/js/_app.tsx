// @ts-ignore
import { createRoot } from "react-dom/client"

//
export function Setup ({el, App, props}:{el:any, App:any, props:any}) {
    return createRoot(el).render(<App {...props} />)
}

//
export function Resolve(name:any) {
    // @ts-ignore
    const pages = import.meta.glob(['./Pages/**/*.tsx'], {eager: true})
    return pages[`./Pages/${name}.tsx`]
}

//
export function Title(title:any){
    return title.length?title:`Home`
}
