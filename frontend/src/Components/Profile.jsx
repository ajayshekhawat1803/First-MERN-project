import React, { useEffect, useState } from 'react'
import './Profile.css'

const Profile = () => {
    const [username, setusername] = useState("")
    const [useremail, setuseremail] = useState("")
    const [path, setpath] = useState("")
    useEffect(() => {
        const auth = localStorage.getItem("userdata")
        const user = JSON.parse(auth)
        setusername(user.name)
        setuseremail(user.email)
        setpath(user.profilePath)
    })
    const realPath = "http://localhost:4000/" + path.split("\\")[0] + "/" + path.split("\\")[1]
    return (
        <div className='profile'>
            <div className='item-cont'>
                <div className='img-cont'>
                <img src={realPath} alt="err" />
                </div>
            </div>
            <div className='item-cont'>
                <h1 className='label'>Name:</h1>
                <h1>{username}</h1>
            </div>
            <div className='item-cont'>
                <h1 className='label'>Email:</h1>
                <h1>{useremail}</h1>
            </div>
        </div>
    )
}

export default Profile
