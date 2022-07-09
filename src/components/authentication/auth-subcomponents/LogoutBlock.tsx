import { auth } from '../../../firebaseConfig';
import { handleLogoutUser } from '../helpers/handleLogoutUser';

function LogoutBlock() {
    return (
        <>
            <h3>Logout</h3>
            <button onClick={() => handleLogoutUser(auth)}>Logout</button>
        </>
    );
}

export default LogoutBlock;
