<template>
  <div>
    <UserHeader />
    <Landing />
  </div>
</template>

<script>
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
