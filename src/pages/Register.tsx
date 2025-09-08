import React from "react";
import Authentication from "../components/Authentication";

interface RegisterProps {
  onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  return (
    <Authentication
      onLogin={onLogin}
    />
  );
};

export default Register;
