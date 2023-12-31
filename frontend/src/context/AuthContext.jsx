import { createContext, useState } from "react";
import AuthApi from "../api/AuthApi";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (loginData) => {
        setLoading(true);
        try {
            const response = await AuthApi.post("/login", loginData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = response.data;
            console.log("Response: (Login) from Context ", data);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            setLoading(false);
            return { data: data };
        } catch (err) {
            console.log(err);
            console.log(err.response.data.error);
            setError(err.response.data.error);
            setLoading(false);
            return { error: err.response.data.error };
        }
    };

    const logout = () => {
        //remove user from storage
        localStorage.removeItem("user");
        setUser(null);
    };
    const value = {
        user,
        setUser,
        login,
        loading,
        error,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};
