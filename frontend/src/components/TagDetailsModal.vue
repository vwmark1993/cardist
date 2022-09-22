<template>
  <vue-final-modal v-model="showModal" @opened="getTag" classes="flex justify-center items-center" content-class="modal-content" name="TagDetailsModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate mb-3">Tag Details</span>
      <button class="my-auto" @click="closeModal">
        <span class="material-symbols-outlined hover:text-tertiary">close</span>
      </button>
    </div>
    <div class="text-left">
      <div>
        <span class="block text-gray-700 text-sm font-bold mb-1">Name</span>
        <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ name }}</span>
      </div>
      <div>
        <span class="block text-gray-700 text-sm font-bold mb-1">Created On</span>
        <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ new Date(createdOn).toLocaleDateString("en-US") }}</span>
      </div>
      <div class="mb-2">
        <div v-if="items.length > 0">
          <span class="block text-gray-700 text-sm font-bold mb-2">Items With This Tag:</span>
          <div class="scroll-container overflow-auto">
            <table class="border-collapse border border-slate-400 mx-auto">
              <thead>
                <tr>
                  <th class="border border-slate-300">Name</th>
                  <th class="border border-slate-300">Price</th>
                  <th class="border border-slate-300">Created On</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id" >
                  <td class="border border-slate-300">{{ item.name }}</td>
                  <td class="border border-slate-300">{{ item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</td>
                  <td class="border border-slate-300">{{ new Date(item.created_on).toLocaleDateString("en-US") }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>
          <span class="block text-slate-400 text-xl my-4 text-center">No Items Use This Tag</span>
        </div>
      </div>
    </div>
    <div>
      <button @click="closeModal" class="bg-slate-600 hover:bg-slate-800 text-white text-sm px-4 py-2 mr-1 rounded">Close</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import TagDataService from '@/services/TagDataService.js'
  import ItemTagDataService from '@/services/ItemTagDataService.js'
  import ItemDataService from '@/services/ItemDataService'

  export default {
    name: 'UserDetailsModal',
    props: {
      id: String
    },
    data() {
      return {
        showModal: false,

        name: '',
        createdOn: '',
        items: []
      }
    },
    methods: {
      async getTag() {
        try {
          let response = await TagDataService.get(this.id);
          let user = response.data;

          this.name = user.name;
          this.createdOn = user.created_on;

          response = await ItemTagDataService.getItemsByTag(this.id);
          let itemTags = response.data;

          itemTags.forEach(async itemTag => {
            response = await ItemDataService.get(itemTag.item_id);
            this.items.push(response.data);
          })

        } catch (e) {
          this.$emit('userDetailsError', e);
          this.showModal = false;
        }
      },
      closeModal() {
        this.showModal = false;
        this.items = [];
      }
    }
  } 
  </script>

<style scoped>
  .scroll-container {
    max-height: 250px;
  }
  .width-300 {
    width: 300px;
  }

  .max-height-300 {
    max-height: 300px;
  }

  th, td {
    padding: 7px 12px;
  }

  ::v-deep .modal-content {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    min-width: 600px;
  }
  .dark-mode div::v-deep .modal-content {
    border-color: #2d3748;
    background-color: #1a202c;
  }
  </style>
