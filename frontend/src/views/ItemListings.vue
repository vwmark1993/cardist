<template>
  <div>
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="showMessage" :message="showMessage" mode="success" />
      </Transition>
    </div>
    <div>
      <span>ITEM LISTINGS PAGE</span>
    </div>
  </div>
</template>

<script>
  import UserHeader from '@/components/UserHeader.vue'
  import AlertMessage from '@/components/AlertMessage.vue'

  export default {
    name: 'ItemListings',
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
