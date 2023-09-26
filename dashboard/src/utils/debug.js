import { useConfigStore } from '@/stores'

export const debugApi = (endpoint, response) => {
  const isDebugMode = useConfigStore().isDebugMode

  if (isDebugMode) {
    const success = (response.status >= 200 && response.status < 300)
    const requestType = response.config.method.toUpperCase()
    const statusColor = success ? 'forestgreen' : 'crimson'
    const responseIcon = success ? '✔' : '✖'

    if (!success) {
      response = response.response.data
    }

    console.log(
      '%cAPI',
      `background-color: ${statusColor}; color: white; border-radius: 5px; padding: 0 3px; font-weight: 700;`,
      requestType,
      endpoint,
      responseIcon,
      response.status,
      response.data
    )
  }
}