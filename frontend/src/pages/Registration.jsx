import { useState } from "react";
import classes from "../styles/Registration.module.css";
import AuthApi from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState("user");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Navigation
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log("Sign Up");

        if (password !== confirmPassword) {
            setError("Password and Confirm Password does not match");
            return;
        }
        const signUpData = {
            name,
            email,
            password,
            confirmPassword,
            userType,
        };

        // TODO: Send data to backend
        try {
            setLoading(true);
            const response = await AuthApi.post("/signup", signUpData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Response: (Signup) ", response.data);
            setLoading(false);
            navigate("/login");
        } catch (error) {
            console.log("Error: (Signup) ", error.response.data);
            setError(error.response.data.message);
            setLoading(false);
        }
    };
    return (
        <div className={`${classes["Registration"]}`}>
            <form
                className={`${classes["registration-form"]}`}
                onSubmit={handleSignUp}
            >
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassowrd(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="user-type">User Type</label>
                    <select
                        name="user-type"
                        id="user-type"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="user">Regular User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div>
                    <p style={{ color: "red", padding: "10px 0px" }}>{error}</p>
                </div>
                <input
                    type="submit"
                    value="Register"
                    className="btn"
                    disabled={loading}
                />
                <div>
                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Registration;
