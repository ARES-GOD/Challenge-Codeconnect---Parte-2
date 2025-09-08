import React from "react";
import Authentication from "../components/Authentication";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <Authentication
      onLogin={onLogin}
    />
  );
};

export default Login;
