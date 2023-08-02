import { SET_LOGIN_USER_DATA } from './constant'

//创建增加一个人的action动作对象
// export const createAddPersonAction = personObj => ({type:ADD_PERSON,data:personObj})
export const setLoginUserData = (data) => {
  return {
    type: SET_LOGIN_USER_DATA,
    payload: data,
  }
}
