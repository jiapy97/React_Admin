import React, { Component } from 'react'
import { Card, List, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCategory } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
// import jp1 from '../login/images/bg.jpg'
const Item = List.Item;
// 商品详情页 路由
export default class ProductDetail extends Component {
    state = {
        cName1: '',     // 一级分类名称
        cName2: ''     // 二级分类名称    
    }

    async componentDidMount() {
        const {pCategoryId,categoryId} = memoryUtils.product;
        if (pCategoryId === '0') {
            const result = await reqCategory(categoryId);
            const cName1 = result.data.name;
            this.setState({cName1}); 
        } else {
            const result1 = await reqCategory(pCategoryId);
            const result2 = await reqCategory(categoryId);
            const cName1 = result1.data.name;
            const cName2 = result2.data.name;
            this.setState({cName1,cName2})
        }
    }
    componentWillUnmount() {
        memoryUtils.product = {};
    }
    render() {
        const { name, desc, price, detail } = memoryUtils.product;
        const {cName1,cName2} = this.state;
        const title = (
            <span>
                <Button type='link'>
                    <ArrowLeftOutlined
                        style={{ color: 'blue', fontSize: 20 }}
                        onClick={() => this.props.history.goBack()}
                    />
                </Button>
                <span>商品详情</span>
            </span>
        )
        return (
            <div>
                <Card title={title} className="product-detail">
                    <List>
                        <Item>
                            <span className="left">商品名称：</span>
                            <span>{name}</span>
                        </Item>
                        <Item>
                            <span className="left">商品描述：</span>
                            <span>{desc}</span>
                        </Item>
                        <Item>
                            <span className="left">商品价格：</span>
                            <span>{price}元</span>
                        </Item>
                        <Item>
                            <span className="left">所属分类：</span>
                            <span>{cName1}{cName2 ? '-->' + cName2 : ''}</span>
                        </Item>

                        <Item>
                            <span className="left">商品详情：</span>
                            <span dangerouslySetInnerHTML={{ __html: detail }}>
                            </span>
                        </Item>
                    </List>
                </Card>
            </div>
        )
    }
}
