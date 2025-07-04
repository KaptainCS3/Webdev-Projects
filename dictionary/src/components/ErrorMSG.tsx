import React from "react";

interface ErrorMSGProps {
  error_value: string;
}

const ErrorMSG: React.FC<ErrorMSGProps> = ({ error_value }) => {
  return <div className="text-red-500 pt-3">{error_value}</div>;
};

export default ErrorMSG;
