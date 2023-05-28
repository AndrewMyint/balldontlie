import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface AuthContextProps {
  user: string | null;
  teams: Team[];
  login: (username: string) => void;
  logout: () => void;
  addTeam: (team: Team) => void;
}

export interface Team {
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

export const useAuth = () => useContext(AuthContext);

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  teams: [],
  login: () => {},
  logout: () => {},
  addTeam: () => {},
});

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // Retrieve teams from local storage
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const logout = () => {
    setUser(null);
    setTeams([]);
    localStorage.removeItem("user");
    localStorage.removeItem("teams");
  };

  const addTeam = (team: Team) => {
    // Add new team to the existing teams array
    const updatedTeams = [...teams, team];
    setTeams(updatedTeams);
    // Save updated teams to local storage
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  return (
    <AuthContext.Provider value={{ user, teams, login, logout, addTeam }}>
      {children}
    </AuthContext.Provider>
  );
};
