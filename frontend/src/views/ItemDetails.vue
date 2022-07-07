<template>
  <div>
    <UserHeader />
    <div class="grid grid-cols-12 grid-flow-col">
      <div class="md:col-span-4 grid grid-cols-4 m-3">
        <div class="col-span-1 flex flex-col mx-2">
          <img @click="setImageIndex(index)" v-for="(image, index) in itemDetails.images" :key="image.id" :src="image" class="border rounded mb-2 cursor-pointer opacity-50 hover:opacity-100 transition delay-75 ease-in-out" />
        </div>
        <div class="col-span-3">
          <img v-if="itemDetails.images.length > 0" :src="itemDetails.images[selectedIndex]" class="border rounded m-auto" />
          <span v-else class="material-symbols-outlined m-auto">image</span>
        </div>
      </div>
      <div class="col-span-8 text-left m-3">
        <h1 class="text-4xl font-bold border-b pb-3 mb-3">{{itemDetails.name}}</h1>
        <p>Description: {{itemDetails.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from '@/components/UserHeader.vue'
import ItemDataService from '@/services/ItemDataService.js'

export default {
  name: 'ItemDetails',
  components: {
    UserHeader
  },
  data() {
      return {
          id: this.$route.params.itemId,
          itemDetails: {
            id: null,
            name: null,
            description: null,
            images: []
          },
          selectedIndex: 0
      }
  },
  methods: {
    getItem() {
      console.log(this.id)
      ItemDataService.get(this.id)
      .then(response => {
        this.itemDetails = response.data;
        console.log(response.data)
      }).catch(e => {
        console.log(e)
      })
    },
    setImageIndex(index) {
      this.selectedIndex = index;
    }
  },
  computed: {

  },
  mounted() {
    this.getItem();
  }
}
</script>
<style scoped>

</style>
