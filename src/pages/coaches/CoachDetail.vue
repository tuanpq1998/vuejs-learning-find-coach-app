<template>
  <div>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h4>{{ coach.hourlyRate }}$/hour</h4>
    </base-card>
  </section>
  <section>
    <base-card>
    <header>
      <h2>Interested? Contact now!</h2>
      <base-button link :to="contactUrl">Contact</base-button>
    </header>
    <router-view />
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge v-for="area in coach.areas" :key="area" :type="area" :title="area"> {{ area }}</base-badge>
      <p>{{coach.description}}</p>
    </base-card>
  </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      coach: null,
    };
  },
  computed: {
    fullName() {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },
    contactUrl() {
      return `/coaches/${this.id}/contact`;
    },
  },
  methods: {
    loadCoach(coachId) {
      this.coach = this.$store.getters['coaches/coachById'](coachId);
    },
  },
  created() {
    this.loadCoach(this.id);
  },
  watch: {
    id(newId) {
      this.loadCoach(newId);
    },
  },
};
</script>