<script setup lang="ts">
definePageMeta({
  unauthenticatedOnly: true,
});

const auth = useAuth();

const tab = ref("login");

const usernameRules = [
  (v: string) => !!v || "必填",
  (v: string) => (v && v.length >= 5) || "账号必须大于等于8个字符",
];
const passwordRules = [
  (v: string) => !!v || "必填",
  (v: string) => (v && v.length >= 8) || "密码必须大于等于8个字符",
];
const againPasswordRules = [
  (v: string) => !!v || "必填",
  (v: string) => v == registerParam.value.password || "密码不一致",
];

const loginForm = ref();
const loginParam = ref<any>({
  username: "",
  password: "",
});
const login = async () => {
  const { valid } = await loginForm.value.validate();
  if (valid) {
    // 框架密码登录
    auth.signIn("credentials", {
      ...loginParam.value,
      callbackUrl: fromUrl.value ? fromUrl.value : "",
    });
  }
};

const githublogin = () => {
  // 框架Github登录
  auth
    .signIn("github", {
      callbackUrl: fromUrl.value ? fromUrl.value : "",
    })
    .then((res) => {
      console.log(res);
    });
};

const registerForm = ref();
const registerParam = ref({
  name: "",
  username: "",
  password: "",
  againPassword: "",
});
const register = async () => {
  const { valid } = await registerForm.value.validate();

  if (valid) {
    // alert("Form is valid");
    doApi.post<UserInfo>("api/register", registerParam.value).then((res) => {
      Alert.success("注册成功，请登录");
      loginParam.value.username = registerParam.value.username;
      loginParam.value.password = registerParam.value.password;
      tab.value = "login";
    });
  }
};

const lookLoginPS = ref(false);
const lookRegisterPS = ref(false);
const lookRegisterAPS = ref(false);

const fromUrl = ref();
onMounted(async () => {
  const route = useRoute();
  const loginUrl = route.fullPath.split("?")[0];
  const callbackUrl = route.query.callbackUrl;
  const error = route.query.error;
  if (loginUrl != callbackUrl) {
    fromUrl.value = callbackUrl;
  }
  // 更多错误信息见：https://next-auth.js.org/configuration/pages#sign-in-page
  if (error == "CredentialsSignin") {
    Alert.error("用户名或密码错误");
  }
  if (error == "OAuthSignin" || error == "OAuthCallback") {
    Alert.error("三方登录异常，请检查网络连接");
  }
  // 校验登录
  if (checkSignIn()) {
    Alert.success("登录成功");
    setTimeout(() => {
      if (fromUrl.value) {
        window.location.href = fromUrl.value;
      } else {
        navigateTo("/user/info");
      }
    }, 300);
  }
});
</script>

<template>
  <div
    class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <div
      class="tw-flex tw-items-center tw-max-w-[28rem] tw-w-full tw-justify-start tw-space-x-4 tw-py-4 tw-mt-8"
    >
      <img
        src="/favicon.ico"
        class="tw-w-16 tw-h-16 tw-object-contain tw-rounded-full"
      />
      <h1 class="tw-text-2xl">欢迎使用MyNUXT</h1>
    </div>
    <v-card class="tw-max-w-[28rem] tw-w-full !tw-bg-gray-800">
      <v-card-text>
        <div class="tw-rounded-md tw-p-2 md:tw-p-4" style="border-color: gray">
          <v-tabs v-model="tab" fixed-tabs class="tw-mb-4">
            <v-tab value="login"><span class="tw-text-lg">登录</span></v-tab>
            <v-tab value="register"><span class="tw-text-lg">注册</span></v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="login">
              <v-form ref="loginForm">
                <v-text-field
                  v-model="loginParam.username"
                  :rules="usernameRules"
                  :counter="16"
                  name="username"
                  label="账号"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="loginParam.password"
                  :rules="passwordRules"
                  name="password"
                  :counter="36"
                  label="密码"
                  required
                  :type="lookLoginPS ? 'text' : 'password'"
                  :append-inner-icon="lookLoginPS ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="lookLoginPS = !lookLoginPS"
                  @keyup.enter="login()"
                ></v-text-field>
                <div class="tw-flex tw-flex-col">
                  <v-btn color="primary" tw-block @click="login"> 登录 </v-btn>
                </div>
              </v-form>
            </v-tabs-window-item>

            <v-tabs-window-item value="register">
              <v-form ref="registerForm">
                <v-text-field
                  v-model="registerParam.name"
                  name="name"
                  label="昵称"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="registerParam.username"
                  :rules="usernameRules"
                  name="username"
                  :counter="16"
                  label="账号"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="registerParam.password"
                  :rules="passwordRules"
                  :counter="36"
                  name="password"
                  label="密码"
                  :type="lookRegisterPS ? 'text' : 'password'"
                  :append-inner-icon="
                    lookRegisterPS ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  @click:append-inner="lookRegisterPS = !lookRegisterPS"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="registerParam.againPassword"
                  :rules="againPasswordRules"
                  :counter="36"
                  label="确认密码"
                  required
                  :type="lookRegisterAPS ? 'text' : 'password'"
                  :append-inner-icon="
                    lookRegisterAPS ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  @click:append-inner="lookRegisterAPS = !lookRegisterAPS"
                ></v-text-field>
              </v-form>
              <div class="tw-flex tw-flex-col">
                <v-btn color="success" tw-block @click="register"> 注册 </v-btn>
              </div>
            </v-tabs-window-item>
          </v-tabs-window>
        </div>
        <div class="tw-flex tw-flex-col tw-w-full tw-mt-8">
          <p class="tw-text-center tw-text-gray-200">其他登录方式</p>
          <v-btn
            class="tw-mt-4"
            color="black"
            size="large"
            tw-block
            @click="githublogin"
          >
            <v-icon class="me-2" icon="mdi-github"></v-icon>Github登录
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
