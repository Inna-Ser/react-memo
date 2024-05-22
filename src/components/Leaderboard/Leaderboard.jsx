/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router-dom";
import styles from "./Leaderboard.module.css";
import { Button } from "../Button/Button";
import { useContext, useState } from "react";
import { STATUS_PREVIEW } from "../../utils/cards";
import { GamesContext } from "../../context/GamesProvider";

const LeaderItems = () => {
  const { listLeaderbord = [] } = useContext(GamesContext);

  return (
    <div className={styles.leaderboardContent}>
      <div className={styles.leaderboardHeader}>
        <p className={styles.numbUser}>Позиция</p>
        <p className={styles.headerNameUser}>Пользователь</p>
        <p className={styles.timeUser}>Время</p>
      </div>
      {listLeaderbord.map((result, index) => (
        <div className={styles.leaderboardItems} key={result.id}>
          <p className={styles.numbUser}># {index + 1}</p>
          <p className={styles.nameUser}>{result.name}</p>
          <p className={styles.timeUser}>{result.time}</p>
        </div>
      ))}
    </div>
  );
};

export const Leaderboard = () => {
  const [, setStatus] = useState(STATUS_PREVIEW);
  // Дата начала игры
  const [, setGameStartDate] = useState(null);
  // Дата конца игры
  const [, setGameEndDate] = useState(null);
  const navigater = useNavigate();

  function resetGame() {
    setGameStartDate(null);
    setGameEndDate(null);
    setStatus(STATUS_PREVIEW);
    navigater("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleLeaderboard}>
          <h2>Лидерборд</h2>
        </div>
        <div className={styles.buttonStart}>
          <Button onClick={resetGame}>Начать игру</Button>
        </div>
      </div>
      <div>
        <LeaderItems />
      </div>
    </div>
  );
};
