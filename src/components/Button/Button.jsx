import React from 'react'
import styles from './Button.module.css'

export const Button = ({
    Texto, onClick, Type
}) => {
  return (
    <button className={styles.button} onClick={onClick} type={Type}>{Texto}</button>
  )
}



