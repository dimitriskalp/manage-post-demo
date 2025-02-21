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
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          {
            errors && <div className="alert">
              {
                Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                  )
                )
              }
            </div>
          }
          <input ref={emailRef} type="email" placeholder="Email"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <button className="btn btn-block">Submit</button>
          <p className="message">
            Not Registered <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
