import React, { Component } from 'react';
import { View, Text, StyleSheet, NativeModules, Platform, Modal } from 'react-native';
const { RNCzAlipayCalendar } = NativeModules;
import TopButtonsView from './TopButtonsView';
import ShowDateView from './ShowDateView';
import DeleteDateView from './DeleteDateView';
import SelectDateView from './SelectDateView';

/*
* props:
* bottomSpace: 类型iPhoneX这种底部给间隙，不然会被遮挡部分底部
* defaultColor: 全局颜色, 默认#AAE039
*
* func:
* evaluateView: 赋值当前视图对象
*
* export func:
* confirm: 确定按钮事件
* */
export default class CZAlipayCalendar extends Component{

    /************************** 生命周期 **************************/
    constructor(props) {
        super(props);
        this.initializeParams();
    }

    componentDidMount() {
        if (typeof this.props.bottomSpace == 'undefined' && typeof CZAlipayCalendar.BottomSpace == 'undefined' && Platform.OS == 'ios') {
            RNCzAlipayCalendar.getBottomSpace( (result) => {
                CZAlipayCalendar.BottomSpace = result;
                this.bottomSpace = result;
                this.forceUpdate();
            });
        }
        if (this.props.evaluateView) this.props.evaluateView(this);
    }
    /************************** 继承方法 **************************/
    /************************** 通知 **************************/
    /************************** 创建视图 **************************/
    /************************** 网络请求 **************************/
    /************************** 自定义方法 **************************/
    /*
    * 初始化参数
    * */
    initializeParams() {
        this.state = {
            show: false
        };
        //获取底部多余空隙
        this.bottomSpace = this.props.bottomSpace ? this.props.bottomSpace : CZAlipayCalendar.getBottomSpace();
        this.startYear = 0;
        this.startMonth = 0;
        this.startDay = 0;
        this.endYear = 0;
        this.endMonth = 0;
        this.endDay = 0;
        //当前选中日期类型：1.开始日期 2.结束日期
        this.selectType = 1;
    }

    /*
    * 获取底部间隙
    * */
    static getBottomSpace = () => {
        return CZAlipayCalendar.BottomSpace ? CZAlipayCalendar.BottomSpace : 0;
    }

    /*
    * 修改所有显示的日期信息
    * */
    modifyShowDateText = () => {
        if (this.selectType == 1) {
            if (this.showDateView) this.showDateView.modifyShowText(this.getStartDateString(), '', this.selectType);
        } else {
            if (this.showDateView) this.showDateView.modifyShowText('', this.getEndDateString(), this.selectType);
        }
    }

    /*
    * 修改日期选择视图显示
    * */
    modifySelectDateView = () => {
        if (this.selectDateView) this.selectDateView.modifyShowDate(this.selectType == 1 ? this.startYear : this.endYear, this.selectType == 1 ? this.startMonth : this.endMonth, this.selectType == 1 ? this.startDay : this.endDay);
    }

    /*
    * 获取开始和结束日期格式
    * */
    getStartDateString = () => {
        if (this.startYear == 0) return '开始日期';
        else return this.startYear + '-' + (parseInt(this.startMonth) < 10 ? ('0' + this.startMonth) : this.startMonth) + '-' + (parseInt(this.startDay) < 10 ? ('0' + this.startDay) : this.startDay);
    }
    getEndDateString = () => {
        if (this.endYear == 0) return '结束日期';
        else return this.endYear + '-' + (parseInt(this.endMonth) < 10 ? ('0' + this.endMonth) : this.endMonth) + '-' + (parseInt(this.endDay) < 10 ? ('0' + this.endDay) : this.endDay);
    }



