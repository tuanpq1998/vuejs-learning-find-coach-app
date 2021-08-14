<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid : !firstName.isValid}">
      <label for="firstName">Firstname: </label>
      <input type="text" id="firstName" v-model.trim="firstName.value"  @blur="clearValidity('firstName')"/>
      <p v-if="!firstName.isValid">Must not be empty!</p>
    </div>
    <div class="form-control" :class="{invalid : !lastName.isValid}">
      <label for="lastName">Lastname: </label>
      <input type="text" id="lastName" v-model.trim="lastName.value"  @blur="clearValidity('lastName')"/>
      <p v-if="!lastName.isValid">Must not be empty!</p>
    </div>
    <div class="form-control" :class="{invalid : !description.isValid}">
      <label for="description">Description: </label>
      <textarea rows="5" v-model.trim="description.value" id="description" @blur="clearValidity('description')"></textarea>
      <p v-if="!description.isValid">Must not be empty!</p>
    </div>
    <div class="form-control" :class="{invalid : !hourlyRate.isValid}">
      <label for="hourlyRate">Rate</label>
      <input type="number" v-model.number="hourlyRate.value" id="hourlyRate"  @blur="clearValidity('hourlyRate')"/>
      <p v-if="!hourlyRate.isValid">Must be a positive number!</p>
    </div>
    <div class="form-control" :class="{invalid : !areas.isValid}">
      <h3>Expertise</h3>
      <div>
        <input type="checkbox" value="frontend" id="frontend" v-model="areas.value"  @blur="clearValidity('areas')"/>
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas.value"  @blur="clearValidity('areas')"/>
        <label for="backend">Backend</label>
      </div>
      <div>
        <input type="checkbox" id="career" v-model="areas.value" value="career" @blur="clearValidity('areas')"/>
        <label for="career">Career</label>
      </div>
      <p v-if="!areas.isValid">Must be at least one choose</p>
    </div>
    <p v-if="!isFormValid">Please fix the above errors and submit again.</p>
    <base-button type="sumbit">Submit</base-button>
  </form>
</template>

<script>
export default {
  emits : ["submit-form"],
  data() {
    return {
      isFormValid : true,
      firstName : {
        value : "",
        isValid : true,
      },
      lastName : {
        value : "",
        isValid : true,
      },
      description : {
        value : "",
        isValid : true,
      },
      hourlyRate : {
        value : null, 
        isValid : true,
      },
      areas: {
        value : [],
        isValid : true,
      },
    }
  },
  methods : {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateInput() {
      this.isFormValid = true;
      if (this.firstName.value == "") {
        this.firstName.isValid = false;
        this.isFormValid = false;
      }
      if (this.lastName.value == "") {
        this.lastName.isValid = false;
        this.isFormValid = false
      }
      if (this.description.value == "") {
        this.description.isValid = false;
        this.isFormValid = false;
      }
      if (!this.hourlyRate.value || this.hourlyRate.value < 0) {
        this.hourlyRate.isValid = false;
        this.isFormValid = false;
      }
      if (this.areas.value.length == 0) {
        this.areas.isValid = false;
        this.isFormValid = false;
      }
    },
    submitForm(){
      this.validateInput();
      if (this.isFormValid) {
        const coach = {
          firstName : this.firstName.value,
          lastName : this.lastName.value,
          description : this.description.value,
          hourlyRate : this.hourlyRate.value,
          areas : this.areas.value,
        }
        this.$emit("submit-form", coach);
        this.$router.replace("/coaches");
      }
    }
  }
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