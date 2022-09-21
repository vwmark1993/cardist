<template>
    <div @click="getItem" class="thumbnail m-3 cursor-pointer">
      <div class="flex flex-col border rounded hover:border-primary transition delay-50 ease-in-out">
        <img v-if="image && image !== ''" :src="image" class="h-48 object-contain" />
        <img v-else-if="!image && imageBlob && imageBlob !== ''" :src="imageBlob" class="h-48 object-contain" />
        <img v-else src="../assets/images/image-placeholder.png" class="h-48 object-contain" />
        <div class="p-2">
          <span class="block h-13 line-clamp-2 text-left">{{ name }}</span>
          <span class="block text-right">{{ price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
        </div>
      </div> 
    </div>
</template>

<script>

export default {
  name: 'Thumbnail',
  props: {
    id: String,
    name: String,
    price: Number,
    image: String,
    imageBlob: String
  },
  methods: {
    getItem() {
      this.$router.push({ name: 'item-details', params: { itemId: this.id } })
    }
  }
}
</script>
<style scoped>
  .thumbnail {
    max-width: 12rem;
  }
</style>
