import { useState, useEffect, createContext } from 'react';

// Import Configured Auth
import { auth } from '../firebaseConfig';

// Type for Context if not null
import { User, onAuthStateChanged } from 'firebase/auth';

//Instantiate Context
const AuthenticationContext = createContext<User | null>(null);

// Construct Provider
export const AuthenticationProvider = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);

    // Avoid infinite loop with useEffect / empty dependency array
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthenticationContext.Provider value={user}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContext;
