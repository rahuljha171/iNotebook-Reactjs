import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


const Login = (props) => {
    const host = "https://noteappmern.herokuapp.com";
    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({email:"",password:""});
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API call
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
      body: JSON.stringify({ email:credentials.email,password :credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the auth token and redirect to home page
            localStorage.setItem("token",json.authtoken);
            props.showAlert("Login Successful","success");
            navigate('/home');


        }
        else{
            props.showAlert("Invalid Credentails","danger");
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="mt-2">
            <h2>Login to iNoteBook</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
