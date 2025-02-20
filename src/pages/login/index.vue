<template>
  <div class="login-box">
    <div
      class="login-box-content"
      :class="registerAnimation === 'transformX' ? 'transformX' : ''"
    >
      <div class="title text-center" :style="{ color: store.getters.systemTheme }">
        {{ $t("login.title") }}
      </div>
      <login v-if="!register" @register="registerOpen" />
      <registered v-else @register="registerClose" />
      <div class="language">
        <span
          @click="changeLan('zh')"
          :class="[language === 'zh' ? 'language-active' : '']"
          >{{ $t("chinese") }}</span
        >
        /
        <span
          @click="changeLan('en')"
          :class="[language === 'en' ? 'language-active' : '']"
          >{{ $t("english") }}</span
        >
      </div>
      <div class="path">
        Vue Path: <a target="_blank" :href="vuePath">{{ vuePath }}</a>
      </div>
      <div class="path">
        Java Path:
        <a target="_blank" :href="nodePath">{{ nodePath }}</a>
      </div>
    </div>
    <Waves class="model" />
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, Ref } from "vue";
import { useStore } from "vuex";
//组件不需要注册
import Login from "./components/Login.vue";
import Registered from "./components/Registered.vue";
import Waves from "@/components/Waves/index.vue";

const { proxy }: any = getCurrentInstance();
const store = useStore();

const vuePath: Ref<string> = ref("https://github.com/TwinkleDing/vue-vite");
const nodePath: Ref<string> = ref("https://github.com/TwinkleDing/springboot");
const language: Ref<string> = ref(store.getters.language);
const register: Ref<boolean> = ref(false);
const timer: any = ref(false);
const registerAnimation: Ref<string> = ref("transformX");

const changeLan = (lang: string) => {
  proxy.$i18n.locale = lang;
  language.value = lang;
  store.commit("SET_LANGUAGE", lang);
};
const registerOpen = () => {
  registerAnimation.value = "pause";
  throttle(() => {
    register.value = true;
    registerAnimation.value = "transformX";
  }, 600);
};
const registerClose = () => {
  registerAnimation.value = "pause";
  throttle(() => {
    register.value = false;
    registerAnimation.value = "transformX";
  }, 600);
};
const throttle = (fn: any, wait: number) => {
  if (!timer.value) {
    timer.value = setTimeout(() => {
      fn();
      clearTimeout(timer.value);
      timer.value = false;
    }, wait);
  }
};
</script>

<style lang="scss" scoped>
@import "@/css/theme.scss";

.login-box {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 800px;
  position: relative;
  &-content {
    width: 500px;
    min-width: 330px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 10px 0 $--color-primary;
    padding: 20px 70px 10px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    z-index: 1;
    transform: rotateX(90deg) scaleX(0.5) scaleY(0.5);
    transition: transform 0.5s linear;
    .title {
      font-size: 26px;
      font-family: fantasy;
      line-height: 54px;
    }
    .language {
      position: absolute;
      bottom: -2px;
      right: -30px;
      font-size: 14px;
      height: 40px;
      width: 100px;
      line-height: 40px;
      color: #333;
      background: $--color-primary;
      transform: rotate(-45deg);
      cursor: pointer;
      text-align: center;
      &-active {
        color: #fff;
        cursor: default;
      }
    }
    .path {
      font-size: 14px;
      a {
        color: gray;
      }
    }
  }
  .transformX {
    transform: rotateX(0);
    transition: transform 0.5s linear;
  }
  #particles-js {
    background: royalblue;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .model {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
