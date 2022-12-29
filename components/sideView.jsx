import UserStatusView from "./userStatusView";

export default function SideView({ userId }) {

    return (
        <>
            <UserStatusView userId={userId} />
        </>
    );
}
