/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    InteractionManager
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router';
import CommonUtil from '../util/commonUtil';
import CommonStyle from '../style/commonStyle';
import Global from '../constant/global';
import RankItem from '../components/rankItem';
import PlayerItem from '../components/playerItem';
import NetUtil from '../util/netUtil';

const BLOG = {
    url: Global.BLOG_URL,
    title: '我的博客'
};

const GITHUB = {
    url: Global.GITHUB_URL,
    title: '我的项目'
};

class DataContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerDaily: {},
            playerAll: {},
            teamAll: {}
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.getPlayerDaily());
        InteractionManager.runAfterInteractions(() => this.getPlayerAll());
        InteractionManager.runAfterInteractions(() => this.getTeamAll())
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title="数据"
                    showLeftState={true}
                    showRightState={true}
                    showRightImage={true}
                    leftItemTitle={''}
                    rightImageSource={require('../image/person/github.png')}
                    leftImageSource={require('../image/menu_person.png')}
                    onPressRight={() => this.showPersonInfo(GITHUB)}
                    onPress={() => this.showPersonInfo(BLOG)}/>
                <View style={styles.container}>
                    <ScrollableTabView
                        style={{flex: 1}}
                        locked={false}
                        tabBarPosition={'top'}
                        translucent={false}
                        initialPage={0}
                        scrollWithoutAnimation={true}
                        tabBarBackgroundColor={CommonStyle.THEME}
                        tabBarActiveTextColor={CommonStyle.WHITE}
                        tabBarUnderlineStyle={{backgroundColor: CommonStyle.WHITE}}
                        tabBarInactiveTextColor={CommonStyle.TEXT_GRAY_COLOR}
                        renderTabBar={() => (
                            <DefaultTabBar
                                tabStyle={styles.tab}
                                textStyle={styles.tabText}
                            />
                        )}>
                        <RankItem tabLabel="球队排行" style={{flex: 1}}/>
                        <PlayerItem tabLabel="日榜" item={this.state.playerDaily} type={'day'} style={{flex: 1}}/>
                        <PlayerItem tabLabel="球员榜" item={this.state.playerAll} type={'player'} style={{flex: 1}}/>
                        <PlayerItem tabLabel="球队榜" item={this.state.teamAll} type={'team'} style={{flex: 1}}/>
                    </ScrollableTabView>
                </View>
            </View>
        )
    }



    showPersonInfo = (url) => {
        getNavigator().push({
            name: 'PersonInfo',
            url: url
        })
    };

    getPlayerDaily = () => {
        let that = this;
        let url = `${Global.BASE_URL}player/statsRank?${Global.BASE_PARAMS}&statType=point%2Crebound%2Cassist%2Cblock%2Csteal&num=3&tabType=1&seasonId=2017`;
        // let url = 'http://sportsnba.qq.com/player/statsRank?appver=4.0.1&appvid=4.0.1&deviceId' +
        //     '=09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height' +
        //     '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&statType=' +
        //     'point%2Crebound%2Cassist%2Cblock%2Csteal&num=3&tabType=1&seasonId=2017';
        NetUtil.get(url, function (res) {
            that.setState({
                playerDaily: res.data
            })
        })
    };

    getPlayerAll = () => {
        let that = this;
        let url = `${Global.BASE_URL}player/statsRank?${Global.BASE_PARAMS}&statType=point%2Crebound%2Cassist%2Cblock%2Csteal&num=3&tabType=3&seasonId=2017`;

        // let url = 'http://sportsnba.qq.com/player/statsRank?appver=4.0.1&appvid=4.0.1&deviceId' +
        //     '=09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height' +
        //     '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&statType=' +
        //     'point%2Crebound%2Cassist%2Cblock%2Csteal&num=3&tabType=3&seasonId=2017';
        NetUtil.get(url, function (res) {
            that.setState({
                playerAll: res.data
            })
        })
    };

    getTeamAll = () => {
        let that = this;
        let url = `${Global.BASE_URL}team/statsRank?${Global.BASE_PARAMS}&statType=point%2Crebound%2Cassist%2Cblock%2Csteal%2CoppPoints&num=3&tabType=3&seasonId=2017`;

        // let url = 'http://sportsnba.qq.com/team/statsRank?appver=4.0.1&appvid=4.0.1&deviceId' +
        //     '=09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height' +
        //     '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&statType=' +
        //     'point%2Crebound%2Cassist%2Cblock%2Csteal%2CoppPoints&num=3&tabType=3&seasonId=2017';
        NetUtil.get(url, function (res) {
            that.setState({
                teamAll: res.data
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tab: {
        paddingBottom: 0
    },
    tabText: {
        fontSize: 16
    }
});
export default DataContainer;