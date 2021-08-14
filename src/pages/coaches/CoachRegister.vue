<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @submit-form="handleSubmit" />
    </base-card>
  </section>
</template>

<script>
import CoachForm from './CoachForm.vue';
import {mapActions} from "vuex";

export default {
  components: { CoachForm },
  methods : {
    ...mapActions({
      addCoach : "coaches/addCoach"
    }),
    handleSubmit(newCoach) {
      this.addCoach({
        coach : newCoach
      })
    }
  }
};
</script>