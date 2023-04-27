import React from 'react';

import Headers from './Headers';

import FilesUploads from './FilesUpload';
import LoginMsg from './LoginMsg';
import { useAuth } from '../contexs/AuthContext';

export default function Home() {
  const { user } = useAuth();
  // console.log('user', user);

  return (
    <center className="d-flex flex-column  ">
      <Headers></Headers>

      {user ? <FilesUploads></FilesUploads> : <LoginMsg></LoginMsg>}
    </center>
  );
}
