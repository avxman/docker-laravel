import {Head, Link} from "@inertiajs/react"
import FrontendLayout from "../Layouts/FrontendLayout"
import {useTranslation} from "react-i18next"

const Index = ({ data, links } : {data:any, links:any})=>{
    const { t } = useTranslation('frontend')
    return (
        <>
            <Head title="Welcome" />
            <h1>Welcome</h1>
            <p>Hello, welcome to your first Inertia!</p>
        </>
    )
}

Index.layout = (page:any) => <FrontendLayout children={page} />

export default Index
