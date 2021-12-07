export const statusEnum = {
  0: '正常', 1: '停用'
}

export const sexEnum = {
  1: '男', 0: '女', 2: '未知'
}

export const statusOptions: OptionProps<number>[] = Object.entries(statusEnum).map(o => ({
  value: Number(o[0]),
  label: o[1]
}))


export const sexOptions: OptionProps<number>[] = Object.entries(sexEnum).map(o => ({
  value: Number(o[0]),
  label: o[1]
}))