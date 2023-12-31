import { useState } from "react";
import classes from "../styles/Registration.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuthContext();

    // Navigation
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login");

        const loginData = {
            email,
            password,
        };

        // TODO: Send data to backend
        try {
            setLoading(true);
            const response = login(loginData);
            console.log("Response: (Login) ", response.data);
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.log("Error: (Login) ", error.response.data);
            setError(error.response.data.message);
            setLoading(false);
        }
    };
    return (
        <div className={`${classes["Registration"]}`}>
            <form
                className={`${classes["registration-form"]}`}
                onSubmit={handleLogin}
            >
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
                    <p style={{ color: "red", padding: "10px 0px" }}>{error}</p>
                </div>
                <input type="submit" value="Login" className="btn" />
                <div>
                    <p>
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
