/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { addUserToLeaderboard, getLeaderbord } from "../api/api";

export const GamesContext = React.createContext(null);

export const LifeProvider = ({ children }) => {
  const [lifes, setLifes] = useState(1);
  const [userName, setUserName] = useState("");
  const [results, setResults] = useState([]);
  const [listLeaderbord, setListLeaderboard] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [initialLifes, setInitialLifes] = useState(1);

  useEffect(() => {
    getLeaderbord()
      .then(data => {
        // Сортировка и обрезка массива лидеров
        const sortedLeaderboard = data.sort((a, b) => a.time - b.time);
        const slicedLeaderboard = sortedLeaderboard.slice(0, 10);
        setListLeaderboard(slicedLeaderboard);
      })
      .catch(error => {
        if (error.message === "Failed to fetch") {
          console.log("Не удалось загрузить треки");
          return;
        }
        console.log(error.message);
      });
  }, []);

  const onAddUserToLeaderboard = async ({ name, time }) => {
    try {
      const newUser = await addUserToLeaderboard({
        name,
        time,
      });
      const leaderboardResponse = await getLeaderbord();
      const leaderboard = leaderboardResponse;
      // Поиск позиции нового пользователя
      leaderboard.sort((a, b) => a.time - b.time);
      setListLeaderboard(leaderboard);
      leaderboard = leaderboard.slice(0, 10);
      setListLeaderboard(leaderboard);
      return { id: newUser.id, name: newUser.name, time: newUser.time };
    } catch (error) {
      console.error("Не удалось загрузить лидерборд:", error.message);
    }
  };

  return (
    <GamesContext.Provider
      value={{
        onAddUserToLeaderboard,
        listLeaderbord,
        setListLeaderboard,
        results,
        setResults,
        lifes,
        setLifes,
        userName,
        setUserName,
        isChecked,
        setIsChecked,
        initialLifes,
        setInitialLifes,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
