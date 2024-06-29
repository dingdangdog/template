import $http from './index'
import type { Param, Result, PreOrder } from './types/alipay.type'

const BASE_URL = "/pay/alipay/"

/**
 * 预创建订单
 * @param param 订单信息
 * @returns Result
 */
export function preOrder(param: Param): Promise<Result<PreOrder>> {
  return $http({ url: BASE_URL + 'preOrder', method: 'post', data: param })
  // return new Promise((resolve, reject) => {
  //   const order: PreOrder = {
  //     code: "10000",
  //     msg: "Success",
  //     out_trade_no: "2024050815540005",
  //     qr_code: "https://qr.alipay.com/bax07748xnlpocxc2n0h307a"
  //   }
  //   const result: Result<PreOrder> = {
  //     c: "200",
  //     m: "Success",
  //     d: order
  //   }
  //   resolve(result)
  // })
}

/**
 * 查询订单
 * @param param 订单信息
 * @returns Result
 */
export function queryOrder(param: Param): Promise<Result<any>> {
  return $http({ url: BASE_URL + 'queryOrder', method: 'post', data: param })
}
