<template>
  <div class="home">
    <div class="top">
      <div class="left">
        <el-carousel class="carousel" indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <div class="charts">
          <div class="chart">
            <bar-chart ref="bar1" :option="barChart1Option" />
          </div>
          <div class="chart">
            <line-chart ref="line" />
          </div>
          <div class="chart">
            <pie-chart ref="pie" />
          </div>
          <div class="chart">
            <bar-chart ref="bar2" />
          </div>
        </div>
      </div>
      <div class="right">
        <el-calendar ref="calendar" class="calendar">
          <template #date-cell="{ data }">
            <div class="calendar-item" @click="calendarClick(data)">
              <!-- :class="data.isSelected ? 'is-selected' : ''" -->
              {{ data.day.split("-").slice(1).join("-") }}
              <!-- {{ data.isSelected ? "✔️" : "" }} -->
            </div>
          </template>
        </el-calendar>
        <el-row>
          <el-col :span="12">
            <undone>
              <template #item="{ item }">
                <div>{{ item.title }}</div>
              </template>
            </undone>
          </el-col>
          <el-col :span="12">
            <game :list="gameList" />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="日程" width="600px">
    <el-form
      v-if="chooseTime > currentTime"
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="60px"
      hide-required-asterisk
    >
      <el-form-item label="事件：" prop="title">
        <el-input v-model="form.title" placeholder="请输入事件名称" />
      </el-form-item>
      <el-form-item label="时间：" prop="time">
        <el-time-select
          v-model="form.time"
          start="00:00"
          step="00:30"
          end="23:30"
          placeholder="请选择时间"
        />
      </el-form-item>
      <div class="text-right">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ $t("submit") }}
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">{{ $t("reset") }}</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          {{ $t("cancel") }}
        </el-button>
      </div>
    </el-form>
    日程列表：
    <div>
      <div v-for="(item, index) in scheduleList" :key="index">
        <el-row>
          <el-col :span="2">时间：</el-col>
          <el-col :span="22">{{ item.time }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="2">日程：</el-col>
          <el-col :span="22">{{ item.title }}</el-col>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, Ref, reactive, getCurrentInstance } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import BarChart from "@/components/Chart/BarChart.vue";
import LineChart from "@/components/Chart/LineChart.vue";
import PieChart from "@/components/Chart/PieChart.vue";
import Undone from "@/components/Undone/index.vue";
import Game from "@/components/Game/index.vue";
import { GameList } from "@/utils/interface";
import { getAssetsImage } from "@/utils/utils";

const { proxy }: any = getCurrentInstance();
const calendar = ref();
const pie = ref();
const bar1 = ref();
const bar2 = ref();
const line = ref();
const chooseDate: Ref<string> = ref("");
const chooseTime: Ref<number> = ref(0);
const currentTime: Ref<number> = ref(0);
const dialogVisible: Ref<boolean> = ref(false);
const ruleFormRef = ref<FormInstance>();
const scheduleList: any = reactive([]);
const form = reactive({
  title: "",
  time: "",
});
const rules = reactive<FormRules>({
  title: [{ required: true, message: "请输入事件名称！", trigger: "blur" }],
  time: [{ required: true, message: "请选择事件时间！", trigger: "blur" }],
});
const gameList: Array<GameList> = reactive([
  {
    name: "星之卡比-探索发现",
    price: 325,
    platform: "switch",
    time: "2022-03-25",
    img: getAssetsImage("Kirby.jpg"),
  },
  {
    name: "塞尔达-旷野之息2",
    price: 375,
    platform: "switch",
    time: "2023-5-12",
    img: getAssetsImage("Zelda.webp"),
  },
  {
    name: "宝可梦朱紫",
    price: 335,
    platform: "switch",
    time: "2022-11-18",
    img: getAssetsImage("Pokemon.webp"),
  },
]);

const barChart1Option = {
  title: {
    text: "柱状图",
    subtext: "模拟数据",
    left: "center",
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "line",
      areaStyle: {},
    },
  ],
};

const calendarClick = (data: any): void => {
  chooseTime.value = new Date(data.day).getTime();
  currentTime.value = new Date().getTime();
  if (data.isSelected) {
    dialogVisible.value = true;
    proxy.$nextTick(() => {
      if (chooseDate.value !== data.day) {
        chooseDate.value = data.day;
        ruleFormRef.value?.resetFields();
      }
    });
  }
};
const submitForm = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      scheduleList.push({
        title: form.title,
        time: form.time,
      });
      ElMessage({
        type: "success",
        message: "添加成功！",
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.home {
  .top {
    display: flex;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
  }

  .left,
  .right {
    display: inline-block;
    width: 49%;
    min-width: 600px;
  }

  .chart {
    display: inline-block;
    height: 200px;
    width: 50%;
  }

  .calendar {
    min-height: 300px;

    &-item {
      display: flex;
      justify-content: start;
      align-items: center;
      height: 20px;
      line-height: 20px;
    }
  }

  :deep(.el-calendar) {
    --el-calendar-cell-width: 36px;

    .el-carousel__item h3 {
      display: flex;
      color: #475669;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }

    .el-calendar-day {
      padding: 8px 5px;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
</style>
