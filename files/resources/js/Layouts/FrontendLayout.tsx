import {ThemeProvider} from "react-bootstrap"

export default function FrontendLayout({ children }:{children:any}) {
    return (
        <ThemeProvider breakpoints={['fhd', 'hd', 'xxl', 'xl', 'lg', 'md', 'sm', 'sx', 'xs']} minBreakpoint="sx">
            <>
                <header>
                    Header
                </header>
                <main>
                    Main
                    {children}
                </main>
                <footer>
                    Footer
                </footer>
            </>
        </ThemeProvider>
    )
}
