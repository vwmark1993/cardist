<template>
  <div>
    <UserHeader />
    <Landing />
  </div>
</template>

<script>
// @ is an alias to /src
import UserHeader from '@/components/UserHeader.vue'
import Landing from '@/components/Landing.vue'

export default {
  name: 'Home',
  components: {
    UserHeader,
    Landing
  }
}
</script>
