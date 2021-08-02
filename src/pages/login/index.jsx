import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
import logo from './images/logo.png'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import {connect} from 'react-redux'
import {loginAction} from '../../redux/actions'


class Login extends Component {
    onFinish = async (values) => {
        const { username, password } = values;
        this.props.loginAction(username,password)

    };
    render() {
        // 一上来，先判断使用户是否已经登录，如果用户已经登录，则跳转到管理界面，没有的话则让用户登录
        console.log("执行了");
        const user = this.props.user;
        if (user._id) {
            return <Redirect to='/home'/>
        }
        const errorMsg = this.props.user.errorMsg;
        console.log('111',errorMsg);
        return (
            <div className="Login">
                <header className='Login-header'>
                    <img src={logo} alt="" />
                    <h1>React管理系统</h1>
                </header>
                <section className='Login-content'>
                    <div className={errorMsg ? 'error-msg': ''}>{errorMsg}</div>
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '用户名必须输入!',
                                },
                                {
                                    min: 4,
                                    message: "用户名必须大于四位"
                                },
                                {
                                    max: 12,
                                    message: "用户名最多12位"
                                },
                                {
                                    pattern: /^\w+$/,
                                    message: "只能输入数字、字母、下划线"
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '密码必须输入!',
                                    },
                                    {
                                        min: 4,
                                        message: "密码必须大于四位"
                                    },
                                    {
                                        max: 12,
                                        message: "密码最多12位"
                                    },
                                    {
                                        pattern: /^\w+$/,
                                        message: "只能输入数字、字母、下划线"
                                    }
                                ]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div >
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {loginAction}
)(Login)