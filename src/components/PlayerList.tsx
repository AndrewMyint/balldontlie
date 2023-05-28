import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "@/styles/PlayerList.module.css";
import { useAuth } from "@/context/AuthContext";

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const fetchPlayerList = async () => {
    try {
      setPage((prevPage) => prevPage + 1);
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/players?per_page=10&page=${page}`
      );
      const data = await response.json();
      const fetchedPlayers = data.data;
      const totalCount = data?.meta?.total_count;
      const currentPlayers = [...players, ...fetchedPlayers].length;
      console.log("data: ", data);
      setPlayers((prevPlayers) => [...prevPlayers, ...fetchedPlayers]);

      if (totalCount > currentPlayers) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
      console.error("Error fetching player list:", error);
    }
  };

  useEffect(() => {
    fetchPlayerList();
  }, []);

  const renderPlayers = () => {
    return (
      user && (
        <div className={styles.playerList}>
          {players.map((player: any, index) => (
            <div key={index} className={styles.playerCard}>
              <div className={styles.playerName}>
                No.{index + 1} {player.first_name} {player.last_name}
              </div>
              {/* <div className={styles.playerInfo}>
                          <div>Team: {player.team.full_name}</div>
                          <div>Position: {player.position}</div>
                        </div> */}
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <>
   { user && (
      <div>
        <h1>Player List</h1>
        <InfiniteScroll
          dataLength={players.length}
          next={fetchPlayerList}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more players</p>}
        >
          {renderPlayers()}
        </InfiniteScroll>
      </div>
    )}
    </>
  );
};

export default PlayerList;
