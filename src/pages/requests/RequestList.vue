<template>
  <div>
  <base-dialog :show="!!error" title="Error" @close="handleCloseDialog">
    {{error}}
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <div v-if="isLoading">
        <base-spinner/>
      </div>
      <ul v-else-if="hasRequest">
        <request-item v-for="request in receivedRequests" :email="request.email" :message="request.message" :key="request.id"  />
      </ul>
      <h3 v-else>You didnt receive any requests!</h3>
    </base-card>
  </section>
  </div>
</template>

<script>
import RequestItem from './RequestItem.vue';
export default {
  components: { RequestItem },
  data () {
    return {
      isLoading : false,
      error : null,
    }
  },
  computed : {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequest() {
      return this.$store.getters["requests/hasRequest"];
    }
  },
  methods : {
    async loadRequest() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/loadRequests");
      } catch (error) {
        this.error = error.message || "Couldn't load data!";
      }
      this.isLoading = false;
    },
    handleCloseDialog() {
      this.error = null;
      this.loadRequest();
    }
  },
  created() {
    this.loadRequest();
    console.log(this.receivedRequests);
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>