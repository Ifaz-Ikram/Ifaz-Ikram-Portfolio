// This file re-exports from the main firebase.js for backwards compatibility
// All Firebase functionality is now centralized in firebase.js

import { db, storage, collection, addDoc, getDocs, query, orderBy } from './firebase';

export { db, storage, collection, addDoc, getDocs, query, orderBy };