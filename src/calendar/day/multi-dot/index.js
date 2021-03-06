/* @flow */
import React, { Component } from "react"
import { TouchableOpacity, Text, View } from "react-native"

import { shouldUpdate } from "../../../component-updater"

import styleConstructor from "./style"

type Props = {
  // TODO: disabled props should be removed
  state?: "disabled" | "today" | "",
  // Specify theme properties to override specific styles for calendar parts. Default = {}
  theme?: Object,
  marking?: any,
  onPress?: Function,
  onLongPress?: Function,
  date?: Object
}

class Day extends Component {
  constructor(props: Props) {
    super(props)
    this.style = styleConstructor(props.theme)
    this.onDayPress = this.onDayPress.bind(this)
    this.onDayLongPress = this.onDayLongPress.bind(this)
  }

  props: Props

  onDayPress() {
    this.props.onPress(this.props.date)
  }

  onDayLongPress() {
    this.props.onLongPress(this.props.date)
  }

  shouldComponentUpdate(nextProps) {
    return shouldUpdate(this.props, nextProps, [
      "state",
      "children",
      "marking",
      "onPress",
      "onLongPress"
    ])
  }

  renderDots(marking) {
    const baseDotStyle = [this.style.dot, this.style.visibleDot]
    if (
      marking.dots &&
      Array.isArray(marking.dots) &&
      marking.dots.length > 0
    ) {
      // Filter out dots so that we we process only those items which have key and color property
      const validDots = marking.dots.filter(d => d && d.color)
      return validDots.map((dot, index) => {
        return (
          <View
            key={dot.key ? dot.key : index}
            style={[
              baseDotStyle,
              {
                backgroundColor:
                  marking.selected && dot.selectedDotColor
                    ? dot.selectedDotColor
                    : dot.color
              }
            ]}
          />
        )
      })
    }
    return
  }

  render() {
    const containerStyle = [this.style.base]
    const textStyle = [this.style.text]

    const marking = this.props.marking || {}
    const dot = this.renderDots(marking)

    if (marking.selected) {
      containerStyle.push(this.style.selected)
      textStyle.push(this.style.selectedText)
      if (marking.selectedColor) {
        containerStyle.push({ backgroundColor: marking.selectedColor })
      }
    } else if (
      typeof marking.disabled !== "undefined"
        ? marking.disabled
        : this.props.state === "disabled"
    ) {
      textStyle.push(this.style.disabledText)
    } else if (this.props.state === "today") {
      containerStyle.push(this.style.today)
      textStyle.push(this.style.todayText)
    }
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}
      >
        <Text allowFontScaling={false} style={textStyle}>
          {String(this.props.children)}
        </Text>
        <View style={{ flexDirection: "row" }}>{dot}</View>
      </TouchableOpacity>
    )
  }
}

export default Day
