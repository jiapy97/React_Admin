import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Select,
} from 'antd'

// 添加 // 修改用户的Form组件
const Item = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        span: 6,
        offset: 0
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
export default class UserForm extends Component {
    formRef = React.createRef();
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        user: PropTypes.object
    }
    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }
    componentDidUpdate() {
        if (this.formRef.current !== null) {
            this.formRef.current.resetFields();
        }
    }
    render() {
        const { roles } = this.props;
        const user = this.props.user || {};
        return (
            <Form ref={this.formRef} {...formItemLayout}>
                <Item label='用户名' name="username" initialValue={user.username} rules={[
                    {
                        required: true,
                        message: '必须输入名称',
                    },
                    {
                        min: 4,
                        message: '用户名长度必须大于等于4'
                    }
                ]}>
                    <Input placeholder="请输入用户名" />
                </Item>
                <Item label='密码' name="password" initialValue={user.password} rules={[
                    {
                        required: true,
                        message: '必须输入密码',
                    },
                    {
                        min: 4,
                        message: '密码长度必须大于等于4'
                    }
                ]}>
                    <Input type='password' placeholder="请输入密码" />
                </Item>
                <Item label='手机号' name="phone" initialValue={user.phone} rules={[
                    {
                        required: true,
                        message: '必须输入手机号',
                    },
                ]}>
                    <Input placeholder="请输入手机号" />
                </Item>
                <Item label='邮箱' name="email" initialValue={user.email} rules={[
                    {
                        required: true,
                        message: '必须输入邮箱',
                    },
                ]}>
                    <Input placeholder="请输入邮箱" />
                </Item>

                {
                    this.user ? (
                        <Item label='角色' name="role_id"
                            initialValue={roles.find(item => {
                                return item._id === user.role_id
                            }).name
                            }
                            rules={[
                                {
                                    required: true,
                                    message: '必须选择角色',
                                },
                            ]}>
                            <Select placeholder="请选择角色">
                                {
                                    roles.map(item => {
                                        return <Option key={item._id} value={item._id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Item>
                    ) : (
                        <Item label='角色' name="role_id"
                            rules={[
                                {
                                    required: true,
                                    message: '必须选择角色',
                                },
                            ]}>
                            <Select placeholder="请选择角色">
                                {
                                    roles.map(item => {
                                        return <Option key={item._id} value={item._id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Item>
                    )
                }
            </Form>
        )
    }
}
