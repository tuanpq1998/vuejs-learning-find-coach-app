<template>
  <base-card>
    <h2>{{ mode }}</h2>
    <base-dialog v-if="!!error" :show="!!error" title="Error" @close="closeDialog">{{error}}</base-dialog>
    <base-spinner v-else-if="isLoading" />
    <form v-else @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email: </label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password: </label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!isFormValid">Invalid input!</p>
      <base-button>{{ submitBtnText }}</base-button>
      <base-button @click="switchMode" type="button" mode="flat">{{
        swichBtnText
      }}</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isFormValid: true,
      mode: 'LOGIN',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitBtnText() {
      return this.mode == 'LOGIN' ? 'Login' : 'Sign up';
    },
    swichBtnText() {
      return this.mode == 'SIGNUP' ? 'Login' : 'Sign up';
    },
  },
  methods: {
    async submitForm() {
      if (
        this.email == '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.isFormValid = false;
      } else {
        try {
          this.isLoading = true;
          const payload = {
              email: this.email,
              password: this.password,
            };
          if (this.mode == 'LOGIN') {
            await this.$store.dispatch('login', payload);
          } else {
            await this.$store.dispatch('signup', payload);
          }
          const {redirect} = this.$route.query;
          if (redirect == "register")
            this.$router.replace("/register");
          else this.$router.replace("/coaches");
        } catch (error) {
          this.error = error.message || 'Failed to fetch!';
        }
        this.isLoading = false;
      }
    },
    closeDialog() {
      this.error = null;
    },
    switchMode() {
      this.mode = this.mode == 'SIGNUP' ? 'LOGIN' : 'SIGNUP';
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>