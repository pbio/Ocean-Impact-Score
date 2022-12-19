//New page for first post
import Link from 'next/Link'
import Layout from '../../components/layout.js'

export default function FirstPost() {
    return <Layout>
            <h1>First Post</h1>
            <Link href='/'>Back home</Link>
            </Layout>
}