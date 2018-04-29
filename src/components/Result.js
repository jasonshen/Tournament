import React from 'react'
import { AlertTriangle, CheckCircle } from 'react-feather'

export default ({ location, reported, closest_match, percent_match, reportSuspect}) => (
    <article className="fl w-100 w-50-m  w-third-ns pa2-ns">
      <div className="aspect-ratio aspect-ratio--8x5 dim">
        <img
          style={{backgroundImage: `url(${location})`}}
          className="db bg-center contain aspect-ratio--object"
          alt=''
        />
      </div>
      <div className="ph2 ph0-ns pb3 link db">
        <h3 className="f5 f4-ns mb0 black-90">Closest to: {closest_match}</h3>
        <h3 className="f6 f5 fw4 mt2 black-60">Percent Match: {percent_match}%</h3>
        {
          reported
          ? <span className='inline-flex items-center gray'>
            <CheckCircle
              className={
                `no-underline bg-animate hover-black green`
                }
              />
              &nbsp;Reported!
            </span>
          :<AlertTriangle
            className={
              `no-underline bg-animate hover-black
              ${
                (percent_match <= 60)
                  ? 'gray'
                  : (percent_match <= 80)
                    ? 'yellow'
                    : 'dark-red'
                }`
              }
            onClick={() => reportSuspect(location)}
           />
         }
      </div>

    </article>
)
