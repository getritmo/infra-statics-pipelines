import React from 'react'
import PropTypes from 'prop-types'

const FinanceIcon = ({ width = 48, height = 48, classes }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    className={classes}
  >
    <defs>
      <linearGradient
        x1="100%"
        y1="99.9958334%"
        x2="5.43323864%"
        y2="-5.30638844%"
        id="linearGradient-1"
      >
        <stop stopColor="#000000" offset="0%" />
        <stop stopColor="#000000" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M38.9881923,23.1878861 L43.1418173,27.3434694 C44.8064006,29.0080527 45.7229006,31.2229277 45.7229006,33.5748861 C45.7229006,35.9288027 44.8064006,38.1436777 43.1418173,39.8063027 L40.7565673,42.1915527 C39.0880673,43.8620111 36.8203173,44.7726361 34.5075256,44.7726361 C33.7868589,44.7726361 33.0603173,44.6845111 32.3455256,44.5023861 L25.5187756,42.7614277 C25.2641923,42.6968027 25.0468173,42.5323027 24.9136506,42.3070944 C24.4475673,41.5080944 23.9658173,39.5967611 25.4835256,38.0790527 C26.1571923,37.4053861 27.0658589,37.1429694 27.9510256,37.0842194 L19.5987339,28.7319277 C19.0445256,28.1777194 18.7390256,27.4394277 18.7390256,26.6541361 C18.7390256,25.8688444 19.0445256,25.1325111 19.5987339,24.5763444 C20.7424006,23.4307194 22.6086923,23.4307194 23.7523589,24.5763444 L25.9498056,26.7745475 C26.0894984,26.4807077 26.2806967,26.2055483 26.5234006,25.9628444 C27.4754764,25.0042251 28.9358912,24.8463764 30.0599419,25.4892982 C30.2013431,25.1580703 30.4081499,24.8471784 30.6789839,24.5763444 C31.6337702,23.6199232 33.0922036,23.461967 34.2133479,24.1024758 C34.3570642,23.7657427 34.566754,23.4556993 34.8345673,23.1878861 C35.9782339,22.0442194 37.8406089,22.0442194 38.9881923,23.1878861 Z M36.2191089,24.5724277 C36.0330673,24.7584694 35.9312339,25.0032611 35.9312339,25.2656777 C35.9312339,25.4843583 36.0033115,25.6907993 36.133867,25.8600682 L36.2710256,26.0151361 L37.6016923,27.3454277 C37.9835673,27.7273027 37.9835673,28.3480944 37.6016923,28.7299694 C37.4117339,28.9199277 37.1610673,29.0158861 36.9104006,29.0158861 C36.6597339,29.0158861 36.4090673,28.9199277 36.2171506,28.7299694 L33.4480673,25.9608861 C33.0661923,25.5790111 32.4454006,25.5790111 32.0635256,25.9608861 C31.7110256,26.3133861 31.6839102,26.86946 31.9821794,27.2532791 L32.0780256,27.3621361 L34.8326089,30.1164694 C35.2144839,30.4983444 35.2144839,31.1191361 34.8326089,31.5010111 C34.6426506,31.6890111 34.3919839,31.7849694 34.1413173,31.7849694 C33.8906506,31.7849694 33.6399839,31.6890111 33.4480673,31.4990527 L29.2944423,27.3454277 C28.9125673,26.9615944 28.2898173,26.9655111 27.9079423,27.3454277 C27.5292962,27.7260256 27.5280298,28.3439446 27.9041431,28.7280686 L32.0615673,32.8855527 C32.4434423,33.2674277 32.4434423,33.8882194 32.0615673,34.2700944 C31.6796923,34.6519694 31.0589006,34.6519694 30.6770256,34.2700944 L22.3678173,25.9608861 C21.9859423,25.5809694 21.3651506,25.5790111 20.9832756,25.9608861 C20.6014006,26.3427611 20.6014006,26.9635527 20.9832756,27.3454277 L31.3702756,37.7304694 C31.6914423,38.0516361 31.7482339,38.5490527 31.5112756,38.9348444 C31.2723589,39.3206361 30.8043173,39.4929694 30.3695673,39.3519694 C29.5353173,39.0758444 27.5809006,38.7429277 26.8680673,39.4616361 C26.3197339,40.0099694 26.3647756,40.6170527 26.4685673,40.9813027 L32.8311923,42.6047611 C35.1518173,43.2000944 37.6682756,42.5127194 39.3700673,40.8089694 L41.7553173,38.4237194 C43.0517339,37.1273027 43.7645673,35.4059277 43.7645673,33.5748861 C43.7645673,31.7438444 43.0517339,30.0244277 41.7572756,28.7280111 L37.6036506,24.5724277 C37.2217756,24.1925111 36.6009839,24.1905527 36.2191089,24.5724277 Z M2.5401296,0.364013623 C2.81627197,0.364013623 3.0401296,0.587871248 3.0401296,0.864013623 L3.03990058,32.0460136 L20.8542246,32.0468325 C21.5819422,32.0468325 21.945801,32.4330364 21.945801,33.2054443 C21.945801,33.9778238 21.5819422,34.3423591 20.8542246,34.2990501 L1.31262018,34.3640136 C1.25282867,34.3640136 1.19548841,34.3535186 1.14234108,34.3342701 L1.0659825,34.2990501 C0.866638046,34.2338558 0.722900585,34.0461526 0.722900585,33.8248778 L0.722900585,0.864013623 C0.722900585,0.587871248 0.94675821,0.364013623 1.22290058,0.364013623 L2.5401296,0.364013623 Z M14.2675739,13.4497633 C14.8698289,13.4497633 15.358053,13.9379874 15.358053,14.5402424 L15.358053,27.8077385 C15.358053,28.4099935 14.8698289,28.8982177 14.2675739,28.8982177 L7.08624689,28.8982177 C6.48399189,28.8982177 5.99576775,28.4099935 5.99576775,27.8077385 L5.99576775,14.5402424 C5.99576775,13.9379874 6.48399189,13.4497633 7.08624689,13.4497633 L14.2675739,13.4497633 Z M12.0122806,15.5069245 L9.32908349,15.5069245 C8.79374571,15.5069245 8.34850639,15.8690427 8.25617343,16.346576 L8.23860435,16.5305792 L8.23860435,25.8108347 C8.23860435,26.3133671 8.6243617,26.7313222 9.13306848,26.817997 L9.32908349,26.8344895 L12.0122806,26.8344895 C12.5476184,26.8344895 12.9928577,26.4723713 13.0851907,25.994838 L13.1027598,25.8108347 L13.1027598,16.5305792 C13.1027598,16.0280468 12.7170024,15.6100917 12.2082956,15.5234169 L12.0122806,15.5069245 Z M26.1260307,8.73070516 C26.7282857,8.73070516 27.2165098,9.2189293 27.2165098,9.8211843 L27.2165098,23.8302792 C27.1158305,24.4215101 26.7523375,24.7171256 26.1260307,24.7171256 C25.4997238,24.7171256 25.1135286,24.4215101 24.9674449,23.8302792 L24.9674449,11.8222875 C24.9674449,11.3316533 24.5816875,10.9235939 24.0729808,10.8389713 L23.8769658,10.8228693 L21.1937686,10.8228693 C20.6584308,10.8228693 20.2131915,11.1764138 20.1208586,11.6426408 L20.1032895,11.8222875 L20.1032895,22.0749691 L20.1101212,22.1751816 C20.1123984,22.1958502 20.115245,22.2185019 20.1186609,22.2431368 C19.9511748,22.9964915 19.5598558,23.3731689 18.9447037,23.3731689 C18.0219756,23.3731689 17.8542246,22.6136613 17.8542246,22.2546158 L17.8542246,9.8211843 C17.8542246,9.2189293 18.3424487,8.73070516 18.9447037,8.73070516 L26.1260307,8.73070516 Z M37.9844875,2.89861442 C38.5867425,2.89861442 39.0749666,3.38683856 39.0749666,3.98909356 L39.0749666,20.3557128 C39.0749666,21.0405273 38.7114736,21.3829345 37.9844875,21.3829345 C37.2575014,21.3829345 36.873243,21.0405273 36.8317122,20.3557128 L36.83213,6.14301576 C36.83213,5.63789766 36.4463727,5.21779198 35.9376659,5.13067119 L35.7416509,5.11409388 L33.0584537,5.11409388 C32.523116,5.11409388 32.0778766,5.47807533 31.9855437,5.95806575 L31.9679746,6.14301576 L31.9682012,22.0885049 C31.8251753,22.6155205 31.4368284,22.8790283 30.8031605,22.8790283 C30.1694926,22.8790283 29.8059996,22.6155205 29.7126814,22.0885049 L29.7126814,3.98909356 C29.7126814,3.38683856 30.2009055,2.89861442 30.8031605,2.89861442 L37.9844875,2.89861442 Z"
      fill="url(#linearGradient-1)"
      fillRule="nonzero"
    />
  </svg>
)

FinanceIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.string,
}

export default FinanceIcon
