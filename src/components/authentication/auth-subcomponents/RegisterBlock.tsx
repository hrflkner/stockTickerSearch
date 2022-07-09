import { useState } from 'react';
import { handleRegisterNewUser } from '../helpers/handleRegisterNewUser';
import { auth } from '../../../firebaseConfig';

function RegisterBlock() {
    const [registerEmail, setRegisterEmail] = useState<string>('');
    const [registerPassword, setRegisterPassword] = useState<string>('');

    return (
        <div>
            <h3> Register User </h3>
            <input
                placeholder="Email..."
                onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }}
            />
            <input
                placeholder="Password..."
                onChange={(event) => {
                    setRegisterPassword(event.target.value);
                }}
            />

            <button
                onClick={() =>
                    handleRegisterNewUser(auth, registerEmail, registerPassword)
                }
            >
                {' '}
                Create User
            </button>
        </div>
    );
}

export default RegisterBlock;
