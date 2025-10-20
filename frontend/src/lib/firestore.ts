import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Artifact {
  id?: string;
  userId: string;
  imageUrl: string;
  processedImageUrl?: string;
  name: string;
  description?: string;
  origin?: string;
  era?: string;
  conditionScore?: number;
  processingType?: 'super-resolution' | 'restoration' | 'none';
  metadata?: Record<string, any>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ChatMessage {
  id?: string;
  userId: string;
  artifactId?: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  createdAt: Timestamp;
}

// Artifact operations
export const createArtifact = async (artifact: Omit<Artifact, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, 'artifacts'), {
      ...artifact,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.warn('Could not save artifact to Firestore:', error);
    throw new Error('Failed to save artifact. Firebase not fully configured.');
  }
};

export const getArtifact = async (id: string): Promise<Artifact | null> => {
  const docRef = doc(db, 'artifacts', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Artifact;
  }
  return null;
};

export const getUserArtifacts = async (userId: string): Promise<Artifact[]> => {
  try {
    const q = query(
      collection(db, 'artifacts'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Artifact));
  } catch (error) {
    console.error('Error fetching user artifacts:', error);
    return []; // Return empty array if error
  }
};

export const updateArtifact = async (id: string, data: Partial<Artifact>): Promise<void> => {
  const docRef = doc(db, 'artifacts', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

export const deleteArtifact = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'artifacts', id));
};

// Chat operations
export const createChatMessage = async (
  message: Omit<ChatMessage, 'id' | 'createdAt'>
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'chatMessages'), {
      ...message,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.warn('Could not save message to Firestore:', error);
    return 'local-only'; // Return dummy ID, app continues to work
  }
};

export const getUserChatHistory = async (userId: string, limitCount: number = 50): Promise<ChatMessage[]> => {
  try {
    const q = query(
      collection(db, 'chatMessages'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage)).reverse();
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return []; // Return empty array if error
  }
};

// Admin operations
export const getAllArtifacts = async (): Promise<Artifact[]> => {
  try {
    const q = query(collection(db, 'artifacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Artifact));
  } catch (error) {
    console.warn('Could not fetch artifacts from Firestore:', error);
    return [];
  }
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn('Could not fetch users from Firestore:', error);
    return [];
  }
};


