<template>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center" content-class="modal-content" name="UserProfileModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">User Settings</span>
      <button class="my-auto" @click="showModal = false">
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="username">Username</label>
        <input class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="username" type="text" disabled="true" placeholder="Username">
        <div class="flex items-center mb-1">
          <label class="block text-gray-700 text-sm font-bold text-left" for="password">Password</label>
          <input v-model="showPassword" type="checkbox" class="block text-gray-700 text-sm font-bold ml-2">
          <span class="text-xs text-gray-500 ml-1">Show</span>
        </div>
        <input v-if="showPassword" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="password" type="text" placeholder="Password">
        <input v-else class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="password" type="password" placeholder="Password">
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Email</label>
        <input class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="email" type="email" placeholder="Email">
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Phone Number</label>
        <input class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="phone" type="phone" placeholder="Phone">
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Profile Picture</label>
        <input class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="picture" type="text" placeholder="">
      </div>
    </div>
    <div>
      <button @click="showModal = false" class="user-profile-item-remove-button bg-green-600 hover:bg-green-800 text-white text-sm px-4 py-2 mr-1 rounded">Confirm</button>
      <button @click="showModal = false" class="user-profile-item-remove-button bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 mr-1 rounded">Cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
  export default {
    name: 'UserSettingsModal',
    data: () => ({
      showModal: false,
      showPassword: false
    })
  }
  </script>

<style scoped>
  ::v-deep .modal-content {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    min-width: 600px;
  }
  .dark-mode div::v-deep .modal-content {
    border-color: #2d3748;
    background-color: #1a202c;
  }
  </style>
