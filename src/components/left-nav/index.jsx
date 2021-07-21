import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';

import './index.less'
import xdLogo from '../../assets/images/西电logo.jpg'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils.js'

const { SubMenu } = Menu;

class LeftNav extends Component {
    
    hasAuth = (item) => {
        const {key,isPublic} = item;
        const menus = memoryUtils.user.role.menus;
        const username = memoryUtils.user.username;

        if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
            return true;
        } else if (item.children) {
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }
        return false;
    }

    // 使用reduce + 递归的方式
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.reduce((pre, item) => {
            if (this.hasAuth(item)) {
                if (!item.children) {
                    pre.push((<Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>))
                } else {
                    // 能够走到这里才说明菜单是有子项的
                    // 下面之所以要使用item.children是因为item是一个对象，但是item.children是一个数组
                    const subitem = item.children.find(value => path.indexOf(value.key) === 0);
                    // 如果子菜单和路径一致 存在的情况下
                    if (subitem) {
                        this.openSub = item.key;
                    }
                    pre.push((<SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>))
                }
            }
            return pre;
        }, [])
    }

    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        // 获取刷新时的路径路由
        let path = this.props.location.pathname;
        if (path.indexOf('/product') === 0) {
            path = '/product';
        }
        console.log(path);
        return (
            <div className='left-nav'>
                <Link to='/home' className='left-nav-header'>
                    <img src={xdLogo} alt="logo" />
                    <h1>西电后台</h1>
                </Link>
                <section className='left-nav-body'>

                    <Menu mode="inline" theme="dark" selectedKeys={[path]} defaultOpenKeys={[this.openSub]}>
                        {
                            this.menuNodes
                        }
                    </Menu>
                </section>
            </div>
        )
    }
}

export default withRouter(LeftNav)
