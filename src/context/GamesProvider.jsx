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
  const [achievements, setachievements] = useState([]);
  const [isEpiphanyDisabled, setIsEpiphanyDisabled] = useState(false);
  const [isAlohomoraDisabled, setIsAlohomoraDisabled] = useState(false);
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    getLeaderbord()
      .then(data => {
        const mappedLeaderboard = data.map(leader => {
          const hasSuperpowerAchievement = leader.achievements.includes(2);
          const hasHardmodeAchievement = leader.achievements.includes(1);
          return { ...leader, hasSuperpowerAchievement, hasHardmodeAchievement };
        });
        console.log(mappedLeaderboard);

        // Сортировка и обрезка массива лидеров
        mappedLeaderboard.sort((a, b) => a.time - b.time);
        const slicedLeaderboard = mappedLeaderboard.slice(0, 10);
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

  const onAddUserToLeaderboard = async ({ name, achievements, time }) => {
    try {
      const updataAchievements = [...achievements];
      if (!isChecked) {
        updataAchievements.push(1);
      }
      if (!isAlohomoraDisabled || !isEpiphanyDisabled) {
        updataAchievements.push(2);
      }
      const newUser = await addUserToLeaderboard({
        name,
        achievements: updataAchievements,
        time,
      });
      const newLiders = newUser.sort((a, b) => a.time - b.time).slice(0, 10);
      setListLeaderboard(newLiders);
      return { id: newUser.id, name: newUser.name, achievements: newUser.achievements, time: newUser.time };
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
        achievements,
        setachievements,
        isEpiphanyDisabled,
        setIsEpiphanyDisabled,
        isAlohomoraDisabled,
        setIsAlohomoraDisabled,
        isActive,
        setIsActive,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
