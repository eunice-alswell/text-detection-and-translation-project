import axios from 'axios';
import {API_KEY} from '@env';
import * as FileSystem from 'expo-file-system';

// const GOOGLE_CLOUD_VISION_API_KEY = '<YOUR_API_KEY>';

const detectTextFromImage = async (fileUri) => {
  const base64Image = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

  const requestData = {
    requests: [
      {
        image: {
          content: base64Image,
        },
        features: [
          {
            type: 'DOCUMENT_TEXT_DETECTION',
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(apiUrl, requestData);
    const textAnnotations = response?.data?.responses?.[0]?.textAnnotations;
    if (textAnnotations && textAnnotations.length > 0) {
      return textAnnotations[0].description;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error occurred during text detection:', error);
    return null;
  }
};

export { detectTextFromImage };
