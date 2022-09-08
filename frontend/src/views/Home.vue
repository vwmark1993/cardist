<template>
  <div>
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="showMessage" :message="showMessage" mode="success" />
      </Transition>
    </div>
    <Landing />
  </div>
</template>

<script>
  import store from '@/store'

  import UserHeader from '@/components/UserHeader.vue'
  import AlertMessage from '@/components/AlertMessage.vue'
  import Landing from '@/components/Landing.vue'

  export default {
    name: 'Home',
    components: {
      UserHeader,
      AlertMessage,
      Landing
    },
    computed: {
      showMessage() {
        if (store.state.user.successfulLoginMessage || store.state.user.logoutMessage || store.state.search.newSearchAlert) {
          if (store.state.user.successfulLoginMessage) {
            return store.state.user.successfulLoginMessage;
          } else if (store.state.user.logoutMessage) {
            return store.state.user.logoutMessage;
          } else if (store.state.search.newSearchAlert) {
            if (store.state.search.queriedItems.length === 1) {
              return store.state.search.queriedItems.length + ' Item Found';
            } else if (store.state.search.queriedItems.length > 1) {
              return store.state.search.queriedItems.length + ' Items Found';
            } else {
              return 'No Items Found';
            }
          }
        } 
        return false;
      }
    },
    mounted() {
      setTimeout(() => {
        store.dispatch('user/removeLoginMessage');
      }, 3000)
    },
    unmounted() {
      store.dispatch('user/removeLoginMessage');
      store.dispatch('user/removeLogoutMessage');
    }
  }
</script>
