import { createContext } from 'react'

const UserContext = createContext({
  user: null,
  token: null,
  hasLoginError: false,
  login: () => null,
  logout: () => null,
  restore: () => null
})

export default UserContext