import { ImageAnnotatorClient } from '@google-cloud/vision';
// import {CREDENTIALS} from '@env';
import * as FileSystem from 'expo-file-system';

const CREDENTIALS = JSON.parse(JSON.stringify({
  "type": "service_account",
  "project_id": "text-detected-app",
  "private_key_id": "e1ed31596b103ca327d1db8c93723fe07658307e",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrVzCW3MpC4Z77\n4pF55xxWE/c9U2Hm/9N37tCJLGqIxy3Y3SlVFcow6beGlib06oqwfW5I6AQz7kIB\n/zLzSAFIAs0taBi6j3T+tkzugHObd7HXEVsBkb3etr/t1zjX98Wxk8DLasBMH+PQ\nOGuVYLxpN66sHsJVK4oBPW5Kmzb8bRqetGNx3Z39Vldm3Mvau3YByyip2leggb3D\n0TDrDKXUWoXGuH2t6A1sRmjSjuQrraB62E4x1BV6mRXinWumGil1Up3X4IMR8PL0\naY9QymRzOUfMNSkFCHMx4CtVbeQvM8KPaaSg64uBK2jQhsrQ70T+7xKLntsmGTTN\ny4nBa5kDAgMBAAECggEAGkOtQRLrNkFbm4Tpg+Q3ZcJ9vbrQYRaKFfJXqQ9T7U+K\n6ZlNQquqaMEKzuipZBWn2NIBW8+lBUjaeW/jIYPCHoW/adxxHffrmTfcpxqtngFF\nE5CngKAUmNUuqoi5P/HNLiFWBliAzap9w2dCpo1DlGVisyOr6l5YM0R1aZ5NWXgn\nzBwK1+DVv9xqbZ9rUjBS5Q+3o+jZFdUScFDa00Xwoc2UBsXqIfsCtww98P8Kzdgy\nYTo2lXLaI9AOEz+5rElBBV5O7FCg50W5s4ipfoeuHq1CcUtTbq+tv6N6RIHUS74U\n5REo+CgrrxOWofhfq18B1qsfFa3pRwE3yzAfAivwwQKBgQDTs9CaLUEnJpMcI68W\nmJwPo0KLcU2jc0SmLkWY2VFkF1juLgn5th4JpQHduB+M1ggs5ey0e9f3RgyRJ9sg\naAw3MibLujIOScQ1stIZD0PS5tfMB6ik66LxQ0gbNQlg3b+hqcefieXgRZkdELp8\nV6KvjU4bGebMKBGUhQy1O4PCEwKBgQDPMVQJ/w0olsvwcam78dxnTWTEeVB89rOU\nhC8dCP8yQFbPmT5rTaMPMXShMNWvYWTSSle0BImBxmhI6eg9YSVofJNTCv0QoxtV\n0KSIrNRGQ1zrRCwsLu03vlltwCrMqyS1On04yVJTO/9rqjbIY9NOTeCg/HkKbtrb\nphDHHJYrUQKBgQC/YyCDQcZVDpqQJfJ0CyOLP505UwVNbzfwxIRG2rCqPDE5ooWC\nKxKcxYAaYgqj2Bsr+/EyeYOVGM7jq5R+h5IDlGNeasY2BJpNsYwe+53lXKxa19Gu\nxxhX5OubLSd9WvuTu1ms8Y3QYxs5G5Z8Mv3wl161QYVVrCO4kVAbx+Il4QKBgDpZ\n4Rojm3gX5/2idTP6LKFnOX7fz5wx+mdURtR9iSmE1y4GMX8U0VxhCECxOSz4V+Wl\njEelk3haAVqvjXlj154yn2cezCCYXwVvCjd3vRzAsfWMMIiM+r/dOuBe427asC7d\n9xA8GpRYbFnNCTqsaoE+C4orMIeQqtB7V3RMB7rRAoGABRjaggGZ0pDuJE1jj7ss\nGjejHIxwEUfGqUwKWngqS4InLiq8yvD/iU/QPmPz/ckWhCfKjG6g9H101fz4d/bk\nZ8Jql3VYMEDKOh8zKkyEkp32+g1N+4Wvf+b6aHBBgfOvbC8i7oGL9kASvROIOaAp\nHkvqqGSbK4H8QR2gIaJ2s44=\n-----END PRIVATE KEY-----\n",
  "client_email": "text-detector-app@text-detected-app.iam.gserviceaccount.com",
  "client_id": "110183685312573902333",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/text-detector-app%40text-detected-app.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}))

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email
  }
}

const detectTextFromImage = async (imageContent) => {

  
  const client = new ImageAnnotatorClient(CONFIG);

  const [result] = await client.textDetection('text-DT-app/hii.PNG');

  const [annotation] = result.textAnnotations;

  if (annotation) {
    console.log(annotation)
    // return annotation.description;
  } else {
    return null;
  }
};

export { detectTextFromImage };
