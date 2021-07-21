import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd'
// 登录
export const reLogin = (username, password) => ajax('/login', { username, password }, 'POST');

// jsonp请求的接口请求函数
export const reWeather = (cityUnicode) => {

    return new Promise((resolve, reject) => {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=c1f1b715d546009e51b7e50627b1d5d6&city=${cityUnicode}`;
        jsonp(url, {}, (error, data) => {
            // console.log("jsonp", error, data);
            // 如果成功获取到数据
            if (!error && data.status === '1') {
                const { reporttime, weather } = data.lives[0];
                resolve({ reporttime, weather })
            } else {
                message.error("获取天气数据错误！")
            }
        })
    })
}

// 获取一级/二级的分类列表
export const reCategorys = (parentId) => ajax('/manage/category/list', { parentId })
// 添加分类
export const reAddCategorys = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, 'POST')
// 更新分类
export const reUpdateCategorys = ({ categoryId, categoryName }) => ajax('/manage/category/update', { categoryId, categoryName }, 'POST')

// 获取商品详情的分类
export const reqCategory = (categoryId) => ajax('/manage/category/info',{categoryId})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize })

// 根据指定类型 搜索商品
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax('/manage/product/search',
    {
        pageNum,
        pageSize,
        [searchType]: searchName
    }
)

// 对商品进行 上架和下架
export const reqUpdateStatus = (productId,status) => ajax('/manage/product/updateStatus',{productId,status},'POST')

// 删除图片请求
export const reqDeleteImg = (name) => ajax('/manage/img/delete',{name},'POST')

// 添加或更新商品
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + (product._id ? 'update':'add'),product,'POST')

// 获取角色列表
export const reqRoles = () => ajax('/manage/role/list')

// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add',{roleName},'POST')

// 更新角色
export const reqUpdateRole = (role) => ajax('/manage/role/update',role,'POST')

// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')

// 删除某一个用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete',{userId},'POST')

// 添加用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id ? 'update' : 'add'),user,'POST')