import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import translate from 'google-translate-api';

import { detectTextFromImage } from './services/GoogleCloudService';

const TextExtractionScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState(null);
  const [translatedText, setTranslatedText] = useState(null);

  const selectFile = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const result = await DocumentPicker.getDocumentAsync({ type: 'image/*,application/pdf' });

    if (result.type === 'success') {
      const fileUri = result.uri;
      setSelectedFile(fileUri);
      processFile(fileUri);
    }
  };

  const processFile = async (fileUri) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });

      const extractedText = await detectTextFromImage(fileContent);
      setExtractedText(extractedText);

      if (extractedText) {
        const translatedText = await translate(extractedText, { to: 'fr' }); // Replace 'fr' with your desired target language
        setTranslatedText(translatedText.text);
      }
    } catch (error) {
      console.log('Error processing file: ', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Select File" onPress={selectFile} />
      {selectedFile && <Image source={{ uri: selectedFile }} style={{ width: 200, height: 200, marginVertical: 20 }} />}
      {extractedText && <Text>{extractedText}</Text>}
      {translatedText && <Text>{translatedText}</Text>}
    </View>
  );
};

export default TextExtractionScreen;
