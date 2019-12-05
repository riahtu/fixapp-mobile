/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useRef } from 'react';
import
{
  View,
  StyleSheet,
  Animated,
  Text,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Modalize from 'react-native-modalize';
import { Portal } from 'react-native-paper';

import Layout from './../constants/Layout'
import AuthHeader from '../components/Headers/AuthHeader';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import SignInWithPhoneModal from '../components/Auth/SignInWithPhoneModal';

const backgroundImage = require('../assets/images/background_image.png')
const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    marginTop: 30,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text_input: {
    width: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: 5,
  },
});

const AuthScreen = ({ navigation }) => {
  const [signInActive, setSignInActive] = useState(true);
  const modalRef = useRef(Modalize);

  useEffect(() => {
    navigation.setParams({ signInActive, setSignInActive });
  }, [signInActive]);

  const onOpen = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.open();
    }
  };

  const onClose = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.close();
    }
  };

  const width = Layout.window.width;
  const height = Layout.window.height;

  return (
        <View style={styles.container}>
          <Portal>
            <Modalize
              ref={modalRef}
              modalHeight={Layout.window.height / 1.5}
              snapPoint={Layout.window.height / 2}
              keyboardAvoidingBehavior='position'
            >
              <SignInWithPhoneModal />
            </Modalize>
          </Portal>
          {
            signInActive ? <SignIn onOpen={onOpen} /> : <SignUp />
          }
          <View style={{width, height: height / 5, position:'absolute', bottom:0}}>
            <ImageBackground source={backgroundImage} style={{flex:1, opacity:0.5}}/>
          </View>
        </View>
  );
};

AuthScreen.navigationOptions = ({ navigation }) => {
  const signInActive = navigation.getParam('signInActive');
  const setSignInActive = navigation.getParam('setSignInActive');
  return({
    header: <AuthHeader signInActive={signInActive} setSignInActive={setSignInActive} />,
  })
};

export default withNavigation(AuthScreen);
