import React, { useState } from 'react'

import { login } from '../firebase/functions'

import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await login(email, password)
      navigate("/")
    } catch(err) {
      setErr(true)
    }

  }

  return (
    <div className='form-container'>
        <div className='form-wrapper'>
            <span className='title-logo'>Miscord</span>
            <span className='title-register'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <button>Sign in</button>
            </form>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
            {err && <span>Something went wrong</span>}
        </div>
    </div>
  )
}

export default Login