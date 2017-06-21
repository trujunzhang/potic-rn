/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 * @providesModule TabsListContainer
 */
'use strict';

var Animated = require('Animated');
var NativeModules = require('NativeModules');
var Dimensions = require('Dimensions');
var F8Header = require('F8Header');
var F8SegmentedControl = require('F8SegmentedControl');
var ParallaxBackground = require('ParallaxBackground');
var React = require('React');
var ReactNative = require('react-native');
var StyleSheet = require('F8StyleSheet');
var View = require('View');
var {Text} = require('F8Text');
var ViewPager = require('./ViewPager');
var Platform = require('Platform');

var {
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    StyleSheet,
    View,
} = ReactNative;

import type {Item as HeaderItem} from 'F8Header';

type Props = {
    title: string;
    leftItem?: HeaderItem;
    rightItem?: HeaderItem;
    extraItems?: Array<HeaderItem>;
    selectedSegment?: number;
    selectedSectionColor: string;
    backgroundImage: number;
    backgroundColor: string;
    parallaxContent?: ?ReactElement;
    stickyHeader?: ?ReactElement;
    onSegmentChange?: (segment: number) => void;
    children?: any;
};

type State = {
    idx: number;
    anim: Animated.Value;
    stickyHeaderHeight: number;
};

// const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;
const EMPTY_CELL_HEIGHT = 60;

const ActivityIndicator = Platform.OS === 'ios'
    ? ActivityIndicatorIOS
    : ProgressBarAndroid;

var Relay = require('react-relay');
var RelayRenderer = require('react-relay/lib/RelayRenderer.js');

class MainRoute extends Relay.Route {
}
MainRoute.queries = {viewer: () => Relay.QL`query { viewer }`};
MainRoute.routeName = 'MainRoute';

class RelayLoading extends React.Component {
    render() {
        const child = React.Children.only(this.props.children);
        if (!child.type.getFragmentNames) {
            return child;
        }
        return (
            <RelayRenderer
                Container={child.type}
                queryConfig={new MainRoute()}
                environment={Relay.Store}
                render={({props}) => this.renderChild(child, props)}
            />
        );
    }

    renderChild(child, props) {
        if (!props) {
            return (
                <View style={{height: 400}}>
                    {child.props.renderHeader && child.props.renderHeader()}
                    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator />
                    </View>
                </View>
            );
        }
        return React.cloneElement(child, {...this.props, ...props});
    }
}

class TabsListContainer extends React.Component {
    props: Props;
    state: State;
    _refs: Array<any>;
    _pinned: any;

    static defaultProps = {
        selectedSectionColor: 'white',
    };

    static contextTypes = {
        openDrawer: React.PropTypes.func,
        hasUnreadNotifications: React.PropTypes.number,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            idx: this.props.selectedSegment || 0,
            anim: new Animated.Value(0),
            stickyHeaderHeight: 0,
        };

        // console.log("Tabs List Container: " + JSON.stringify(this.state));

