import React, { useEffect, useState } from 'react';

import FileList from './FileListUpload/FileList';
import UploadFiles from './FileListUpload/UploadFiles';

import { getFile, getFiles, uploadFiles } from '../services/file-services';
import { useAuth } from '../contexs/AuthContext';
import { getTokenFromLocalStorage } from '../token/localStorage';

const Row = ({ children }) => <div className="row">{children}</div>;
const Column = ({ children, ...props }) => (
  <div className={`col-4 shadow m-3 ${Object.keys(props)}`}>{children}</div>
);

export default function FilesUpload() {
  const [files, setFiles] = useState([]);
  // const [newFiles, setNewFiles] = useState([]);

  const { newUserList, newUserfiles } = useAuth();
  // console.log('newUserfiles', newUserfiles);

  useEffect(() => {
    const jwtToken = getTokenFromLocalStorage();
    // console.log('BEFORE TOKEN 1', jwtToken);
    // console.log(jwtToken.length);
    const bool = jwtToken !== undefined;
    //  console.log(bool);

    if (bool) {
      getFiles().then((response) => {
        // console.log('BOOL ', response.files);
        newUserList(response.files);
        //  setNewFiles(response.files);
        // console.log('BOOL 2', response.files);
        //newUserList(response.files);
      });
    }
  }, []);

  const onFilesSelect = (files) => {
    setFiles(files);
  };

  const onDownload = (file) => {
    // console.log('DOWNLOAD FUNCTION');
    getFile(file._id)
      .then((url) => {
        // console.log('url', url);
        // Create a new anchor tag
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);

        // Set the href and download attributes of the anchor tag
        link.href = url;
        link.download = file.originalname;
        // console.log(link.download);

        // Trigger a click event on the anchor tag to initiate the download
        link.click();

        // Remove the anchor tag from the document
        document.body.removeChild(link);

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filesUpload = () => {
    uploadFiles(files)
      .then(({ file }) => {
        newUserList([...newUserfiles, ...file]);
        setFiles([]);
        //  setNewFiles([...newUserfiles, ...file]);
        //setFiles([]);
        // newUserList([...newFiles, ...file]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Row>
      <Column col-6>
        <FileList onDownload={onDownload} newFiles={newUserfiles}></FileList>
      </Column>
      <Column>
        <UploadFiles
          files={files}
          onFilesSelect={onFilesSelect}
          filesUpload={filesUpload}></UploadFiles>
      </Column>
    </Row>
  );
}
