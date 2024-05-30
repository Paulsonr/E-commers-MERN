import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/nav.scss";

const Nav = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

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
    <AppBar position="static">
      <Toolbar>
        <img src="/images/icons/ecart-logo.png" alt="Logo" className="logo" />
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
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
