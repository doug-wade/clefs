import React from 'react';
import Dropzone from 'react-dropzone';
import clefs from 'clefs';
import ClefsLocalStorage from 'clefs-localstorage';
import ClefsSimpleObject from 'clefs-simpleobject';

const fs = clefs([new ClefsSimpleObject(), new ClefsLocalStorage()]);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', fileContents: ''};
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return <div>
      <h3>Drag and drop example</h3>
      <Dropzone onDrop={this.onDrop}>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      <div>
        <label>File Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button onClick={this.onClick}>Read file</button>
        <div>{this.state.fileContents}</div>
      </div>
    </div>;
  }

  onClick() {
    fs.readFile(this.state.value).then(contents => {
      this.setState({fileContents: contents});
    });
  }

  onDrop(files) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      fs.writeFile(files[0].name, evt.target.result);
    }
    reader.readAsText(files[0]);
  }
}
