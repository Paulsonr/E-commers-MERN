import { useState, useEffect } from "react";
import "./style/nav.scss";
import { styled } from "@mui/material/styles";
import { InputBase, Box, Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "../Shared/Hooks/useDebounce";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#e0e0e0",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));
function Nav() {
  const [query, setQuery] = useState("");
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useDebounce(query, 1000);

  useEffect(() => {
    setListing("");
    console.log("API call", searchQuery, query);

    if (searchQuery || query.length < 0) searchCharacter();
    async function searchCharacter() {
      setListing("");
      setLoading(true);
      const data = {
        results: [{ name: "ads" }, { name: "ert" }, { name: "qwe" }],
      };
      //   console.log("API call", query);
      setListing(["ads", { name: "ert" }, { name: "qwe" }]);
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <nav>
      <div className="logo">
        <img src="/images/icons/ecart-logo.png" alt="logo" />
      </div>
      <div className="search_box">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={!listing ? [{ label: "Loading...", id: 0 }] : listing}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="name" />}
            // onChange={(e) => setQuery(e.target.value)}
            onInputChange={(e) => setQuery(e.target.value)}
          />
        )}

        {/* {loading && <div>Loading...</div>}
        {listing && (
          <Box mt={10} display={"block"}>
            {listing.map((character) => (
              <Box key={character.id} mb={10}>
                <img src={character.image} alt={character.name} />
                {character.name}
              </Box>
            ))}
          </Box>
        )} */}
      </div>
    </nav>
  );
}

export default Nav;
