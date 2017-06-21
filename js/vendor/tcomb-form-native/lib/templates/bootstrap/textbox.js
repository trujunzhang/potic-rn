/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput
} from 'react-native'
const {width, height} = Dimensions.get('window')


function renderText(locals, textboxStyle, textBoxExtensionStyle) {
    if (locals.hidden) {
        return null;
    }

    var stylesheet = locals.stylesheet;
    var formGroupStyle = stylesheet.formGroup.normal;
    var controlLabelStyle = stylesheet.controlLabel.normal;
    var textboxViewStyle = stylesheet.textboxView.normal;
    var helpBlockStyle = stylesheet.helpBlock.normal;
    var errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        controlLabelStyle = stylesheet.controlLabel.error;
        textboxViewStyle = stylesheet.textboxView.error;
        helpBlockStyle = stylesheet.helpBlock.error;
    }

    if (locals.editable === false) {
        textboxViewStyle = stylesheet.textboxView.notEditable;
    }

    return (
        <TextInput
            style={[textboxStyle, textBoxExtensionStyle]}
            accessibilityLabel={locals.label}
            ref="input"
            autoCapitalize={locals.autoCapitalize}
            autoCorrect={locals.autoCorrect}
            autoFocus={locals.autoFocus}
            blurOnSubmit={locals.blurOnSubmit}
            editable={locals.editable}
            keyboardType={locals.keyboardType}
            maxLength={locals.maxLength}
            multiline={locals.multiline}
            onBlur={locals.onBlur}
            onEndEditing={locals.onEndEditing}
            onFocus={locals.onFocus}
            onLayout={locals.onLayout}
            onSelectionChange={locals.onSelectionChange}
            onSubmitEditing={locals.onSubmitEditing}
            onContentSizeChange={locals.onContentSizeChange}
            placeholderTextColor={locals.placeholderTextColor}
            secureTextEntry={locals.secureTextEntry}
            selectTextOnFocus={locals.selectTextOnFocus}
            selectionColor={locals.selectionColor}
            numberOfLines={locals.numberOfLines}
            underlineColorAndroid={locals.underlineColorAndroid}
            clearButtonMode={locals.clearButtonMode}
            clearTextOnFocus={locals.clearTextOnFocus}
            enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
            keyboardAppearance={locals.keyboardAppearance}
            onKeyPress={locals.onKeyPress}
            returnKeyType={locals.returnKeyType}
            selectionState={locals.selectionState}
            onChangeText={(value) => locals.onChange(value)}
            onChange={locals.onChangeNative}
            placeholder={locals.placeholder}
            value={locals.value}
        />
    )
}

function textbox(locals) {
    var textBoxExtensionStyle = locals.textBoxBoarderColor ?
        {borderColor: locals.textBoxBoarderColor} : {borderColor: '#cccccc'};

    var renderType = locals.renderType ? locals.renderType : 'default';

    if (locals.hidden) {
        return null;
    }


    var stylesheet = locals.stylesheet;
    var formGroupStyle = stylesheet.formGroup.normal;
    var controlLabelStyle = stylesheet.controlLabel.normal;
    var textboxStyle = stylesheet.textbox.normal;
    var textboxViewStyle = stylesheet.textboxView.normal;
    var helpBlockStyle = stylesheet.helpBlock.normal;
    var errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        controlLabelStyle = stylesheet.controlLabel.error;
        textboxStyle = stylesheet.textbox.error;
        textboxViewStyle = stylesheet.textboxView.error;
        helpBlockStyle = stylesheet.helpBlock.error;
    }

    if (locals.editable === false) {
        textboxStyle = stylesheet.textbox.notEditable;
        textboxViewStyle = stylesheet.textboxView.notEditable;
    }

    var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    var error = locals.hasError && locals.error ?
        <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

    if (renderType === 'default') {
        return (
            <View style={formGroupStyle}>
                {label}
                <View style={[textboxViewStyle]}>
                    {renderText(locals, textboxStyle, textBoxExtensionStyle)}
                </View>
                {help}
                {error}
            </View>
        );
    } else {
        return (
            <View style={[formGroupStyle, {
                width: width,
                height: 100,
                // marginTop: 4,
                paddingHorizontal: 20
            }, {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
            }]}>
                <View style={ {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                }}>
                    <View style={{flex: 2,}}>
                        {label}
                    </View>
                    <View style={{flex: 2}}>
                        {renderText(locals, textboxStyle, {borderColor: '#ffffff00'})}
                    </View>
                </View>
                <View style={{width: width, height: 1, backgroundColor: '#b5b5b5'}}/>
            </View>
        )
    }
}


module.exports = textbox;
