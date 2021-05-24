import React, { ReactElement } from 'react'
import style from './style.scss'

interface Props {
  calendars: { id: string; color: string }[]
  onChange: any
}

const Select = ({ calendars, onChange }: Props): ReactElement => {
  return (
    <div className={style.outer}>
      <label>Select calendar: </label>
      <select className={style.select} onChange={onChange}>
        <option value="">All calendars</option>
        {calendars.map((calendar) => {
          return (
            <option key={calendars.indexOf(calendar) + 1} value={calendar.id}>
              {calendar.color}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
