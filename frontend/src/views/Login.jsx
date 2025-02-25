import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login () {
  const emailRef = useRef();
  const passwordRef = useRef();

  const {setUser,setToken} = useStateContext();
  const [errors, setErrors] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    const input = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setErrors(null);
    axiosClient.post('/login', input)
      .then(({data}) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch(error => {
        const response = error.response;
        if (response && response.status === 422) {
          if(response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
                email: [response.data.message]
              }
            );
          }
        }
      });
  }

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 login-form">
          <form onSubmit={onSubmit}>
            <h3 className="title mb-4">Login into your account</h3>
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
              <label htmlFor="email" className="form-label">Email address</label>
              <input ref={emailRef} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input ref={passwordRef} type="password" className="form-control" id="password"/>
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btnSubmit">Login</button>
            </div>
            <p className="message mt-3">
              Not Registered <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
