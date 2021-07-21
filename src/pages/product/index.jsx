import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductAddUpdate from './add-update';
import ProductDetail from './detail';
import ProductHome from './home'
// 商品总的路由
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/product" component={ProductHome}/>
                <Route exact path="/product/addupdate" component={ProductAddUpdate}/>
                <Route exact path="/product/detail" component={ProductDetail}/>
                <Redirect to="/product" />
            </Switch>
        )
    }
}
