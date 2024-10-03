<template>
  <div class="login-container">
    <!-- set input width -->
    <div class="login-title">
      <!-- <img src="~/assets/img/favicon-l.jpg" width="120" alt="logo" /> -->
      <h1 class="text-3xl">Nuxtify Admin</h1>
    </div>
    <!-- <v-sheet rounded> -->
    <div class="login-card">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="signInParam.username"
          variant="underlined"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          required
          label="Username *"
          autocomplete="username"
        ></v-text-field>

        <v-text-field
          variant="underlined"
          v-model="signInParam.password"
          :type="lookPs ? 'text' : 'password'"
          :readonly="loading"
          :rules="[required]"
          required
          label="Password *"
          autocomplete="current-password"
          placeholder="Enter your password"
        >
          <template v-slot:append-inner>
            <v-icon
              :icon="lookPs ? 'mdi-eye' : 'mdi-eye-off'"
              @click="lookPs = !lookPs"
            ></v-icon>
          </template>
        </v-text-field>

        <br />
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="grey-darken-4"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <a>忘记密码</a>
          <a>注册账号</a>

          <ThemeSwitch />
        </div>
      </v-form>
    </div>
    <!-- </v-sheet> -->
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "empty",
});
import { ref } from "vue";
import { signIn } from "~/utils/admin/api.auth";
import { errorAlert, successAlert } from "~/utils/alert";

const form = ref(false);
const loading = ref(false);
const lookPs = ref(false);
const signInParam = ref<AuthSignInParam>({ username: "", password: "" });

const onSubmit = () => {
  if (!form.value) return;
  loading.value = true;
  signIn(signInParam.value)
    .then((res) => {
      if (res.code == 200) {
        // console.log(res)
        successAlert("Login success");
        loading.value = false;
        navigateTo({ path: "/admin/dashboard" });
      } else {
        errorAlert("Password Error");
      }
    })
    .finally(() => {
      // console.log(res)
      loading.value = false;
    });
};

const required = (v: any) => {
  return !!v || "Required";
};
</script>

<style scoped>
/* Your CSS code here */

.login-container {
  height: 100vh;
  padding: 1rem;
  padding-top: 20vh;
}

.login-title {
  width: 100%;
  text-align: center;
}

.login-card {
  margin: 1rem auto !important;
  padding: 1rem;
  max-width: 30rem;
  width: 95%;
}
</style>
