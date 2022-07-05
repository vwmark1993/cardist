<template>
  <div>
    <p>ID: {{itemDetails.id}}</p>
    <p>Name: {{itemDetails.name}}</p>
    <p>Description: {{itemDetails.description}}</p>
  </div>
</template>

<script>
import ItemDataService from '@/services/ItemDataService.js'

export default {
  name: 'ItemDetails',
  components: {

  },
  data() {
      return {
          id: this.$route.params.itemId,
          itemDetails: {
            id: null,
            name: null,
            description: null
          }
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
    }
  },
  mounted() {
    this.getItem();
  }
}
</script>
