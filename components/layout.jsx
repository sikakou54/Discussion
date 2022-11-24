import Header from './header';

export default function Layout({ userId, children, title }) {

    return (
        <div>
            <Header userId={userId} title={title} />
            <div>{children}</div>
            <footer ></footer>
        </div>
    );
}
