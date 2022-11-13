import './login.scss'
import helloimg from '../../images/Hi.svg'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '../../firebase/Firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, updateDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [Register, setRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (Register) {
      try {
        setLoading(true)
        const result = await createUserWithEmailAndPassword(auth, data.Email, data.Password)
        console.log(result)
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          name: data.Name,
          email: data.Email,
          password: data.Password,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
        setLoading(false)
        setError(false)
        navigate('/')
      } catch (error) {
        setLoading(false)
        const errTxt = error.message.split('/')[1].split(')')[0].replaceAll('-', ' ')
        setError(errTxt)
      }
    } else {
      try {
        setLoading(true)
        const result = await signInWithEmailAndPassword(auth, data.Email, data.Password)
        console.log(result)
        await updateDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          isOnline: true,
        });
        setLoading(false)
        setError(false)
        navigate('/')
      } catch (error) {
        setLoading(false)
        const errTxt = error.message.split('/')[1].split(')')[0].replaceAll('-', ' ')
        setError(errTxt)
      }
    }

  }


  return (
    <div className="login">
      <div className="left">
        <img src={helloimg} alt='hiImage' />
      </div>

      <div className="right">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="headings">
            <span className="heading">{Register ? 'Register' : 'Login'}</span>
            <span className="sub-heading">{Register ? 'Enter desired credientials to create your account.' : 'Enter your credientials to access your account.'}</span>
          </div>
          {Register &&
            <div className="form-item">
              <label>Name</label>
              <input type="text" placeholder='Rohan Poudel' {...register("Name", { required: true })} />
              {errors.Name && <span style={{ fontWeight: '500', fontSize: '12px', marginBottom: '10px', color: 'red', textTransform: 'uppercase' }}>Please enter your Email</span>}
            </div>
          }
          <div className="form-item">
            <label>Email Address</label>
            <input type="email" placeholder='name@company.com' {...register("Email", { required: true })} />
            {errors.Email && <span style={{ fontWeight: '500', fontSize: '12px', marginBottom: '10px', color: 'red', textTransform: 'uppercase' }}>Please enter your Email</span>}
          </div>
          <div className="form-item">
            <div className="pass">
              <label>Password</label>
              {!Register &&
                <span>Forgot Password?</span>
              }
            </div>
            <div className="password-input">
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' {...register('Password', { required: true })} />
              <i className="fa-regular fa-eye" onClick={() => setShowPassword(!showPassword)}></i>
            </div>
            {errors.Password && <span style={{ fontWeight: '500', fontSize: '12px', marginBottom: '10px', color: 'red', textTransform: 'uppercase' }}>Please enter your Password</span>}
          </div>
          {error && <span style={{ color: 'red', textTransform: 'uppercase', fontSize: '12px' }}>{error}</span>}
          <button type='submit'>
            {
              loading ? 'Loading...' :

                Register ? 'Register' : 'Login'
            }
          </button>
          <span className='register'>
            {Register ? <>
              Already a User? <span onClick={() => setRegister(false)} > Login
              </span>
            </> :
              <>
                Not a User? <span onClick={() => setRegister(true)} > Register
                </span>
              </>
            }
          </span>
        </form>
      </div>
    </div >
  )
}

export default Login