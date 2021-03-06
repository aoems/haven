import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash';
import { findNodeHandle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Header from '../molecules/Header';
import RatingInput from '../atoms/RatingInput';
import CheckBox from '../atoms/CheckBox';
import { primaryTextColor, linkTextColor, borderColor } from '../commonColors';
import NavCloseButton from '../atoms/NavCloseButton';
import { OBLightModal } from './OBModal';
import LinkText from '../atoms/LinkText';
import TextArea from '../atoms/TextArea';

const styles = {
  scrollview: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 17,
  },
  done: {
    fontSize: 15,
    color: linkTextColor,
    textAlign: 'right',
  },
  inputText: {
    fontWeight: 'normal',
    flex: 1,
    fontSize: 15,
    color: primaryTextColor,
    borderBottomWidth: 1,
    borderColor,
    paddingVertical: 12,
    marginTop: 12,
    height: 138,
  },
};

export default class RatingModal extends PureComponent {
  state = {
    overall: 0,
    quality: 0,
    description: 0,
    deliverySpeed: 0,
    customerService: 0,
    review: '',
    anonymous: false,
  };

  handleChange = key => (value) => {
    const dict = {};
    dict[key] = value;
    this.setState({ ...dict });
  };

  scrollToInput(reactNode) {
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  handleFocus = (event) => {
    this.scrollToInput(findNodeHandle(event.target));
  }

  render() {
    const {
      show, order, hideModal, finishReview,
    } = this.props;
    const {
      overall,
      quality,
      description,
      deliverySpeed,
      customerService,
      review,
      anonymous,
    } = this.state;
    return (
      <OBLightModal visible={show} animationType="slide">
        <Header
          modal
          left={<NavCloseButton />}
          onLeft={hideModal}
          right={<LinkText text="Done" color={linkTextColor} />}
          onRight={() => finishReview(order.orderId, [{ slug: order.slug, ...this.state }])}
        />
        <KeyboardAwareScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.content}
          innerRef={(ref) => {
            this.scroll = ref;
          }}
        >
          <RatingInput
            title="Overall"
            value={overall}
            onPress={this.handleChange('overall')}
          />
          <RatingInput
            title="Quality"
            value={quality}
            onPress={this.handleChange('quality')}
          />
          <RatingInput
            title="As advertised"
            value={description}
            onPress={this.handleChange('description')}
          />
          <RatingInput
            title="Delivery"
            value={deliverySpeed}
            onPress={this.handleChange('deliverySpeed')}
          />
          <RatingInput
            title="Service"
            value={customerService}
            onPress={this.handleChange('customerService')}
          />
          <TextArea
            style={styles.inputText}
            noBorder
            value={review}
            onChangeText={this.handleChange('review')}
            placeholder="Write a review here"
            onFocus={this.handleFocus}
          />
          <CheckBox
            checked={anonymous}
            title="Post anonymously"
            onPress={() => {
              this.setState({
                anonymous: !anonymous,
              });
            }}
          />
        </KeyboardAwareScrollView>
      </OBLightModal>
    );
  }
}
