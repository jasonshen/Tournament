import React, { Component } from "react";
import { gcpdLookup, gcpdReport } from "./util/headlightHelper";
import styled from "styled-components";

const FormSection = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 3rem auto;
  border: 2px dotted green;
  padding: 2rem;
  background-color: #e2f3e2;
  div {
    padding: 0.5rem;
  }
  button,
  input {
    padding: 0.3rem;
    cursor: pointer;
  }
  .error {
    color: red;
  }
`;
const ResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1500px;
  margin: 0 auto;
`;
const Result = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  max-height: 350px;
  margin: 1rem;
  border: 2px solid #c56f6f;
  border-radius: 2px;
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  span {
    margin: 0.5rem 1rem;
  }
  button {
    padding: 0.3rem;
    cursor: pointer;
  }
`;

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      results: [],
      showError: false,
      showReported: false
    };
  }
  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };
  uploadImage = () => {
    this.setState({ showError: false });
    this.setState({ showReported: false });
    gcpdLookup(this.state.file)
      .then(data => {
        console.log("data? ", data);
        data.og_img = this.state.file;
        // data.reported = false;
        this.setState({ results: this.state.results.concat(data) });
      })
      .catch(error => {
        console.log(error);
        this.setState({ showError: true });
      });
  };
  reportVillain = (img, idx) => {
    console.log("idx", idx);
    this.setState({ showError: false });
    gcpdReport(img)
      .then(data => {
        console.log("status? ", data.status);
        this.setState({ showReported: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ showError: true });
      });
  };
  render() {
    const results = this.state.results.map((result, idx) => (
      <Result key={idx}>
        <img src={result.location} />
        <span>Closest Match: {result.closest_match}</span>
        <span>Percentage Match: {result.percent_match}</span>
        <button
          onClick={(result, idx) => this.reportVillain(result.og_img, idx)}
        >
          Report Villain
        </button>
      </Result>
      // <Result idx={idx} result={result} />
    ));
    return (
      <React.Fragment>
        <FormSection>
          {this.state.showError ? (
            <span class="error">Oh no! Please try again 🦊</span>
          ) : null}
          <form
            onSubmit={e => {
              e.preventDefault();
              this.uploadImage();
            }}
          >
            <div>
              <label htmlFor="photo">Upload A Photo&nbsp;</label>
              <input
                type="file"
                name="photo"
                accept=".jpg, .jpeg, .png"
                onChange={this.onChange}
              />
            </div>
            <div>
              <button>Upload Photo</button>
            </div>
          </form>
        </FormSection>
        {this.state.showReported ? (
          <span class="reported">
            Your report has been received. Gothic City thanks you, citizen. 🦊
          </span>
        ) : null}
        <ResultContainer>{results}</ResultContainer>
      </React.Fragment>
    );
  }
}

export default Container;
