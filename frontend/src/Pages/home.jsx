import { useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";

const Home = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <div>Home</div>
      <>{!!user && <div>Hi {user.email}</div>}</>
    </>
  );
};

export default Home;
