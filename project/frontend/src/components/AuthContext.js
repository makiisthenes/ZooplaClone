import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext()
const AuthenticateContext = React.createContext()
const ConsentContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function useAuthenticate() {
    return useContext(AuthenticateContext)
}

export function useConsent() {
    return useContext(ConsentContext)
}

export function AuthProvider({children}) {
    const auth_local = JSON.parse(localStorage.getItem('sessionAuth'));
    const [auth, setAuth] = useState(
        auth_local ? auth_local:{"login": false, "role": "consultant", "username": "", "id": "", "consent":false});

    useEffect(() => {
        localStorage.setItem('sessionAuth', JSON.stringify(auth));
      }, [auth]);

    function authenticate(login, role, username, id, consent) {
        setAuth(prevState => {
            return {login: login, role: role, username:username, id:id, consent:consent}
        })
    }
    function setConsent(consent) {
        setAuth(prevState => {
            return { ... auth, consent:consent}
        })
    }

    return (
        <AuthContext.Provider value={auth}>
            <AuthenticateContext.Provider value={authenticate}>
                <ConsentContext.Provider value={setConsent}>
                {children}
                </ConsentContext.Provider>
            </AuthenticateContext.Provider>
        </AuthContext.Provider>
    )
}