import { h, app } from 'hyperapp';
import axios from 'axios';

import { state } from './state';
import { actions } from './actions';

import { ReportList } from './components/reportList';

import './index.css';

const view = ({ uploaded: { reportData = [] } }, actions) => (
    <div oncreate={actions.loadPastReports}>
        <div>
            <span>Lookup an Image</span>
            <br />
            <input type="file" id="input" />
            <br />
            <button onclick={actions.gcpdLookup}>
                Submit
            </button>
        </div>

        <div class="reports-container">
        {
            reportData.length > 0 ?
                <ReportList reports={reportData} reportMatch={actions.reportMatch} /> :
                <p>Report some data</p>
        }
        </div>
    </div>
);

app(state, actions, view, document.body);