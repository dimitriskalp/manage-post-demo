import {useState} from "react";
import axiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";

export default function PostCreateForm () {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [post, setPost] = useState({
    'title' : '',
    'body': ''
  });
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient.post('/posts', post)
      .then(({data}) => {
        navigate('/posts');
      })
      .catch(error => {
        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }
  return (
    <div>
      <h1>New Post</h1>
      <div className="card animated fadeInDown">
        {loading &&
          <div className="loading-overlay" id="loading-overlay">
            <div className="spinner"></div>
          </div>
        }
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
        {!loading &&
          <form onSubmit={onSubmit}>
            <input type="text" onChange={ev => setPost({...post, title: ev.target.value})} placeholder="Title"/>
            <input type="text" onChange={ev => setPost({...post, body: ev.target.value})} placeholder="Body"/>
            <button className="btn">Create</button>
          </form>
        }
      </div>
    </div>
  )
}
