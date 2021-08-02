import React, { Component } from 'react'
import { Statistic, Card, DatePicker, Timeline } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import moment from 'moment'
import './index.less'
// 这是首页路由
const tabList = [
    {
        key: '访问量',
        tab: '访问量',
    },
    {
        key: '销售量',
        tab: '销售量',
    },
];

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

function getVisitedOption() {
    return {
        title: {
            text: '访问总量',
            subtext: '数据来自网络'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['2021年', '2022年']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
            {
                name: '2021年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2022年',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };
}
export default class Home extends Component {

    that = this;
    state = {
        key: '访问量',
        noTitleKey: 'app',
    };
    contentList = {
        访问量: (
            <div className="content1">
                <Card
                    title='访问趋势'
                    className='trend'
                >
                    <ReactECharts option={getVisitedOption()} />
                </Card>
                <Card
                    title='任务'
                    className='timeLine'
                >
                    <Timeline>
                        <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                        <Timeline.Item color="green">完成网站设计图</Timeline.Item>
                        <Timeline.Item color="red">
                            <p>前后端联调接口</p>
                            <p>基本功能验收</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>登录功能设计</p>
                            <p>路由功能设计</p>
                            <p>Redux状态设计</p>
                        </Timeline.Item>
                    </Timeline>
                </Card>
            </div>
        ),
        销售量: (
            <div className="content1">
                <Card
                    title='访问趋势'
                    className='trend'
                >
                    <ReactECharts option={getVisitedOption()} />
                </Card>
                <Card
                    title='任务'
                    className='timeLine'
                >
                    <Timeline>
                        <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                        <Timeline.Item color="green">完成网站设计图</Timeline.Item>
                        <Timeline.Item color="red">
                            <p>前后端联调接口</p>
                            <p>基本功能验收</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>登录功能设计</p>
                            <p>路由功能设计</p>
                            <p>Redux状态设计</p>
                        </Timeline.Item>
                    </Timeline>
                </Card>
            </div>
        )
    };
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    getOption = () => {
        return {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
    }
    render() {
        console.log('render中的this', this);
        return (
            <>
                <div className='home'>
                    <div className="totalNumber">
                        <Card title="商品总量" style={{ width: 300 }}>
                            <Statistic
                                title="日同比上升"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                            <Statistic
                                title="周同比"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </div>
                    <ReactECharts className='homeChart' option={this.getOption()} />
                </div>
                <Card
                    className='visitNumber'
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    tabBarExtraContent={<RangePicker
                        defaultValue={[moment('2021/7/30', dateFormat), moment('2021/07/31', dateFormat)]}
                        format={dateFormat}
                    />}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {this.contentList[this.state.key]}

                </Card>
            </>
        )
    }
}
