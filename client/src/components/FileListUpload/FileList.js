import React from 'react';

export default function FileList(props) {
  const { newFiles, onDownload } = props;
  // console.log('newFiles', newFiles);
  // console.log('newFiles 2', newFiles);

  return (
    <div className="">
      <h2>Uploaded Files...</h2>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>File Name</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {newFiles.map((file, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{file.originalname}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onDownload(file)}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
