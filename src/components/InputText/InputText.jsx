import React from 'react'
import styles from './InputText.module.css'

export const InputText = ({
    placeHolder
}) => {
  return (
    <input className={styles.input} type='text' placeholder={placeHolder} />
  )
}



