<template>
  <div class="border rounded w-48 h-48 m-3 p-3">
    <p>{{ name }}</p>
  </div>
</template>

<script>

export default {
  name: 'Thumbnail',
  props: {
    name: String
  },
  data() {
      return {
          
      }
  }
}
</script>
<style scoped>

</style>
