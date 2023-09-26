const decode = (token) => {
  if (!token) return undefined

  const tokenArray = token.split('.')
  const header = JSON.parse(atob(tokenArray[0]))
  const payload = JSON.parse(atob(tokenArray[1]))

  const decodedToken = {
    header,
    payload,
    expires: payload.exp,
    signature: tokenArray[2]
  }

  return decodedToken
}

const isTokenValid = (token) => {
  if (!token || !localStorage.getItem('token')) {
    return false
  }

  const decodedToken = decode(token)

  return decodedToken.expires * 1000 > Date.now()
}

const getToken = (token) => {
  if (!token || isTokenValid(token) === false) {
    localStorage.removeItem('token')
    return undefined
  }

  return token
}

const getUser = (token) => {
  const decodedToken = decode(token)

  if (isTokenValid(token) === false) {
    localStorage.removeItem('token')
    return null
  }

  return decodedToken.payload.user
}

export default {
  decode,
  isTokenValid,
  getToken,
  getUser
}
