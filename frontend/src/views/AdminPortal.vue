<template>
  <div>
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="showMessage" :message="showMessage" mode="success" />
      </Transition>
    </div>
    <h1 class="text-4xl font-bold text-slate-700 mb-6 text-left m-3">Admin Portal</h1>
    <div class="grid grid-flow-col justify-between m-3 text-left">
      <div class="col-span-2 m-3 p-5 bg-slate-300 rounded">
        <div>
          <h6 class="text-left my-3 ml-3 font-semibold">General</h6>
          <button class="block w-3/4 bg-primary hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150">Site Metrics</button>
        </div>
        <div>
          <h6 class="text-left my-3 ml-3 font-semibold">Administration</h6>
          <button class="block w-3/4 bg-primary hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150">List of Users</button>
          <button class="block w-3/4 bg-primary hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150">List of Items</button>
          <button class="block w-3/4 bg-primary hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150">Flagged Comments</button>
        </div>
      </div>
      <div class="col-span-10">
        <div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserHeader from '@/components/UserHeader.vue'
  import AlertMessage from '@/components/AlertMessage.vue'

  export default {
    name: 'AdminPortal',
    components: {
      UserHeader,
      AlertMessage
    },
    computed: {
      
    },
    mounted() {
      
    }
  }
</script>
