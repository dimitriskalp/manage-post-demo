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
    setLoading(true);
    axiosClient.post('/posts', post)
      .then(() => {
        navigate('/posts');
        setLoading(false);
      })
      .catch(error => {
        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        setLoading(false);
      });
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h3>New Post</h3>
          {loading &&
            <div className="loading-overlay" id="loading-overlay">
              <div className="spinner"></div>
            </div>
          }
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
          {!loading &&
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">Title</label>
                <input className="form-control" type="text" id="title" onChange={ev => setPost({...post, title: ev.target.value})}/>
              </div>
              <div className="form-group">
                <label htmlFor="post-body" className="form-label">Body</label>
                <input className="form-control" type="text" id="post-body" onChange={ev => setPost({...post, body: ev.target.value})}/>
              </div>
              <div className="form-group mt-3">
                <button className="btn btn-success btn-create">Create</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}
