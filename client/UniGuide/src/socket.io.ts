import { io } from 'socket.io-client'

export const useSocketIO = () => {
  const socket = io('ws://localhost:8080/api')
  return {
    socket,
  }
}