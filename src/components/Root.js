import React from 'react'
import axios from 'axios'

import Result from './Result'
import NewSubmission from './NewSubmission'
import Layout from './Layout'

export class Root extends React.Component {
  constructor() {
    super()
    this.state = {
      results: [],
    }

    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleReport = this.handleReport.bind(this)
  }

  handleImageUpload(fileData) {
    return axios.post('https://www.headlightlabs.com/api/gcpd_lookup', {
        api_key: 'e1wc612dmxluClbbNfP7eg',
        image_contents: fileData
      })
      .then((response) => response.data)
      .then((newResult) => {
        this.setState({
          results:[
            ...this.state.results,
            newResult
          ]
        })
      })
      .catch((error) => {
        console.log("error", error);
      })
  }

  handleReport(location) {
    /*
     * This method optimistically updates the UI as reported
     * It does not currently send file data
     */
    return axios.post('https://www.headlightlabs.com/api/gcpd_report', {
        api_key: 'e1wc612dmxluClbbNfP7eg',
      })
      .then(() =>{
        const updatedResults = this.state.results.map(result => {
          if (result.location === location){
            result.reported = true
            return result
          }
          return result
        })
        this.setState({results:updatedResults})
      })
  }

  render() {
              console.log("this.state.results", this.state.results);
    return (
      <section className="cf w-100 pa2-ns">
          <Layout weight={30}>
            <header className="pv3 pv4-ns">
              <div className="flex flex-row justify-center">
                <NewSubmission
                  handleImageUpload={this.handleImageUpload}
                />
              </div>
            </header>
          </Layout>
          <Layout weight={70}>
            {
              this.state.results
              .map(result => (
                <Result
                  key={result.location}
                  closest_match={result.closest_match}
                  percent_match={result.percent_match}
                  location={result.location}
                  reported={result.reported}
                  reportSuspect={this.handleReport}
                />
              ))
            }
          </Layout>
    </section>
    )
  }
}

export default Root
