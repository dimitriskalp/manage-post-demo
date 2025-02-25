import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup () {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errors, setErrors] = useState(null);

  const {setUser,setToken} = useStateContext();
  const onSubmit = (e) => {
    e.preventDefault();
    const input = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', input)
      .then(({data}) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch(error => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 login-form">
          <form onSubmit={onSubmit}>
            <h3 className="title">Signup</h3>
            {
              errors && <div className="alert-login">
                {
                  Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    )
                  )
                }
              </div>
            }
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input className="form-control" ref={nameRef} type="text" id ="name"/>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input ref={emailRef} type="email" className="form-control" id="email"/>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input ref={passwordRef} type="password" className="form-control" id="password"/>
            </div>
            <div className="form-group">
              <label htmlFor="password_confirmation" className="form-label">Password Confirmation</label>
              <input ref={passwordConfirmationRef} type="password" className="form-control" id="password_confirmation"/>
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btnSubmit">Signup</button>
            </div>
            <p className="message mt-3">
              Already Registered <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
