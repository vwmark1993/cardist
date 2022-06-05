<template>
    <div class="flex justify-between items-center w-3/4 bg-primary hover:bg-secondary text-slate-800 font-bold py-2 px-4 my-2 mx-auto rounded">
        <p class="text-left truncate">{{ text }}</p>
        <span class="material-symbols-outlined align-middle">close</span>
    </div>
</template>

<script>

export default {
  name: 'Category',
  components: {

  }, 
  props: {
    text: String
  },
  data() {
      return {
          
      }
  }
}
</script>
<style scoped>

</style>
