import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm: React.FC = () => {
  const { login, logout, user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      login(storedUser);
    }
  });

  const handleLogin = () => {
    login(username);
    setUsername("");
  };

  const handleLogout = () => {
    logout();
  };

  if (user) {
    return (
      <div>
        <p>Welcome, {user}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
