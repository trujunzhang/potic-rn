import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    Dimensions,
    Platform,
    View,
    TextInput,
    TouchableOpacity,
    Animated,
} from 'react-native'
const {width, height} = Dimensions.get('window')

import Icon from 'react-native-vector-icons/MaterialIcons'
// import { filter, some, includes } from 'lodash/collection'
// import { debounce } from 'lodash/function'

const INITIAL_TOP = Platform.OS === 'ios' ? -80 : -60

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            input: '',
            show: props.showOnLoad,
            // top: new Animated.Value(props.showOnLoad ? 0 : INITIAL_TOP + props.heightAdjust),
            top: 0,
        }
    }

    getValue() {
        return this.state.input
    }

    show() {
        const {animate, animationDuration, clearOnShow} = this.props
        if (clearOnShow) {
            this.setState({input: ''})
        }
        this.setState({show: true})
        if (animate) {
            Animated.timing(
                this.state.top, {
                    toValue: 0,
                    duration: animationDuration,
                }
            ).start()
        } else {
            this.setState({top: new Animated.Value(0)})
        }
    }

    _handleX = () => {
        const {onX} = this.props
        this._clearInput()
        if (onX) onX()
    }

    _clearInput = () => {
        this.setState({input: ''})
        this._onChangeText('')
    }

    _onChangeText = (input) => {
        // const {handleChangeText, handleSearch, handleResults} = this.props
        // this.setState({input})
        // if (handleChangeText) {
        //   handleChangeText(input)
        // }
        // if (handleSearch) {
        //   handleSearch(input)
        // } else {
        //   debounce(() => {
        //     // use internal search logic (depth first)!
        //     if (handleResults) {
        //       const results = this._internalSearch(input)
        //       handleResults(results)
        //     }
        //   }, 500)()
        // }
    }

    _internalSearch = (input) => {
        const {data, allDataOnEmptySearch} = this.props
        // if (input === '') {
        //   return allDataOnEmptySearch ? data : []
        // }
        // return filter(data, (item) => {
        //   return this._depthFirstSearch(item, input)
        // })

        return []
    }

    _depthFirstSearch = (collection, input) => {
        // let's get recursive boi
        let type = typeof collection
        // base case(s)
        // if (type === 'string' || type === 'number' || type === 'boolean') {
        //   return includes(collection.toString().toLowerCase(), input.toString().toLowerCase())
        // }
        // return some(collection, (item) => this._depthFirstSearch(item, input))
        return []
    }

    render() {
        const {
            placeholder,
            heightAdjust,
            backgroundColor,
            iconColor,
            textColor,
            placeholderTextColor,
            onBack,
            hideBack,
            hideX,
            iOSPadding,
            iOSHideShadow,
            onSubmitEditing,
            onFocus,
            focusOnLayout,
            autoCorrect,
            autoCapitalize,
            fontFamily,
            backButton,
            backButtonAccessibilityLabel,
            closeButton,
            closeButtonAccessibilityLabel,
            backCloseSize,
            fontSize
        } = this.props

        return (
            <Animated.View style={[styles.container, {shadowOpacity: iOSHideShadow ? 0 : 0.7,}]}>
                {
                    <View style={[styles.navWrapper, {
                        backgroundColor: '#272c32',
                        width: width - 100,
                        borderRadius: 40 / 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }]}>
                        <View style={[styles.nav]}>
                            <View style={{width: 24}}/>

                            <Icon name='search'
                                  size={16}
                                  style={{backgroundColor: 'transparent', padding: 10, color: '#eebb09'}}/>


                            <TextInput
                                ref={(ref) => this.textInput = ref}
                                onLayout={() => focusOnLayout && this.textInput.focus()}
                                style={[
                                    styles.input,
                                    {
                                        paddingTop: 6,
                                        width: width - 140,
                                        marginLeft: 8,
                                        fontSize: 14,
                                        color: '#fff',
                                        fontFamily: fontFamily,
                                    }
                                ]}
                                onChangeText={(input) => this._onChangeText(input)}
                                onSubmitEditing={() => onSubmitEditing ? onSubmitEditing() : null}
                                onFocus={() => onFocus ? onFocus() : null}
                                placeholder={placeholder}
                                placeholderTextColor={placeholderTextColor}
                                value={this.state.input}
                                underlineColorAndroid='transparent'
                                returnKeyType='search'
                                autoCorrect={autoCorrect}
                                autoCapitalize='none'
                            />
                            <TouchableOpacity
                                accessible={true}
                                accessibilityComponentType='button'
                                accessibilityLabel={closeButtonAccessibilityLabel}
                                onPress={hideX || this.state.input === '' ? null : this._handleX}>
                                {
                                    (closeButton || true) ?
                                        <View style={{width: backCloseSize, height: backCloseSize}}>{closeButton}</View>
                                        : <Icon name={'close'}
                                                size={backCloseSize}
                                                style={{
                                                    color: hideX || this.state.input === '' ? backgroundColor : iconColor,
                                                    padding: heightAdjust / 2 + 10
                                                }}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </Animated.View>
        )
    }
}

SearchBar.propTypes = {
    data: PropTypes.array,
    placeholder: PropTypes.string,
    handleChangeText: PropTypes.func,
    handleSearch: PropTypes.func,
    handleResults: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onFocus: PropTypes.func,
    onHide: PropTypes.func,
    onBack: PropTypes.func,
    onX: PropTypes.func,
    backButton: PropTypes.object,
    backButtonAccessibilityLabel: PropTypes.string,
    closeButton: PropTypes.object,
    closeButtonAccessibilityLabel: PropTypes.string,
    backCloseSize: PropTypes.number,
    fontSize: PropTypes.number,
    heightAdjust: PropTypes.number,
    backgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    textColor: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    showOnLoad: PropTypes.bool,
    hideBack: PropTypes.bool,
    hideX: PropTypes.bool,
    iOSPadding: PropTypes.bool,
    iOSHideShadow: PropTypes.bool,
    clearOnShow: PropTypes.bool,
    clearOnHide: PropTypes.bool,
    focusOnLayout: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    fontFamily: PropTypes.string,
    allDataOnEmptySearch: PropTypes.bool,
}

SearchBar.defaultProps = {
    data: [],
    placeholder: 'Search',
    backButtonAccessibilityLabel: 'Navigate up',
    closeButtonAccessibilityLabel: 'Clear search text',
    heightAdjust: 0,
    backgroundColor: 'white',
    iconColor: 'gray',
    textColor: 'gray',
    placeholderTextColor: 'lightgray',
    animate: true,
    animationDuration: 200,
    showOnLoad: false,
    hideBack: false,
    hideX: false,
    iOSPadding: true,
    iOSHideShadow: false,
    clearOnShow: false,
    clearOnHide: true,
    focusOnLayout: true,
    autoCorrect: true,
    autoCapitalize: 'sentences',
    fontFamily: 'System',
    allDataOnEmptySearch: false,
    backCloseSize: 18,
    fontSize: 20
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // zIndex: 10,
        position: 'absolute',
        elevation: 2,
        shadowRadius: 5,
    },
    navWrapper: {
        width: Dimensions.get('window').width,
    },
    nav: {
        ...Platform.select({
            android: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: StyleSheet.hairlineWidth,
            },
        }),
        flex: 1,
        // flexBasis: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        ...Platform.select({
            ios: {height: 30},
            android: {height: 50},
        }),
        width: Dimensions.get('window').width - 120,
    }
})

module.exports = SearchBar
export default SearchBar

