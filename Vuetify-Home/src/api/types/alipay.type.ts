export interface Result<T> {
  c?: string
  m?: string
  d?: T
}

export interface Param {
  order_no?: string
  name?: string
  total_amount?: string
  discount?: string
}

export interface PreOrder {
  code?: string
  msg?: string
  out_trade_no?: string
  qr_code?: string
}

