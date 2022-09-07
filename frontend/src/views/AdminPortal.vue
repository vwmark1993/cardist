<template>
  <div>
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="showMessage" :message="showMessage" mode="success" />
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
                    <span class="text-sm text-slate-800 font-semibold">917</span>
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
                    <span class="text-sm text-slate-800 font-semibold">$41,417</span>
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
                    <span class="text-sm text-slate-800 font-semibold">13,931</span>
                    <span class="border-t border-slate-900 text-sm text-slate-600 pt-2 mt-2">Units Sold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MetricsChart
            v-if="topSellersDataset"
            title="Sales by Month"
            :xAxisLabels="topSellersDataset.xAxisLabels"
            yAxisLabel="Unit Sales"
            :dataValues="topSellersDataset.dataValues"
            class="col-span-10"
          />
        </div>
        <MetricsChart
          v-else-if="mode === 'popularItems' && topSellersDataset"
          title="Most Popular Items"
          :xAxisLabels="topSellersDataset.xAxisLabels"
          yAxisLabel="Unit Sales"
          :dataValues="topSellersDataset.dataValues"
        />
        <MetricsChart
          v-else-if="mode === 'topSellers' && topSellersDataset"
          title="Top Sellers"
          :xAxisLabels="topSellersDataset.xAxisLabels"
          yAxisLabel="Unit Sales"
          :dataValues="topSellersDataset.dataValues"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  
  import UserHeader from '@/components/UserHeader.vue'
  import AlertMessage from '@/components/AlertMessage.vue'

  import MetricsChart from '@/components/MetricsChart.vue'

  import OrderItemDataService from '@/services/OrderItemDataService.js'

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

        topSellersDataset: null
      }
    },
    computed: {
      
    },
    methods: {
      async getTopSellers() {
        let response = await OrderItemDataService.getTopSellers(10);
        let data = response.data;
        
        let xAxisLabels = [];
        let dataValues = [];

        data.forEach(item => {
          xAxisLabels.push(item.username);
          dataValues.push(item.number_of_sales);
        });

        this.topSellersDataset = {
          xAxisLabels: xAxisLabels.reverse(),
          dataValues: dataValues.reverse()
        };
      }
    },
    mounted() {
    if (!store.state.user.currentUser.admin) {
      this.$router.push({ name: 'home' });
    }

    this.getTopSellers();
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
</style>
