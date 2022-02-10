import React from 'react'
import PropTypes from 'prop-types'

const BankHandIcon = ({ height = 48, width = 48, classes }) => (
  <svg
    width={height}
    height={width}
    viewBox="0 0 47 48"
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
        <stop stopColor="#e95a0c" offset="0%" />
        <stop stopColor="#FF7800" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M39.2652917,22.41335 L43.4189167,26.5689333 C45.0835,28.2335166 46,30.4483916 46,32.80035 C46,35.1542666 45.0835,37.3691416 43.4189167,39.0317666 L41.0336667,41.4170166 C39.3651667,43.087475 37.0974167,43.9981 34.784625,43.9981 C34.0639583,43.9981 33.3374167,43.909975 32.622625,43.72785 L25.795875,41.9868916 C25.5412917,41.9222666 25.3239167,41.7577666 25.19075,41.5325583 C24.7246667,40.7335583 24.2429167,38.822225 25.760625,37.3045166 C26.4342917,36.63085 27.3429583,36.3684333 28.228125,36.3096833 L19.8758333,27.9573916 C19.321625,27.4031833 19.016125,26.6648916 19.016125,25.8796 C19.016125,25.0943083 19.321625,24.357975 19.8758333,23.8018083 C21.0195,22.6561833 22.8857917,22.6561833 24.0294583,23.8018083 L26.226905,26.0000114 C26.3665978,25.7061716 26.5577961,25.4310122 26.8005,25.1883083 C27.7525758,24.229689 29.2129907,24.0718403 30.3370413,24.7147621 C30.4784425,24.3835343 30.6852494,24.0726423 30.9560833,23.8018083 C31.9108696,22.8453871 33.369303,22.687431 34.4904473,23.3279398 C34.6341636,22.9912066 34.8438535,22.6811632 35.1116667,22.41335 C36.2553333,21.2696833 38.1177083,21.2696833 39.2652917,22.41335 Z M36.4962083,23.7978916 C36.3101667,23.9839333 36.2083333,24.228725 36.2083333,24.4911416 C36.2083333,24.7098222 36.2804109,24.9162632 36.4109664,25.0855321 L36.548125,25.2406 L37.8787917,26.5708916 C38.2606667,26.9527666 38.2606667,27.5735583 37.8787917,27.9554333 C37.6888333,28.1453916 37.4381667,28.24135 37.1875,28.24135 C36.9368333,28.24135 36.6861667,28.1453916 36.49425,27.9554333 L33.7251667,25.18635 C33.3432917,24.804475 32.7225,24.804475 32.340625,25.18635 C31.988125,25.53885 31.9610096,26.0949239 32.2592788,26.478743 L32.355125,26.5876 L35.1097083,29.3419333 C35.4915833,29.7238083 35.4915833,30.3446 35.1097083,30.726475 C34.91975,30.914475 34.6690833,31.0104333 34.4184167,31.0104333 C34.16775,31.0104333 33.9170833,30.914475 33.7251667,30.7245166 L29.5715417,26.5708916 C29.1896667,26.1870583 28.5669167,26.190975 28.1850417,26.5708916 C27.8063956,26.9514895 27.8051292,27.5694085 28.1812425,27.9535325 L32.3386667,32.1110166 C32.7205417,32.4928916 32.7205417,33.1136833 32.3386667,33.4955583 C31.9567917,33.8774333 31.336,33.8774333 30.954125,33.4955583 L22.6449167,25.18635 C22.2630417,24.8064333 21.64225,24.804475 21.260375,25.18635 C20.8785,25.568225 20.8785,26.1890166 21.260375,26.5708916 L31.647375,36.9559333 C31.9685417,37.2771 32.0253333,37.7745166 31.788375,38.1603083 C31.5494583,38.5461 31.0814167,38.7184333 30.6466667,38.5774333 C29.8124167,38.3013083 27.858,37.9683916 27.1451667,38.6871 C26.5968333,39.2354333 26.641875,39.8425166 26.7456667,40.2067666 L33.1082917,41.830225 C35.4289167,42.4255583 37.945375,41.7381833 39.6471667,40.0344333 L42.0324167,37.6491833 C43.3288333,36.3527666 44.0416667,34.6313916 44.0416667,32.80035 C44.0416667,30.9693083 43.3288333,29.2498916 42.034375,27.953475 L37.88075,23.7978916 C37.498875,23.417975 36.8780833,23.4160166 36.4962083,23.7978916 Z M21.413336,31.7834686 C22.1635061,31.7834686 22.7716017,32.3915642 22.7716017,33.1417343 C22.7716017,33.8237072 22.2690433,34.388263 21.6140552,34.4852734 L21.413336,34.5 L1.35826569,34.5 C0.608095549,34.5 0,33.8919045 0,33.1417343 C0,32.4597615 0.502558305,31.8952056 1.15754647,31.7981952 L1.35826569,31.7834686 L21.413336,31.7834686 Z M16.1391602,26.3504059 C16.1391602,26.3504059 16.4382304,26.3504059 17.036371,26.3504059 C17.7865411,26.3504059 18.3946367,26.9585014 18.3946367,27.7086716 C18.3946367,28.3906444 17.8920784,28.9552002 17.2370902,29.0522106 L17.036371,29.0669372 L3.87105721,29.0669372 C3.18908436,29.0669372 2.62452852,28.5643789 2.52751815,27.9093908 L2.51279153,27.7086716 L2.51707006,27.6243233 L2.51279153,27.539975 L2.51279153,14.8730608 C2.51279153,14.2584456 2.21773356,13.6387789 1.56490882,13.5311917 L1.35826569,13.5147951 C0.676292835,13.5147951 0.111736997,13.0122368 0.0147266207,12.3572486 L0,12.1565294 L0,8.48921205 C0,8.02005859 0.241521924,7.58927826 0.629932854,7.34264215 L0.805111987,7.24864008 L16.7986905,0.11774521 C17.0797428,-0.00754121732 17.3927416,-0.0329027543 17.6867811,0.0419387718 L17.9029605,0.116862337 L33.9644523,7.24775721 C34.3939104,7.43844922 34.6897905,7.83478584 34.7570503,8.29063201 L34.7716017,8.48921205 L34.7716017,12.1565294 C34.7716017,12.8385023 34.2690433,13.4030581 33.6140552,13.5000685 L33.413336,13.5147951 C32.625655,13.5147951 32.4433456,14.236751 32.4044558,14.6618065 L32.3946367,14.8730608 L32.3946367,20.884541 C32.3946367,21.6347111 31.7865411,22.2428067 31.036371,22.2428067 C30.3543981,22.2428067 29.7898423,21.7402484 29.6928319,21.0852602 L29.6781053,20.884541 L29.6781053,14.8730608 C29.6781053,14.1241131 29.0687873,13.5147951 28.3198396,13.5147951 C27.6389781,13.5147951 27.073513,14.0183637 26.9763281,14.6726171 L26.9615739,14.8730608 L26.9763281,21.8689428 C26.9223025,22.6406404 26.4728771,23.0264893 25.6280518,23.0264893 C24.7832264,23.0264893 24.3399077,22.6406404 24.2980957,21.8689428 L24.2980957,14.8730608 C24.2794596,13.9784814 23.8098755,13.5311917 22.8893433,13.5311917 C21.968811,13.5311917 21.5085449,13.9784814 21.5085449,14.8730608 L21.5085449,21.0852602 C21.4742839,21.8569579 21.0299072,22.2428067 20.175415,22.2428067 C19.3209229,22.2428067 18.8626302,21.8569579 18.8005371,21.0852602 L18.8005371,14.8730608 C18.7654606,13.9784814 18.3323755,13.5311917 17.5012817,13.5311917 C16.670188,13.5311917 16.2161474,13.9784814 16.1391602,14.8730608 M6.58758859,13.5147951 C5.90672705,13.5147951 5.34126196,14.0183637 5.24407708,14.6726171 L5.2293229,14.8730608 L5.2293229,26.3504059 L7.94585428,26.3504059 L7.94585428,14.8730608 C7.94585428,14.1241131 7.3365363,13.5147951 6.58758859,13.5147951 Z M12.0206514,13.5147951 C11.3397898,13.5147951 10.7743247,14.0183637 10.6771398,14.6726171 L10.6623857,14.8730608 L10.6623857,26.3504059 L13.378917,26.3504059 L13.378917,14.8730608 C13.378917,14.1241131 12.7695991,13.5147951 12.0206514,13.5147951 Z M17.3530666,2.84493897 L2.71653138,9.37079439 L2.71653138,10.7303504 L32.0550703,10.7303504 L32.0550703,9.37228848 L17.3530666,2.84493897 Z M17.3858008,5.84059395 C18.1359503,5.84059395 18.7440665,6.44871022 18.7440665,7.19885964 C18.7440665,7.94900907 18.1359503,8.55712533 17.3858008,8.55712533 C16.6356514,8.55712533 16.0275351,7.94900907 16.0275351,7.19885964 C16.0275351,6.44871022 16.6356514,5.84059395 17.3858008,5.84059395 Z"
      fill="url(#linearGradient-1)"
      fillRule="nonzero"
    />
  </svg>
)

BankHandIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.string,
}

export default BankHandIcon