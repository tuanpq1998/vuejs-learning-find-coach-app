<template>
  <div>
  <base-dialog :show="!!error" title="Error" @close="closeDialog">{{error}}</base-dialog>
  <base-card>
    <coach-filter @change-filter="setFilter" />
  </base-card>
  <base-card>
    <div class="control">
      <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
      <base-button v-if="!isCoach" link to="/register">Register as Coach</base-button>
    </div>
    <div v-if="isLoading"><base-spinner/></div>
    <ul v-if="hasCoaches">
      <coach-item  v-for="coach in filteredCoaches" :key="coach.id" :coach="coach"/>
    </ul>
    <h3 v-else>No coach found</h3>
  </base-card>
  </div>
</template>

<script>
import CoachFilter from './CoachFilter.vue';
import CoachItem from './CoachItem.vue';

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading : false,
      error : null,
      filter : {
        frontend : true,
        backend : true, 
        career : true,
      }
    }
  },
  computed : {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      const areas = Object.keys(this.filter).filter(k => this.filter[k]);
      return coaches.filter(coach => coach.areas.some(area => areas.includes(area)));
    },
    hasCoaches() {
      return this.isLoading || this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      const coachId = this.$store.getters["coachId"];
      return this.$store.getters["coaches/coachById"](coachId)!=null;
    }
  },
  methods : {
    setFilter(newFilter) {
      this.filter = newFilter;
    },
    closeDialog () {
      this.error = null;
      this.loadCoaches(true);
    },
    async loadCoaches(isForce) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          isForce
        });
      } catch (error) {
        this.error = error.message || "Could not load!";
      }
      this.isLoading = false;
    }
  },
  created() {
    this.loadCoaches(true);
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>