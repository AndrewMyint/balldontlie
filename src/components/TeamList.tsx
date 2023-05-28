import React from "react";
import { useAuth } from "../context/AuthContext";

const TeamList: React.FC = () => {
  const { teams } = useAuth();

  return (
    <div>
      <h2>Team List</h2>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <ul>
          {teams.map((team, index) => (
            <li key={index}>
              <strong>Name:</strong> {team.name}<br />
              <strong>Player Count:</strong> {team.playerCount}<br />
              <strong>Region:</strong> {team.region}<br />
              <strong>Country:</strong> {team.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamList;
