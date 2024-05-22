/* eslint-disable prettier/prettier */
import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GamesContext } from "../../context/GamesProvider";
import classNames from "classnames";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const { userName, setUserName, onAddUserToLeaderboard } = useContext(GamesContext);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const { lifes } = useContext(GamesContext);

  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  useEffect(() => {
    setIsSaveButtonDisabled(userName.trim() === "");
  }, [userName]);

  const handleInputChange = event => {
    setUserName(event.target.value);
  };

  const handleButtonClick = async () => {
    const gameTime = gameDurationMinutes * 60 + gameDurationSeconds;
    try {
      await onAddUserToLeaderboard({ name: userName, time: gameTime });
      navigate("/leaderboard");
    } catch (error) {
      console.error("Ошибка при сохранении результата:", error.message);
    }
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {lifes === 1 ? (
        <>
          <input
            className={styles.inputUser}
            placeholder="Пользователь"
            value={userName}
            onChange={handleInputChange}
          />
          <p className={styles.description}>Затраченное время:</p>
          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
          </div>
          <button
            className={isSaveButtonDisabled === true ? classNames(styles.button, styles.disabled) : styles.button}
            onClick={handleButtonClick}
            disabled={isSaveButtonDisabled}
          >
            Отправить результат
          </button>
          <Button onClick={onClick}>Начать сначала</Button>
        </>
      ) : (
        <>
          <p className={styles.description}>Затраченное время:</p>
          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
          </div>
          <Button onClick={onClick}>Начать сначала</Button>
        </>
      )}
    </div>
  );
}
