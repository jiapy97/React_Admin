import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setHeadTitle } from '../../redux/actions'
import { Button } from 'antd'
import './index.less'
class index extends Component {

    goHome = () => {
        this.props.setHeadTitle('首页');
        this.props.history.replace('/home')
    }

    render() {
        return (
            <div className='notFound'>
                <div className="left"></div>
                <div className="right">
                    <div className="box">
                        <h1>404</h1>
                        <h2>抱歉，你访问的页面不存在</h2>
                        <Button type='primary' onClick={() => this.goHome()}>回到首页</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    { setHeadTitle }
)(index)
