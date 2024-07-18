import { openDB } from 'idb';

const initdb = async () => openDB('textEditor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('textEditor')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('textEditor', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  const textEditorDb = await openDB('textEditor', 1);

  const tx = textEditorDb.transaction('textEditor', 'readwrite');

  const store = tx.objectStore('textEditor');

  const request = store.put({id:1, value:content});

  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Post to the database');

  const textEditorDb = await openDB('textEditor', 1);

  const tx = textEditorDb.transaction('textEditor', 'readonly');

  const store = tx.objectStore('textEditor');

  const request = store.get(1);

  const result = await request;
  console.log('Data saved to the database', result);
  return result?.vaule;
};

initdb();
