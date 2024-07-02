import { useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import "./styles/home.scss";

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
    // console.log(Cookies.get("token"));
    !Cookies.get("token") && navigate("/", { replace: true });
  }, [user]);

  return (
    <>
      <header>
        <Nav
          handleLogout={handleLogout}
          profileLetter={user?.name?.charAt(0)?.toUpperCase()}
        />
      </header>
      <div className="main_container">
        <Outlet />
      </div>
      <footer>
        <div>footer</div>
      </footer>
    </>
  );
};

export default Home;
