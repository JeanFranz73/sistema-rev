class JWT {

    decode(token) {
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

    isTokenValid(token) {
        if (!token || !localStorage.getItem('token')) {
            return false
        }

        const decodedToken = this.decode(token)

        return decodedToken.expires * 1000 > Date.now()
    }

    getToken(token) {
        if (!token || this.isTokenValid(token) === false) {
            localStorage.removeItem('token')
            return undefined
        }

        return token
    }

    getUser(token) {
        const decodedToken = this.decode(token)

        if (this.isTokenValid(token) === false) {
            localStorage.removeItem('token')
            return null
        }

        return decodedToken.payload.user
    }
}

export default new JWT()