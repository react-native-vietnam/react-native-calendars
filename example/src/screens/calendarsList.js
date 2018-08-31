/* @flow */
import React, { Component } from 'react';

import {CalendarList} from 'react-native-calendars';

type Props = {};

export default class CalendarsList extends Component {
  constructor(props: Props) {
    super(props);
  }

  props: Props;

  render() {
    return (
      <CalendarList current={'2012-05-16'} pastScrollRange={24} futureScrollRange={24} />
    );
  }
}
