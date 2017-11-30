/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    AlertIOS,
    TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let Wine = require('./Wine.json');

let widthDimensions = require('Dimensions').get('window').width;

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        // 设置数据源
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            // 设置数据
            dataSource: ds.cloneWithRows(Wine),// 传入数组
        };
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
        );
    }

    static itemClick(rowData, sectionID, rowID, highlightRow) {
        AlertIOS.alert('点击了' + rowID + '行')
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        console.log(rowData);
        return (
            <TouchableOpacity activeOpacity={0.5}
                              onPress={() => App.itemClick(rowData, sectionID, rowID, highlightRow)}>
                <View style={styles.container}>
                    {/*图片*/}
                    <Image source={{uri: rowData.image}} style={styles.imageStyle}/>
                    <View style={styles.viewStyle}>
                        {/*名字*/}
                        <Text style={styles.nameStyle}>{rowData.name}</Text>
                        {/*价格*/}
                        <Text style={styles.moneyStyle}>￥{rowData.money}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // 下划线
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        padding: 10
    },
    viewStyle: {
        marginLeft: 10,
        width: widthDimensions * 0.75
    },
    imageStyle: {
        width: 60,
        height: 60
    },
    nameStyle: {
        flex: 1,
        fontSize: 15,
    },
    moneyStyle: {
        color: 'red'
    }

});
