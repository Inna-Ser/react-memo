/* eslint-disable prettier/prettier */
import { shuffle } from "lodash";
import { useContext, useEffect, useState } from "react";
import { STATUS_IN_PROGRESS, STATUS_LOST, STATUS_PREVIEW, STATUS_WON, generateDeck } from "../../utils/cards.js";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import { GamesContext } from "../../context/GamesProvider.jsx";

function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  if (endDate === null) {
    endDate = new Date();
  }

  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSecconds / 60);
  const seconds = diffInSecconds % 60;
  return {
    minutes,
    seconds,
  };
}

export function Cards({ pairsCount = 3, previewSeconds = 5 }) {
  const [cards, setCards] = useState([]);
  const { lifes, setLifes, initialLifes } = useContext(GamesContext);
  const [status, setStatus] = useState(STATUS_PREVIEW);
  const [gameStartDate, setGameStartDate] = useState(null);
  const [gameEndDate, setGameEndDate] = useState(null);
  const [lastOpenedCard, setLastOpenedCard] = useState(null);
  const navigate = useNavigate();
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });

  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date());
    setStatus(status);
  }

  function startGame() {
    setLifes(initialLifes);
    const startDate = new Date();
    setGameEndDate(null);
    setGameStartDate(startDate);
    setTimer(getTimerValue(startDate, null));
    setStatus(STATUS_IN_PROGRESS);
  }

  function resetGame() {
    setLifes(initialLifes);
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setStatus(STATUS_PREVIEW);
  }

  const openCard = clickedCard => {
    if (clickedCard.open) {
      return;
    }

    let nextCards = cards.map(card => (card.id === clickedCard.id ? { ...card, open: true } : card));

    setCards(nextCards);

    if (lastOpenedCard) {
      // проверка наличия последней открытой карты
      if (lastOpenedCard.suit === clickedCard.suit && lastOpenedCard.rank === clickedCard.rank) {
        setLastOpenedCard(null); // Пара найдена, сброс lastOpenedCard
      } else {
        // Пара не найдена, закрыть обе карты через задержку
        setTimeout(() => {
          nextCards = nextCards.map(card =>
            card.id === clickedCard.id || card.id === lastOpenedCard.id ? { ...card, open: false } : card,
          );
          setCards(nextCards);
        }, 1000);
        setLastOpenedCard(null);
      }
    } else {
      setLastOpenedCard(clickedCard); // запоминание последней открытой карты
    }

    const isPlayerWon = nextCards.every(card => card.open);
    if (isPlayerWon) {
      finishGame(STATUS_WON);
      return;
    }

    const openCards = nextCards.filter(card => card.open);
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank);
      return sameCards.length < 2;
    });

    const playerLost = openCardsWithoutPair.length >= 2;
    if (playerLost) {
      const leftLifes = lifes - 1;
      setLifes(Math.max(leftLifes, 0));
      if (leftLifes <= 0) {
        finishGame(STATUS_LOST);
        return;
      }
    }
  };

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

  useEffect(() => {
    if (status !== STATUS_PREVIEW) {
      return;
    }

    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно");
      return;
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10));
    });

    const timerId = setTimeout(() => {
      startGame();
    }, previewSeconds * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, pairsCount, previewSeconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(getTimerValue(gameStartDate, gameEndDate));
    }, 300);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStartDate, gameEndDate]);

  const goToLeaderbord = () => {
    navigate("/leaderboard");
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart(2, "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart(2, "0")}</div>
              </div>
            </>
          )}
        </div>
        {/* <div>
            <button><img></img></button>
          </div> */}
        <div className={styles.counterLifes}>
          {status === STATUS_IN_PROGRESS ? (
            <>
              <Button onClick={resetGame}>Начать заново</Button>
              <div className={styles.lifesText}>
                Количество жизней: <p className={styles.lifes}>{lifes}</p>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.id}
            onClick={() => openCard(card)}
            open={status !== STATUS_IN_PROGRESS ? true : card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>

      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === STATUS_WON}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
          />
        </div>
      ) : null}
      <div className={styles.returnLinkBlock}>
        <Link className={styles.comebackToMainPage} to={"/"}>
          Вернуться к выбору сложности
        </Link>
        <button className={styles.goToLeaderbord} onClick={goToLeaderbord}>
          Перейти в лидерборд
        </button>
      </div>
    </div>
  );
}
