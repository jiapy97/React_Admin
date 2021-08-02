import {SET_HEAD_TITLE,RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from './action-types'
import {reLogin}  from '../api/index'
import storageUtils from '../utils/storageUtils'

// 设置头部标题的action
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE,data: headTitle})
// 接收User的action
export const receiveUser = (user) => ({type: RECEIVE_USER,user})
// 错误信息aciton
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG,errorMsg})
// 退出登录 重置user的action
export const logoutAction = () => {
    storageUtils.removeUser();
    return {type: RESET_USER}
}


// 用于实现登录请求的异步action
export const loginAction = (username,password) => {
    return async dispatch => {
        const result = await reLogin(username,password);
        if (result.status === 0) {
            const user = result.data;
            storageUtils.saveUser(user);
            dispatch(receiveUser(result.data))
        } else {
            const msg = result.msg;
            dispatch(showErrorMsg(msg))
        }
    }
}