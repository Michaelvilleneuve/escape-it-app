import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  LayoutAnimation
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import React, { Component } from 'react';

export default class EscapeIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  changedId(id) {
    this.setState({ id, name: '', description: '' });
  }

  componentDidMount() {
    setInterval(this.fetchGameData.bind(this), 1000);
  }

  fetchGameData() {
    if (this.state.id === '') return false;
    fetch(`https://escape-it.herokuapp.com/games/${this.state.id}.json`)
      .then(res => res.json())
      .then((res) => {
        if (!res) return false;
        this.setState({ name: res.name, description: res.description });
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputC}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('./assets/logo.png')}
          />
          <Text style={styles.logoT}>Escape'it {this.state.id ?
            `jeu n°${this.state.id}`
            : null}</Text>
        </View>
        <View style={styles.welcome}>
            <Text style={styles.welcomeText}>
              {this.state.name || "Vous reçevrez les prochaines instructions ici..."}
            </Text>
        </View>
        <Text style={styles.instructions}>
          {this.state.description}
        </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#FFF"
          placeholder="Id du jeu"
          keyboardType="numeric"
          onChangeText={this.changedId.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
  },
  logoT: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    bottom: 10
  },
  title: {
    fontSize: 30,
    color: '#FFF',
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    color: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#FFF',
    position: 'absolute',
    top: 0,
    height: 70,
    padding: 20,
    backgroundColor: 'rgba(255,255,255, 0.2)',
    width: Dimensions.get('window').width,
  },
  inputC: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: 80,
    padding: 10,
    bottom: 100,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: '800',
    color: '#FFF'
  },
  welcome: {
    padding: 20,
    bottom: 100,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFF',
    bottom: 100,
    marginBottom: 5,
  },
});
