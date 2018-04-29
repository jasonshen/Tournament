import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";

import ImageUploader from "./ImageUploader.js";
import VillainCard from "./VillainCard.js";
import Confirmation from "./Confirmation.js";

const REACT_APP_GOTHIC_API_KEY = "RdzhmjmWcGwtLzRESH7bkA";
const LOOKUP_URL = "https://www.headlightlabs.com/api/gcpd_lookup";
const REPORT_URL = "https://www.headlightlabs.com/api/gcpd_report";

class App extends Component {
  state = {
    message: "Have you spotted a villain?",
    lookup: {},
    modal: false
  };

  imagePost = myFileInput => {
    var formData = new FormData();

    formData.append("api_key", REACT_APP_GOTHIC_API_KEY);
    formData.append("image", myFileInput.selectedFile);

    fetch(LOOKUP_URL, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(lookup =>
        this.setState({
          lookup,
          message: "Is this the villain you spotted?"
        })
      );
  };

  reportVillain = () => {
    fetch(REPORT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: JSON.stringify({
        villain: this.state.lookup,
        api_key: REACT_APP_GOTHIC_API_KEY
      })
    })
      .then(res => res.json())
      .then(response =>
        this.setState({ message: response.status, lookup: {}, modal: true })
      );
  };

  clearVillain = () => {
    this.setState({
      message: "Have you spotted a villain?",
      lookup: {},
      modal: false
    });
  };

  render() {
    return (
      <div className="padding">
        <Container textAlign="center">
          <h1
            style={{
              fontSize: "4em",
              fontWeight: "normal"
            }}
          >
            {this.state.message}
          </h1>

          {this.state.lookup.location ? (
            <VillainCard
              lookup={this.state.lookup}
              reportVillain={this.reportVillain}
              clearVillain={this.clearVillain}
            />
          ) : (
            <Fragment>
              <p>Upload your image here:</p>
              <ImageUploader imagePost={this.imagePost} />
            </Fragment>
          )}
        </Container>
        <Confirmation
          open={this.state.modal}
          message={this.state.message}
          clearVillain={this.clearVillain}
        />
      </div>
    );
  }
}

export default App;
