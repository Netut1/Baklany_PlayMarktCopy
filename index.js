// Пример использования базы данных Firebase

import {
  createDocument,
  getDocument,
  getAllDocuments,
  getDocumentsWithFilter,
  getDocumentsSorted,
  updateDocument,
  deleteDocument
} from './database.js';

async function main() {
  try {
    console.log('=== Примеры работы с Firebase Firestore ===\n');

    // Пример 1: Создание документа
    console.log('1. Создание документа...');
    const userId = await createDocument('users', {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      age: 30,
      createdAt: new Date()
    });
    console.log('Создан пользователь с ID:', userId);
    console.log('');

    // Пример 2: Получение документа по ID
    console.log('2. Получение документа по ID...');
    const user = await getDocument('users', userId);
    console.log('Пользователь:', user);
    console.log('');

    // Пример 3: Обновление документа
    console.log('3. Обновление документа...');
    await updateDocument('users', userId, {
      age: 31,
      updatedAt: new Date()
    });
    console.log('');

    // Пример 4: Получение всех документов
    console.log('4. Получение всех документов...');
    const allUsers = await getAllDocuments('users');
    console.log('Все пользователи:', allUsers);
    console.log('');

    // Пример 5: Фильтрация документов
    console.log('5. Фильтрация документов...');
    const youngUsers = await getDocumentsWithFilter('users', 'age', '<=', 25);
    console.log('Молодые пользователи:', youngUsers);
    console.log('');

    // Пример 6: Сортировка документов
    console.log('6. Сортировка документов...');
    const sortedUsers = await getDocumentsSorted('users', 'age', 'desc', 10);
    console.log('Отсортированные пользователи:', sortedUsers);
    console.log('');

    // Пример 7: Удаление документа (раскомментируйте, если нужно)
    // console.log('7. Удаление документа...');
    // await deleteDocument('users', userId);
    // console.log('');

  } catch (error) {
    console.error('Ошибка в main:', error);
  }
}

// Запуск примера
main();

