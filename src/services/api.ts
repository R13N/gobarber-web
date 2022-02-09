import axios, { AxiosError } from 'axios'
import { signOut } from '../contexts/AuthContext'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${}`,
  },
})

type FailedRequest = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestsQueue: FailedRequest[] = []

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data.code === 'token.expired') {
        // renovar token
        const refreshToken =
          localStorage.getItem('@Gobarber:refresh-token') || '{}'

        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('/refresh', { refreshToken })
            .then(response => {
              const { token } = response.data

              localStorage.setItem('@Gobarber:token', token)

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              api.defaults.headers.Authorization = `Bearer ${token}`

              failedRequestsQueue.forEach(request => request.onSuccess(token))
              failedRequestsQueue = []
            })
            .catch(error => {
              failedRequestsQueue.forEach(request => request.onFailure(error))
              failedRequestsQueue = []

              signOut()
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              originalConfig.headers.Authorization = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            },
          })
        })
      } else {
        // deslogar usuário
        signOut()

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

export default api
