import { Auth, createUserWithEmailAndPassword } from '@firebase/auth';

export const handleRegisterNewUser = async (
    auth: Auth,
    email: string,
    password: string
) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unexpected:', error);
        }
    }
};
