import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageViewer from './components/ImageViewer.js';
import Buttons from './components/Buttons.js';
import * as ImagePicker from 'expo-image-picker'
import CircleButton from './components/CircleButton.js';
import IconButton from './components/IconButton.js';

const PlaceholderImage = require('./assets/images/background-image.png')
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showOptions, setShowOptions] = useState(false)

  const onReset = () => {
    setShowOptions(false)
  }

  const onAddSticker = () => {

  }

  const onSaveImageAsync = () =>{

  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      quality:1,
    })
    if (!result.canceled){
      setSelectedImage(result.assets[0].uri)
      setShowOptions(true)
    }else{
      alert('You did not select an image')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
        </View>
        {showOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset}/>
              <CircleButton onPress={onAddSticker}/>
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
            </View>
          </View>
        ):(
        <View style={styles.footerContainer}>
          <Buttons theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
          <Buttons label="Use a photo" onPress={()=>setShowOptions(true)}/>
        </View>
        )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    flex: 1,
    paddingTop:58,
  },
  image: {
    width:320,
    height:440,
    borderRadius:18,
  },
  footerContainer:{
    flex: 1,
    alignItems: 'center',
    paddingTop:308,
  },
  optionsContainer:{
    position:'center',
    bottom:80,
  },
  optionsRow:{
    alignItems: 'center',
    flexDirection: 'row',
  },
});
