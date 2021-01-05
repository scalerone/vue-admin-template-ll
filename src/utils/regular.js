// 编码（非汉字，只允许数字、字母、下划线）
export const CodeReg = /^[0-9a-zA-Z_]+$/;
// 编码（非汉字）
export const NonChineseCodeReg = /^[^\u4E00-\u9FFF]+$/;
// https://github.com/any86/any-rule
//数字/货币金额（支持负数、千分位分隔符）
// export const AmountReg = /^\d+(\.\d{1,2})?$/;
export const AmountReg = /^-?\d+(\.\d{1,2})?$/;
//时间（小时，分钟）/数量，支持保留两位小数
export const TimeNumReg = /^\d+(\.\d{1,2})?$/;

//只能填写整数数字
export const IntegerReg = /^\d{1,}$/;

//数值（包含正整数，0以及正浮点数）
export const ZeroPositiveNumReg = /^\d+(\.\d{1,})?$/;
//数值（包含正整数，正浮点数）
// export const PositiveNumReg = /^[1-9]+(\.\d{1,})?$/;
// export const PositiveNumReg = /^([1-9][0-9]*)(\.\d+)?$/;
export const PositiveNumReg = /^(?!0+(\.0+)?$)\d+(\.\d+)?$/;
//数值（包含正负整数，0以及正负浮点数）
export const NumReg = /^\d+(\.\d{1,})?$/; //不支持负数
// export const NumReg = /^-?\d+(\.\d{1,})?$/;
