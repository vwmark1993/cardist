<template>
  <div>
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
      </Transition>
    </div>
    <h1 class="text-4xl font-bold text-slate-700 mb-6 text-left m-3">Admin Portal</h1>
    <div class="grid grid-flow-col">
      <div class="col-span-2">
        <div class="min-width-275 m-3 p-5 bg-slate-300 rounded">
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
              :class="{ 'bg-tertiary' : mode === 'topSellers', 'text-primary' : mode === 'topSellers', 'bg-primary' : mode !== 'topSellers', 'text-secondary' : mode !== 'topSellers' }"
              @click="mode = 'topSellers'"
              >
              Top Sellers
            </button>
          </div>
          <div>
            <h6 class="text-left my-3 ml-3 font-semibold">Administration</h6>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'listOfUsers', 'text-primary' : mode === 'listOfUsers', 'bg-primary' : mode !== 'listOfUsers', 'text-secondary' : mode !== 'listOfUsers' }"
              @click="mode = 'listOfUsers'"
              >
              List of Users
            </button>
            <button 
              class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate transition duration-150"
              :class="{ 'bg-tertiary' : mode === 'listOfItems', 'text-primary' : mode === 'listOfItems', 'bg-primary' : mode !== 'listOfItems', 'text-secondary' : mode !== 'listOfItems' }"
              @click="mode = 'listOfItems'"
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
      <div class="col-span-10">
        <div v-if="mode === 'overview'" class="grid grid-flow-col">
          <div class="flex flex-col m-3">
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
                    <span class="text-sm text-slate-800 font-semibold">{{ salesRevenueByYear ? salesRevenueByYear.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null }}</span>
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
          v-else-if="mode === 'topSellers' && topSellersDataset"
          title="Top Sellers"
          :xAxisLabels="topSellersDataset.xAxisLabels"
          yAxisLabel="Unit Sales"
          :dataValues="topSellersDataset.dataValues"
        />
        <div v-else-if="mode === 'listOfUsers'">
          <span v-if="listOfUsers.length === 0" class="text-slate-400 text-xl mb-2">No Users</span>
          <table v-else class="border-collapse border border-slate-400 mx-auto my-3">
            <caption class="text-xl font-semibold mb-2">List of Users</caption>
            <thead>
              <tr>
                <th class="border border-slate-300">Username</th>
                <th class="border border-slate-300">Email</th>
                <th class="border border-slate-300">Phone</th>
                <th class="border border-slate-300">Admin</th>
                <th class="border border-slate-300">Created Date</th>
                <th class="border border-slate-300"></th>
                <th class="border border-slate-300"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user, index in listOfUsers" :key="user.id">
                <td class="border border-slate-300">{{ user.username }}</td>
                <td class="border border-slate-300">{{ user.email }}</td>
                <td class="border border-slate-300">{{ user.phone }}</td>
                <td class="border border-slate-300">{{ user.admin }}</td>
                <td class="border border-slate-300">{{ user.created_on ? new Date(user.created_on).toLocaleDateString("en-US") : null }}</td>
                <td class="border border-slate-300">
                  <button class="bg-slate-500 hover:bg-slate-700 text-white text-sm py-1 px-2 rounded select-none">Details</button>
                </td>
                <td class="border border-slate-300">
                  <button @click="deleteUser(user.id, index)" class="bg-slate-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded select-none">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="mode === 'listOfItems'">
          <span v-if="listOfItems.length === 0" class="text-slate-400 text-xl mb-2">No Items</span>
          <table v-else class="border-collapse border border-slate-400 mx-auto my-3">
            <caption class="text-xl font-semibold mb-2">List of Items</caption>
            <thead>
              <tr>
                <th class="border border-slate-300">Name</th>
                <th class="border border-slate-300">Description</th>
                <th class="border border-slate-300">Price</th>
                <th class="border border-slate-300">Created Date</th>
                <th class="border border-slate-300"></th>
                <th class="border border-slate-300"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item, index in listOfItems" :key="item.id">
                <td class="border border-slate-300">{{ item.name }}</td>
                <td class="border border-slate-300">{{ item.description }}</td>
                <td class="border border-slate-300">{{ item.price }}</td>
                <td class="border border-slate-300">{{ item.created_on ? new Date(item.created_on).toLocaleDateString("en-US") : null }}</td>
                <td class="border border-slate-300">
                  <button class="bg-slate-500 hover:bg-slate-700 text-white text-sm py-1 px-2 rounded select-none">Details</button>
                </td>
                <td class="border border-slate-300">
                  <button @click="deleteItem(item.id, index)" class="bg-slate-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded select-none">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
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

  import UserDataService from '@/services/UserDataService.js'
  import OrderItemDataService from '@/services/OrderItemDataService.js'
  import ItemDataService from '@/services/ItemDataService.js'
