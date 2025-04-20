import React from "react";

const ErrorMSG = ({ error_value }) => {
  return <div className="text-red-500 pt-3">{error_value}</div>;
};

export default ErrorMSG;
