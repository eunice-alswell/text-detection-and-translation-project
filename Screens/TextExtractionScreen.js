import React, { useState } from 'react';
import { View,Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { detectTextFromImage } from '../Services/TextDetectionService';
import { translateText } from '../Services/TranslationService';

const TextExtractionScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default language is English

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to pick an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedFile(result.uri);
    }
  };

  const extractText = async () => {
    if (selectedFile) {
      const extractedText = await detectTextFromImage(selectedFile);
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
      {selectedFile && ( <Image source={{uri:selectedFile}}/>)}
      <TouchableOpacity onPress={extractText}>
        <Text>Extract Text</Text>
      </TouchableOpacity>

      {extractText ? <Text>{extractText}</Text>:null}

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


