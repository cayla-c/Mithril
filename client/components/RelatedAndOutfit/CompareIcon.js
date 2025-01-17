import React from 'react';

const CompareIcon = ({ className }) => {
  return (
    <div>
      <svg
        className="compare"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 100 125"
        style="enable-background:new 0 0 100 100;"
        xmlSpace="preserve">
        <g>
          <path d="M91.5,7.2H26.4c-0.6,0-1,0.4-1,1v16.4H9.1c-0.6,0-1,0.4-1,1v65.1c0,0.6,0.4,1,1,1h65.1c0.6,0,1-0.4,1-1V74.3h16.4   c0.6,0,1-0.4,1-1V8.2C92.5,7.7,92,7.2,91.5,7.2z M73.1,89.7H10.1V26.6h15.4v46.7c0,0.6,0.4,1,1,1h46.7V89.7z M73.1,72.3H27.4V26.6   h45.7V72.3z M90.5,72.3H75.1V25.6c0-0.6-0.4-1-1-1H27.4V9.2h63.1V72.3z"/>
          <path d="M35.4,49.4h12.3v12.4c0,0.6,0.4,1,1,1s1-0.4,1-1V49.4H62c0.6,0,1-0.4,1-1s-0.4-1-1-1H49.7V35.1c0-0.6-0.4-1-1-1s-1,0.4-1,1   v12.4H35.4c-0.6,0-1,0.4-1,1S34.8,49.4,35.4,49.4z"/>
        </g>
        <text
          x="0"
          y="115"
          fill="#000000"
          font-size="5px"
          font-weight="bold"
          font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Alexander Gruzdev
        </text>
        <text
          x="0"
          y="120"
          fill="#000000"
          font-size="5px"
          font-weight="bold"
          font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project
        </text>
      </svg>
    </div>
  )
}

export default CompareIcon;