import CommentDataService from '@/services/CommentDataService'

  export default {
    name: 'AdminPortal',
    components: {
      UserHeader,
      AlertMessage,
      MetricsChart
    },
    data() {
      return {
        mode: 'overview',
        alertMessage: '',
        alertMessageMode: '',

        newRegisteredUsersByYear: 0,
        salesRevenueByYear: 0,
        unitsSoldByYear: 0,

        monthlySalesDataset: null,
        topSellersDataset: null,
        popularItemsDataset: null,

        listOfUsers: [],
        listOfItems: [],
        flaggedComments: []
      }
    },
    computed: {
      
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
      async getNewUsersByYear() {
        try {
          let response = await UserDataService.getNewUsersByYear(new Date().getFullYear());
          let data = response.data;
          
          this.newRegisteredUsersByYear = data.number_of_created_users;
          
        } catch (e) {
          this.message = 'Error retrieving monthly sales.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } 
      },
      async getTotalSalesRevenueByYear() {
        try {
          let response = await OrderItemDataService.getTotalSalesRevenueByYear(new Date().getFullYear());
          let data = response.data;
          
          this.salesRevenueByYear = data.sales;

        } catch (e) {
          this.message = 'Error retrieving monthly sales.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } 
      },
      async getUnitsSoldByYear() {
        try {
          let response = await OrderItemDataService.getUnitsSoldByYear(new Date().getFullYear());
          let data = response.data;
          
          this.unitsSoldByYear = data.units_sold;

        } catch (e) {
          this.message = 'Error retrieving monthly sales.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } 
      },
      async getMonthlySalesRevenueByYear() {
        try {
          let response = await OrderItemDataService.getMonthlySalesRevenueByYear(new Date().getFullYear());
          let data = response.data;

          let xAxisLabels = [];
          let dataValues = [];

          data.forEach(item => {
            xAxisLabels.push(item.month);
            dataValues.push(item.sales);
          });

          this.monthlySalesDataset = {
            xAxisLabels: xAxisLabels,
            dataValues: dataValues
          };

        } catch (e) {
          this.message = 'Error retrieving newly registered users.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } 
      },
      async getTopSellers() {
        try {
          let response = await OrderItemDataService.getTopSellers(10);
          let data = response.data;

          let xAxisLabels = [];
          let dataValues = [];

          data.forEach(item => {
            xAxisLabels.push(item.username);
            dataValues.push(item.number_of_sales);
          });

          this.topSellersDataset = {
            xAxisLabels: xAxisLabels,
            dataValues: dataValues
          };
        } catch (e) {
          this.message = 'Error retrieving top sellers.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        }
      },
      async getPopularItems() {
        try {
          let response = await ItemDataService.getPopularItems(10);
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
          this.message = 'Error retrieving popular items.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } 
      },
      async getListOfUsers() {
        try {
          let response = await UserDataService.getAll();
          this.listOfUsers = response.data;
        } catch (e) {
          this.message = 'Error retrieving list of users.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } 
      },
      async deleteUser(id, index) {
        try {
          await UserDataService.delete(id);
          
          this.listOfUsers.splice(index, 1);

          this.message = 'User Deleted';
          this.messageStatus = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } catch (e) {
          this.message = 'Could not delete user.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } 
      },
      async getListOfItems() {
        try {
          let response = await ItemDataService.searchAll();
          this.listOfItems = response.data;
        } catch (e) {
          this.message = 'Error retrieving list of items.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } 
      },
      async deleteItem(id, index) {
        try {
          await ItemDataService.delete(id);
          
          this.listOfItems.splice(index, 1);

          this.message = 'Item Deleted';
          this.messageStatus = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } catch (e) {
          this.message = 'Could not delete item.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
        } 
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
          this.message = 'Error retrieving flagged comments.';
          this.messageStatus = 'failure';

          setTimeout(() => {
            this.message = '';
            this.messageStatus = '';
          }, 3000)
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
          this.showMessage(e, 'failure');
        }
      },
      async deleteComment(id, index) {
        try {
          await CommentDataService.delete(id);

          this.flaggedComments.splice(index, 1);

          this.showMessage('Flagged Comment Deleted', 'success');
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
    this.getPopularItems();

    // Top Sellers tab
    this.getTopSellers();

    //List of Users tab
    this.getListOfUsers();

    // List of Items tab
    this.getListOfItems();

    // Flagged Comments tab
    this.getFlaggedComments();
  },
  }
</script>

<style scoped>
  .min-width-150 {
    min-width: 150px;
  }

  .min-width-275 {
    min-width: 275px;
  }

  th, td {
    padding: 7px 12px;
  }
</style>
