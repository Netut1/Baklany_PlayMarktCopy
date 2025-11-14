# Firebase Firestore База данных

Проект для работы с базой данных Firebase Firestore.

## Установка

1. Установите зависимости:
```bash
npm install
```

## Настройка Firebase

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/)

2. В консоли Firebase:
   - Перейдите в **Project Settings** (⚙️)
   - В разделе **Your apps** выберите веб-приложение (или создайте новое)
   - Скопируйте конфигурацию Firebase

3. Откройте файл `firebase-config.js` и замените значения:
   - `YOUR_API_KEY` - ваш API ключ
   - `YOUR_PROJECT_ID` - ID вашего проекта
   - `YOUR_MESSAGING_SENDER_ID` - ID отправителя сообщений
   - `YOUR_APP_ID` - ID приложения

4. Настройте правила безопасности в Firebase Console:
   - Перейдите в **Firestore Database** > **Rules**
   - Для разработки можно использовать:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.time < timestamp.date(2025, 12, 31);
       }
     }
   }
   ```
   ⚠️ **Внимание**: Эти правила разрешают всем читать и писать. Для продакшена настройте правила безопасности!

## Использование

### Основные функции

Все функции находятся в файле `database.js`:

#### Создание документа
```javascript
import { createDocument } from './database.js';

const docId = await createDocument('users', {
  name: 'Иван',
  email: 'ivan@example.com',
  age: 30
});
```

#### Получение документа
```javascript
import { getDocument } from './database.js';

const user = await getDocument('users', 'document-id');
```

#### Получение всех документов
```javascript
import { getAllDocuments } from './database.js';

const allUsers = await getAllDocuments('users');
```

#### Фильтрация документов
```javascript
import { getDocumentsWithFilter } from './database.js';

// Найти всех пользователей старше 25 лет
const users = await getDocumentsWithFilter('users', 'age', '>', 25);
```

#### Сортировка документов
```javascript
import { getDocumentsSorted } from './database.js';

// Получить 10 самых старых пользователей
const users = await getDocumentsSorted('users', 'age', 'desc', 10);
```

#### Обновление документа
```javascript
import { updateDocument } from './database.js';

await updateDocument('users', 'document-id', {
  age: 31,
  updatedAt: new Date()
});
```

#### Удаление документа
```javascript
import { deleteDocument } from './database.js';

await deleteDocument('users', 'document-id');
```

## Запуск примера

Раскомментируйте вызов `main()` в файле `index.js` и запустите:

```bash
npm start
```

## Структура проекта

```
.
├── package.json          # Зависимости проекта
├── firebase-config.js    # Конфигурация Firebase
├── database.js           # Функции для работы с базой данных
├── index.js             # Примеры использования
└── README.md            # Документация
```

## Дополнительные ресурсы

- [Документация Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Query Documentation](https://firebase.google.com/docs/firestore/query-data/queries)


