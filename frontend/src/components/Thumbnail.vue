<template>
  <div class="thumbnail m-3">
    <div class="flex flex-col border rounded hover:border-secondary">
      <img :src="image" class="h-48 object-contain" />
      <div class="p-2">
        <span class="block h-13 line-clamp-2 text-left">{{ name }}</span>
        <span class="block text-right">${{ price }}</span>
      </div>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'Thumbnail',
  props: {
    name: String,
    price: Number,
    image: String
  },
  data() {
      return {
          
      }
  }
}
</script>
<style scoped>
  .thumbnail {
    max-width: 12rem;
    max-height: 13rem;
  }
</style>
