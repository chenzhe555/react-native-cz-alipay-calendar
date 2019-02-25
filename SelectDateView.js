import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Picker } from 'react-native';

export default class ShowDateView extends Component{

    /************************** 生命周期 **************************/
    constructor(props) {
        super(props);
        this.initializeParams();
    }

    componentDidMount() {
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
        let date = new Date();
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }

    /*
    * 获取年份Picker
    * */
    getYearPickerView = () => {
        const { year } = this.state;

        let yearsView = [];
        for (let i = 1990; i < 2050; ++i) {
            yearsView.push(<Picker.Item label={i + '年'} value={i} />);
        }

        return (
            <Picker
                selectedValue={year}
                style={{ flex: 1 }}
                onValueChange={this._onYeadChanged}>
                {yearsView}
            </Picker>
        )
    }
    _onYeadChanged = (value) => {
        this.setState({
            year: value
        }, () => {
            this.dateChanged();
        });
    }

    /*
    * 获取月份Picker
    * */
    getMonthPickerView = () => {
        const { month } = this.state;

        let monthsView = [];
        for (let i = 1; i < 13; ++i) {
            monthsView.push(<Picker.Item label={i + '月'} value={i} />);
        }

        return (
            <Picker
                selectedValue={month}
                style={{ flex: 1 }}
                onValueChange={this._onMonthChanged}>
                {monthsView}
            </Picker>
        )
    }
    _onMonthChanged = (value) => {
        this.setState({
            month: value
        }, () => {
            this.dateChanged();
        });
    }

    /*
    * 获取日份Picker
    * */
    getDayPickerView = () => {
        const { year, month, day } = this.state;

        let dayCount = this.getMonthDays(year, month);
        let daysView = [];
        for (let i = 1; i < dayCount; ++i) {
            daysView.push(<Picker.Item label={i + '日'} value={i} />);
        }

        return (
            <Picker
                selectedValue={day}
                style={{ flex: 1 }}
                onValueChange={this._onDayChanged}>
                {daysView}
            </Picker>
        )
    }
    _onDayChanged = (value) => {
        this.setState({
            day: value
        }, () => {
            this.dateChanged();
        });
    }

    //获取某年某月天数
    getMonthDays = (year, month) => {
        return (new Date(year,month,0)).getDate();
    }

    /*
    * 年月日改动回调事件
    * */
    dateChanged = () => {
        if (this.props.dateChanged) this.props.dateChanged(this.state.year, this.state.month, this.state.day);
    }
    /************************** 子组件回调方法 **************************/
    /************************** 外部调用方法 **************************/
    /*
    * 修改显示的年月日
    * */
    modifyShowDate = (year, month, day) => {
        if (year != 0) {
            this.setState({
                year: year,
                month: month,
                day: day
            });
        }
    }
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/

    render() {
        return (
            <View style={[styles.MainView]}>
                {this.getYearPickerView()}
                {this.getMonthPickerView()}
                {this.getDayPickerView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        flexDirection: 'row',
        height: 170
    }
})