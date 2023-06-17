import React, { useState } from 'react';
import { View,Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { detectTextFromImage } from '../Services/TextDetectionService';
import { translateText } from '../Services/TranslationService';
import * as FileSystem from 'expo-file-system';

const TextExtractionScreen = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default language is English


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      const fileUri = result.uri;
      setImage(fileUri);
      extractText(fileUri);
    }
  };

  const extractText = async () => {
    if (image) {
      const extractedText = await detectTextFromImage(image);
      setExtractedText(extractedText);
    }
  };

  const handleTranslation = async () => {
    if (extractedText) {
      const translatedText = await translateText(extractedText, targetLanguage);
      setTranslatedText(translatedText);
    }
  };

  return (
    <View style= {styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text>Pick an image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <TouchableOpacity onPress={extractText}>
        <Text>Extract Text</Text>
      </TouchableOpacity>

      {extractText ? <Text>{JSON.stringify(extractedText)}</Text>:null}

      <TextInput
        placeholder='Enter target Language'
        value={targetLanguage}
        onChangeText={setTargetLanguage}
      />
      <TouchableOpacity onPress={handleTranslation}>
        <Text>Translate Text</Text>
      </TouchableOpacity>
      {translatedText? <Text>{translatedText}</Text>:null}
    </View>
    
  );
};

export default TextExtractionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
    alignItems: 'center',
    color: 'white',
    
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 50,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: 300,
  },
  whiteSheet: {
    width: '100%',
    height: '70%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#FFB319',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
})


