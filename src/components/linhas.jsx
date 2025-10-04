// src/components/linhas.jsx

import React from 'react';
import './Linhas.css';

const LinhasAnimadas = () => {
  // Seus tempos personalizados já estão aqui
  const animationDur = "3.0s"; 
  const delays = ["0s", "0.15s", "0.8s", "0.9s", "1.6s", "1.7s", "2.3s", "2.45s"];

  const viewBoxWidth = 1729.7297;
  const viewBoxHeight = 1152.8649;
  const revealingStrokeWidth = 60;

  const paths = [
    // Top-Left Group
    "M 9.7572524e-4,550.73313 0.00195145,539.24324 129.94692,464.22218 c 71.46974,-41.26159 131.20984,-75.79641 132.75578,-76.74405 l 2.81081,-1.72297 V 192.87758 0 h 9.51352 9.51351 v 198.00583 198.00582 l -1.94594,2.19724 C 281.21392,399.76786 18.352486,552.40107 1.7007366,561.31282 0.04931318,562.19663 2.8291341e-5,561.88987 9.7572524e-4,550.73313 Z",
    "M 9.1825369e-4,405.50487 0.00183651,393.94595 86.271189,344.10458 172.54054,294.26321 172.75924,147.13161 172.97794,0 h 9.94346 9.94347 v 151.77014 151.77014 l -2.37838,2.50941 C 189.17838,307.42986 146.65946,332.41077 96,361.56281 45.340541,390.71486 3.0162162,415.12842 1.945946,415.81517 L 0,417.0638 Z",
    // Bottom-Left Group
    "M 264.43451,976.30933 264.21622,799.7538 132.75676,723.81053 C 60.454054,682.04174 0.99345929,647.74721 0.62210172,647.60046 0.25074416,647.45372 0.05614956,642.16876 0.18966929,635.85611 L 0.43243243,624.37856 140.54054,705.24822 c 77.05946,44.4783 140.98379,81.87429 142.05406,83.10219 l 1.94594,2.23253 v 181.14097 181.14099 h -9.94387 -9.94386 z",
    "M 172.75956,1022.6476 172.54054,892.43039 86.270271,842.58267 0,792.73494 v -11.58803 -11.58803 l 2.9673884,1.7508 c 1.6320636,0.96294 44.2971746,25.59129 94.8113566,54.72968 72.474285,41.80575 92.185165,53.53839 93.461815,55.63192 1.56217,2.56175 1.61795,7.27352 1.62107,136.92332 l 0.003,134.2703 h -9.94315 -9.94315 z",
    // Top-Right Group
    "m 1618.1622,459.18917 c -61.1244,-35.25594 -119.1135,-68.70513 -128.8649,-74.33155 -9.7513,-5.62642 -18.5081,-11.26312 -19.4595,-12.526 -1.7155,-2.27731 -1.7315,-3.81439 -1.9538,-187.31389 L 1467.66,0 h 9.9517 9.9518 l 0.2183,180.54054 0.2182,180.54054 120.2162,69.36268 c 66.1189,38.14947 120.5201,69.48318 120.8914,69.63047 0.3714,0.14729 0.566,5.43128 0.4325,11.74221 l -0.2428,11.47443 z",
    "m 1647.1351,304.40217 c -45.1891,-26.21341 -83.2324,-48.80667 -84.5405,-50.20726 l -2.3784,-2.54652 V 125.82419 0 h 9.943 9.9429 l 0.2192,121.25328 0.2192,121.25329 73.5136,42.66435 c 40.4324,23.4654 74.0118,42.96675 74.6208,43.33634 0.8308,0.50413 1.0468,3.53 0.8649,12.11381 l -0.2425,11.44183 z",
    // Bottom-Right Group
    "M 1468.5405,954.85904 V 756.85322 l 1.946,-2.19776 c 1.5446,-1.74447 257.4371,-150.11492 258.9011,-150.11492 0.2158,0 0.2837,5.11315 0.151,11.36255 l -0.2413,11.36254 -117.6669,67.98881 c -64.7168,37.39384 -119.1059,68.85136 -120.8648,69.90558 l -3.198,1.91678 v 192.89403 192.89407 h -9.5135 -9.5136 z",
    "M 1560.2162,1001.1293 V 849.39376 l 1.946,-2.15955 c 1.0702,-1.18775 39.1135,-23.57643 84.5405,-49.75263 l 82.5946,-47.59307 0.2428,11.42527 c 0.1335,6.28391 -0.061,11.5346 -0.4325,11.66821 -0.3713,0.13361 -33.9508,19.45251 -74.6211,42.9309 l -73.946,42.68798 -0.2187,147.13203 -0.2187,147.132 h -9.9434 -9.9435 z"
  ];
  
  const colors = ["#BFA10B", "#BFA10B", "#035AA6", "#035AA6", "#3B8C2E", "#3B8C2E", "#BFA10B", "#BFA10B"];

  const animations = [
    { attr: 'height', from: 0, to: viewBoxHeight }, { attr: 'height', from: 0, to: viewBoxHeight },
    { attr: 'y', from: viewBoxHeight, to: 0 }, { attr: 'y', from: viewBoxHeight, to: 0 },
    { attr: 'height', from: 0, to: viewBoxHeight }, { attr: 'height', from: 0, to: viewBoxHeight },
    { attr: 'y', from: viewBoxHeight, to: 0 }, { attr: 'y', from: viewBoxHeight, to: 0 }
  ];

  return (
    <svg
      className="linhas-container"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        {paths.map((_, index) => {
          const anim = animations[index];
          const initialY = anim.attr === 'y' ? viewBoxHeight : 0;
          return (
            <clipPath key={index} id={`clip-path-${index}`}>
              <rect x="0" y={initialY} width={viewBoxWidth} height={anim.attr === 'y' ? 0 : viewBoxHeight}>
                <animate 
                  attributeName={anim.attr} from={anim.from} to={anim.to} 
                  dur={animationDur} begin={delays[index]} fill="freeze" 
                />
                {anim.attr === 'y' && (
                  <animate 
                    attributeName="height" from="0" to={viewBoxHeight}
                    dur={animationDur} begin={delays[index]} fill="freeze" 
                  />
                )}
              </rect>
            </clipPath>
          );
        })}
      </defs>

      {/* As formas preenchidas e estáticas, mascaradas pela animação */}
      {paths.map((pathData, index) => (
        <path
          key={index}
          d={pathData}
          fill={colors[index]}
          clipPath={`url(#clip-path-${index})`}
          //Começa invisível para não "piscar" na tela
          visibility="hidden"
        >
          {/* Esta animação torna a forma visível no exato momento 
              em que a máscara começa a se mover, eliminando o flash */}
          <animate 
            attributeName="visibility" from="hidden" to="visible"
            dur="0.01s" begin={delays[index]} fill="freeze"
          />
        </path>
      ))}
    </svg>
  );
};

export default LinhasAnimadas;