var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Slider
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star3: [],
      star2: [],
      star1: [],
      image: null,
      modalVisible: false,
      value: 3
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.setImage = this.setImage.bind(this);
    this.putImageIntoList = this.putImageIntoList.bind(this);
  }

  putImageIntoList() {
    this.setState({
      ['star' + this.state.value]: [...this.state['star' + this.state.value], this.state.image],
      modalVisible: false,
      value: 3
    });
  }

  takePhoto() {
    ImagePicker.launchCamera({ noData: true }, this.setImage);
  }

  chooseImage() {
    ImagePicker.launchImageLibrary({ noData: true }, this.setImage);
  }

  setImage(response) {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      //If it is iOS, remove 'file://' prefix
      let source = { uri: response.uri.replace('file://', ''), isStatic: true };

      //If android, don't need to remove the 'file://'' prefix
      if (Platform.OS === 'android') {
        source = { uri: response.uri, isStatic: true };
      }

      this.setState({ image: source, modalVisible: true });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
        >
          <View style={styles.modal}>
            <View>
              <TouchableOpacity style={styles.closeButton}
                onPress={() => this.setState({ modalVisible: false })}>
                <Text>X</Text>
              </TouchableOpacity>
              <Text>Please select coolness of this picture.</Text>
              <Text style={styles.headerText}>{this.state.value}</Text>
              <Slider maximumValue={3} minimumValue={1} step={1} value={3}
                onValueChange={(value) => this.setState({ value: value })}></Slider>
              <TouchableOpacity style={styles.submitButton} onPress={() => {
                this.putImageIntoList();
              }}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ flex: 1, paddingTop: 22 }}>
          <View style={styles.title}><Text style={styles.titleText}>3 Stars</Text></View>
          <View style={styles.row}>
            {this.state.star3.map((source, i) => <Image key={"star3-" + i}
              style={styles.image} source={source}></Image>)}
          </View>
          <View style={styles.title}><Text style={styles.titleText}>2 Stars</Text></View>
          <View style={styles.row}>
            {this.state.star2.map((source, i) => <Image key={"star2-" + i}
              style={styles.image} source={source}></Image>)}
          </View>
          <View style={styles.title}><Text style={styles.titleText}>1 Star</Text></View>
          <View style={styles.row}>
            {this.state.star1.map((source, i) => <Image key={"star1-" + i}
              style={styles.image} source={source}></Image>)}
          </View>
        </View>
        <View style={styles.rowCenter}>
          <TouchableOpacity style={styles.button} onPress={this.takePhoto}>
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.chooseImage}>
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  button: {
    backgroundColor: 'gray',
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  buttonText: {
    color: 'white'
  },
  modal: {
    height: 200,
    width: 300,
    marginTop: 200,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: 'darkblue',
    width: 100,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  headerText: {
    fontSize: 20,
    alignSelf: 'center'
  },
  title: {
    backgroundColor: 'gray',
    padding: 5
  },
  titleText: {
    color: 'white'
  }
});
