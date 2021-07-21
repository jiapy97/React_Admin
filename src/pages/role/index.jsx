import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { reqRoles } from '../../api/index.js'
import AddForm from './add-form'
import AuthForm from './auth-form'
import { reqAddRole, reqUpdateRole } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import moment from 'moment'
import storageUtils from '../../utils/storageUtils.js'
// import { log } from 'util'
// 这是角色管理路由
export default class Role extends Component {
    state = {
        roles: [],      //所有的角色
        selectedRole: [],    //选中的role
        selectedRowKeys: [],       //选中的role的_id的列表
        isShowAdd: false,           //是否选中添加模态框
        isShowAuth: false,          //是否显示设置权限的界面
        // isDestroy: false
    }
    constructor(props) {
        super(props);
        this.auth = React.createRef();
    }
    initColumn = () => {
        this.columns = [
            {
                title: '角色',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => moment(create_time).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: (auth_time) => moment(auth_time).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }
    onRow = (role) => {
        return {
            onClick: event => {
                // console.log("onRow被点击了");
                const selectedRowKeys = [...this.state.selectedRowKeys];
                const selectedRole = [...this.state.selectedRole];

                if (selectedRowKeys.length === 0) {
                    selectedRowKeys.push(role._id);
                    selectedRole.push(role)

                } else {
                    if (selectedRowKeys.indexOf(role._id) >= 0) {
                        // console.log('if被调用了');
                    } else {
                        selectedRowKeys.shift();
                        selectedRole.shift();
                        selectedRowKeys.push(role._id);
                        selectedRole.push(role)
                    }
                }
                this.setState({ selectedRowKeys })
                this.setState({ selectedRole })
            }
        }
    }
    getRoles = async () => {
        const result = await reqRoles();
        if (result.status === 0) {
            const roles = result.data;
            this.setState({ roles })
        }
    }
    checkRows = (selectedRowKeys, selectedRole) => {
        this.setState({
            selectedRowKeys
        })
        this.setState({
            selectedRole: selectedRole
        })
    }
    // 添加角色
    addRole = () => {
        this.form2.validateFields().then(async values => {

            // 隐藏确认框
            this.setState({ isShowAdd: false })
            const { roleName } = values;

            const result = await reqAddRole(roleName);

            if (result.status === 0) {
                message.success("添加角色成功")
                // 新产生的角色
                const role = result.data;
                let roles = this.state.roles;
                roles = [...roles, role];
                this.setState({ roles })
            } else {
                message.error("添加角色出错")
            }

        })
    }
    // 更新角色
    updateRole = async () => {
        const role = this.state.selectedRole[0];
        const menus = this.auth.current.getMenus()
        role.menus = menus;
        // role.auth_time = moment().format('YYYY-MM-DD')
        console.log(role.auth_time);
        role.auth_name = memoryUtils.user.username;
        const result = await reqUpdateRole(role);

        if (result.status === 0) {
            if (role._id === memoryUtils.user.role_id) {
                memoryUtils.user = {}
                storageUtils.removeUser()
                this.props.history.replace('/login');
                message.success('当前用户的角色权限被修改，请重新登录')
            } else {
                message.success('设置角色权限成功')
                this.setState({roles: [...this.state.roles]})
                this.setState({isShowAuth: false})
            }
        } else {
            message.error('更新出现错误')
        }
    }
    componentWillMount() {
        this.initColumn()
    }
    componentDidMount() {
        this.getRoles()
    }
    render() {

        const { roles, selectedRole, selectedRowKeys, isShowAdd, isShowAuth } = this.state;
        const title = (
            <span>
                <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button> &nbsp;&nbsp;
                <Button type='primary' onClick={() => this.setState({ isShowAuth: true })} disabled={selectedRole.length === 0 ? true : false}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys,
                        onChange: this.checkRows
                    }}
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5 }}
                    onRow={this.onRow}
                />
                <Modal title="添加角色" visible={isShowAdd} onOk={this.addRole} onCancel={() => { this.setState({ isShowAdd: false }) }}>
                    <AddForm setForm2={form => this.form2 = form} />
                </Modal>
                <Modal title="设置角色权限" visible={isShowAuth} onOk={this.updateRole} onCancel={() => { this.setState({ isShowAuth: false }) }}>
                    <AuthForm ref={this.auth} role={this.state.selectedRole} />
                </Modal>
            </Card>
        )
    }
}
