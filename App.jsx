// Пример главного компонента приложения

import { UsersList } from './components/UsersList';
import { UserProfile } from './components/UserProfile';
import { useState } from 'react';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Firebase Firestore в React</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <UsersList />
        </div>
        
        {selectedUserId && (
          <div style={{ flex: 1 }}>
            <UserProfile userId={selectedUserId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

