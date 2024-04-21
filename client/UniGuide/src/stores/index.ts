import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import {
  useCookies
} from "vue3-cookies";

const {
  cookies
} = useCookies()

export const useChatStore = defineStore('chat', () => {
  const room = ref(null)
  const userName = ref(null)
  const roomPassword = ref(null)

  const getRoom = computed(() => room.value || cookies.get('room'))
  const getUserName = computed(() => userName.value || cookies.get('userName'))
  const getRoomPassword = computed(() => roomPassword.value || cookies.get('roomPassword'))

  function logOut() {
    cookies.remove('room')
    cookies.remove('userName')
    cookies.remove('roomPassword')
    
    room.value = null
    userName.value = null
    roomPassword.value = null
  }

  function joinRoom(room: any) {
    room.value = room
  }

  return { room, userName, roomPassword, getRoom, getUserName, getRoomPassword, logOut, joinRoom }
})

