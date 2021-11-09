import React, { useContext, useState } from 'react';
import { Link,useHistory } from "react-router-dom";
import { UserContext } from '../../App';
import authService from '../../services/auth.service';

const Signin = () => {
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const history = useHistory();
    const userContext = useContext(UserContext);
    return (
        <div className="card auth-form-cards mx-auto p-4 mt-5 input-field">
            <h2 className='display-4 text-center fw-bold'>Chatify</h2>
            <input onChange={($event)=>{setEmail($event.target.value)}} type='text' placeholder='Email' />
            <input onChange={($event)=>{setPassword($event.target.value)}} type='password' placeholder='Password' />
            <button 
            onClick={()=>{
                authService.signinUser({
                    email:email,
                    password:password,
                }).then((result) => {
                    localStorage.setItem('jwt',result.token);
                    localStorage.setItem('user',JSON.stringify(result.user));
                    console.log(userContext);
                    userContext.dispath({type:'user',payload:result.user})
                    history.push('/')
                    window.alert('Login successfull');
                }).catch((err) => {
                    window.alert(err.message);
                });
            }}
            className="btn waves-effect waves-light mt-3 #1e88e5 blue darken-1 text-light">
                Login
            </button>
            <span className='font-beauty h5 mt-4 text-center'>Already have an account? <Link to='/signup'>Register!</Link></span>
      </div>
    );
}

export default Signin;