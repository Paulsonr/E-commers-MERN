import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import "./styles/profile.scss";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const env_var = process.env.REACT_APP_ENV_VAR;
const auth_module = process.env.REACT_APP_AUTH_ROUTE;
const authModuleURL = `${env_var}${auth_module}`;
function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // Save the changes (e.g., send to the server)
    axios
      .put(`${authModuleURL}/profile`, { name, id: user?.id })
      .then((res) => {
        setIsEditing(false);
        // Update the user's details in the context
        setUser(res.data.user);
        // Update the user's profile picture in the context
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const GetUserDetails = async () => {
      await axios.get(`${authModuleURL}/user/${user.id}`).then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        // setProfilePic(res.data.profilePic);
      });
    };
    if (user) GetUserDetails();
  }, [user]);

  return (
    <div className="profile-container">
      <div className="profile-pic">
        {profilePic ? (
          <img src={profilePic} alt="Profile" />
        ) : (
          <div className="placeholder">Upload Profile Picture</div>
        )}
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="upload-input"
          />
        )}
      </div>
      <div className="profile-details">
        <div className="profile-field">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          {/* {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // disabled={true}
            />
          ) : ( */}
          <span>{email}</span>
          {/* )} */}
        </div>
      </div>
      <Button
        onClick={isEditing ? handleSaveChanges : handleEditClick}
        color="secondary"
      >
        {isEditing ? "Save Changes" : "Edit"}
      </Button>
    </div>
  );
}

export default Profile;
