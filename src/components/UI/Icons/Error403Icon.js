import React from 'react'
import PropTypes from 'prop-types'

const Error403Icon = ({ width = 74, height = 64, classes }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 74 64"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    className={classes}
  >
    <defs>
      <linearGradient
        x1="100%"
        y1="87.9333336%"
        x2="5.43323864%"
        y2="8.03738948%"
        id="linearGradient-1"
      >
        <stop stopColor="#E95A0C" offset="0%" />
        <stop stopColor="#FF7800" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M36.7410224,0.00286995516 C40.7791888,0.00286995516 44.4672778,1.99780989 46.6755699,5.35735734 L46.8612018,5.64864574 L65.218583,35.3704753 C66.0515874,36.7189238 65.633435,38.4872466 64.28513,39.3199641 C62.988821,40.1212059 61.3039164,39.7652848 60.4358155,38.5379552 L60.3356413,38.3865112 L41.9784036,8.66468161 C40.8480717,6.83479821 38.8904753,5.74234978 36.7411659,5.74234978 C34.6778289,5.74234978 32.7910423,6.74915025 31.6434824,8.44865801 L31.5039283,8.66468161 L6.68283408,48.8516592 C5.49079821,50.7818475 5.43885202,53.1169865 6.54392825,55.0985471 C7.60484581,57.0007202 9.5037181,58.1656365 11.6601062,58.2524316 L11.9200717,58.2576502 L61.5622601,58.2576502 C63.6369507,58.2576502 65.4910852,57.277417 66.6491121,55.5683587 C67.756241,53.9344309 68.0284907,51.9082057 67.3962884,50.0971263 L67.3044664,49.8515516 C66.716843,48.3795516 67.4339013,46.7100987 68.9059013,46.1224753 C70.3779013,45.534852 72.0473543,46.2519103 72.6349776,47.7239103 C74.0883229,51.3657399 73.6269776,55.5017758 71.4004664,58.7875874 C69.2231453,62.0007133 65.7810723,63.8840651 61.9148773,63.992071 L61.5622601,63.9969865 L11.9200717,63.9969865 C7.54640359,63.9969865 3.66292377,61.7156592 1.53155157,57.8943139 C-0.542289985,54.1759083 -0.505222499,49.8117379 1.61308357,46.1480503 L1.79974888,45.8357668 L26.620843,5.64864574 C28.8043049,2.11357848 32.5874798,0.00286995516 36.7410224,0.00286995516 Z M36.7424574,46.9224753 C38.3273901,46.9224753 39.6121256,48.2072108 39.6121256,49.7921435 C39.6121256,51.3770762 38.3273901,52.6618117 36.7424574,52.6618117 C35.1575247,52.6618117 33.8720717,51.3770762 33.8720717,49.7921435 C33.8720717,48.2638155 35.0660119,47.0146251 36.5724044,46.9273466 L36.7424574,46.9224753 Z M36.7411659,15.7861883 C38.2694939,15.7861883 39.5186844,16.9807956 39.6059629,18.4872358 L39.6108341,18.6558565 L39.6108341,39.7481614 C39.6108341,41.3330942 38.3260987,42.6178296 36.7411659,42.6178296 C35.2128379,42.6178296 33.9636475,41.4232223 33.876369,39.9167821 L33.8714978,39.7481614 L33.8714978,18.6558565 C33.8714978,17.0709238 35.1562332,15.7861883 36.7411659,15.7861883 Z"
      fill="url(#linearGradient-1)"
    />
  </svg>
)

Error403Icon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.string,
}

export default Error403Icon