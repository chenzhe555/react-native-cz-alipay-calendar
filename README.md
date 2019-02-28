
## Manual installation

npm install react-native-cz-alipay-calendar --save

	

## Usage
###  1.引入组件
```
import AlipayCalendar from 'react-native-cz-alipay-calendar';
```

iOS: 在Podfile中加入
```
pod 'RNCzAlipayCalendar', :path => '../node_modules/react-native-cz-alipay-calendar/ios/RNCzAlipayCalendar.podspec'
```
然后执行
```
pod install
```
使用
```
<AlipayCalendar
   evaluateView={ (calendar) => {this.calendar = calendar} }
   confirm={this._confirm}
   defaultColor={'red'}
/>
```

###  2.属性:
```
bottomSpace: 类型iPhoneX这种底部给间隙，不然会被遮挡部分底部
```
```
defaultColor: 全局颜色, 默认#AAE039
```
###  3.属性方法:
```
evaluateView: 赋值当前视图对象
```
```
/*
* 确定按钮事件 (startDate, endDate, selectType) PS: 需要自行调用hide隐藏日历！！！因为confirm后有可能很多自行处理逻辑，所以内部不做隐藏处理
* startDate, endDate: 如果开始/结束日期没有，则返回null, 有值格式:{ date: '2021-05-28', arr: [ 2021, 5, 28 ], type: 1 }
* selectType: 1.开始日期 2.结束日期
* */
confirm: 确定按钮事件
```
###  4.供外部调用的方法:
```
/*
* 显示日历, yyyy-MM-dd格式
* data = {'start_date': '2010-05-10', 'end_date': '2010-05-20', 'type': 1}
* start_date: 开始日期
* end_date: 结束日期
* type: 1-默认开始日期 2.默认结束日期
* */
this.calendar.show(data = {})
```
```
this.calendar.hide()
```

