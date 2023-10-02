import React, { useState, useEffect } from 'react'
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login-SignUp.css'
const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profilePic, setprofilePic] = useState(null)
    const [err, seterr] = useState(false)
    const navigate = useNavigate()


    //Code jisse user dubara sign up pe na aa ske
    useEffect(() => {
        const auth = localStorage.getItem("userdata");
        if (auth) {
            navigate("/")
        }
    }, [])

    //code to collect data
    const collectData = async () => {
        if (!name || !email || !password) {
            seterr(true);
            return false;
        }
        const result = await axios.post("http://localhost:4000/register", {
            name, email, password, profilePic
        },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        console.log(result);
        localStorage.setItem("userdata", JSON.stringify(result.data))
        if (result) {
            navigate("/")
        }
    }

    return (
        <div className='signup'>
            <h1>Register</h1>
            <form action="" onSubmit={(e) => e.preventDefault()} encType='multipart/form-data'>
                <input type="text" placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} value={name} required />
                {err && !name && <span className='Invalid'>Enter valid Name</span>}

                <input type="email" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                {err && !email && <span className='Invalid'>Enter valid Email</span>}

                <input type="password" placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                {err && !password && <span className='Invalid'>Enter valid password</span>}

                <input type="file" onChange={(e) => setprofilePic(e.target.files[0])} required />
                {/* {err && !profilePic && <span className='Invalid'>Upload Profile Photo</span>} */}

                <input type="submit" value="Submit" id='submitBtn' onClick={collectData} />
            </form>
        </div>
    )
}

export default SignUp
