<template>
  <div class="p-2 mx-4 mt-4">
    <img :src="bannerImage" class="banner" />
  </div>
</template>

<script>
import BannerDataService from '@/services/BannerDataService'

export default {
  name: 'Banner',
  data() {
    return {
      bannerImage: ''
    }
  },
  async mounted() {
    try {
      let response = await BannerDataService.getSelectedBanner();
      this.bannerImage = response.data.image;
    } catch (e) {
      this.$emit('bannerError');
    }
  }
}
</script>

<style scoped>
  .banner {
    width: 100%;
    height: 125px;
    border-radius: 5px;
  }
</style>