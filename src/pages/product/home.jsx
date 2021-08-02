import React, { Component } from 'react'
import {
    Card, Select, Input, Button, Table, message
} from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constant'
import './product.less'
import memoryUtils from '../../utils/memoryUtils';
// 商品主页子路由
const Option = Select.Option;
export default class ProductHome extends Component {
    state = {
        products: [],
        total: 0,
        loading: false,
        searchType: 'productName',
        searchName: ''
    }
    initColumns() {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                width: 100,
                title: '状态',
                // dataIndex: 'status',
                render: (product) => {
                    const { status, _id } = product;
                    return (
                        <span>
                            <Button
                                type='primary'
                                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}

                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <Button type='link' onClick={() => this.showDetail(product)}>详情</Button>
                            <Button type='link' onClick={() => this.showUpdate(product)}>修改</Button>
                        </span >
                    )
                }
            },
        ];
    }

    showDetail = (product) => {
        memoryUtils.product = product;
        this.props.history.push('/product/detail')
    }
    showUpdate = (product) => {
        memoryUtils.product = product;
        this.props.history.push('/product/addupdate')
    }
    updateStatus = async (id, status) => {
        const result = await reqUpdateStatus(id, status);
        console.log(result);
        if (result.status === 0) {
            this.getProducts(this.pageNum);
            message.success('商品更新状态成功！')
        }
    }
    // 获取商品分页列表
    getProducts = async (pageNum) => {
        this.setState({ loading: true });
        // 判断是搜索分页还是一般分页
        this.pageNum = pageNum;
        const { searchName, searchType } = this.state;
        console.log("此时：", searchName, searchType);
        let result;
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
            console.log("result:", result);
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE);
        }
        this.setState({ loading: false });
        if (result.status === 0) {
            const { total, list } = result.data;
            this.setState({ total, products: list })
        }
    }
    componentWillMount() {
        this.initColumns();
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {

        const { products, total, loading, searchType } = this.state;


        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 130 }}
                    onChange={value => this.setState({ searchType: value })
                    }>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 10px' }}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
                <PlusOutlined />
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    loading={loading}
                    pagination={{
                        current: this.pageNum,
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: (pageNum) => this.getProducts(pageNum),
                    }}
                    bordered
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                />;
            </Card>
        )
    }
}
