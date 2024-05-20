/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import styles from './SelectDifficultyPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { GamesContext } from '../../context/GamesProvider'
import classNames from 'classnames'

export const SelectDifficultyPage = () => {
  const { setLifes } = useContext(GamesContext)
  const navigater = useNavigate()

  const onChangeLifes = (costLives) => {
    setLifes(costLives)
    localStorage.setItem('lifes', costLives)
    navigater('/levelPage')
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p className={styles.textStart}>Для старта игры</p>
        <h1 className={styles.title}>выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link
              className={classNames(styles.levelLink, styles.active)}
              onClick={() => onChangeLifes(3)}
            >
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link
              className={classNames(styles.levelLink, styles.active)}
              onClick={() => onChangeLifes(2)}
            >
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link
              className={classNames(styles.levelLink, styles.active)}
              onClick={() => onChangeLifes(1)}
            >
              3
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
