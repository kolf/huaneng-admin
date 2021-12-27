export type DeptResult = {
  delFlag: number;
  createBy: number;
  updateBy: number;
  createTime: string;
  updateTime: string;
  deptId: number;
  parentId: number;
  deptName: string;
  orderNum: number;
  leader: string;
  phone: string;
  email: string;
  status: number;
}

export interface DeptParams {
  menuType?: 0 | 1 | 2,
  orderNum?: number,
  menuName?: string
}