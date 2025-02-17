import type { Flow } from "@prisma/client";

// 统一最外层包装类
export interface Result<T> {
  c: number;
  d: T;
  m?: string;
}

export interface Page<T> {
  pageNum: number;
  pageSize: number;
  totalPage: number;
  totalCount: number;
  totalOut: number;
  totalIn: number;
  notInOut: number;
  pageData: T[];
}

// 分页查询参数
export interface PageParam {
  pageNum: number;
  pageSize: number;
}
export interface UserInfo {}
export interface CommonOption {}
export interface PieChartModel {
  type: string;
  outSum: number;
  inSum: number;
  zeroSum: number;
}

export interface MonthAnalysis {
  month: string;
  outSum: string; // 总支出
  inSum: string; // 总收入
  zeroSum: string; // 总不计收支
  maxType: string; // 最大支出类型
  maxTypeSum: string; // 最大支出金额
  maxOut: Flow; // 最大单笔支出
  maxIn: Flow; // 最大单笔收入
}

/**
 * 创建流水的传输实体
 */
export interface CreateFlowDto {
  day?: string;
  flowType?: string;
  bookId?: number | string;
  type?: string;
  payType?: string;
  money?: number;
  name?: string;
  description?: string;
}

/**
 * 更新流水的传输实体
 */
export interface UpdateFlowDto {
  day?: string;
  bookId?: number | string;
  flowType?: string;
  type?: string;
  payType?: string;
  money?: number;
  name?: string;
  description?: string;
}

export class FlowQuery {
  pageNum?: number = 1;
  pageSize?: number = 20;
  id?: string | number;
  bookId?: string | number;
  startDay?: string;
  endDay?: string;
  flowType?: string;
  type?: string;
  payType?: string;
  name?: string;
  description?: string;
  moneySort?: string;
}

export interface Server {
  version?: string;
  dataPath?: string;
  openRegister?: string;
}

export interface AdminLogin {
  account?: string;
  password?: string;
}
