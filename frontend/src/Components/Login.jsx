import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        const auth = localStorage.getItem("userdata");
        if (auth) {
            navigate("/")
        }
    }, [])

    const loginHandle = async () => {
        // console.log(email, password);
        let result = await axios.post("http://localhost:4000/login", { email, password });
        // result =await JSON.stringify(result.data);
        result = result.data
        console.log(result);
        if (result.name) {
            localStorage.setItem("userdata", JSON.stringify(result))
            navigate("/")
        }
        else {
            alert("Please Enter Correct Detils")
        }
    }
    return (
        <div className="login">
            <h1>Login Page</h1>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                loginHandle();
            }}>
                <input type="email" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                <input type="submit" value="Login" id='loginBtn' />
            </form>
        </div>
    )
}

export default Login
