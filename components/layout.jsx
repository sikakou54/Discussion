import Footer from './footer';
import Header from './header';

export default function Layout({ children, title }) {

    return (
        <>
            <Header title={title} />
            {children}
            <Footer />
        </>
    );
}
