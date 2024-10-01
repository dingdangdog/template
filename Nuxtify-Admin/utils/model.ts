export interface PageInfo<T> {
  current?: number;
  pages?: number;
  records?: T[];
  size?: number;
  total?: number;
}

export interface PageParam {
  pageNum?: number;
  pageSize?: number;
}

export interface SortParam {
  key?: string;
  order?: string;
}

// 字典表：关卡；装备品级；装备类型；物品类型；丹药相关物品类型；酒相关物品类型；材料相关物品类型；消耗品类型；妖怪类型；加点类型
export interface Dictionary {
  id?: number;
  type?: string; // chapter/level/equip_type/inventory_type(elixir_type/wines_type/material_type/tackle_type)/monster_type/skill_type
  name?: string;
  value?: string; // 字典对应的值
  sort?: number;
}

export interface AuthSignInParam {
  username?: string;
  password?: string;
}

export interface AuthInfo {
  code: number;
  token: string;
  email: string;
  name: string;
  avatar: string;
}

export interface Token {
  id?: string;
  token?: string;
  createtime?: string;
}

export interface ViewerLog {
  ip?: string;
  uri?: string;
  time?: string;
  timezone?: string;
  userAgent?: string;
}

// 字典表：关卡；装备品级；装备类型；物品类型；丹药相关物品类型；酒相关物品类型；材料相关物品类型；消耗品类型；妖怪类型；加点类型
export interface Dictionary {
  id?: number;
  type?: string; // chapter/level/equip_type/inventory_type(elixir_type/wines_type/material_type/tackle_type)/monster_type/skill_type
  name?: string;
  value?: string; // 字典对应的值
  sort?: number;
}

export interface GoodsTypes {
  id?: number;
  type1?: string; // 一级类型，如：剧情/物品 等
  type2?: string; // 二级类型，如：任务/拾取/装备 等
  goods_type?: string; // 物品类型，如：主线/支线/蒲团/天上仙丹/武器/材料 等
  goods_fields?: string; // 物品属性，Json数据，key为属性名
  sort?: string; // 排序
}

export interface Goods {
  id?: number;
  show?: number; // 是否显示
  goods_name?: string; // 物品名称
  goods_level?: string; // 物品品级
  goods_icon?: string; // 物品图标
  goods_type?: string; // 物品类型，如：主线/支线/蒲团/天上仙丹/武器/材料 等
  goods_fields?: string; // 物品属性，Json数据，key为属性名
}

export interface Setting {
  title?: string;
  icon?: string;
  keyword?: string;
  description?: string;
  theme?: string;
  adminTheme?: string;
}
