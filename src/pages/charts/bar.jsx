import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactECharts from 'echarts-for-react';
// 柱形图路由
export default class Bar extends Component {

    state = {
        sales: [5, 20, 25, 10, 10, 20],
        stores: [7, 8, 9, 15, 2, 16]
    }

    getOption = (sales,stores) => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales,
            }, {
                name: '库存',
                type: 'bar',
                data: stores
            }]

        }
    }

    update = () => {
        this.setState(state => ({
            sales: state.sales.map(item => item + 1),
            stores: state.stores.reduce((pre,item) => {
                pre.push(item-1);
                return pre
            },[])
        }))
    }
    render() {
        const {sales,stores} = this.state;
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={() => this.update()}>更新</Button>
                </Card>
                <Card title='柱状图一'>
                    <ReactECharts option={this.getOption(sales,stores)} />
                </Card>
            </div>
        )
    }
}
