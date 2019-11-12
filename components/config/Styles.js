import { StyleSheet, Dimensions } from 'react-native';

import Colors from './Colors';

export default Styles = StyleSheet.create({
  actionButtonIcon: {
    color: Colors.primary,
    fontSize: 20,
    height: 22
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary_text,
    alignItems: 'center',
    justifyContent: 'center'
  },

  container_intro: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    marginTop: 50,
    height: Math.round(Dimensions.get('window').width) * 0.5,
    width: Math.round(Dimensions.get('window').width) * 0.5
  },

  logo_sm: {
    marginTop: 50,
    height: Math.round(Dimensions.get('window').width) * 0.3,
    width: Math.round(Dimensions.get('window').width) * 0.3
  },

  instruction_image: {
    marginTop: 50,
    height: Math.round(Dimensions.get('window').width) * 0.7,
    width: Math.round(Dimensions.get('window').width) * 0.7
  },

  title: {
    color: Colors.primary,
    fontSize: 20,
    marginBottom: 15,
    marginTop: 25
  },

  title_intro: {
    color: Colors.primary_light,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 25
  },

  instruction_message: {
    color: Colors.primary_medium,
    fontSize: 15,
    margin: 10,
    textAlign: 'center'
  },

  primary_button: {
    borderRadius: 6,
    backgroundColor: Colors.primary,
    height: 50,
    justifyContent: 'center',
    margin: 20,
    padding: 18
  },

  primary_button_text: {
    alignSelf: 'center',
    color: Colors.primary_light,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  primary_text: {
    color: Colors.primary,
    fontSize: 15,
    margin: 10,
    textAlign: 'center'
  }
});
