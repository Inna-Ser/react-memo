import { Link, useNavigate } from 'react-router-dom'
import styles from './SelectLevelPage.module.css'
import { useContext, useEffect, useState } from 'react'
import { GamesContext } from '../../context/GamesProvider'
import { Button } from '../../components/Button/Button'
import classNames from 'classnames'

export function SelectLevelPage() {
  const { lifes } = useContext(GamesContext)
  const [tipeMode, setTypeMode] = useState('')
  const navigator = useNavigate()
  const [isActive, setIsActive] = useState(null)

  useEffect(() => {
    if (lifes === 1) {
      setTypeMode('Сложный')
      return
    }
    if (lifes === 2) {
      setTypeMode('Средний')

      return
    }
    if (lifes === 3) {
      setTypeMode('Легкий')
      return
    }
  }, [lifes])

  const handleClick = (level) => {
    setIsActive(level)
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {/* <p className={styles.textStart}>А теперь</p> */}
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
        <p className={styles.selectedMode}>
          {tipeMode} режим {lifes === 1 ? `${lifes} жизнь` : `${lifes} жизни`}
        </p>
        <Button
          children={'Старт'}
          onClick={() => {
            if (lifes === 1) {
              navigator('/game/3')
            } else if (lifes === 2) {
              navigator('/game/6')
            } else if (lifes === 3) {
              navigator('/game/9')
            }
          }}
        />
        <Link className={styles.comebackToMainPage} to={'/'}>
          Вернуться к выбору сложности
        </Link>
      </div>
    </div>
  )
}
