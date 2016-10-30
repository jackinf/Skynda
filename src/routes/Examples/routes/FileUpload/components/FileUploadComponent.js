/**
 * Created by jevgenir on 10/29/2016.
 */
import React from 'react';
import {Field} from 'redux-form';
import {submitFormTest1, submitFormTest2, submitFormTest3, submitFormTest4} from "./../actions/FileUpload.submit.action";
var Dropzone = require('react-dropzone');

class FileUploadComponent extends React.Component {
  static propTypes = {
    onChangeFiles: React.PropTypes.func.isRequired
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    this.onFilesAdded(acceptedFiles, "testFiles");
  };

  constructor() {
    super();

    this.state = {
      testFiles: [],
      // otherTestFiles: [],
      formtestFiles: [],
      // formotherTestFiles: [],
    };
  }

  onFilesAdded = (files, name) => {
    const testFiles = [];
    for (let i = 0; i < files.length; i++) {
      testFiles.push(files[i]);
    }
    this.setState({[name]: testFiles, ["form" + name]: files});
  };

  onSubmit = (e) => {
    // let allFiles = this.state.testFiles.concat(this.state.otherTestFiles);
    this.props.handleSubmit(data => submitFormTest3(data, this.state.formtestFiles))(e);
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Redux form example</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" component="input" type="text"/>
          </div>

          <div>
            <label htmlFor="testFile">Test file</label>
            <input name="testFile" type="file" multiple="multiple" onChange={(e) => this.onFilesAdded(e.target.files, "testFiles") }/>
          </div>

          <ul>
            {this.state.testFiles.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>

          {/*<div>*/}
            {/*<label htmlFor="testFile">Test file</label>*/}
            {/*<input name="testFile" type="file" multiple="multiple" onChange={(e) => this.onFilesAdded(e.target.files, "otherTestFiles") }/>*/}
          {/*</div>*/}

          {/*<ul>*/}
            {/*{this.state.otherTestFiles.map((file, i) => <li key={i}>{file.name}</li>)}*/}
          {/*</ul>*/}


          <button type="submit">Submit</button>
        </form>

        <div>
          <Dropzone onDrop={this.onDrop} multiple={true}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </div>
      </div>
    )
  }
}

export default FileUploadComponent;
