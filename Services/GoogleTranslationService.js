import { Translate } from '@google-cloud/translate';
import { CREDENTIALS } from '@env';

const ServiceCredentials = JSON.parse(CREDENTIALS);
const translateText = async (text, targetLanguage) => {
  const translate = new Translate(
    credentials = ServiceCredentials,
    projectId = ServiceCredentials.project_id
  );

  try {
    const [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.log('Translation Error:', error);
    return text; // Return original text if translation fails
  }
};

export { translateText };
