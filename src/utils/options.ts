export const statusEnum = {
  0: '正常', 1: '停用'
}

export const logStatusEnum = {
  0: '正常', 1: '异常'
}

export const sexEnum = {
  1: '男', 0: '女', 2: '未知'
}

export const logTypeEnum = {
  1: '其它', 0: '新增', 2: '修改', 3: '删除'

}

export const statusOptions: OptionProps<number>[] = Object.entries(statusEnum).map(o => ({
  value: Number(o[0]),
  label: o[1]
}))

export const logStatusOptions: OptionProps<number>[] = Object.entries(logStatusEnum).map(o => ({
  value: Number(o[0]),
  label: o[1]
}))


export const sexOptions: OptionProps<number>[] = Object.entries(sexEnum).map(o => ({
  value: Number(o[0]),
  label: o[1]
}))

export const logTypeOptions: OptionProps<number>[] = Object.entries(logTypeEnum).map(o => ({
  value: Number(o[0]),
  label: o[1]
}))