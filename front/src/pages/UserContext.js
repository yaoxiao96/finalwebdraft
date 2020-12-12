import React from 'react';

const UserContext = React.createContext({
  user: { signedIn: false },
  onUserChange: () => {},
});

export default UserContext;