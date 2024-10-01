<template>
  <div
    class="goods-card"
    :class="getLevelBoxClass(item.goods_level)"
    @click="showDetail"
    :title="`${item.goods_type} - ${item.goods_name}`"
  >
    <v-img :src="item.goods_icon" class="goods-icon" cover></v-img>
    <p class="goods-title">
      <span :class="getLevelTextClass(item.goods_level)">
        {{ item.goods_name }}
      </span>
    </p>
  </div>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="showDetailDialog"
    width="auto"
    scrim="rgba(0,0,0,10)"
  >
    <v-card>
      <v-toolbar>
        <template v-slot:title>
          <div style="display: flex; align-items: center">
            <div>
              <v-img
                :src="item.goods_icon"
                style="height: 3rem; width: 3rem"
                cover
              ></v-img>
            </div>
            <h2 style="margin: 0 2rem 0 1rem">
              {{ item.goods_type + " - " }}
              <span :class="getLevelTextClass(item.goods_level)">
                {{ item.goods_name }}
              </span>
            </h2>
          </div>
        </template>
      </v-toolbar>

      <v-card-text style="max-width: 60rem">
        <!-- {{ item.goods_fields }} -->
        <div v-for="field in JSON.parse(item.goods_fields)" :key="field.key">
          <div class="field-row" v-if="field.value">
            <h3 class="field-row-label">{{ field.key }}：</h3>

            <div class="field-row-value" v-if="field.type == 'array'">
              <v-chip
                class="goods-type-tag"
                v-for="item in field.value.split('|')"
                :key="item"
                @click="toList(item)"
              >
                {{ item }}
              </v-chip>
            </div>
            <div class="field-row-value" v-else-if="field.type == 'textarea'">
              <p style="white-space: pre-line">{{ field.value }}</p>
            </div>
            <div class="field-row-value" v-else-if="field.type == 'link'">
              <p class="goods-type-tag" @click="toList(field.value)">
                {{ field.value }}
              </p>
            </div>
            <div class="field-row-value" v-else>
              <p>{{ field.value }}</p>
            </div>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn
          text="关闭"
          size="large"
          @click="showDetailDialog = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { getLevelTextClass, getLevelBoxClass } from "~/utils/common";
const { item } = defineProps(["item"]);

if (item && !item.goods_icon) {
  item.goods_icon = "https://images.maingamers.com/images/wukong/default.png";
}

const showDetailDialog = ref(false);

const showDetail = () => {
  showDetailDialog.value = true;
};

const toList = (type: string | undefined) => {
  type = type?.split("*")[0].split("x")[0];
  navigateTo({ path: `/search`, query: { s: type } });
  // 刷新页面
  setTimeout(() => {
    window.location.reload();
  }, 300);
};
</script>

<style scoped>
.goods-card {
  width: 12rem;
  height: auto;
  margin: 0.5rem;
  padding: 1rem;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(143, 143, 143, 0.5);
  cursor: pointer;
}

.goods-icon {
  height: 10rem;
  width: 10rem;
}

.goods-title {
  width: 100%;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (max-width: 960px) {
  .goods-card {
    width: 10rem;
  }

  .goods-icon {
    height: 8rem;
    width: 8rem;
  }
  .goods-title {
    font-size: 1.2rem;
  }
}

.field-row {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  margin: 0.5rem;
  color: rgba(198, 198, 198, 1);
}

.field-row-label {
  min-width: 6rem;
  margin: 0.5rem;
  text-align: justify;
}

.field-row-value {
  width: 100%;
  text-align: left;
  margin: 0.5rem;
}

.goods-type-tag {
  margin-left: 0.5rem;
  cursor: pointer;
}
</style>
