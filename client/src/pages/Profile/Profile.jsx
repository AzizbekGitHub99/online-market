import React from 'react'
import './Profile.scss'
import { useInfoContext } from '../../context/infoContext'

const Profile = () => {
    const {currentUser} = useInfoContext()
  return (
    <div className="container">
        <div className='user_profile'>
            <h3>Hisob bo'limi</h3>
            <div className="profile_pic">
                <img src={currentUser?.profilePicture || './images/uz.jpg'} alt="" />
                <label htmlFor="profile_pic">
                    <input id='profile_pic' type="file" name='profilePicture'/>
                </label>
            </div>
            <form action="">
                <label htmlFor="">
                    <input defaultValue={currentUser?.firstname} type="text" />
                </label>
                <label htmlFor="">
                    <input defaultValue={currentUser?.lastname} type="text" />
                </label>
                <label htmlFor="">
                    <input defaultValue={currentUser?.email} type="email" />
                </label>
                <label htmlFor="">
                    <input type="text" />
                </label>
                <label htmlFor="">
                    <input type="date" />
                </label>
                <label htmlFor="">
                    <input type="text" />
                </label>
                <label htmlFor="">
                    <input type="text" />
                </label>
            </form>
        </div>
    </div>
  )
}

export default Profile