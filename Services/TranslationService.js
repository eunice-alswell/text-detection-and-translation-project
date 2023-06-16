import axios from 'axios';
import {API_KEY} from '@env';
import * as FileSystem from 'expo-file-system';

// const GOOGLE_TRANSLATE_API_KEY = '<YOUR_API_KEY>';

const translateText = async (text, targetLanguage) => {
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  const requestData = {
    q: text,
    target: targetLanguage,
  };

  try {
    const response = await axios.post(apiUrl, requestData);
    const translatedText = response?.data?.data?.translations?.[0]?.translatedText;
    if (translatedText) {
      return translatedText;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error occurred during translation:', error);
    return null;
  }
};

export { translateText };
