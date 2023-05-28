'use client'
import React from "react";
import LoginForm from "../components/LoginForm";
import TeamForm from "../components/TeamForm";
import PlayerList from "../components/PlayerList";
import { AuthProvider, useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  return (
    <AuthProvider>
      <div>
        <LoginForm />
        <TeamForm />
        <PlayerList />
      </div>
    </AuthProvider>
  );
};

export default Home;
