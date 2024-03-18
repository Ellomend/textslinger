import { LoggerService } from 'src/services/LoggerService/LoggerService'

export function useLogger() {
  const { log } = LoggerService
  return { log }
}
