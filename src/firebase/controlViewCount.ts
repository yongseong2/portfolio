import { database } from '../firebaseConfig';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

async function getViewsCount(): Promise<number | null> {
  const docRef = doc(database, 'views', 'GAoXaCqt9JQ2BpEsFyFR');

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data?.count ?? null;
  } else {
    console.log('No such document!');
    return null;
  }
}

async function incrementViewsCount(): Promise<void> {
  const docRef = doc(database, 'views', 'GAoXaCqt9JQ2BpEsFyFR');

  try {
    await updateDoc(docRef, {
      count: increment(1),
    });
  } catch (error) {
    console.error('Error incrementing count: ', error);
  }
}

export { getViewsCount, incrementViewsCount };
