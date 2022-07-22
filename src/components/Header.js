import React from "react";

const Header = ({ title }) => {
  return (
    <header>
      <h1 className="text-xl text-emerald-500 text-bold">
        Example - Hello {title}
      </h1>
    </header>
  );
};

export default Header;
