import { Auth, signOut } from 'firebase/auth';

export const handleLogoutUser = async (auth: Auth) => {
    await signOut(auth);
};
