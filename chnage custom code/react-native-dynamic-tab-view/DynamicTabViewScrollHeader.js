import React from 'react';
import {Button, TouchableHighlight, Text, FlatList, View} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../src/theme';
class DynamicTabViewScrollHeader extends React.Component {
  constructor(props) {
    super(props);

    this.defaultStyle = {
      headerStyle: {},
      tabItemText: {
        color: 'white',
      },
      tabItemContainer: {
        overflow: 'hidden',
        backgroundColor: '#555555',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      highlight: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginTop: 5,
      },
      noHighlight: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginTop: 5,
      },
    };
    this.state = {
      selected: this.props.selectedTab,
    };
  }

  _onPressHeader = index => {
    this.props.goToPage(index);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTab !== this.props.selectedTab) {
      this.setState({selected: nextProps.selectedTab});
    }
  }

  _renderTitle = ({item, index}) => {
    let isTabActive = index === this.state.selected;
    let fontWeight = isTabActive ? 'bold' : 'normal';

    //   if(this.props.user==false && item["title"] == "Downloads"){
    //  return null;
    //   }

    return (
      <TouchableHighlight
        onPress={this._onPressHeader.bind(this, index)}
        style={[
          this.defaultStyle.tabItemContainer,
          {backgroundColor: this.props.headerBackgroundColor},
        ]}
        underlayColor={'#00000033'}>
        <View>
          <Text
            style={[
              this.defaultStyle.tabItemText,
              [
                this.props.headerTextStyle,
                {
                  color: isTabActive ? theme.color.title : theme.color.subTitle,
                  fontFamily: theme.fonts.fontMedium,
                },
              ],
            ]}>
            {item['title']}
          </Text>
          {this._renderHighlight(isTabActive)}
        </View>
      </TouchableHighlight>
    );
  };

  _renderHighlight = showHighlight => {
    if (showHighlight) {
      return (
        <View
          style={[
            this.defaultStyle.highlight,
            this.props.highlightStyle,
            {backgroundColor: this.props.headerUnderlayColor},
          ]}
        />
      );
    } else {
      return (
        <View
          style={[this.defaultStyle.noHighlight, this.props.noHighlightStyle]}
        />
      );
    }
  };

  scrollHeader = index => {
    this.headerView.scrollToIndex({index, animated: true});
  };

  // DynamicdefaultStyle = {
  //   headerStyle: {},
  //   tabItemText: {
  //     color: "white"
  //   },
  //   tabItemContainer: {
  //     overflow: "hidden",
  //     backgroundColor: "#555555",
  //     padding: 20,
  //     justifyContent: "center",
  //     alignItems: "center"
  //   },
  //   highlight: {
  //     backgroundColor: "white",
  //     paddingHorizontal: 10,
  //     paddingVertical: 2,
  //     marginTop: 5
  //   },
  //   noHighlight: {
  //     paddingHorizontal: 10,
  //     paddingVertical: 2,
  //     marginTop: 5
  //   }
  // };

  render() {
    return (
      <FlatList
        horizontal
        alwaysBounceHorizontal={false}
        ref={headerView => {
          this.headerView = headerView;
        }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={this.props.data}
        extraData={this.state}
        renderItem={this._renderTitle}
        style={[
          this.defaultStyle.headerStyle,
          {backgroundColor: this.props.headerBackgroundColor},
        ]}
      />
    );
  }
}

DynamicTabViewScrollHeader.defaultProps = {
  selectedTab: 0,
  headerBackgroundColor: '#555555',
  headerUnderlayColor: '#00000033',
};

DynamicTabViewScrollHeader.propTypes = {
  goToPage: PropTypes.func.isRequired,
  selectedTab: PropTypes.number.isRequired,
  headerBackgroundColor: PropTypes.any,
  headerTextStyle: PropTypes.any,
  highlightStyle: PropTypes.any,
  noHighlightStyle: PropTypes.any,
  headerUnderlayColor: PropTypes.any,
};

export default DynamicTabViewScrollHeader;
