import Header from './header';

export default function Layout({ userId, children, title }) {

    return (
        <div>
            <Header userId={userId} title={title} />
            {children}
            <footer ></footer>
        </div>
    );
}
