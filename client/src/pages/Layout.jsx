import { Helmet } from 'react-helmet';

import Routes from "../routes/index"

function Layout() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#ec2828ff" />
                <meta name="description" content="E-Commerce, E-Satış, Shop" />
                <meta name="keywords" content="ecommerce, shop" />
                <meta name="robots" content="index, follow" />
                <title>E-Commerce</title>
            </Helmet>
            
            <main>
                <Routes />
            </main>
            
        </>
    )
}

export default Layout;