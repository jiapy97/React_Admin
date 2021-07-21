import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import moment from 'moment'
import { reqAddOrUpdateUser, reqDeleteUser, reqUsers } from '../../api/index.js'
import UserForm from './user-form'
// 用户管理 路由
export default class User extends Component {
    state = {
        users: [],
        isShow: false,
        roles: []
    }
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => moment(create_time).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.state.roles.find(item => item._id === role_id).name
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <Button type='link' onClick={() => this.showUpdate(user)}>修改</Button>
                        <Button type='link' onClick={() => this.deleteUser(user)}>删除</Button>
                    </span>
                )
            }
        ]
    }

    showUpdate = (user) => {
        this.user = user;
        this.setState({ isShow: true })
    }

    deleteUser = async (user) => {

        Modal.confirm({
            title: `确认删除${user.username}吗？`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id);
                if (result.status === 0) {
                    message.success(`删除${user.username}成功`);
                    this.getUsers();
                } else {
                    message.error('删除出错')
                }
            }
        });
    }

    getUsers = async () => {
        const result = await reqUsers();
        if (result.status === 0) {
            const { users, roles } = result.data;
            this.setState({ users, roles })
        } else {
            message.success('获取用户列表出错')
        }
    }

    // 添加 / 更新 用户
    addOrUpdateUser = () => {
        this.form.validateFields().then(async values => {
            // 如果是更新，需要指定_id
            if (this.user) {
                values._id = this.user._id
            }
            const result = await reqAddOrUpdateUser(values);

            if (result.status === 0) {
                message.success(`${this.user ? '修改':'添加'}用户成功`);
                this.getUsers();
                this.setState({ isShow: false })
            } else {
                message.error('添加用户出错')
            }
        })
    }
    // 展示创建用户的modal
    showAdd = () => {
        this.user = null;
        this.setState({ isShow: true })
    }
    componentDidMount() {
        this.initColumns();
        this.getUsers();
    }
    render() {
        const title = <Button type='primary' onClick={() => this.showAdd()}>创建用户</Button>
        const { users, isShow, roles } = this.state;
        const user = this.user || {}
        return (
            <Card title={title}>
                <Table
                    dataSource={users}
                    columns={this.columns}
                    bordered rowKey="_id"
                    pagination={{ defaultPageSize: 5 }}

                />
                <Modal
                    title={user._id ? '修改用户' : "添加用户"}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => this.setState({ isShow: false })}
                >
                    <UserForm
                        setForm={form => this.form = form}
                        roles={roles}
                        user={this.user}
                    />
                </Modal>
            </Card>
        )
    }
}
