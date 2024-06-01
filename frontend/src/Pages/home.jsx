import { useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Products from "./products";
import Nav from "./nav";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("??", cookies);
    removeCookie("token", { path: "/" });
    setUser(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div>Home</div>
      <>{!!user && <div>Hi {user.email}</div>}</>
      <Nav handleLogout={handleLogout} />
      <Products />
    </>
  );
};

export default Home;
