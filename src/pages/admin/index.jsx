import React, { Component } from 'react'
import { Layout } from 'antd';
import {connect}  from 'react-redux'
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
import NotFound from '../not-found'
import { Redirect,Switch,Route } from 'react-router-dom'



const { Footer, Sider, Content } = Layout;
class Admin extends Component {
    render() {
        // const user = memoryUtils.user;
        const user = this.props.user;
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
                            <Redirect exact={true} from = '/' to={'/home'}/>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts' component={Charts}/>
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center',color: '#ccc'}}>推荐使用谷歌浏览器，以获取最佳用户体验！</Footer>
                </Layout>
            </Layout>

        )
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Admin)