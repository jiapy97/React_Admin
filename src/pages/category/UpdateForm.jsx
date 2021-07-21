import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
} from 'antd'

const Item = Form.Item;
export default class UpdateForm extends Component {
    formRef = React.createRef();
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.setForm(this.formRef.current);
    }
    componentDidUpdate() {
        if (this.formRef.current !== null) {
            this.formRef.current.resetFields();
        }
    }
    render() {
        const { categoryName } = this.props;

        console.log(categoryName);

        return (
            <Form ref={this.formRef}>

                <Item initialValue={categoryName}
                    name="categoryName"
                    rules={[
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
