import { useContext } from 'react';
import AuthenticationContext from '../../context/AuthContext';

// Components
import RegisterBlock from './auth-subcomponents/RegisterBlock';
import LoginBlock from './auth-subcomponents/LoginBlock';
import LogoutBlock from './auth-subcomponents/LogoutBlock';

function AuthenticationForm() {
    const user = useContext(AuthenticationContext);
    return (
        <div>
            <RegisterBlock />
            <LoginBlock />
            <LogoutBlock />
            <p>User: {user?.displayName}</p>
        </div>
    );
}

export default AuthenticationForm;
