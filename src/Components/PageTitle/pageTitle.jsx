import React from "react";

const PageTitle = ({ pageTitle }) => {
  const styles = {
    textAlign: "center",
  };

  return (
    <h1 id="PageTitle" style={styles}>
      {pageTitle}
    </h1>
  );
};

export default PageTitle;
