<!-- Reference: https://stackoverflow.com/questions/67391317/multiple-file-upload-and-preview-images-and-videos -->
<template>
  <div class="select-and-preview-files">
    <div v-if="selectedFile && selectedFile !== ''" class="preview-images-container overflow-auto">
      <div class="flex flex-wrap justify-center mb-2 max-width-600">
        <img class="preview-image border border-slate-300 rounded m-1" :src="selectedFile" />
      </div>
    </div>
    <div v-else class="mb-4">
      <span class="text-slate-400 tracking-wider">No Image Selected</span>
    </div>
    <UploadMediaFiles @selected="(file) => selectFile(file)" v-slot="{ openFileDialog }" :reset="resetUploadFile" :removeFileIndex="removeFileIndex" :multiple=false>
      <span v-if="selectedFile && selectedFile !== ''" class="text-slate-400 tracking-wider">Image Selected</span>
      <button @click="openFileDialog" class="flex items-center rounded bg-slate-500 hover:bg-slate-600 text-white mt-2 px-3 py-1 m-auto">
        <span class="material-symbols-outlined mr-1">file_upload</span>
        <span>Upload Picture</span>
      </button>
    </UploadMediaFiles>
  </div>
</template>

<script>
import UploadMediaFiles from '@/components/UploadMediaFiles.vue'

export default {
  name: 'SelectAndPreviewSingleFile',
  components: {
    UploadMediaFiles,
  },
  props: {
    reset: Boolean
  },
  watch: {
    reset() {
      if (this.reset === true) {
        this.selectedFile = null;
      }
    }
  },
  data() {
    return {
      selectedFile: null,
      resetUploadFile: false,
      removeFileIndex: null
    }
  },
  computed: {},
  methods: {
    selectFile(file) {
      this.previewImage(file);
    },
    previewImage(file) {
      let vm = this

      const fileList = file[0]

      let reader = new FileReader()
      reader.onload = function (event) {
        const imageUrl = event.target.result
        vm.selectedFile = imageUrl
        vm.$emit('fileSelected', imageUrl);
      }
      reader.readAsDataURL(fileList[0])
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