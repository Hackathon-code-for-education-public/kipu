<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-300">
      <div
          class="bg-white py-10 overflow-auto px-6 shadow rounded-lg sm:px-10 h-100 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
          <div v-if="rooms.length === 0" class="w-full h-full flex items-center justify-center">
              <div class="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
          </div>

          <table v-if="rooms.length > 0" class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                  <tr>
                      <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >Room Name</th>
                      <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >Room Description</th>
                      <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >Room Status</th>

                      <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >Room Password</th>

                      <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >Online Users</th>

                      <th scope="col" class="relative px-6 py-3 tracking-wider">
                          <span class="font-medium text-gray-500">Action</span>
                      </th>
                  </tr>
              </thead>

              <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="room in rooms" :key="room">
                      <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                              <div class="ml-4">
                                  <div class="text-sm font-medium text-gray-900">{{ room.name }}</div>
                              </div>
                          </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">{{ room.description }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                          <span
                              :class="'px-2 inline-flex text-xs leading-5 font-semibold rounded-full ' + (room.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')"
                          >{{ room.status === 'open' ? 'Open' : 'Closed' }}</span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                          <span
                              :class="'px-2 inline-flex text-xs leading-5 font-semibold rounded-full ' + (!room.hasPassword ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')"
                          >{{ room.hasPassword ? 'Yes' : 'No' }}</span>
                      </td>

                      <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                              <div class="ml-4">
                                  <div
                                      class="text-sm font-medium text-green-800"
                                  >{{ room.users }}</div>
                              </div>
                          </div>
                      </td>
                      <td class="px-6 py-4 text-center text-sm font-medium">
                          <button
                              @click="joinRoom(room)"
                              :disabled="room.status !== 'open'"
                              :class="room.status !== 'open' ? 'text-gray-600 hover:text-gray-600 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-900 '"
                          >Join Room</button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script setup>
import { useSocketIO } from '@/socket.io';
import { useChatStore } from '@/stores/index'
import { onMounted, ref } from 'vue';
const { socket } = useSocketIO()

const store = useChatStore()

const rooms = ref([]);
const emit = defineEmits(['changeComponent']);

const joinRoom = (room) => {
  store.joinRoom(room)
  emit('changeComponent', 'loginVue')
}

const getRooms = async () => {
  socket.emit('events', (res) => {
    console.log(res);
  })

  console.log('getRooms client');
  await socket.emit('getRooms', (res) => {
    console.log('res', res);
    this.rooms.value = res.data;
  });

  await socket.on('rooms', (res) => {
    this.rooms.value = res;
  });

  console.log(rooms.value);
}

onMounted(() => {
  getRooms()
})
</script>
