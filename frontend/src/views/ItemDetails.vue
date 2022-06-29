<template>
  <div>
    <p>ID: {{id}}</p>
  </div>
</template>

<script>

export default {
  name: 'ItemDetails',
  components: {

  },
  data() {
      return {
          id: this.$route.params.itemId
      }
  }
}
</script>
