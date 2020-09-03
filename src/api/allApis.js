import { get } from '../utils/axiosUtil';


export const userLogin = () => {
  return get('/devices', { filter: { devicetype_name_in: ['电子警察', '卡口', '微卡', '违停球机', '雷达', '补光灯', '线圈'] } })
}
