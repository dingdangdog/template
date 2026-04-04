// 统一最外层包装类
export interface Result<T> {
  c: number;
  d: T;
  m?: string;
}

export interface Page<T> {
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
  totalOut: number;
  totalIn: number;
  notInOut: number;
  data: T[];
}

// 分页查询参数
export interface PageParam {
  pageNum: number;
  pageSize: number;
}
/** 用户信息（与 Prisma User 对齐，含登录返回扩展） */
export interface UserInfo {
  id: number;
  name: string;
  username: string;
  createAt?: Date;
  createDate?: Date; // 兼容旧字段
  email?: string | null;
  /** 角色，逗号分隔，如 "admin,user" */
  roles?: string | null;
  /** 浅色主题编号 */
  lightTheme?: string | null;
  /** 深色主题编号 */
  darkTheme?: string | null;
  /** 登录接口返回的 JWT，仅登录时存在 */
  token?: string;
}
