/**
 * Created by jevgenir on 10/29/2016.
 */
import React from 'react';
import {Field} from 'redux-form';
import submitMyForm from "./../actions/FileUpload.submit.action";

class FileUploadComponent extends React.Component {
  static propTypes = {
    submitMyForm: React.PropTypes.func.isRequired,
    onChangeFiles: React.PropTypes.func.isRequired,
    testFile: React.PropTypes.object
  };

  constructor() {
    super();

    this.state = {testFiles: [], otherTestFiles: []};
  }

  onSubmit = (e) => {
    let allFiles = this.state.testFiles.concat(this.state.otherTestFiles);
    this.props.handleSubmit(data => submitMyForm(data, allFiles))(e);
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
            <input name="testFile" type="file" multiple="multiple" onChange={(e) => {
              const testFiles = [];
              for (let i = 0; i < e.target.files.length; i++) {
                testFiles.push(e.target.files[i]);
              }
              this.setState({testFiles: testFiles});
            } }/>
          </div>

          <ul>
            {this.state.testFiles.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>

          <div>
            <label htmlFor="testFile">Test file</label>
            <input name="testFile" type="file" multiple="multiple" onChange={(e) => {
              const testFiles = [];
              for (let i = 0; i < e.target.files.length; i++) {
                testFiles.push(e.target.files[i]);
              }
              this.setState({otherTestFiles: testFiles});
            } }/>
          </div>

          <ul>
            {this.state.otherTestFiles.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>


          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default FileUploadComponent;
