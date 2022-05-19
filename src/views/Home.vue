<template>
  <div>
    <UserHeader />
    <h1 class="font-bold text-5xl text-left">Home</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import UserHeader from '@/components/UserHeader.vue'

export default {
  name: 'Home',
  components: {
    UserHeader
  }
}
</script>
