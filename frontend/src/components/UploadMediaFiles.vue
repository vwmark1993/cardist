<!-- Reference: https://stackoverflow.com/questions/67391317/multiple-file-upload-and-preview-images-and-videos -->
<template>
  <div class="upload-media-files">
    <input
      id="input-file"
      name="file"
      type="file"
      accept="image/png, image/jpeg"
      multiple
      @click="resetCache"
      @change="addMedia"
      ref="input"
    />
    <slot :openFileDialog="openFileDialog"></slot>
  </div>
</template>

<script>
export default {
  name: 'UploadMediaFiles',
  props: {
    multiple: Boolean,
    accept: String,
    reset: Boolean,
    removeFileIndex: Number
  },
  data() {
    return {
      files: [],
    }
  },
  computed: {},
  methods: {
    resetCache(event) {
      event.target.value = '';
    },
    async addMedia(event) {
      this.files = [];

      const files = event.target.files || event.dataTransfer.files

      if (!files.length) {
        return
      }

      this.files.push(files);
      this.$emit('selected', this.files);
    },

    openFileDialog() {
      this.$refs.input.click()
    },
  },
}
</script>

<style scoped>
input {
    display: none;
}
</style>