import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input,
} from 'antd'

const Item = Form.Item;
const Option = Select.Option;
export default class AddForm extends Component {
    formRef2 = React.createRef();
    static propTypes = {
        categories: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
        setForm2: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.setForm2(this.formRef2.current)
    }
    componentDidUpdate() {
        if (this.formRef2.current !== null) {
            this.formRef2.current.resetFields();
        }
    }
    render() {
        const categories = this.props.categories;
        const parentId = this.props.parentId;
        console.log("获取到的parentId是：",parentId);
        return (
            <Form ref={this.formRef2}>

                <p>所属分类</p>
                <Item initialValue={parentId} name="parentId">
                    <Select value={parentId}>
                        <Option value='0'>一级分类</Option>
                        {
                            categories.map(value => <Option value={value._id}>{value.name}</Option>)
                        }
                    </Select>
                </Item>
                <Item name="categoryName" rules={[
                        {
                            required: true,
                            message: '必须输入名称',
                        },
                    ]}>
                    <Input placeholder="请输入分类名称" />
                </Item>

            </Form>
        )
    }
}
