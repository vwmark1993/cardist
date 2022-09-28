<template>
  <div>
    <ConfirmDeleteModal 
      :id="confirmDeleteModalId"
      :apiService="confirmDeleteModalApi"
      :name="confirmDeleteModalName"
      :index="confirmDeleteModalIndex"
      @confirmDeleteMessage="(message, mode) => showMessage(message, mode)"
      @confirmDeleteUser="(index) => confirmDeleteUser(index)"
      @confirmDeleteItem="(index) => confirmDeleteItem(index)"
      @confirmDeleteTag="(index) => confirmDeleteTag(index)"
      @confirmDeleteComment="(index) => confirmDeleteComment(index)"
    />
    <UserDetailsModal 
      :id="userDetailsModalId"
      @userDetailsError="(message) => showMessage(message, 'failure')"
    />
    <ItemDetailsModal 
      :id="itemDetailsModalId"
      @itemDetailsError="(message) => showMessage(message, 'failure')"
    />
    <TagDetailsModal 
      :id="tagDetailsModalId"
      @tagDetailsError="(message) => showMessage(message, 'failure')"
    />
    <CreateNewTagModal
      @createdTagMessage="(message, mode) => showMessage(message, mode)"
      @newTag="(tag) => createdTag(tag)"
    />
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
      </Transition>
    </div>
    <h1 class="text-4xl font-bold text-slate-700 mb-6 text-left m-3">Admin Portal</h1>
    <div class="flex">
      <div class="min-width-300">
        <div class="mx-3 p-5 bg-slate-300 rounded">
          <div>
            <h6 class="text-left my-3 ml-3 font-semibold">Metrics</h6>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'overview', 'text-primary' : mode === 'overview', 'bg-primary' : mode !== 'overview', 'text-secondary' : mode !== 'overview' }"
              @click="mode = 'overview'"
              >
              Overview
            </button>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'popularItems', 'text-primary' : mode === 'popularItems', 'bg-primary' : mode !== 'popularItems', 'text-secondary' : mode !== 'popularItems' }"
              @click="mode = 'popularItems'"
              >
              Most Popular Items
            </button>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'popularTags', 'text-primary' : mode === 'popularTags', 'bg-primary' : mode !== 'popularTags', 'text-secondary' : mode !== 'popularTags' }"
              @click="mode = 'popularTags'"
              >
              Most Popular Tags
            </button>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'topSellers', 'text-primary' : mode === 'topSellers', 'bg-primary' : mode !== 'topSellers', 'text-secondary' : mode !== 'topSellers' }"
              @click="mode = 'topSellers'"
              >
              Top Sellers
            </button>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'topBuyers', 'text-primary' : mode === 'topBuyers', 'bg-primary' : mode !== 'topBuyers', 'text-secondary' : mode !== 'topBuyers' }"
              @click="mode = 'topBuyers'"
              >
              Top Buyers
            </button>
          </div>
          <div>
            <h6 class="text-left my-3 ml-3 font-semibold">Administration</h6>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'users', 'text-primary' : mode === 'users', 'bg-primary' : mode !== 'users', 'text-secondary' : mode !== 'users' }"
              @click="mode = 'users'"
              >
              List of Users
            </button>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'items', 'text-primary' : mode === 'items', 'bg-primary' : mode !== 'items', 'text-secondary' : mode !== 'items' }"
              @click="mode = 'items'"
              >
              List of Items
            </button>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'banner', 'text-primary' : mode === 'banner', 'bg-primary' : mode !== 'banner', 'text-secondary' : mode !== 'banner' }"
              @click="mode = 'banner'"
              >
              Manage Banner
            </button>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'tags', 'text-primary' : mode === 'tags', 'bg-primary' : mode !== 'tags', 'text-secondary' : mode !== 'tags' }"
              @click="mode = 'tags'"
              >
              Manage Tags
            </button>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'flaggedComments', 'text-primary' : mode === 'flaggedComments', 'bg-primary' : mode !== 'flaggedComments', 'text-secondary' : mode !== 'flaggedComments' }"
              @click="mode = 'flaggedComments'"
              >
              Flagged Comments
            </button>
          </div>
        </div>  
      </div>
      <div class="w-full min-width-500">
        <div v-if="mode === 'overview' || mode === 'popularItems' || mode === 'popularTags' || mode === 'topSellers' || mode === 'topBuyers'" class="flex items-center justify-end border-b mx-3 mb-3 pb-2">
          <label for="year" class="text-sm font-medium text-slate-900 dark:text-slate-400">Year:&nbsp;&nbsp;</label>
          <select  @change="queryMetricsForYear" v-model="metricsYear" id="year" class="p-1 bg-slate-100 border border-slate-300 text-slate-800 text-sm rounded focus:border-slate-500">
            <option selected :value="currentYear">{{ currentYear }}</option>
            <option :value="currentYear - 1">{{ currentYear - 1 }}</option>
            <option :value="currentYear - 2">{{ currentYear - 2 }}</option>
            <option :value="currentYear - 3">{{ currentYear -3 }}</option>
          </select>
        </div>
        <div v-if="mode === 'overview'" class="grid grid-flow-col">
          <div class="flex flex-col mx-3">
            <div class="mb-2">
              <div class="min-width-150 flex items-center rounded bg-slate-300 p-4">
                <div>
                  <span class="material-symbols-outlined scale-150 mx-2">account_circle</span>
                </div>
                <div class="w-full flex justify-center">
                  <div class="flex w-full flex-col mx-4">
                    <span class="text-sm text-slate-800 font-semibold">{{ newRegisteredUsersByYear }}</span>
                    <span class="border-t border-slate-900 text-sm text-slate-600 pt-2 mt-2">New Registered Accounts</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <div class="min-width-150 flex items-center rounded bg-slate-300 p-4">
                <div>
                  <span class="material-symbols-outlined scale-150 mx-2">attach_money</span>
                </div>
                <div class="w-full flex justify-center">
                  <div class="flex w-full flex-col mx-4">
                    <span class="text-sm text-slate-800 font-semibold">{{ salesRevenueByYear ? salesRevenueByYear.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '$0.00' }}</span>
                    <span class="border-t border-slate-900 text-sm text-slate-600 pt-2 mt-2">Sales Revenue</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <div class="min-width-150 flex items-center rounded bg-slate-300 p-4">
                <div>
                  <span class="material-symbols-outlined scale-150 mx-2">sell</span>
                </div>
                <div class="w-full flex justify-center">
                  <div class="flex w-full flex-col mx-4">
                    <span class="text-sm text-slate-800 font-semibold">{{ unitsSoldByYear }}</span>
                    <span class="border-t border-slate-900 text-sm text-slate-600 pt-2 mt-2">Units Sold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MetricsChart
            v-if="mode === 'overview' && monthlySalesDataset"
            ref="monthlySalesChart"
            title="Revenue by Month"
            :xAxisLabels="monthlySalesDataset.xAxisLabels"
            yAxisLabel="Revenue"
            :dataValues="monthlySalesDataset.dataValues"
            class="col-span-10"
          />
        </div>
        <MetricsChart
          v-else-if="mode === 'popularItems' && popularItemsDataset"
          title="Most Popular Items"
          :xAxisLabels="popularItemsDataset.xAxisLabels"
          yAxisLabel="Number Sold"
          :dataValues="popularItemsDataset.dataValues"
        />
        <MetricsChart
          v-else-if="mode === 'popularTags' && popularTagsDataset"
          title="Most Popular Tags"
          :xAxisLabels="popularTagsDataset.xAxisLabels"
          yAxisLabel="Sales"
          :dataValues="popularTagsDataset.dataValues"
        />
        <MetricsChart
          v-else-if="mode === 'topSellers' && topSellersDataset"
          title="Top Sellers"
          :xAxisLabels="topSellersDataset.xAxisLabels"
          yAxisLabel="Total Sales"
          :dataValues="topSellersDataset.dataValues"
        />
        <MetricsChart
          v-else-if="mode === 'topBuyers' && topBuyersDataset"
          title="Top Buyers"
          :xAxisLabels="topBuyersDataset.xAxisLabels"
          yAxisLabel="Total Purchases"
          :dataValues="topBuyersDataset.dataValues"
        />
        <div v-else-if="mode === 'users'">
          <span v-if="users.length === 0" class="text-slate-400 text-xl mb-2">No Users</span>
          <table v-else class="border-collapse border border-slate-400 mx-auto">
            <caption class="text-xl font-semibold mb-2">Users</caption>
            <thead>
              <tr>
                <th class="border border-slate-300">Username</th>
                <th class="border border-slate-300">Admin</th>
                <th class="border border-slate-300">Created Date</th>
                <th class="border border-slate-300"></th>
                <th class="border border-slate-300"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user, index in users" :key="user.id">
                <td class="border border-slate-300">{{ user.username }}</td>
                <td class="border border-slate-300">{{ user.admin }}</td>
                <td class="border border-slate-300">{{ user.created_on ? new Date(user.created_on).toLocaleDateString("en-US") : null }}</td>
                <td class="border border-slate-300">
                  <button @click="showUserDetails(user.id)" class="bg-slate-500 hover:bg-slate-700 text-white text-sm py-1 px-2 rounded select-none">Details</button>
                </td>
                <td class="border border-slate-300">
                  <button v-if="$store.state.user.currentUser.id !== user.id" @click="deleteUser(user.id, index, user.username)" class="bg-slate-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded select-none">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="mode === 'items'">
          <span v-if="items.length === 0" class="text-slate-400 text-xl mb-2">No Items</span>
          <table v-else class="border-collapse border border-slate-400 mx-auto">
            <caption class="text-xl font-semibold mb-2">Items</caption>
            <thead>
              <tr>
                <th class="border border-slate-300">Name</th>
                <th class="border border-slate-300">Price</th>
                <th class="border border-slate-300">Created Date</th>
                <th class="border border-slate-300"></th>
                <th class="border border-slate-300"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item, index in items" :key="item.id">
                <td class="border border-slate-300">{{ item.name }}</td>
                <td class="border border-slate-300">{{ item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</td>
                <td class="border border-slate-300">{{ item.created_on ? new Date(item.created_on).toLocaleDateString("en-US") : null }}</td>
                <td class="border border-slate-300">
                  <button @click="showItemDetails(item.id)" class="bg-slate-500 hover:bg-slate-700 text-white text-sm py-1 px-2 rounded select-none">Details</button>
                </td>
                <td class="border border-slate-300">
                  <button @click="deleteItem(item.id, index, item.name)" class="bg-slate-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded select-none">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="mode === 'banner'">
          <div v-if="banners.length === 0">
            <span class="block text-slate-400 text-xl mb-4">No Banners</span>
          </div>
          <div v-else >
            <div class="flex justify-center items-center mb-2">
              <span class="text-xl font-semibold">Banners</span>
            </div>
            <table class="border-collapse border border-slate-400 mx-auto">
              <thead>
                <tr>
                  <th class="border border-slate-300"></th>
                  <th class="border border-slate-300">Name</th>
                  <th class="border border-slate-300">Image</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="banner in banners" :key="banner.id">
                  <td class="border border-slate-300">
                    <input 
                      @click="selectBanner(banner.id)"
                      class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 cursor-pointer" 
                      type="radio" 
                      name="banner" 
                      id="banner" 
                      :checked="banner.selected"
                      :value="banner.id"
                    >
                  </td>
                  <td class="border border-slate-300">{{ banner.name }}</td>
                  <td class="border border-slate-300">
                    <img :src="banner.image" class="banner rounded m-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else-if="mode === 'tags'">
          <div v-if="tags.length === 0">
            <span class="block text-slate-400 text-xl mb-4">No Tags</span>
            <button @click="createTag" class="flex items-center bg-slate-500 hover:bg-slate-700 text-white mx-auto p-3 font-semibold tracking-wider rounded select-none">
              <span class="material-symbols-outlined text-3xl mr-1">add</span>
              <span>Create New Tag</span>
            </button>
          </div>
          <div v-else >
            <div class="flex justify-center items-center mb-2">
              <span class="text-xl font-semibold">Tags</span>
              <button @click="createTag" class="flex items-center rounded bg-slate-300 text-slate-600 hover:text-slate-800 hover:bg-slate-400 ml-2 py-1 px-2">
                <span class="material-symbols-outlined cursor-pointer">add</span>
                <span class="tracking-wide font-semibold">Create</span>
              </button>
            </div>
            <table class="border-collapse border border-slate-400 mx-auto">
              <thead>
                <tr>
                  <th class="border border-slate-300">Name</th>
                  <th class="border border-slate-300"></th>
                  <th class="border border-slate-300"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tag, index in tags" :key="tag.id">
                  <td class="border border-slate-300">{{ tag.name }}</td>
                  <td class="border border-slate-300">
                    <button @click="showTagDetails(tag.id)" class="bg-slate-500 hover:bg-slate-700 text-white text-sm py-1 px-2 rounded select-none">Details</button>
                  </td>
                  <td class="border border-slate-300">
                    <button @click="deleteTag(tag.id, index, tag.name)" class="bg-slate-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded select-none">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else-if="mode === 'flaggedComments'">
          <span v-if="flaggedComments.length === 0" class="text-slate-400 text-xl mb-2">No Flagged Comments</span>
          <div v-else>
            <span class="text-xl font-semibold mb-2">Flagged Comments</span>
            <div v-for="comment, index in flaggedComments" :key="comment.id" class="bg-slate-300 rounded p-3 m-3">
              <div class="flex border-slate-400 border-b pb-2 mb-2 justify-between">
                <div class="flex">
                  <span class="material-symbols-outlined select-none">account_circle</span>
                  <span class="font-bold ml-1">{{ comment.username }}</span>
                </div>
                <div>
                  <button @click="dismissFlaggedComment(comment.id, index)" class="bg-slate-500 hover:bg-slate-700 text-white text-sm mr-1 py-1 px-2 rounded select-none">Dismiss</button>
                  <button @click="deleteComment(comment.id, index)" class="bg-slate-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded select-none">Delete</button>
                </div>
              </div>
              <div class="text-left">
                <p class="text-sm text-slate-500 mb-1">{{ new Date(comment.updated_on).toLocaleDateString("en-US") }}</p>
                <p class="text-slate-800 mb-2">{{ comment.message }}</p>
              </div>
              <div class="text-left mt-4 mb-2">
                <span class="bg-slate-400 rounded p-2 font-semibold">Flagged Reason: {{ comment.flagged_reason }}</span>
                <span v-if="comment.flagged_reason_message" class="bg-slate-400 rounded p-2 font-semibold ml-2">Details: {{ comment.flagged_reason_message }}</span>
                <span class="bg-slate-400 rounded p-2 font-semibold ml-2">Commented On: {{ comment.item_name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  
  import UserHeader from '@/components/UserHeader.vue'
  import AlertMessage from '@/components/AlertMessage.vue'

  import MetricsChart from '@/components/MetricsChart.vue'

  import { $vfm } from 'vue-final-modal'
  import UserDetailsModal from '@/components/UserDetailsModal.vue'
  import ItemDetailsModal from '@/components/ItemDetailsModal.vue'
  import TagDetailsModal from '@/components/TagDetailsModal.vue'
  import CreateNewTagModal from '@/components/CreateNewTagModal.vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'

  import UserDataService from '@/services/UserDataService.js'
  import OrderItemDataService from '@/services/OrderItemDataService.js'
  import ItemDataService from '@/services/ItemDataService.js'
  import BannerDataService from '@/services/BannerDataService'
  import TagDataService from '@/services/TagDataService'
  import CommentDataService from '@/services/CommentDataService'

  export default {
    name: 'AdminPortal',
    components: {
      UserHeader,
      AlertMessage,
      MetricsChart,
      UserDetailsModal,
      ItemDetailsModal,
      TagDetailsModal,
      CreateNewTagModal,
      ConfirmDeleteModal
    },
    data() {
      return {
        mode: 'overview',
        alertMessage: '',
        alertMessageMode: '',

        userDetailsModalId: '',
        itemDetailsModalId: '',
        tagDetailsModalId: '',

        currentSelectedBannerId: '',

        confirmDeleteModalId: '',
        confirmDeleteModalApi: '',
        confirmDeleteModalName: '',
        confirmDeleteModalIndex: 0,

        metricsYear: new Date().getFullYear(),

        newRegisteredUsersByYear: 0,
        salesRevenueByYear: 0,
        unitsSoldByYear: 0,

        monthlySalesDataset: null,
        popularItemsDataset: null,
        popularTagsDataset: null,
        topSellersDataset: null,
        topBuyersDataset: null,

        users: [],
        items: [],
        banners: [],
        tags: [],
        flaggedComments: []
      }
    },
    computed: {
      currentYear() {
        const d = new Date();
        return d.getFullYear();
      },
    },
    methods: {
      showMessage(message, mode) {
        this.alertMessage = message;
        this.alertMessageMode = mode;

        setTimeout(() => {
          this.alertMessage = null;
          this.alertMessageMode = null;
        }, 3000)
      },
      queryMetricsForYear() {
        if (this.mode === 'overview') {
          this.getNewUsersByYear();
          this.getTotalSalesRevenueByYear();
          this.getUnitsSoldByYear();
          this.getMonthlySalesRevenueByYear();
        } else if (this.mode === 'popularItems') {
          this.getPopularItemsByYear();
        } else if (this.mode === 'popularTags') {
          this.getPopularTagsByYear();
        } else if (this.mode === 'topSellers') {
          this.getTopSellersByYear();
        } else if (this.mode === 'topBuyers') {
          this.getTopBuyersByYear();
        }
      },
      async getNewUsersByYear() {
        try {
          let response = await UserDataService.getNewUsersByYear(this.metricsYear);
          let data = response.data;

          this.newRegisteredUsersByYear = data.number_of_created_users;
          
        } catch (e) {
          this.showMessage('Error retrieving newly registered users by year.', 'failure');
        } 
      },
      async getTotalSalesRevenueByYear() {
        try {
          let response = await OrderItemDataService.getTotalSalesRevenueByYear(this.metricsYear);
          let data = response.data;

          if (data.sales && data.sales !== null) {
            this.salesRevenueByYear = data.sales;
          } else {
            this.salesRevenueByYear = 0;
          }

        } catch (e) {
          this.showMessage('Error retrieving total sales revenue by year.', 'failure');
        } 
      },
      async getUnitsSoldByYear() {
        try {
          let response = await OrderItemDataService.getUnitsSoldByYear(this.metricsYear);
          let data = response.data;

          if (data.units_sold && data.units_sold !== null) {
            this.unitsSoldByYear = data.units_sold;
          } else {
            this.unitsSoldByYear = 0;
          }

        } catch (e) {
          this.showMessage('Error retrieving units sold by year.', 'failure');
        } 
      },
      async getMonthlySalesRevenueByYear() {
        try {
          let response = await OrderItemDataService.getMonthlySalesRevenueByYear(this.metricsYear);
          let data = response.data;

          let xAxisLabels = [];
          let dataValues = [];

          if (data.length > 0) {
            data.forEach(item => {
              xAxisLabels.push(item.month);
              dataValues.push(item.sales);
            });

            this.monthlySalesDataset = {
              xAxisLabels: xAxisLabels,
              dataValues: dataValues
            };
          } else {
            this.monthlySalesDataset = {
              xAxisLabels: [],
              dataValues: []
            }
          }
        } catch (e) {
          this.showMessage('Error retrieving monthly sales revenue by year.', 'failure');
        } 
      },
      async getPopularItemsByYear() {
        try {
          let response = await ItemDataService.getPopularItemsByYear(this.metricsYear);
          let data = response.data;
          
          let xAxisLabels = [];
          let dataValues = [];

          data.forEach(item => {
            xAxisLabels.push(item.name);
            dataValues.push(item.number_sold);
          });

          this.popularItemsDataset = {
            xAxisLabels: xAxisLabels,
            dataValues: dataValues
          };
        } catch (e) {
          this.showMessage('Error retrieving popular items.', 'failure');
        } 
      },
      async getPopularTagsByYear() {
        try {
          let response = await TagDataService.getPopularTagsByYear(this.metricsYear);
          let data = response.data;
          
          let xAxisLabels = [];
          let dataValues = [];

          data.forEach(tag => {
            xAxisLabels.push(tag.name);
            dataValues.push(tag.sales);
          });

          this.popularTagsDataset = {
            xAxisLabels: xAxisLabels,
            dataValues: dataValues
          };
        } catch (e) {
          this.showMessage('Error retrieving popular tags.', 'failure');
        } 
      },
      async getTopSellersByYear() {
        try {
          let response = await OrderItemDataService.getTopSellersByYear(this.metricsYear);
          let data = response.data;

          let xAxisLabels = [];
          let dataValues = [];

          data.forEach(item => {
            xAxisLabels.push(item.username);
            dataValues.push(item.sales);
          });

          this.topSellersDataset = {
            xAxisLabels: xAxisLabels,
            dataValues: dataValues
          };
        } catch (e) {
          this.showMessage('Error retrieving top sellers.', 'failure');
        }
      },
      async getTopBuyersByYear() {
        try {
          let response = await OrderItemDataService.getTopBuyersByYear(this.metricsYear);
          let data = response.data;


          let xAxisLabels = [];
          let dataValues = [];

          data.forEach(item => {
            xAxisLabels.push(item.username);
            dataValues.push(item.purchases);
          });

          this.topBuyersDataset = {
            xAxisLabels: xAxisLabels,
            dataValues: dataValues
          };
        } catch (e) {
          this.showMessage('Error retrieving top sellers.', 'failure');
        }
      },
      async getUsers() {
        try {
          let response = await UserDataService.getAll();
          this.users = response.data;
        } catch (e) {
          this.showMessage('Error retrieving list of users.', 'failure');
        } 
      },
      async getItems() {
        try {
          let response = await ItemDataService.searchAll();
          this.items = response.data;
        } catch (e) {
          this.showMessage('Error retrieving list of items.', 'failure');
        } 
      },
      async getBanners() {
        try {
          let response = await BannerDataService.getAll();
          this.banners = response.data;

          if (this.banners.length > 0) {
            this.currentSelectedBannerId = this.banners.find(banner => banner.selected === true).id
          }
        } catch (e) {
          this.showMessage('Error retrieving banners.', 'failure');
        } 
      },
      async getTags() {
        try {
          let response = await TagDataService.getAll();
          this.tags = response.data;
        } catch (e) {
          this.showMessage('Error retrieving tags.', 'failure');
        } 
      },
      async createTag() {
        $vfm.show('CreateNewTagModal');
      },
      createdTag(tag) {
        this.tags.push(tag);
      },
      async getFlaggedComments() {
        try {
          let response = await CommentDataService.getFlaggedComments();
          let flaggedComments = response.data;

          flaggedComments.forEach(async comment => {
            response = await UserDataService.get(comment.user_id);
            comment.username = response.data.username;

            response = await ItemDataService.get(comment.item_id);
            comment.item_name = response.data.name;
          })

          this.flaggedComments = flaggedComments;
        } catch (e) {
          this.showMessage('Error retrieving flagged comments.', 'failure');
        } 
      },
      async dismissFlaggedComment(id, index) {
        try {
          let data = {
            flagged: false,
            flagged_reason: null,
            flagged_reason_message: null
          }

          await CommentDataService.update(id, data);

          this.flaggedComments.splice(index, 1);

          this.showMessage('Flagged Comment Dismissed', 'success');
        } catch (e) {
          this.showMessage('Could not dismiss flagged comment.', 'failure');
        }
      },
      showUserDetails(id) {
        this.userDetailsModalId = id;

        $vfm.show('UserDetailsModal');
      },
      showItemDetails(id) {
        this.itemDetailsModalId = id;

        $vfm.show('ItemDetailsModal');
      },
      showTagDetails(id) {
        this.tagDetailsModalId = id;

        $vfm.show('TagDetailsModal');
      },
      async deleteUser(id, index, name) {
        this.confirmDeleteModalId = id;
        this.confirmDeleteModalApi = 'User';
        this.confirmDeleteModalName = name;
        this.confirmDeleteModalIndex = index;

        $vfm.show('ConfirmDeleteModal');
      },
      confirmDeleteUser(index) {
        this.users.splice(index, 1);
      },
      async deleteItem(id, index, name) {
        this.confirmDeleteModalId = id;
        this.confirmDeleteModalApi = 'Item';
        this.confirmDeleteModalName = name;
        this.confirmDeleteModalIndex = index;

        $vfm.show('ConfirmDeleteModal');
      },
      confirmDeleteItem(index) {
        // Refresh item search.
        store.dispatch('search/searchItems', '');
        
        this.items.splice(index, 1);
      },
      async deleteTag(id, index, name) {
        this.confirmDeleteModalId = id;
        this.confirmDeleteModalApi = 'Tag';
        this.confirmDeleteModalName = name;
        this.confirmDeleteModalIndex = index;

        $vfm.show('ConfirmDeleteModal');
      },
      confirmDeleteTag(index) {
        this.tags.splice(index, 1);
      },
      async deleteComment(id, index) {
        this.confirmDeleteModalId = id;
        this.confirmDeleteModalApi = 'Comment';
        this.confirmDeleteModalName = '';
        this.confirmDeleteModalIndex = index;

        $vfm.show('ConfirmDeleteModal');
      },
      confirmDeleteComment(index) {
        this.flaggedComments.splice(index, 1);
      },
      async selectBanner(id) {
        try {
          // Select the new banner.
          let data = {
            selected: true
          }

          await BannerDataService.update(id, data);

          // Unselect the old banner.
          data = {
            selected: false
          }

          await BannerDataService.update(this.currentSelectedBannerId, data);

          this.currentSelectedBannerId = id;
          this.showMessage('Banner Selected', 'success');
        } catch (e) {
          this.showMessage(e, 'failure');
        }
      }
    },
    mounted() {
    if (!store.state.user.currentUser.admin) {
      this.$router.push({ name: 'home' });
    }

    // Overview tab
    this.getNewUsersByYear();
    this.getTotalSalesRevenueByYear();
    this.getUnitsSoldByYear();
    this.getMonthlySalesRevenueByYear();

    // Most Popular Items tab
    this.getPopularItemsByYear();

    // Most Popular Tags tab
    this.getPopularTagsByYear();

    // Top Sellers tab
    this.getTopSellersByYear();

    // Top Buyers tab
    this.getTopBuyersByYear();

    //List of Users tab
    this.getUsers();

    // List of Items tab
    this.getItems();

    // Manage Banners tab
    this.getBanners();

    // Manage Tags tab
    this.getTags();

    // Flagged Comments tab
    this.getFlaggedComments();
  },
  }
</script>

<style scoped>
  .min-width-150 {
    min-width: 150px;
  }

  .min-width-300 {
    min-width: 300px;
  }

  .min-width-500 {
    min-width: 500px;
  }

  .banner {
    width: 700px;
    height: 150px;
  }

  th, td {
    padding: 7px 12px;
  }
</style>
