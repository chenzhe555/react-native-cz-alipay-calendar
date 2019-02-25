import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
            selectType: 1, //1.开始日期 2.结束日期
            startText: '开始日期',
            endText: '结束日期'
        };
    }
    /************************** 子组件回调方法 **************************/
    /************************** 外部调用方法 **************************/
    /*
    * 更改显示文本信息
    * */
    modifyShowText = (start = '', end = '', type = 0) => {
        const { startText, endText, selectType } = this.state;

        this.setState({
            startText: start.length > 0 ? start : startText,
            endText: end.length > 0 ? end : endText,
            selectType: type != 0 ?  type : selectType
        })
    }
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/
    /*
    * 点击月份视图事件
    * */
    _monthClicked = (type) => {
        if (this.state.selectType != type) {
            if (this.props.selectTypeChanged) this.props.selectTypeChanged(type);
            this.setState({
                selectType: type
            });
        }
    }

    render() {
        const { selectType, startText, endText } = this.state;
        const { defaultColor } = this.props;

        return (
            <View style={[styles.MainView]}>
                <View style={[styles.ContentMainView]}>
                    <TouchableOpacity onPress={this._monthClicked.bind(this, 1)}>
                        <View style={[styles.LineDateView]}>
                            <Text style={[styles.TextView, {color: selectType == 1 ? defaultColor : '#999999'}]}>{startText}</Text>
                            <View style={[{height: 1, backgroundColor: selectType == 1 ? defaultColor : '#999999'}]}></View>
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.OnlyTextView]}>至</Text>
                    <TouchableOpacity onPress={this._monthClicked.bind(this, 2)}>
                        <View style={[styles.LineDateView]}>
                            <Text style={[styles.TextView, {color: selectType == 2 ? defaultColor : '#999999'}]}>{endText}</Text>
                            <View style={[{height: 1, backgroundColor: selectType == 2 ? defaultColor : '#999999'}]}></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        height: 50,
        alignItems: 'center'
    },

    ContentMainView: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    LineDateView: {
        width: 108
    },

    TextView: {
        fontSize: 18,
        fontFamily: 'PingFangSC-Semibold',
        textAlign: 'center'
    },

    OnlyTextView: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        color: '#999999'
    }
})