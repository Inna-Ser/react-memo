/* eslint-disable prettier/prettier */
import { Link, useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useContext, useState } from "react";
import { Button } from "../../components/Button/Button";
import classNames from "classnames";
import Vector from "./images/Vector.svg";
import { GamesContext } from "../../context/GamesProvider";

export function SelectLevelPage() {
  const { isChecked, setIsChecked, lifes, setLifes } = useContext(GamesContext);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setLifes(lifes);
    setIsChecked(prevIsChecked => !prevIsChecked);
    if (isChecked) {
      setLifes(3);
      console.log(lifes);
    } else {
      setLifes(1);
      console.log(lifes);
    }
  };
  // Делает активной кнопку выбора уровня
  const handleClick = level => {
    setIsActive(level);
  };

  const handleStart = () => {
    if (isActive === 1) {
      navigate("/game/3");
    } else if (isActive === 2) {
      navigate("/game/6");
    } else if (isActive === 3) {
      navigate("/game/9");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери уровень</h1>
        <ul className={styles.levels}>
          <li
            className={classNames(styles.level, {
              [styles.active]: isActive === 1,
            })}
          >
            <Link onClick={() => handleClick(1)} className={styles.levelLink}>
              1
            </Link>
          </li>
          <li
            className={classNames(styles.level, {
              [styles.active]: isActive === 2,
            })}
          >
            <Link onClick={() => handleClick(2)} className={styles.levelLink}>
              2
            </Link>
          </li>
          <li
            className={classNames(styles.level, {
              [styles.active]: isActive === 3,
            })}
          >
            <Link onClick={() => handleClick(3)} className={styles.levelLink}>
              3
            </Link>
          </li>
        </ul>
        <label className={styles.checkboxLabel}>
          <input
            src={Vector}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className={classNames(styles.customCheckbox, isChecked && styles.checked)}
          ></input>
          <p className={styles.selectedMode}>Легкий режим (3 жизни)</p>
        </label>
        <Button children={"Играть"} onClick={handleStart} />
        <Link className={styles.comebackToMainPage} to={"/leaderboard"}>
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
