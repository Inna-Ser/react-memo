/* eslint-disable prettier/prettier */
import { Link, useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useContext } from "react";
import { Button } from "../../components/Button/Button";
import classNames from "classnames";
import VectorImageUrl from "./images/Vector.svg";
import { GamesContext } from "../../context/GamesProvider";

export function SelectLevelPage() {
  const { isChecked, setIsChecked, setInitialLifes, isActive, setIsActive } = useContext(GamesContext);
  const navigate = useNavigate();

  const handleChange = () => {
    setInitialLifes(!isChecked ? 3 : 1);
    setIsChecked(prevIsChecked => !prevIsChecked);
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
            src={VectorImageUrl}
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
