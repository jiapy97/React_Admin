import React, { Component } from 'react'
import { Redirect,Switch,Route } from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils.js'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Category from '../category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Home from '../home'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Charts from '../charts'


const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        // 如果没有获取到用户id则直接返回登录页面
        if (!user._id) {
            return <Redirect to='/login' />
        }
        return (

            <Layout style={{ minHeight: '100%' }}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin: 20, backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts' component={Charts}/>
                            <Redirect to={'/home'}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center',color: '#ccc'}}>推荐使用谷歌浏览器，以获取最佳用户体验！</Footer>
                </Layout>
            </Layout>

        )
    }
}
