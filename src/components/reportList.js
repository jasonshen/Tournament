import { h } from 'hyperapp';

const Report = ({
    closest_match,
    location,
    percent_match,
    reported,
    reportMatch
}) => (
    <div class="report-box">
        <img class="report-image"
            src={location}
        />
        <br/>
        <div class="report-info">
            <span>Closest Match: {closest_match} {percent_match}%</span>

            {
                reported ?
                    <span>Thanks for reporting a match</span> :
                    <button onclick={() => reportMatch(location)}>Report Match</button>
            }
        </div>
    </div>
)

export const ReportList = ({ reports, reportMatch }) =>
    reports.map(report => <Report {...report} reportMatch={reportMatch}  />);