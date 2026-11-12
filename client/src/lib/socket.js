import { io } from 'socket.io-client';
import { auth } from './firebase.js';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

/** Connect to the chat server with a fresh ID token. Remember to call socket.disconnect(). */
export async function connectSocket() {
  const token = await auth.currentUser?.getIdToken();
  return io(API_URL, { auth: { token } });
}
