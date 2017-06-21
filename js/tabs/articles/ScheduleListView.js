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
 */
'use strict';

var F8SessionCell = require('F8SessionCell');
var Navigator = require('Navigator');
var React = require('React');
var PureListView = require('../../common/PureListView');

import type {Session} from '../../reducers/sessions';

type Props = {
    day: number;
    sessions: Array<Session>;
    navigator: Navigator;
    renderEmptyList?: (day: number) => ReactElement;
};


class ScheduleListView extends React.Component {
    props: Props;
    state: State;
    _innerRef: ?PureListView;

    constructor(props: Props) {
        super(props);
        this.state = {
            todaySessions: [],
        };

        this._innerRef = null;

        // (this: any).renderCompanyHeader = this.renderCompanyHeader.bind(this);
        // (this: any).renderRow = this.renderRow.bind(this);
        // (this: any).renderEmptyList = this.renderEmptyList.bind(this);
        // (this: any).storeInnerRef = this.storeInnerRef.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.sessions !== this.props.sessions ||
            nextProps.day !== this.props.day) {
            this.setState({
                todaySessions: [],
            });
        }
    }

    renderCompanyHeader() {
        return null
    }

    render() {
        return (
            <PureListView
                ref={this.storeInnerRef.bind(this)}
                data={this.state.todaySessions}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderCompanyHeader.bind(this)}
                {...(this.props: any /* flow can't guarantee the shape of props */)}
                renderEmptyList={this.renderEmptyList.bind(this)}
            />
        );
    }

    renderSectionHeader(sectionData: any, sectionID: string) {
        return <View/>
    }

    renderRow(session: Session, day: number) {
        return (
            <F8SessionCell
                onPress={() => this.openSession(session, day)}
                session={session}
            />
        );
    }

    renderEmptyList(): ?ReactElement {
        const {renderEmptyList} = this.props;
        return renderEmptyList && renderEmptyList(this.props.day);
    }

    openSession(session: Session, day: number) {
        this.props.navigator.push({
            day,
            session,
            allSessions: this.state.todaySessions,
        });
    }

    storeInnerRef(ref: ?PureListView) {
        this._innerRef = ref;
    }

    scrollTo(...args: Array<any>) {
        this._innerRef && this._innerRef.scrollTo(...args);
    }

    getScrollResponder(): any {
        return this._innerRef && this._innerRef.getScrollResponder();
    }
}

module.exports = ScheduleListView;