        (this: any).renderFakeHeader = this.renderFakeHeader.bind(this);
        (this: any).handleStickyHeaderLayout = this.handleStickyHeaderLayout.bind(this);
        (this: any).handleShowMenu = this.handleShowMenu.bind(this);
        (this: any).handleSelectSegment = this.handleSelectSegment.bind(this);
        this._refs = [];
    }

    render() {
        const segments = [];
        const content = React.Children.map(this.props.children, (child, idx) => {
            segments.push(child.props.title);
            return <RelayLoading>{React.cloneElement(child, {
                ref: (ref) => {
                    this._refs[idx] = ref;
                },
                onScroll: (e) => this.handleScroll(idx, e),
                style: styles.listView,
                showsVerticalScrollIndicator: false,
                scrollEventThrottle: 16,
                contentInset: {bottom: 49, top: 0},
                automaticallyAdjustContentInsets: false,
                renderHeader: this.renderFakeHeader,
                scrollsToTop: idx === this.state.idx,
            })}</RelayLoading>;
        });

        let {stickyHeader} = this.props;
        if (segments.length > 1) {
            stickyHeader = (
                <View>
                    <F8SegmentedControl
                        values={segments}
                        selectedIndex={this.state.idx}
                        selectionColor={this.props.selectedSectionColor}
                        onChange={this.handleSelectSegment}
                    />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={{height: 50, backgroundColor: this.props.backgroundColor}}>
                    {this.renderFloatingStickyHeader(stickyHeader)}
                </View>
                <ViewPager
                    count={segments.length}
                    selectedIndex={this.state.idx}
                    onSelectedIndexChange={this.handleSelectSegment}>
                    {content}
                </ViewPager>
            </View>
        );
    }

    renderParallaxContent() {
        if (Platform.OS === 'android') {
            return <View />;
        }
        return (
            <Text style={styles.parallaxText}>
                {this.props.title}
            </Text>
        );
    }

    handleScroll(idx: number, e: any) {
        if (idx !== this.state.idx) {
            return;
        }
        let y = 0;
        if (Platform.OS === 'ios') {
            this.state.anim.setValue(e.nativeEvent.contentOffset.y);
            const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
            y = Math.min(e.nativeEvent.contentOffset.y, height);
        }
        this._refs.forEach((ref, ii) => {
            if (ii !== idx && ref) {
                ref.scrollTo && ref.scrollTo({y, animated: false});
            }
        });

    }

    renderFakeHeader() {
        if (Platform.OS === 'ios') {
            const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
            return (
                <View style={{height}}/>
            );
        }
    }

    renderFixedStickyHeader(stickyHeader: ?ReactElement) {
        return Platform.OS === 'ios'
            ? <View style={{height: this.state.stickyHeaderHeight}}/>
            : stickyHeader;
    }

    renderFloatingStickyHeader(stickyHeader: ?ReactElement) {
        var opacity = this.state.stickyHeaderHeight === 0 ? 0 : 1;
        var transform;

        // If native pinning is not available, fallback to Animated
        if (!NativeModules.F8Scrolling) {
            var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
            var translateY = this.state.anim.interpolate({
                inputRange: [0, distance],
                outputRange: [distance, 0],
                extrapolateRight: 'clamp',
            });
            transform = [{translateY}];
        }

        return (
            <Animated.View
                ref={(ref) => {
                    this._pinned = ref;
                }}
                onLayout={this.handleStickyHeaderLayout}
                style={[styles.stickyHeader, {opacity}, {transform}]}>
                {stickyHeader}
            </Animated.View>
        );
    }

    handleStickyHeaderLayout({nativeEvent: {layout, target}}: any) {
        this.setState({stickyHeaderHeight: layout.height});
    }

    componentWillReceiveProps(nextProps: Props) {
        if (typeof nextProps.selectedSegment === 'number' &&
            nextProps.selectedSegment !== this.state.idx) {
            this.setState({idx: nextProps.selectedSegment});
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (!NativeModules.F8Scrolling) {
            return;
        }

        if (this.state.idx !== prevState.idx ||
            this.state.stickyHeaderHeight !== prevState.stickyHeaderHeight) {
            var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;

            if (this._refs[prevState.idx] && this._refs[prevState.idx].getScrollResponder) {
                const oldScrollViewTag = ReactNative.findNodeHandle(
                    this._refs[prevState.idx].getScrollResponder()
                );
                NativeModules.F8Scrolling.unpin(oldScrollViewTag);
            }

            if (this._refs[this.state.idx] && this._refs[this.state.idx].getScrollResponder) {
                const newScrollViewTag = ReactNative.findNodeHandle(
                    this._refs[this.state.idx].getScrollResponder()
                );
                const pinnedViewTag = ReactNative.findNodeHandle(this._pinned);
                NativeModules.F8Scrolling.pin(newScrollViewTag, pinnedViewTag, distance);
            }
        }
    }

    handleSelectSegment(idx: number) {
        if (this.state.idx !== idx) {
            const {onSegmentChange} = this.props;
            this.setState({idx}, () => onSegmentChange && onSegmentChange(idx));
        }
    }

    handleShowMenu() {
        this.context.openDrawer();
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerWrapper: {},
    listView: {},
    headerTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    parallaxText: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        letterSpacing: -1,
    },
    stickyHeader: {
        flex: 1
        // position: 'absolute',
        // top: F8Header.height,
        // left: 0,
        // right: 0,
    },
});

module.exports = TabsListContainer;
