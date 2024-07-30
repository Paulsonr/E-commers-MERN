import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  ClickAwayListener,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/Nav.scss";
import Brudcrumb from "./Brudcrumb";

const Nav = ({ handleLogout, profileLetter }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const avoidBrumcrumb = ["profile", "login", "signup", "cart", "checkout"];

  // profile
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profileOpen = Boolean(profileAnchorEl);
  const handleClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setProfileAnchorEl(null);
  };

  const fetchSuggestions = async (query) => {
    if (query) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users`
        );
        const filteredSuggestions = response.data.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      setAnchorEl(event.currentTarget);
      fetchSuggestions(value);
    } else {
      setAnchorEl(null);
      setSuggestions([]);
    }
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-popper" : undefined;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img
            src="/images/icons/ecart-logo.png"
            alt="Logo"
            className="logo"
            onClick={() => navigate("/products")}
          />
          <div className="grow" />
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              className="inputInput"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Popper id={id} open={open} anchorEl={anchorEl} className="popper">
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper>
                  <List>
                    {suggestions.length === 0 && searchTerm ? (
                      <ListItem className="listItem">
                        <ListItemText primary="Nothing found!" />
                      </ListItem>
                    ) : (
                      suggestions.map((suggestion, index) => (
                        <ListItem button key={index} className="listItem">
                          <ListItemText primary={suggestion.name} />
                        </ListItem>
                      ))
                    )}
                  </List>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </div>
          <div className="grow" />
          <IconButton
            aria-label="show cart items"
            color="inherit"
            onClick={() => navigate("/cart")}
          >
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {console.log("TEST >> ", profileLetter)}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{profileLetter}</Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Menu
          anchorEl={profileAnchorEl}
          id="account-menu"
          open={profileOpen}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => navigate("/profile")}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
      {!avoidBrumcrumb.some((element) =>
        Object.values(params).includes(element)
      ) && <Brudcrumb />}
    </>
  );
};

export default Nav;
