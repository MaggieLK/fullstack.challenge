import { useState } from 'react'

import Account from 'src/models/Account'
import createAccount from 'lib/createAccount'

import getUpdatedAccount from './getUpdatedAccount'

const initialAccountValue = createAccount()

const useAccount = (): [Account, () => Promise<void>] => {
  const [account, setAccount] = useState<Account>(initialAccountValue)

  const refreshAccount = async () => {
    let update
    try {
      update = await getUpdatedAccount(account)
    } catch (e) {
      console.log('e', e)
      update = {calendars : []}
    }
    setAccount(await getUpdatedAccount(update))
  }
  return [account, refreshAccount]
}

export default useAccount
