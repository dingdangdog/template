<template>
  <div class="page-container">
    <CodeView :qrcode="code" :name="name" v-if="showQrCode" />

    <v-overlay v-model="overlay" class="justify-center" contained>
      <v-text> 订单加载中…… </v-text>
    </v-overlay>
    <v-text v-if="orderError">订单错误！</v-text>
    <v-text v-if="paySuccess">支付成功，您现在可以进行其他操作！</v-text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeView from './CodeView.vue'
import { preOrder, queryOrder } from '@/api/api.alipay'
import type { PreOrder } from '@/api/types/alipay.type';

const showQrCode = ref(false)
const orderError = ref(false)
const paySuccess = ref(false)
const overlay = ref(true)

const parseURLParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {}
  const queryString = url.split('?')[1]
  if (queryString) {
    const keyValuePairs = queryString.split('&')
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split('=')
      params[key] = decodeURIComponent(value)
    })
  }
  return params
}

// const decodeURIComponent = (value: string): string => {
//   value = value.replace(/%25/g, '%')
//   return value.replace(/%25/g, '%')
// }

const url = window.location.href
// 解析URL，获取参数
const params = parseURLParams(url)
const code = ref('')
const name = ref(params['name'])

const order = ref<PreOrder>({})

// 一个测试URL：http://127.0.0.1:9090/?order_no=2024050815540008&name=%E6%B5%8B%E8%AF%95&money=0.01&discount=
if (params['order_no'] !== undefined) {
  preOrder({
    order_no: params['order_no'],
    name: params['name'],
    total_amount: params['money']
  }).then((res) => {
    // 关闭蒙版
    overlay.value = false
    if (res.c != "200" || !res.d || res.d.code != "10000"){
      // 接口错误，显示订单错误提示
      orderError.value = true
    } else {
      order.value = res.d
      code.value = order.value.qr_code
      // 接口正常，显示二维码
      showQrCode.value = true

      var searchOrder = setInterval(() => {
        // 定时任务轮询查询订单
        queryOrder({order_no: order.value.out_trade_no}).then((res) => {
          if (res.c == "200"){
            // 支付成功，结束定时任务
            clearInterval(searchOrder);
            // 显示支付成功提示
            paySuccess.value = true
            // 关闭二维码
            showQrCode.value = false
          }
        })
      }, 3000)
    }
  }).catch((err) => {
    orderError.value = true
    overlay.value = false
  })
} else {
  orderError.value = true
  overlay.value = false
}

// 根据参数调用后端接口

// 生成二维码
</script>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
