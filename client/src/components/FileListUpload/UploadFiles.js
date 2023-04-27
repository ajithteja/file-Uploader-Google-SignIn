import React, { useRef } from 'react';

export default function UploadFiles({ onFilesSelect, filesUpload, files }) {
  const fileRef = useRef();
  const onFilesFunc = ({ target }) => {
    const files = Array.from(target.files);
    onFilesSelect(files);
  };

  const onuploadBtn = () => {
    filesUpload();
    fileRef.current.value = null;
  };

  return (
    <div className="p-3">
      <h1>Upload Files</h1>
      <hr />

      <div className="mt-4">
        <input
          type="file"
          name="files"
          multiple
          onChange={onFilesFunc}
          ref={fileRef}
        />
        <div>
          <ul className="list-group">
            {files.map((file, index) => (
              <li className="list-group-item" key={index}>
                <b>{index + 1}.</b> {file.name}
              </li>
            ))}
          </ul>
        </div>
        <button className="btn btn-success mt-3" onClick={onuploadBtn}>
          Upload Files
        </button>
      </div>
    </div>
  );
}
