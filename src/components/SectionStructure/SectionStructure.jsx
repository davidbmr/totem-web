// Estructura para las secciones del contenido principal (Fondo blanco con bordes redondeados)
import React from 'react'
import style from './SectionStructure.module.css'
export const SectionStructure = ({children}) => {
  return (
    <div className={style.sectionStructure__container}>
      {children}
    </div>
  )
}
