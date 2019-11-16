import { StyleSheet, Dimensions } from 'react-native';

import Colors from './Colors';

export default Styles = StyleSheet.create({
  actionButtonIcon: {
    color: Colors.primary,
    fontSize: 20,
    height: 22
  },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
    padding: 18
  },

  button_text: {
    alignSelf: 'center',
    color: Colors.primary_light,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },

  card: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.primary_light,
    borderColor: Colors.primary,
    borderRadius: 15,
    borderWidth: 1,
    width: Math.round(Dimensions.get('window').width) * 0.95,
    margin: 5,
    padding: 10
  },

  card_title: {
    color: Colors.primary,
    fontSize: 25,
    marginBottom: 10,
    marginTop: 10
  },

  card_body: {
    color: Colors.primary_dark,
    fontSize: 15,
    marginBottom: 5
  },

  card_play: {
    color: Colors.primary,
    fontSize: 20,
    position: 'absolute',
    bottom: 10,
    right: 10
  },

  container: {
    flex: 1,
    alignItems: 'center'
  },

  container_intro: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },

  form_container: {
    position: 'absolute',
    bottom: 0
  },

  logo: {
    marginTop: 50,
    height: Math.round(Dimensions.get('window').width) * 0.5,
    width: Math.round(Dimensions.get('window').width) * 0.5
  },

  logo_sm: {
    marginTop: 50,
    height: Math.round(Dimensions.get('window').width) * 0.4,
    width: Math.round(Dimensions.get('window').width) * 0.4
  },

  header: {
    backgroundColor: Colors.primary,
    justifyContent: 'center'
  },

  header_icon: {
    color: Colors.primary_light
  },

  instruction_image: {
    marginTop: 50,
    height: Math.round(Dimensions.get('window').width) * 0.7,
    width: Math.round(Dimensions.get('window').width) * 0.7
  },

  input: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 6,
    color: '#000',
    height: 40,
    width: Math.round(Dimensions.get('window').width) * 0.9,
    marginBottom: 10,
    paddingHorizontal: 10
  },

  instruction_message: {
    color: Colors.primary_medium,
    fontSize: 15,
    margin: 10,
    textAlign: 'center'
  },

  modal: {
    justifyContent: 'flex-start',
    borderRadius: 25,
    height: Math.round(Dimensions.get('window').height) * 0.5,
    shadowRadius: 10,
    width: Math.round(Dimensions.get('window').width) * 0.85
  },

  modal_body: {
    margin: 20
  },

  modal_button: {
    color: Colors.primary_light,
    fontSize: 20,
    height: 22
  },

  modal_input: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 6,
    color: '#000',
    height: 40,
    width: Math.round(Dimensions.get('window').width) * 0.85 * 0.9,
    marginBottom: 10,
    paddingHorizontal: 10
  },

  modal_text: {
    color: Colors.primary_dark,
    fontSize: 18,
    marginBottom: 5
  },

  modal_title: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20
  },

  primary_text: {
    color: Colors.primary,
    fontSize: 15,
    margin: 10,
    textAlign: 'center'
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
  scroll: {
    width: Math.round(Dimensions.get('window').width),
    alignItems: 'center'
  }
});
