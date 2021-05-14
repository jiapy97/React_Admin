import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
import logo from './images/logo.png'
export default class Login extends Component {
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    render() {
        return (
            <div className="Login">
                <header className='Login-header'>
                    <img src={logo} alt="" />
                    <h1>React管理系统</h1>
                </header>
                <section className='Login-content'>
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
