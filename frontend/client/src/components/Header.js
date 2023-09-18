import "./Header.css"
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Header(){
    const logOut = async ()=>{
       await signOut(auth)
    }
    return(
        <>
<nav className="header">
        <h2>Light Sensor Controller</h2>
    <ul>
        <li>
                Dashboard
        </li>
        <li>
                Login
        </li>
        <li onClick={logOut}>
                Logout
        </li>
    </ul>
</nav>

        <br></br>
        <br></br>
        </>
    )
}
