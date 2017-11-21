/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import HeaderBar from '../components/headerBar';
import CommunityItem from '../components/communityItem';
import NetUtil from '../util/netUtil';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import {getNavigator} from '../constant/router';
import Global from '../constant/global';


class CommunityContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isRefreshing: false,
            lastId: '0'
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.onRefresh());
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title="NBA社区"
                    showLeftState={false}
                    showRightState={false}/>
                <FlatList
                    data={this.state.dataSource}
                    dataExtra={this.state}
                    renderItem={(item) => this._renderItemView(item)}
                    onEndReached={() => this.onLoadMore()}
                    onRefresh={() => this.onRefresh()}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    getItemLayout={(item, index) => this._getItemLayout(item, index)}
                    keyExtractor={(item) => this._keyExtractor(item)}
                    refreshing={this.state.isRefreshing}/>
            </View>
        )
    }

    _renderItemView = (item) => {
        console.log(item);
        let that = this;
        return (
            <CommunityItem
                item={item}
                _onPress={(item) => this.goCommunityDetail(item)}/>

        )
    };

    _keyExtractor = (item, index) => item.id;

    _getItemLayout = (item, index) => (
        {length: 108, offset: 108 * index, index}
    );

    onRefresh = () => {
        let that = this;
        that.setState({
            isRefreshing: true,
        });
        let url = Global.TEN_SHE_QU_URL + '/module/timeLineAsGroup?lastId=0&count=20&gid=17&_=1510496938551';
        NetUtil.get(url, function (res) {
            console.log(res.data.list);
            that.setState({
                dataSource: res.data.list,
                lastId: res.data.lastId,
                isRefreshing: false
            })
        })
    };

    onLoadMore = () => {
        let that = this;
        let url = Global.TEN_SHE_QU_URL + '/module/timeLineAsGroup?lastId=' + this.state.lastId + '&count=20&gid=17&_=1510496938551';
        console.log(url);
        that.setState({
            isRefreshing: true
        });
        NetUtil.get(url, function (res) {
            that.setState({
                dataSource: that.state.dataSource.concat(res.data.list),
                lastId: res.data.lastId,
                isRefreshing: false
            })
        })
    };

    goCommunityDetail = (item) => {
        console.log(item);
        getNavigator().push({
            name: 'CommunityDetail',
            id: item.item.id
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default CommunityContainer;