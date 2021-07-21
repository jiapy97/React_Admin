import React, { Component } from 'react'
import { Modal, Card, Button, Table, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { reCategorys, reUpdateCategorys, reAddCategorys } from '../../api/index'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'
// 商品分类 路由
export default class Category extends Component {
    state = {
        categories: [],
        loading: false,
        // 判断是一级列表还是二级列表
        parentId: '0',
        // 二级分类列表
        subCategories: [],
        // 二级分类的title
        subTitle: '',
        isAddVisible: false,
        isUpdateVisible: false
    }
    initColumn = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                dataIndex: '',
                key: 'x',
                render: (category) => (
                    <span>
                        <Button type='link' onClick={() => this.showUpdateModal(category)}>修改分类</Button>
                        {this.state.parentId === '0' ? <Button type='link' onClick={() => this.showSubCategories(category)}>查看子分类</Button> : null}
                    </span>
                )
            },
        ];
    }

    // 展示二级分类列表的函数
    showSubCategories = (category) => {
        // 首先更新状态
        this.setState({
            subTitle: category.name,
            parentId: category._id
        }, () => {
            console.log(this.state.parentId);
            this.getCategories();
        })
    }
    // 展示一级分类列表的函数
    showCategories = () => {
        this.setState({
            parentId: '0',
            subCategories: [],
            subTitle: ''
        })
    }
    getCategories = async (parentId) => {
        this.setState({ loading: true })
        // 判断是获取一级列表还是二级列表
        parentId = parentId || this.state.parentId;
        const result = await reCategorys(parentId);
        if (parentId === '0') {
            if (result.status === 0) {
                this.setState({ categories: result.data })
            } else {
                message.error("获取分类列表错误！")
            }
        } else {
            if (result.status === 0) {
                this.setState({ subCategories: result.data })
            } else {
                message.error("获取分类列表错误！")
            }
        }

        this.setState({ loading: false })
    }
    // 添加分类
    addCategory = () => {
        console.log("添加分类");
        this.form2.validateFields().then(async (values) => {

            // 准备数据
            const parentId = values.parentId;
            const categoryName = values.categoryName;
            console.log(parentId, categoryName, values);
            // 发送请求
            const result = await reAddCategorys(categoryName, parentId)
            // 重新显示
            console.log(result.status);
            if (result.status === 0) {
                if (parentId === this.state.parentId) {
                    this.getCategories();
                } else if (parentId === '0') {
                    this.getCategories('0');
                }
            }
            // 关闭modal显示框
            this.setState({ isAddVisible: false })
        })
    }
    // 更新分类
    updateCategory = async () => {
        console.log("更新分类");

        this.form.validateFields().then(async (values) => {
            // 关闭modal显示框
            this.setState({ isUpdateVisible: false })
            // 准备数据
            const categoryId = this.category._id;
            const categoryName = values.categoryName;
            console.log(categoryId, categoryName);
            // 发送请求
            const result = await reUpdateCategorys({ categoryId, categoryName })
            // 重新显示
            console.log(result.status);
            if (result.status === 0) {
                this.getCategories();
            }
        })
    }
    // 显示 添加modal模态框
    showAddModal = () => {
        this.setState({ isAddVisible: true })
    }
    // 显示 更新modal 模态框
    showUpdateModal = (category) => {
        this.category = category;
        this.setState({ isUpdateVisible: true });
    };



    handleCancel = () => {
        this.setState({ isAddVisible: false });
        this.setState({ isUpdateVisible: false });
    };
    componentWillMount() {
        this.initColumn();
    }
    componentDidMount() {
        this.getCategories();
    }

    render() {

        const { isAddVisible, isUpdateVisible } = this.state
        const { categories, subCategories, parentId, subTitle } = this.state;
        const category = this.category || {};
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <Button type='link' onClick={this.showCategories}>一级分类列表</Button>
                <ArrowRightOutlined style={{ marginRight: 8 }} />
                <span>{subTitle}</span>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAddModal}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table dataSource={parentId === '0' ? categories : subCategories} columns={this.columns} bordered rowKey="_id" pagination={{ defaultPageSize: 5, showQuickJumper: true }} loading={this.state.loading} />
                <Modal title="添加分类" visible={isAddVisible} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <AddForm categories={categories} parentId={parentId} setForm2={form => this.form2 = form} />
                </Modal>
                <Modal title="修改分类" visible={isUpdateVisible} onOk={this.updateCategory} onCancel={this.handleCancel}>
                    <UpdateForm categoryName={category.name} setForm={form => this.form = form} />
                </Modal>
            </Card>
        )
    }
}
