import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Tree
} from 'antd'
import menuList from '../../config/menuConfig'
const Item = Form.Item;
const treeData = [
    {
        title: '平台权限',
        key: 'all',
        children: [],
    },
];
export default class AuthForm extends Component {
    formRef2 = React.createRef();
    result = [];
    static propTypes = {
        role: PropTypes.array
    }
    constructor(props) {
        super(props);
        const menus = this.props.role[0].menus;
        this.state = {
            checkedKeys: menus
        }
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
        this.setState({
            checkedKeys
        })
    };
    getTreeNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return {title: item.title, key: item.key}
            } else {
                return {title: item.title, key: item.key, children: this.getTreeNodes(item.children)}
            }
        })
    }
    getMenus = () => {
        return this.state.checkedKeys;
    }
    componentDidUpdate() {
        if (this.formRef2.current !== null) {
            this.formRef2.current.resetFields();
        }
    }
    componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList)
        // console.log('++',treeData[0]);
        if(treeData[0].children.length === 0) {
            treeData[0].children.push(...this.getTreeNodes(menuList))
        }

    }
    componentWillReceiveProps(nextProps) {
        const menus = nextProps.role[0].menus;
        this.setState({checkedKeys: menus})
    }
    render() {
        console.log('auth-form 的render');
        const { role } = this.props;
        const { checkedKeys } = this.state;
        console.log(role[0].menus);
        return (
            <Form ref={this.formRef2}>
                <Item label='角色名称'>
                    <Input value={role[0].name} disabled />
                </Item>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={this.onCheck}
                    checkedKeys={checkedKeys}
                    treeData={treeData}
                />
            </Form>
        )
    }
}
