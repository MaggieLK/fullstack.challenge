import React, { ReactElement } from 'react'
import { DateTime } from 'luxon'
import Color from 'color'

import style from './style.scss'

const formatWhen = (dt: DateTime) => dt.toFormat(dt.minute ? 'h:mm a' : 'h a')

const ErrorCell = (): ReactElement => {
  const cardBgColor = Color('red').alpha(0.1).string()
  const titleColor = Color('red').alpha(0.8).mix(Color('#000'), 0.4).string()

  return (
    <div className={style.outer}>
      <div className={style.when}>{formatWhen(DateTime.local())}</div>
      <div className={style.card} style={{ backgroundColor: cardBgColor }}>
        <div className={style.cardTitle} style={{ color: titleColor }}>
          <span>Error: Please refresh the page.</span>
        </div>
      </div>
    </div>
  )
}

export default ErrorCell
