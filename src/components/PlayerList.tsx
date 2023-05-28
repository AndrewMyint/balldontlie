"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "@/context/AuthContext";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const fetchPlayerList = async () => {
    setPage(page + 1);
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players?per_page=10&page=${page}`
    );
    const data = await response.json();
    const fetchedPlayers = data.data;
    setPlayers((prevPlayers) => [...prevPlayers, ...fetchedPlayers]);
   

    const totalCount = data?.meta?.total_count;
    const currentPlayers = [...players, ...fetchedPlayers].length;

    if (totalCount > currentPlayers) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchPlayerList().catch((err) => console.error(err));
  }, []);

  const renderPlayers = () => {
    return players.map((player: any, index) => (
      <div key={index} style={style}>
        No.{index + 1} {player.first_name} {player.last_name}
      </div>
    ));
  };

  return (
    <>
      {user && (
        <div>
          <h1>Player List</h1>
          <InfiniteScroll
            dataLength={players.length}
            next={fetchPlayerList}
            height={400}
            hasMore={hasMore}
            scrollThreshold={1}
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
