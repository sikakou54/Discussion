import Header from './header';

export default function Layout({ userId, children, title }) {

    return (
        <>
            <Header userId={userId} title={title} />
            {children}
            <footer ></footer>
        </>
    );
}
