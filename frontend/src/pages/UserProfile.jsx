import classes from "../styles/UserProfile.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
    const { user, logout } = useAuthContext();
    const { name, email, userType } = user;
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate("/login");
    };
    return (
        <div className={`${classes["UserProfile"]}`}>
            <div className={`${classes["user-profile"]}`}>
                <h3>User Profile</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>User Type</td>
                            <td>{userType}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button
                                    onClick={handleLogout}
                                    className={`btn`}
                                >
                                    Logout
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserProfile;
