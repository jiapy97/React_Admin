import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
} from 'antd'

const Item = Form.Item;
export default class AddForm extends Component {
    formRef2 = React.createRef();
    static propTypes = {
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
        
        return (
            <Form ref={this.formRef2}>
                <Item label='角色名称' name="roleName" rules={[
                        {
                            required: true,
                            message: '必须输入名称',
                        },
                    ]}>
                    <Input placeholder="请输入角色名称" />
                </Item>

            </Form>
        )
    }
}
