<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{errors : !email.isValid}">
      <label for="email">Email: </label>
      <input type="email" v-model.trim="email.value" @blur="clearValidity('email')" id="email">
      <p v-if="!email.isValid">Wrong email formart!</p>
    </div>
    <div class="form-control" :class="{errors : !message.isValid}">
      <label for="message">Message: </label>
      <textarea type="message" id="message" @blur="clearValidity('message')" v-model.trim="message.value" name="" rows="5" />
      <p v-if="!message.isValid">Must not be empty!</p>
    </div>
    <div class="actions">
      <base-button type="submit">Submit</base-button>
      <base-button mode="outline" type="reset">Reset</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email : {
        value : "",
        isValid : true,
      },
      message : {
        value : "",
        isValid : true,
      },
      isFormValid : true,
    }
  },
  methods : {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateInput() {
      this.isFormValid = true;
      if (this.email.value=="" || !this.email.value.includes("@")) {
        this.isFormValid = false;
        this.email.isValid = false;
      }
      if (this.message.value == "") {
        this.message.isValid = false;
        this.isFormValid = false;
      }
    },
    submitForm() {
      this.validateInput();
      if (this.isFormValid) {
        const request = {
          email : this.email.value,
          message : this.message.value,
          coachId : this.$route.params.id,
        }
        this.$store.dispatch("requests/contactCoach", {
          request
        });
        this.$router.replace("/coaches");
      }
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>