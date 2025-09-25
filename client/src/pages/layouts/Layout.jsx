import { Helmet } from 'react-helmet';
import { Container } from '@chakra-ui/react'
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
            
            <Container
                padding={0}
                margin={0}
                //bg={{ base: "red", _dark: "gray.900" }}
                minH="100vh"
                maxW="100vw"
		    >
                <Routes />
			</Container>
            
        </>
    )
}

export default Layout;