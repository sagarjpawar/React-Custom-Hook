import React, { useState } from 'react';

export const AuthContext = React.createContext({
    auth: false,
    loginHandler: ()=>{}
})

const AuthContextProvider = (props) => {
    const [isAuth, setAuth] = useState(false);
    const setLoginHandler = () =>{
        console.log('set auth');
        setAuth(true);
    }
    return <AuthContext.Provider value={{
        isAuth,
        loginHandler: setLoginHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContextProvider;