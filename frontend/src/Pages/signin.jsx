import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { TextField, FormControl, Button } from "@mui/material";
import { UserContext } from "../Context/userContext";
const env_var = process.env.REACT_APP_ENV_VAR;
const auth_module = process.env.REACT_APP_AUTH_ROUTE;

const Signin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const authModuleURL = `${env_var}${auth_module}`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email == "") {
      setEmailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }

    if (email && password) {
      let payload = { email: email, password: password };
      await axios
        .post(`${authModuleURL}/signin`, payload)
        .then((response) => {
          toast.success(response.data.message);
          navigate("/products");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
      await axios.get(`${authModuleURL}/profile`).then(({ data }) => {
        setUser(data);
      });
    }
  };
  useEffect(() => {
    if (user) navigate("/products");
  }, [user]);
  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
          error={emailError}
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          error={passwordError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Login
        </Button>
      </form>
      <small>
        Need an account? <Link to="/signup">Register here</Link>
      </small>
    </div>
  );
};

export default Signin;
