<template>
  <div class="pages-header">
    <div class="header-background"></div>
    <div class="logo">
      <img :src="logo" alt="" srcset="" />
      <i>{{ title }}</i>
    </div>
    <div v-if="!store.getters.menuPosition" class="menu-top">
      <slot name="menu"></slot>
    </div>
    <div style="display: flex; align-items: center">
      <el-dropdown placement="bottom-end">
        <div class="avatar">
          <span>{{ userInfo.userName }}</span>
          <el-avatar :size="size" :src="imgUrl" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="drClick(1)">{{ $t("myInfo") }}</el-dropdown-item>
            <el-dropdown-item v-if="systemPosition === IN_SIDE" @click="drClick(2)">{{
              $t("system")
            }}</el-dropdown-item>
            <el-dropdown-item @click="drClick(3)">{{ $t("logout") }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <system-drawer :drawer-visible="drawerVisible" @visibleClose="onVisibleClose" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, Ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import SystemDrawer from "./SystemDrawer.vue";
import { IN_SIDE } from "@/settings/config";

const store = useStore();
const router = useRouter();
const userInfo: any = reactive(store.getters.userInfo);
const size: Ref<string> = ref("default");
const imgUrl: Ref<string> = ref(
  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
);
const drawerVisible: Ref<boolean> = ref(false);
const title: Ref<string> = ref((window as any).config?.title);
const logo: Ref<string> = ref((window as any).config?.logo);
const systemPosition: Ref<string> = ref(store.getters.systemPosition);

const drClick = (type: number): void => {
  if (type === 1) {
    router.push("my");
  } else if (type === 2) {
    drawerVisible.value = true;
  } else if (type === 3) {
    ElMessageBox.confirm("是否确认退出登录?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(() => {
        router.push("login").then(() => {
          store.commit("REMOVE_ROUTER_LIST");
          ElMessage({
            type: "success",
            message: "退出成功",
          });
        });
      })
      .catch(() => {});
  }
};

const onVisibleClose = (): void => {
  drawerVisible.value = false;
};

watch(
  () => store.getters.systemPosition,
  (e) => {
    systemPosition.value = e;
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
);
</script>

<style lang="scss" scoped>
@import "@/css/theme.scss";

.pages-header {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;

  .header-background {
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to top right, $--header-primary, $--header-minor);
    z-index: -1;
  }

  .logo {
    height: 100%;
    min-width: 200px;
    padding: 0 10px;
    display: flex;
    align-items: center;

    img {
      height: 50px;
      width: 50px;
    }

    i {
      color: #fff;
      font-size: 36px;
      font-family: fangsong;
    }
  }

  .avatar {
    height: 100%;
    font-size: 18px;
    display: flex;
    justify-content: end;
    align-items: center;
    min-width: 150px;
    margin: 0 20px;
    color: #fff;
    cursor: pointer;

    .el-avatar {
      margin-left: 16px;
    }
  }

  .menu-top {
    flex: 1;
    min-width: 400px;
    overflow: hidden;
  }
}
</style>
