import React from "react";

const AnimatedBlob = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .rotate1 {
            animation: spin 6s linear infinite;
            transform-origin: 50% 50%;
          }
          .rotate2 {
            animation: spinReverse 8s linear infinite;
            transform-origin: 50% 50%;
          }
          .rotate3 {
            animation: spin 10s linear infinite;
            transform-origin: 50% 50%;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes spinReverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
        `}
      </style>

      <g filter="url(#filter0_d_2_573)">
        <g className="rotate1">
          <path
            opacity="0.5"
            d="M351.227 424.718C270.613 470.698 128.782 466.768 94.1703 357.7C59.5587 248.631 92.5647 148.121 173.179 102.14C253.793 56.1601 383.69 29.1963 430.863 165.659C456.934 263.891 431.841 378.738 351.227 424.718Z"
            fill="#A099FF"
          />
        </g>
        <g className="rotate2">
          <path
            opacity="0.5"
            d="M445.052 265.803C445.052 359.77 372.279 483.584 261.773 460.899C151.266 438.213 81.1882 359.77 81.1882 265.803C81.1882 171.837 92.2951 58.1873 232.45 83.1416C329.481 108.095 445.052 171.837 445.052 265.803Z"
            fill="#A099FF"
          />
        </g>
        <g className="rotate3">
          <path
            opacity="0.5"
            d="M215.811 441.777C126.524 417.457 27.7096 313.955 77.8669 211.318C128.024 108.682 210.075 48.469 299.362 72.7893C388.649 97.1096 510.769 181.733 450.782 312.894C401.958 401.711 305.098 466.097 215.811 441.777Z"
            fill="#A099FF"
          />
        </g>
      </g>

      <defs>
        <filter
          id="filter0_d_2_573"
          x="-56.7921"
          y="-49.6931"
          width="639.584"
          height="639.584"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="8.87376"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_2_573"
          />
          <feOffset dy="7.09901" />
          <feGaussianBlur stdDeviation="23.9592" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.627451 0 0 0 0 0.6 0 0 0 0 1 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_573"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_573"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default AnimatedBlob;
