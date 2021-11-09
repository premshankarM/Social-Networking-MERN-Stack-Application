import React, { useState } from 'react';
import { Link,useHistory } from "react-router-dom";
import authService from '../../services/auth.service';

const Signup = () => {
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const history = useHistory()
    return (
        <div className="card auth-form-cards mx-auto p-4 mt-5 input-field">
            <h2 className='display-4 text-center fw-bold'>Chatify</h2>
            <input onChange={($event)=>{setName($event.target.value)}} type='text' placeholder='Name' />
            <input onChange={($event)=>{setEmail($event.target.value)}} type='text' placeholder='Email' />
            <input onChange={($event)=>{setPassword($event.target.value)}} type='password' placeholder='Password' />
            <button 
            onClick={()=>{
                authService.registerUser({
                    name:name,
                    email:email,
                    password:password,
                }).then((result) => {
                    history.push('/signin')
                    window.alert(result.message)
                }).catch((err) => {
                    // window.alert(err.message);
                });
            }}
            className="btn waves-effect waves-light mt-3 #1e88e5 blue darken-1 text-light">
                Register
            </button>
            <span className='font-beauty h5 mt-4 text-center'>Already have an account? <Link to='/signin'>signin</Link></span>
      </div>
    );
}

export default Signup;