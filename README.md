# Text Detection and Translation Project

## Overview

The Text Detection and Translation Project is a mobile application developed using React Native that allows users to extract text from images and translate it to their preferred language. The app leverages the Google Vision API for text detection and the Google Translate API for language translation.

## Features

- **Image Capture and Selection**: Users can either take a picture using the device's camera or choose an image from their phone gallery.

- **Text Detection**: The app utilizes the Google Vision API to detect text regions within the selected image.

- **Language Translation**: Once text is detected, users can press a button to translate the extracted text to their desired language using the Google Translate API.

## Installation and Setup

To run the app on your local environment, follow these steps:

1. Clone the repository from GitHub:

```
git clone https://github.com/eunice-alswell/text-detection-and-translation-project.git
```

2. Navigate to the project directory:

```
cd text-detection-and-translation-project
```

3. Install the project dependencies:

```
npm install
```

4. Create a config file (`config.js`) in the project root directory and add your Google Vision and Translate API keys:

```javascript
export const GOOGLE_VISION_API_KEY = 'YOUR_GOOGLE_VISION_API_KEY';
export const GOOGLE_TRANSLATE_API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
```

5. Start the development server:

```
npm start
```

6. Open the Expo Go app on your Android or iOS device and scan the QR code shown in the terminal to run the app.

## Usage

1. Launch the app on your device.

2. Press the "Pick image" button to select an image from your phone's gallery.

3. Once the image is selected, press the "Extract Text" button to detect text regions within the image.

4. After text detection, press the "Translate text" button to convert the extracted text to your preferred language.

## Contributions

Contributions to this project are welcome. If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## Credits

The Text Detection and Translation Project makes use of the following technologies and APIs:

- React Native: [https://reactnative.dev/](https://reactnative.dev/)
- Google Vision API: [https://cloud.google.com/vision](https://cloud.google.com/vision)
- Google Translate API: [https://cloud.google.com/translate](https://cloud.google.com/translate)

Please ensure you have the necessary permissions and API keys to use these services in your own applications.
