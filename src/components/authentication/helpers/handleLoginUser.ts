import { Auth, signInWithEmailAndPassword } from '@firebase/auth';

export const handleLoginUser = async (
    auth: Auth,
    email: string,
    password: string
) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unexpected:', error);
        }
    }
};
