import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumbs, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Brudcrumb = () => {
  const navigate = useNavigate();
  const { brudcrumb } = useSelector((state) => state.app);

  return (
    <div role="presentation">
      {console.log(brudcrumb)}
      <Breadcrumbs aria-label="breadcrumb">
        {brudcrumb.length > 1 &&
          brudcrumb.map((item, index) => (
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate(item.link)}
              key={index}
            >
              {item.name}
            </Link>
          ))}
      </Breadcrumbs>
    </div>
  );
};

export default Brudcrumb;
