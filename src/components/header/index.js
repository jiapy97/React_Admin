import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reWeather } from '../../api/index'
import menuList from '../../config/menuConfig'

import { Modal,Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
class Header extends Component {
    state = {
        currentTime: new Date().toLocaleString(),
        weather: ''
    }

    getTime = () => {
        this.setIntervalID = setInterval(() => {
            const currentTime = new Date().toLocaleString();
            this.setState({ currentTime });
        }, 1000)
    }
    getWeather = async () => {
        const { weather } = await reWeather(610100);
        this.setState({ weather });
    }
    // 用于查找标题路由
    getTitle = () => {
        const path = this.props.location.pathname;
        for (let v of menuList) {
            if (v.key === path) {
                return v.title;
            } else if (v.children) {
                const item = v.children.find(value => path.indexOf(value.key) === 0);
                if (item) return item.title;
            }
        }
        return null;
    }
    
// 退出登录
logout = () => {
    confirm({
        icon: <ExclamationCircleOutlined />,
        content: '确定要退出吗？',
        onOk: () => {
            // 从内存中删除用户信息
            storageUtils.removeUser();
            memoryUtils.user = {};
            // 跳转到登录
            this.props.history.replace('/login');
        },
    });
}

// 每隔一秒更新时间
componentDidMount() {
    this.getTime();
    this.getWeather();
}

componentWillUnmount () {
    clearInterval(this.setIntervalID)
}
render() {
    // 获取用户名
    const username = memoryUtils.user.username;
    const pathname = this.getTitle();

    return (
        <div className='header'>
            <div className='header-top'>
                <span>欢迎，{username}</span>
                <Button type='link' onClick={this.logout}>退出</Button>
                {/* <a href="javascript:" onClick={this.logout}>退出</a> */}
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>{pathname}</div>
                <div className='header-bottom-right'>
                    <span>{this.state.currentTime}</span>
                    <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="weather" />
                    <span>{this.state.weather}</span>
                </div>
            </div>
        </div>
    )
}
}

export default withRouter(Header)