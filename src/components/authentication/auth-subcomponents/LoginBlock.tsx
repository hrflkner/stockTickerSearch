import { useState } from 'react';
import { handleLoginUser } from '../helpers/handleLoginUser';
import { auth } from '../../../firebaseConfig';

function LoginBlock() {
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    return (
        <div>
            <h3> Login </h3>
            <input
                placeholder="Email..."
                onChange={(event) => {
                    setLoginEmail(event.target.value);
                }}
            />
            <input
                placeholder="Password..."
                onChange={(event) => {
                    setLoginPassword(event.target.value);
                }}
            />

            <button
                onClick={() => handleLoginUser(auth, loginEmail, loginPassword)}
            >
                {' '}
                Login
            </button>
        </div>
    );
}

export default LoginBlock;
