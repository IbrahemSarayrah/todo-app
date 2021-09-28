
import { useContext, useState } from "react";
import { When } from "react-if";
import { Card, Elevation, H2, InputGroup, Button } from '@blueprintjs/core';
import { AuthContext } from "../../context/authentication";


export default function Login(props) {

    //login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //signup
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    //state to show the signup form or login form
    const [singupDisplay, setSingupDisplay] = useState(true);

    const context = useContext(AuthContext);

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        context.login(username, password)
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        context.signup(userName, passWord, firstname , lastname , email, role)
    };

    return (
        <>
        { singupDisplay ?
            <When condition={!context.loggedIn}>
                <Card className="cardLogin" interactive elevation={Elevation.FOUR}>
                    <H2>Login</H2>
                    <form onSubmit={handleLoginSubmit}>
                        <label>
                            <span>Username</span>
                            <InputGroup onChange={(e) => setUsername(e.target.value)} placeholder="username" type="text" name="username" />
                        </label>

                        <label>
                            <span>Password</span>
                            <InputGroup onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" name="password" />
                        </label>

                        <label>
                            <Button type="submit">Login</Button>
                        </label>

                        <label>
                            <Button type="button" onClick={() => setSingupDisplay(false)}>Signup</Button>
                        </label>
                    </form>
                </Card>
            </When>
                :
                <Card className="cardLogin" interactive elevation={Elevation.FOUR}>
                <H2>Signup</H2>
                <form onSubmit={handleSignupSubmit}>
                    <label>
                        <span>Username</span>
                        <InputGroup onChange={(e) => setUserName(e.target.value)} placeholder="username" type="text" name="username" />
                    </label>
                        <br/>
                    <label>
                        <span>Firstname</span>
                        <InputGroup onChange={(e) => setFirstname(e.target.value)} placeholder="firstName" type="text" name="firstname" />
                    </label>
                    <br/>
                    <label>
                        <span>Lastname</span>
                        <InputGroup onChange={(e) => setLastname(e.target.value)} placeholder="lastname" type="text" name="lastname" />
                    </label>
                    <br/>
                    <label>
                        <span>Password</span>
                        <InputGroup onChange={(e) => setPassWord(e.target.value)} placeholder="password" type="password" name="password" />
                    </label>
                    <br/>
                    <label>
                        <span>email</span>
                        <InputGroup onChange={(e) => setEmail(e.target.value)} placeholder="email" type="text" name="email" />
                    </label>
                    <br/>
                    <label>
                        <span>role</span>
                        <InputGroup onChange={(e) => setRole(e.target.value)} placeholder="role = [admin,user,vendor]" type="text" name="username" />
                    </label>
                    <br/>
                    <label>
                        <Button type="submit">Signup</Button>
                    </label>

                    <label>
                        <Button type="button" onClick={() => setSingupDisplay(true)}>Signin</Button>
                    </label>
                </form>
            </Card>
        }
        </>
    );
}