import {useState} from 'react';
import axios from "axios";
const env_var = process.env.REACT_APP_ENV_VAR;
const auth_module = process.env.REACT_APP_AUTH_ROUTE;

const Signup = () => {
  const authModuleURL = `${env_var}${auth_module}`;
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const signupUser = (e) => {
    console.log("SUBMITTING SIGNUP");
    e.preventDefault();
    axios
      .post(`${authModuleURL}/signup`, data)
      .then((response) => {
        console.log("FE >> ", response.data);
      })
      .catch((error) => {
        console.log("FE >> ", error);
      });
  } 
  return (
    <div>
      <form onSubmit={signupUser}>
        <label>Email</label>
        <input type="text" value={data.email} onChange={(e)=>setData({...data, email:e.target.value})}/>
        <label>Password</label>
        <input type="password" value={data.password} onChange={(e)=>setData({...data, password:e.target.value})}/>
        <label>Confirm Password</label>
        <input type="password" value={data.confirmPassword} onChange={(e)=>setData({...data, confirmPassword:e.target.value})}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Signup