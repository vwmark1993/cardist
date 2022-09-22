<!-- Reference: https://stackoverflow.com/questions/67391317/multiple-file-upload-and-preview-images-and-videos -->
<template>
  <div class="select-and-preview-files">
    <div v-if="selectedFiles && selectedFiles.length > 0" class="preview-images-container overflow-auto">
      <div class="flex flex-wrap justify-center mb-2 max-width-600">
        <img :key="index" v-for="(selectedFile, index) in selectedFiles" class="preview-image border border-slate-300 rounded m-1" :src="selectedFile" />
      </div>
    </div>
    <div v-else class="mb-4">
      <span class="text-slate-400 tracking-wider">No Images Selected</span>
    </div>
    <UploadMediaFiles @selected="(files) => selectFiles(files)" v-slot="{ openFileDialog }" :reset="resetUploadFiles" :removeFileIndex="removeFileIndex" :multiple=true>
      <span v-if="selectedFiles.length === 1" class="text-slate-400 tracking-wider">{{ selectedFiles.length }} Image Selected</span>
      <span v-if="selectedFiles.length > 1" class="text-slate-400 tracking-wider">{{ selectedFiles.length }} Images Selected</span>
      <button @click="openFileDialog" class="flex items-center rounded bg-slate-500 hover:bg-slate-600 text-white mt-2 px-3 py-1 m-auto">
        <span class="material-symbols-outlined mr-1">file_upload</span>
        <span>Upload Images</span>
      </button>
    </UploadMediaFiles>
  </div>
</template>

<script>
import UploadMediaFiles from '@/components/UploadMediaFiles.vue'

export default {
  name: 'SelectAndPreviewMultipleFiles',
  components: {
    UploadMediaFiles,
  },
  props: {
    reset: Boolean
  },
  watch: {
    reset() {
      if (this.reset === true) {
        this.selectedFiles = [];
      }
    }
  },
  data() {
    return {
      selectedFiles: [],
      resetUploadFiles: false,
      removeFileIndex: null
    }
  },
  computed: {},
  methods: {
    selectFiles(files) {
      this.selectedFiles = [];
      this.previewImage(files);
    },
    previewImage(files) {
      let vm = this

      for (let i = 0; i < files.length; i++) {
        const fileList = files[i]

        for (let j = 0; j < fileList.length; j++) {
          let reader = new FileReader()
          reader.onload = function (event) {
            const imageUrl = event.target.result
            vm.selectedFiles.push(imageUrl)
          }
          reader.readAsDataURL(fileList[j])
        }
      }
      this.$emit('filesChanged', this.selectedFiles);
    }
  },
}
</script>
<style scoped>
  .max-width-600 {
    max-width: 600px;
  }
  .preview-image {
    width: 100px;
    max-height: 100px;
  }

  .preview-images-container {
    max-height: 250px;
  }
</style>