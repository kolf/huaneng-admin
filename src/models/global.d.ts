declare type OptionProps<T extends string | number> = {
  label: string;
  value: T;
};

declare type ApiResult<T> = {
  code: number;
  message: string;
  data: T;
};
