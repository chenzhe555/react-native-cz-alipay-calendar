import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class DeleteDateView extends Component{

    /************************** 生命周期 **************************/
    constructor(props) {
        super(props);
        this.initializeParams();
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

    }
    /************************** 子组件回调方法 **************************/
    /************************** 外部调用方法 **************************/
    /************************** List相关方法 **************************/
    /************************** Render中方法 **************************/
    _deleteAction = () => {
        if (this.props.deleteAction) this.props.deleteAction();
    }

    render() {
        return (
            <View style={[styles.MainView]}>
                <TouchableOpacity onPress={this._deleteAction}>
                    <View style={[styles.DeleteContentView]}>
                        <Image source={require('./images/delete_btn.png')} style={[{width: 20, height: 20}]}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    DeleteContentView: {
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})