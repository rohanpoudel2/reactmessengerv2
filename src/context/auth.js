import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase/Firebase'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import Loading from "../components/loading/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [UserData, setUserData] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false)
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('uid', 'in', [user.uid]))
      const result = onSnapshot(q, (queryResult) => {
        let userData = {}
        queryResult.forEach((doc) => {
          userData = { data: doc.data() }
        })
        setUserData(userData)
      })
      return () => result()
    })
  }, [])


  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ user, UserData }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider