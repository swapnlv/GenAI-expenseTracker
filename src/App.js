import React, { useEffect, useState } from "react";
import { msalInstance } from "./msalConfig";

function App() {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const currentAccounts = msalInstance.getAllAccounts();
        if (currentAccounts.length > 0) {
            setAccount(currentAccounts[0]);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const loginResponse = await msalInstance.loginPopup();
            setAccount(loginResponse.account);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        msalInstance.logoutPopup();
        setAccount(null);
    };

    const getToken = async () => {
        const request = {
            scopes: ["User.Read"], // Add required scopes
            account: account
        };
        try {
            const response = await msalInstance.acquireTokenSilent(request);
            return response.accessToken;
        } catch (error) {
            if (error instanceof msalInstance.InteractionRequiredAuthError) {
                const response = await msalInstance.acquireTokenPopup(request);
                return response.accessToken;
            } else {
                throw error;
            }
        }
    };

    return (
        <div>
            {!account ? (
                <button onClick={handleLogin}>Login with Microsoft</button>
            ) : (
                <div>
                    <span>Welcome, {account.username}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            {/* ...existing code... */}
        </div>
    );
}

export default App;