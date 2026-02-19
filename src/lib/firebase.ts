import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDAWcimK1PpTwB3bVYwyCfF9e5DUd9v21E',
  authDomain: 'ai-compliance-platform-6b896.firebaseapp.com',
  projectId: 'ai-compliance-platform-6b896',
  storageBucket: 'ai-compliance-platform-6b896.firebasestorage.app',
  messagingSenderId: '83688215555',
  appId: '1:83688215555:web:071dd437976f9d0897aa36',
  measurementId: 'G-38BPB8ENRF'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
