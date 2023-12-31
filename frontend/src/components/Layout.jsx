import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Layout() {
    const { user, logout } = useAuthContext();
    const userTypes = {
        user: "User",
        admin: "Admin",
    };
    return (
        <div className={`body-area`}>
            <nav>
                <Link to="/">Home</Link>

                {user && (
                    <>
                        <Link to="/create-task">Create Task</Link>
                        <Link to={`/profile`} class={`user`}>
                            {user?.name} ({userTypes[user?.userType]})
                        </Link>
                    </>
                )}
            </nav>
            <Outlet />
        </div>
    );
}
