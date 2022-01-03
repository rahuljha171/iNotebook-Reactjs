import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {

   const host = "https://noteappmern.herokuapp.com";
    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({name:"", email:"",password:"",cpassword:""});
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API call
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/auth/createuser`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
      body: JSON.stringify({ email:credentials.email,password :credentials.password ,name:credentials.name})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the auth token and redirect 
            localStorage.setItem("token",json.authtoken);
            navigate('/');
            props.showAlert("Successful SignUp","success");


        }
        else{
            props.showAlert("Invalid Credentails","danger");
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="container" onSubmit={handleSubmit}>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp"  onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength={5}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
