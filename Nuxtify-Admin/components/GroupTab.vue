<template>
  <div class="group-tab" :style="`flex:${flex}`">
    <div>
      <h2>{{ title }}</h2>
    </div>
    <div class="group-tab-container">
      <div class="group-type2" v-for="key in group2Types?.keys()" :key="key">
        <h3>{{ key }}</h3>
        <v-chip
          class="goods-type-tag"
          :color="color"
          v-for="item in group2Types?.get(key)"
          :key="item.id"
          @click="toList(item.goods_type)"
        >
          {{ item.goods_type }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// color控制子标签背景色；title控制展示的一级标题内容；value是查询二级分类的条件值；flex直接传递到style中
const { color, title, value, flex } = defineProps([
  "color",
  "title",
  "value",
  "flex",
]);
// console.log(value);

// 使用 useFetch，并设置唯一的 key 来区分不同的请求
const { data: goodsTypes } = await useFetch<GoodsTypes[]>("/goodsTypes", {
  method: "POST",
  body: { type1: value },
  key: value, // 设置 key 来区分请求
});

// 处理数据
const group2Types = computed(() => {
  if (!goodsTypes.value) return new Map<string, GoodsTypes[]>();
  return goodsTypes.value.reduce((acc, item) => {
    const category = item.type2 || "未分类";

    if (!acc.has(category)) {
      acc.set(category, []);
    }

    acc.get(category)!.push(item);

    return acc;
  }, new Map<string, GoodsTypes[]>());
});

// $fetch<GoodsTypes[]>("/goodsTypes", {
//   method: "POST",
//   body: { type1: value },
// }).then((res) => {
//   goodsTypes.value = res;
//   const map = goodsTypes.value.reduce((acc, item) => {
//     const category = item.type2 || "未分类";

//     // 如果 map 中没有该分类，则初始化一个数组
//     if (!acc.has(category)) {
//       acc.set(category, []);
//     }

//     // 将 item 添加到相应的分类中
//     acc.get(category)!.push(item);

//     return acc;
//   }, new Map<string, GoodsTypes[]>());

//   group2Types.value = map;
// });

const toList = (type: string | undefined) => {
  navigateTo({ path: `/search`, query: { s: type } });
};
</script>

<style scoped>
.group-tab {
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #eceff1;
  background: rgba(55, 55, 55, 0.5);
}
.group-tab-container {
  padding: 0.5rem 0;
}
.group-type2 {
  margin: 0.5rem;
}

.goods-type-tag {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
}

.goods-type-tag:hover {
  color: black !important;
  background-color: #bdbdbd;
}
</style>
