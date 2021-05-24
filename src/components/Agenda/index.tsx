import React, { ReactElement, useContext, useMemo, useState } from 'react'
import { DateTime } from 'luxon'

import greeting from 'lib/greeting'

import Calendar from 'src/models/Calendar'
import Event from 'src/models/Event'
import AccountContext from 'src/context/accountContext'

import List from './List'
import EventCell from './EventCell'
import ErrorCell from './ErrorCell'
import Select from './Select'

import style from './style.scss'

type AgendaItem = {
  calendar: Calendar
  event: Event
}

const compareByDateTime = (a: AgendaItem, b: AgendaItem) =>
  a.event.date.diff(b.event.date).valueOf()

/**
 * Agenda component
 * Displays greeting (depending on time of day)
 * and list of calendar events
 */

const Agenda = (): ReactElement => {
  const account = useContext(AccountContext)

  const [value, setValue] = useState('')

  const events: AgendaItem[] = useMemo(
    () =>
      account.calendars
        .flatMap((calendar) =>
          calendar.events.map((event) => ({ calendar, event })),
        )
        .sort(compareByDateTime),
    [account],
  )

  const title = useMemo(
    () => greeting(DateTime.local().hour),
    [DateTime.local().hour],
  )

  const calendars: { id: string; color: string }[] = account.calendars.map(
    (cal) => {
      return { id: cal.id, color: cal.color }
    },
  )

  let info
  if (account.calendars.length === 0) {
    info = (
      <List>
        <ErrorCell />
      </List>
    )
  } else {
    info = (
      <List>
        {events.map(({ calendar, event }) => {
          if (value == calendar.id || value === '') {
            return (
              <EventCell key={event.id} calendar={calendar} event={event} />
            )
          }
        })}
      </List>
    )
  }

  return (
    <div className={style.outer}>
      <div className={style.container}>
        <div className={style.header}>
          <span className={style.title}>{title}</span>
        </div>
        <Select
          calendars={calendars}
          onChange={(e: any) => setValue(e.target.value)}
        />
        <div>{info}</div>
      </div>
    </div>
  )
}

export default Agenda
