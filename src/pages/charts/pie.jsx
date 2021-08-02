import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactECharts from 'echarts-for-react';
// 柱形图路由
export default class Bar extends Component {

    state = {
        sales: [5, 20, 25, 10, 10, 20],
        stores: [7, 8, 9, 15, 2, 16]
    }


    getOption2 = (sales, stores) => {
        return {
            title: {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' },
                        { value: 300, name: '视频广告' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }

    getOption = (sales, stores) => {
        return {
            backgroundColor: '#2c343c',

            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip: {
                trigger: 'item'
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 274, name: '联盟广告' },
                        { value: 235, name: '视频广告' },
                        { value: 400, name: '搜索引擎' }
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
    }

    update = () => {
        this.setState(state => ({
            sales: state.sales.map(item => item + 1),
            stores: state.stores.reduce((pre, item) => {
                pre.push(item - 1);
                return pre
            }, [])
        }))
    }
    render() {
        const { sales, stores } = this.state;
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={() => this.update()}>更新</Button>
                </Card>
                <Card title='饼图一'>
                    <ReactECharts option={this.getOption2(sales, stores)} />
                </Card>
                <Card title='饼图二'>
                    <ReactECharts option={this.getOption(sales, stores)} />
                </Card>
            </div>
        )
    }
}
