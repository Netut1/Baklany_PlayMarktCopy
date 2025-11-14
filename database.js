// Примеры работы с базой данных Firestore

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './firebase-config.js';

// ========== CREATE (Создание) ==========

/**
 * Добавить новый документ в коллекцию
 * @param {string} collectionName - Имя коллекции
 * @param {object} data - Данные для добавления
 * @returns {Promise<string>} ID созданного документа
 */
export async function createDocument(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log('Документ создан с ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Ошибка при создании документа:', error);
    throw error;
  }
}

// ========== READ (Чтение) ==========

/**
 * Получить один документ по ID
 * @param {string} collectionName - Имя коллекции
 * @param {string} docId - ID документа
 * @returns {Promise<object|null>} Данные документа или null
 */
export async function getDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('Документ найден:', docSnap.id, docSnap.data());
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('Документ не найден');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при получении документа:', error);
    throw error;
  }
}

/**
 * Получить все документы из коллекции
 * @param {string} collectionName - Имя коллекции
 * @returns {Promise<Array>} Массив документов
 */
export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    console.log(`Найдено документов: ${documents.length}`);
    return documents;
  } catch (error) {
    console.error('Ошибка при получении документов:', error);
    throw error;
  }
}

/**
 * Получить документы с фильтрацией
 * @param {string} collectionName - Имя коллекции
 * @param {string} field - Поле для фильтрации
 * @param {string} operator - Оператор сравнения ('==', '>', '<', '>=', '<=', '!=', 'array-contains')
 * @param {any} value - Значение для сравнения
 * @returns {Promise<Array>} Массив отфильтрованных документов
 */
export async function getDocumentsWithFilter(collectionName, field, operator, value) {
  try {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    const documents = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    console.log(`Найдено документов с фильтром: ${documents.length}`);
    return documents;
  } catch (error) {
    console.error('Ошибка при фильтрации документов:', error);
    throw error;
  }
}

/**
 * Получить документы с сортировкой
 * @param {string} collectionName - Имя коллекции
 * @param {string} field - Поле для сортировки
 * @param {string} direction - Направление сортировки ('asc' или 'desc')
 * @param {number} limitCount - Максимальное количество документов
 * @returns {Promise<Array>} Массив отсортированных документов
 */
export async function getDocumentsSorted(collectionName, field, direction = 'asc', limitCount = null) {
  try {
    let q = query(collection(db, collectionName), orderBy(field, direction));
    
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    
    const querySnapshot = await getDocs(q);
    const documents = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    console.log(`Найдено документов: ${documents.length}`);
    return documents;
  } catch (error) {
    console.error('Ошибка при сортировке документов:', error);
    throw error;
  }
}

// ========== UPDATE (Обновление) ==========

/**
 * Обновить документ
 * @param {string} collectionName - Имя коллекции
 * @param {string} docId - ID документа
 * @param {object} data - Данные для обновления
 */
export async function updateDocument(collectionName, docId, data) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    console.log('Документ обновлен:', docId);
  } catch (error) {
    console.error('Ошибка при обновлении документа:', error);
    throw error;
  }
}

// ========== DELETE (Удаление) ==========

/**
 * Удалить документ
 * @param {string} collectionName - Имя коллекции
 * @param {string} docId - ID документа
 */
export async function deleteDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log('Документ удален:', docId);
  } catch (error) {
    console.error('Ошибка при удалении документа:', error);
    throw error;
  }
}