    /************************** 子组件回调方法 **************************/
    /************************** 外部调用方法 **************************/
    /*
    * 显示日历, yyyy-MM-dd格式
    * data = {'start_date': '2010-05-10', 'end_date': '2010-05-20', 'type': 1}
    * start_date: 开始日期
    * end_date: 结束日期
    * type: 1-默认开始日期 2.默认结束日期
    * */
    show = (data = {}) => {
        let startDateString = data['start_date'] ? data['start_date'] : '';
        let endDateString = data['end_date'] ? data['end_date'] : '';
        //获取开始日期显示
        if (startDateString.length > 0) {
            let startDateArr = startDateString.split('-');
            this.startYear = parseInt(startDateArr[0]);
            this.startMonth = parseInt(startDateArr[1]);
            this.startDay = parseInt(startDateArr[2]);
        } else {
            //如果开始日期和结束日期都没有,则赋值开始日期为当前
            if (endDateString.length == 0) {
                let date = new Date();
                this.startYear = date.getFullYear();
                this.startMonth = date.getMonth() + 1;
                this.startDay = date.getDate();
            }
        }
        startDateString = this.getStartDateString();
        //获取结束日期显示
        if (endDateString.length > 0) {
            let endDateArr = endDateString.split('-');
            this.endYear = parseInt(endDateArr[0]);
            this.endMonth = parseInt(endDateArr[1]);
            this.endDay = parseInt(endDateArr[2]);
            endDateString = this.getEndDateString();
        }

        this.selectType = data['type'] ? data['type'] : 1;
        this.setState({
            show: true
        }, () => {
            if (this.showDateView) this.showDateView.modifyShowText(startDateString, endDateString, this.selectType);
            this.modifySelectDateView();
        });
    }

    /*
    * 隐藏日历
    * */
    hide = () => {
        this.setState({
            show: false
        });
    }
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/
    /*
    * 确定按钮事件 (startDate, endDate, selectType) PS: 需要自行调用hide隐藏日历！！！因为confirm后有可能很多自行处理逻辑，所以内部不做隐藏处理
    * startDate, endDate: 如果开始/结束日期没有，则返回null, 有值格式:{ date: '2021-05-28', arr: [ 2021, 5, 28 ], type: 1 }
    * selectType: 1.开始日期 2.结束日期
    * */
    _confirm = () => {
        let startDate = null;
        let endDate = null;
        if (this.startYear != 0) {
            startDate = {
                'date': this.getStartDateString(),
                'arr': [this.startYear, this.startMonth, this.startDay]
            }
        }
        if (this.endYear != 0) {
            endDate = {
                'date': this.getEndDateString(),
                'arr': [this.endYear, this.endMonth, this.endDay]
            }
        }
        if (this.props.confirm) this.props.confirm(startDate, endDate, this.selectType);
    }

    /*
    * 日期修改回调事件
    * */
    _dateChanged = (year, month, day) => {
        if (this.selectType == 1) {
            this.startYear = year;
            this.startMonth = month;
            this.startDay = day;
        } else {
            this.endYear = year;
            this.endMonth = month;
            this.endDay = day;
        }
        this.modifyShowDateText();
    }

    /*
    * 开始&结束日期切换
    * */
    _selectTypeChanged = (type) => {
        this.selectType = type;
        this.modifyShowDateText();
        this.modifySelectDateView();
    }

    /*
    * 清空日期选择
    * */
    _deleteAction = () => {
        this.selectType = 1;
        this.showDateView.modifyShowText('开始日期', '结束日期', this.selectType);
        this.startYear = 0;
        this.startMonth = 0;
        this.startDay = 0;
        this.endYear = 0;
        this.endMonth = 0;
        this.endDay = 0;
    }

    render() {
        const { show } = this.state;
        const { bottomSpace } = this;

        let defaultColor = this.props.defaultColor ? this.props.defaultColor : '#AAE039';

        return (
            <Modal
                visible={show}
                animationType={'fade'}
                transparent={true}
            >
                <View style={[styles.MainView]}>
                    <View style={[styles.ContentMainView]}>
                        <TopButtonsView
                            cancel={this.hide}
                            confirm={this._confirm}
                            defaultColor={defaultColor}
                        />
                        <ShowDateView
                            evaluateView={ (showDateView) => {this.showDateView = showDateView} }
                            selectTypeChanged={this._selectTypeChanged}
                            defaultColor={defaultColor}
                        />
                        <DeleteDateView
                            deleteAction={this._deleteAction}
                        />
                        <SelectDateView
                            evaluateView={ (selectDateView) => {this.selectDateView = selectDateView} }
                            dateChanged={this._dateChanged}
                        />
                    </View>
                    {
                        bottomSpace > 0 ? (
                            <View style={[{height: bottomSpace, backgroundColor: 'white'}]}/>
                        ) : null
                    }
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    ContentMainView: {
        backgroundColor: 'white'
    }
})