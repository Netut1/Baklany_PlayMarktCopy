# Интеграция Firebase Firestore в React

Это руководство по использованию Firebase Firestore в React приложении.

## Установка зависимостей

Если у вас ещё нет React проекта, создайте его:

```bash
npx create-react-app my-app
cd my-app
```

Или если используете Vite:

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

Затем установите зависимости:

```bash
npm install firebase
```

## Структура файлов

Скопируйте эти файлы в ваш React проект:

```
src/
├── firebase-config.js    # Конфигурация Firebase
├── database.js           # Функции для работы с БД
├── hooks/
│   └── useFirestore.js   # React хуки
└── components/
    ├── UsersList.jsx     # Пример компонента
    └── UserProfile.jsx   # Пример компонента
```

## Использование хуков

### 1. Получение всех документов из коллекции

```jsx
import { useCollection } from './hooks/useFirestore';

function UsersList() {
  const { data, loading, error, refetch } = useCollection('users');

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 2. Получение одного документа

```jsx
import { useDocument } from './hooks/useFirestore';

function UserProfile({ userId }) {
  const { data: user, loading, error } = useDocument('users', userId);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!user) return <div>Не найдено</div>;

  return <div>{user.name}</div>;
}
```

### 3. Создание документа

```jsx
import { useCreateDocument } from './hooks/useFirestore';

function AddUser() {
  const { create, loading, error } = useCreateDocument();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create('users', {
        name: 'Иван',
        email: 'ivan@example.com'
      });
      alert('Пользователь создан!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>
        {loading ? 'Создание...' : 'Создать'}
      </button>
    </form>
  );
}
```

### 4. Обновление документа

```jsx
import { useUpdateDocument } from './hooks/useFirestore';

function EditUser({ userId }) {
  const { update, loading } = useUpdateDocument();

  const handleUpdate = async () => {
    try {
      await update('users', userId, {
        name: 'Новое имя'
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleUpdate} disabled={loading}>
      {loading ? 'Сохранение...' : 'Сохранить'}
    </button>
  );
}
```

### 5. Удаление документа

```jsx
import { useDeleteDocument } from './hooks/useFirestore';

function DeleteUser({ userId }) {
  const { remove, loading } = useDeleteDocument();

  const handleDelete = async () => {
    if (window.confirm('Удалить?')) {
      try {
        await remove('users', userId);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Удаление...' : 'Удалить'}
    </button>
  );
}
```

### 6. Фильтрация документов

```jsx
import { useFilteredCollection } from './hooks/useFirestore';

function YoungUsers() {
  // Найти всех пользователей младше 25 лет
  const { data, loading } = useFilteredCollection('users', 'age', '<', 25);

  if (loading) return <div>Загрузка...</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name} - {user.age} лет</li>
      ))}
    </ul>
  );
}
```

## Пример полного компонента

См. файлы:
- `components/UsersList.jsx` - список пользователей с добавлением/удалением
- `components/UserProfile.jsx` - профиль пользователя с редактированием

## Реальное время (Real-time updates)

Для получения обновлений в реальном времени можно использовать `onSnapshot`:

```jsx
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase-config';

function RealtimeUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersList = [];
      snapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Обработка ошибок

Все хуки возвращают объект `error`:

```jsx
const { data, loading, error } = useCollection('users');

if (error) {
  return <div>Ошибка: {error}</div>;
}
```

## Лучшие практики

1. **Обрабатывайте состояния загрузки** - показывайте индикатор загрузки
2. **Обрабатывайте ошибки** - показывайте сообщения об ошибках пользователю
3. **Используйте refetch** - для обновления данных после мутаций
4. **Оптимизируйте запросы** - используйте фильтрацию и лимиты
5. **Кэширование** - React Query или SWR могут помочь с кэшированием

## Дополнительные ресурсы

- [Документация Firebase Firestore](https://firebase.google.com/docs/firestore)
- [React Hooks документация](https://react.dev/reference/react)

