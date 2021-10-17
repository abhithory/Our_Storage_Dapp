import React from 'react';
import {
  Link
} from "react-router-dom";

export default function Main(props) {
  const { allFiles, deleteFile } = props;

  const convertBytes = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hours = a.getHours();
    var minutes = a.getMinutes();

    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var time = date + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
    return time;
  }

  function deleteFile0(_id) {
    var _isDelete = window.confirm("Are you sure you want to delete this file?");
    if (_isDelete) {
      deleteFile(_id);
    }
  }

  return (
    <div className="container text-center  mt-3 mb-5">
      <Link to="uploadfiles">
        <button style={{ width: '30%' }} className="btn btn-lg btn-outline-warning mt-4 mb-2">Upload Files Now!</button>
      </Link>
      <div className="row">
        <div className="col bg-dark bg-gradient" style={{ borderRadius: 40 }}>
          <section className="m-5">
            <h1>All Files</h1>

            <div class="tbl-header" >
              <table cellpadding="0" cellspacing="0" border="0" style={{ width: '100%' }}>
                <thead>
                  <tr className="bg-dark text-white">
                    <th scope="col" style={{ width: '20%' }}>name</th>
                    <th scope="col" style={{ width: '32%' }}>description</th>
                    <th scope="col" style={{ width: '8%' }}>type</th>
                    <th scope="col" style={{ width: '8%' }}>size</th>
                    <th scope="col" style={{ width: '12%' }}>date</th>
                    <th scope="col" style={{ width: '12%' }}>View File</th>
                    <th scope="col" style={{ width: '8%' }}>Delete</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="tbl-content">
              <table cellpadding="0" cellspacing="0" border="0" style={{ width: '100%' }}>
                <tbody>

                  {allFiles &&
                    allFiles.map((file, key) => {
                      return (
                        <tr>
                          <td style={{ width: '20%' }}>{file.fileName}</td>
                          <td style={{ width: '32%' }}>{file.fileDes}</td>
                          <td style={{ width: '8%' }}>{file.fileType}</td>
                          <td style={{ width: '8%' }}>{convertBytes(file.fileSize)}</td>
                          <td style={{ width: '12%' }}>{timeConverter(file.uploadTime)}</td>
                          <td style={{ width: '12%' }}><a href={"https://ipfs.infura.io/ipfs/" + file.fileHash} rel="noopener noreferrer" target="_blank" className="btn btn-primary">View</a></td>
                          <td style={{ width: '8%' }}>
                            <button onClick={() => { deleteFile0(file.fileId.toNumber()) }} className="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                          </td>
                        </tr>
                      )
                    })}


                </tbody>
              </table>

            </div>
          </section>
        </div>
      </div>
    </div>

  )
}

