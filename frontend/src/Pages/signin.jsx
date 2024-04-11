import { useState } from "react";
import axios from "axios";
const env_var = process.env.REACT_APP_ENV_VAR;
const auth_module = process.env.REACT_APP_AUTH_ROUTE;

const Signin = () => {
  const authModuleURL = `${env_var}${auth_module}`;
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const signinUser = (e) => {
    console.log("SUBMITTING SIGNIN");
    e.preventDefault();
    axios
      .post(`${authModuleURL}/signin`, data)
      .then((response) => {
        console.log("FE >> ", response.data);
      })
      .catch((error) => {
        console.log("FE >> ", error);
      });
  };
  return (
    <div>
      <form onSubmit={signinUser}>
        <label>Email</label>
        <input
          type="text"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signin;
