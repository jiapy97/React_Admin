import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Button,message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reCategorys } from '../../api/index'
import RichTextEditor from './rich-text-editor'
import PicturesWall from './pictures-wall'
import {reqAddOrUpdateProduct} from '../../api/index'
// 商品更新和添加的子路由

const { Item } = Form;
const { TextArea } = Input;


export default class ProductAddUpdate extends Component {

    state = {
        options: []
    }
    formRef = React.createRef();
    pwRef = React.createRef();
    editorRef = React.createRef();
    getCategories = async (parentId) => {
        const result = await reCategorys(parentId);
        if (result.status === 0) {
            // 判断是一级列表还是二级
            if (parentId === '0') {
                this.initOptions(result.data);
            } else {
                return result.data;
            }
        }
    }

    initOptions = async (categories) => {
        const options = categories.map(item => ({
            value: item._id,
            label: item.name,
            isLeaf: false
        }))
        // 如果是一个二级商品的分类
        const { isUpdate, product } = this;
        const { pCategoryId } = product;
        if (isUpdate && pCategoryId !== '0') {
            const subCategories = await this.getCategories(pCategoryId)
            const chilrdOptions = subCategories.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: true
            }))
            const targetOption = options.find(option => option.value === pCategoryId);
            targetOption.children = chilrdOptions;
        }
        this.setState({ options })
    }
    submit = () => {
        this.formRef.current.validateFields().then(async (values) => {
            const {name,desc,price,categoryIds} = values;
            let pCategoryId,categoryId;
            if (categoryIds.length === 1) {
                pCategoryId = '0';
                categoryId = categoryIds[0]
            } else {
                pCategoryId = categoryIds[0]
                categoryId = categoryIds[1]
            }
            
            const imgs = this.pwRef.current.getImgs();
            const detail = this.editorRef.current.getDetail();
            const product = {name,desc,price,imgs,detail,pCategoryId,categoryId};

            // 如果是更新，需要添加 _id
            if (this.isUpdate) {
                product._id = this.product._id;
            }
            const result = await reqAddOrUpdateProduct(product);
            
            if (result.status === 0) {
                message.success(`${this.isUpdate ? '更新' : '添加'}成功`)
            } else {
                message.error(`${this.isUpdate ? '更新' : '添加'}出错`)
            }
        })
    }

    validatePrice = (rule, value) => {
        if (value * 1 > 0) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('价格必须大于0'))
        }
    }
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // 根据选中的分类 获取二级分类列表
        const subCategories = await this.getCategories(targetOption.value);
        targetOption.loading = false;
        if (subCategories && subCategories.length > 0) {
            const chilrdOptions = subCategories.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: true
            }))

            targetOption.children = chilrdOptions;

        } else {
            targetOption.isLeaf = true;

        }
        this.setState({
            options: [...this.state.options],
        });

    };


    componentDidMount() {
        this.getCategories('0');
    }
    componentWillMount() {
        // 判断是修改商品详情 还是 添加商品
        const product = this.props.location.state;
        this.isUpdate = !!product;
        this.product = product || {}
    }
    render() {
        const { isUpdate, product } = this;
        const { pCategoryId, categoryId, imgs,detail } = product;
        const categoryIds = [];
        // 如果是更新商品
        if (isUpdate) {
            if (pCategoryId === '0') {
                categoryIds.push(categoryId);
            } else {
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId);
            }

        }
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 12 },
        };

        const title = (
            <span>
                <Button type='link' onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{ color: 'blue' }} />
                </Button>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )
        return (
            <Card title={title}>
                <Form  {...layout} ref={this.formRef}>
                    <Item label="商品名称"
                        initialValue={product.name}
                        name='name'
                        rules={[{ required: true, message: '必须输入商品名称' }]}>
                        <Input placeholder='商品名称' />
                    </Item>
                    <Item label="商品描述"
                        initialValue={product.desc}
                        name='desc'
                        rules={[{ required: true, message: '必须输入商品描述' }]}>
                        <TextArea rows={2} placeholder='商品描述' />
                    </Item>
                    <Item label="商品价格"
                        initialValue={product.price}
                        name='price'
                        rules={[
                            { required: true, message: '必须输入商品描述' },
                            { validator: this.validatePrice }
                        ]}>
                        <Input type='number' placeholder='商品价格' addonAfter='元' />
                    </Item>
                    <Item label="商品分类"
                        initialValue={categoryIds}
                        name='categoryIds'
                        rules={[
                            { required: true, message: '必须指定商品分类' },
                        ]}>
                        <Cascader options={this.state.options} loadData={this.loadData} />
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall ref={this.pwRef} imgs={imgs} />
                    </Item>
                    <Item label="商品详情" labelCol= {{span: 2 }} wrapperCol={{span: 20 }}>
                        <RichTextEditor ref={this.editorRef} detail={detail}/>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={() => this.submit()}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
