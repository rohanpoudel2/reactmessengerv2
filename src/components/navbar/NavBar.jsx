import './navbar.scss'
import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Link } from 'react-router-dom'
import { auth, db } from '../../firebase/Firebase'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

  const { user, UserData } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const Logout = async () => {
    setLoading(true)
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false
    });
    await signOut(auth);
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link to='/'>
          React Messenger
        </Link>
      </div>
      <div className="nav-items">
        {
          user ?
            <>
              <div className="nav-item">
                <Link to='/profile'>
                  {
                    UserData ? UserData.data.name : 'Loading...'
                  }
                </Link>
              </div>
              <div className="nav-item" onClick={() => Logout()}>
                {
                  loading ? 'Please Wait ...' :
                    'LogOut'
                }
              </div>
            </>
            :
            <>
              <div className="nav-item">
                <Link to='/login'>
                  Login
                </Link>
              </div>
            </>
        }

      </div>
    </div>
  )
}

export default NavBar