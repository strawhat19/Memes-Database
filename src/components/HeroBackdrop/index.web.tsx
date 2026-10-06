import './styles.scss';

const stars = [
  [106, 258, 8],
  [257, 156, 5],
  [1395, 245, 8],
  [1316, 374, 5],
  [73, 436, 5],
  [205, 558, 6],
  [1458, 543, 6],
  [1320, 677, 8],
  [84, 749, 7],
  [1468, 780, 4],
];

const dots = [
  [73, 206, 2],
  [181, 220, 2],
  [335, 165, 2],
  [1236, 143, 2],
  [1401, 162, 3],
  [1476, 328, 2],
  [146, 364, 3],
  [45, 528, 2],
  [1439, 440, 2],
  [1347, 503, 3],
  [112, 582, 2],
  [288, 643, 2],
  [1407, 635, 2],
  [39, 691, 3],
  [177, 758, 2],
  [1389, 732, 3],
  [1266, 795, 2],
  [1501, 883, 2],
];

const HeroBackdrop = () => (
  <div id={`hero-backdrop`} className={`hero-backdrop`} aria-hidden={`true`}>
    <svg
      focusable={`false`}
      id={`hero-backdrop-scene`}
      viewBox={`0 0 1536 1024`}
      className={`hero-backdrop-scene`}
      preserveAspectRatio={`none`}
    >
      <g id={`hero-backdrop-waves`} className={`hero-backdrop-waves`}>
        <path
          id={`hero-backdrop-wave-rear`}
          className={`hero-backdrop-wave hero-backdrop-wave-rear`}
          d={`M0 776C93 757 156 802 239 829C357 869 440 930 616 946C809 964 998 917 1112 871C1263 810 1404 758 1536 784V1024H0Z`}
        />
        <path
          id={`hero-backdrop-wave-front`}
          className={`hero-backdrop-wave hero-backdrop-wave-front`}
          d={`M0 876C116 821 214 894 334 930C483 975 608 967 791 975C1009 985 1124 927 1248 891C1378 853 1457 862 1536 912V1024H0Z`}
        />
      </g>
      <g id={`hero-backdrop-edge-squiggles`} className={`hero-backdrop-edge-squiggles`}>
        <path
          id={`hero-backdrop-squiggle-left`}
          className={`hero-backdrop-squiggle`}
          d={`M-22 120C19 94 82 119 65 150C53 173 8 154 26 134C43 115 77 151 93 177C110 205 91 238 62 245`}
        />
        <path
          id={`hero-backdrop-squiggle-right`}
          className={`hero-backdrop-squiggle`}
          d={`M1467 96C1430 116 1431 155 1462 158C1496 163 1506 120 1478 113C1448 105 1450 192 1490 215C1516 230 1549 216 1567 197`}
        />
        <path
          id={`hero-backdrop-squiggle-lower-right`}
          className={`hero-backdrop-squiggle`}
          d={`M1549 622C1482 597 1494 686 1532 661C1560 641 1515 603 1490 634C1464 668 1499 715 1553 724`}
        />
      </g>
      <g id={`hero-backdrop-stars`} className={`hero-backdrop-stars`}>
        {stars.map(([x, y, size], index) => (
          <path
            key={index}
            id={`hero-backdrop-star-${index}`}
            className={`hero-backdrop-star`}
            transform={`translate(${x} ${y}) scale(${size / 8})`}
            d={`M0-8 2-2 8 0 2 2 0 8-2 2-8 0-2-2Z`}
          />
        ))}
      </g>
      <g id={`hero-backdrop-dots`} className={`hero-backdrop-dots`}>
        {dots.map(([x, y, radius], index) => (
          <circle
            r={radius}
            cx={x}
            cy={y}
            key={index}
            id={`hero-backdrop-dot-${index}`}
            className={`hero-backdrop-dot`}
          />
        ))}
      </g>
      <path
        id={`hero-backdrop-mint-zigzag`}
        className={`hero-backdrop-mint-zigzag`}
        d={`M1228 219 1244 198 1260 220 1278 196 1294 217`}
      />
      <path
        id={`hero-backdrop-coral-rays`}
        className={`hero-backdrop-coral-rays`}
        d={`M69 621 87 650M32 655 69 663M43 696 74 679`}
      />
      <g
        id={`hero-backdrop-good-memes-motif`}
        transform={`translate(78 870) rotate(-7)`}
        className={`hero-backdrop-corner-motif`}
      >
        <text id={`hero-backdrop-good-memes-text`} className={`hero-backdrop-message`}>
          <tspan x={`0`} y={`0`} id={`hero-backdrop-good-memes-line-0`}>GOOD MEMES</tspan>
          <tspan x={`3`} y={`30`} id={`hero-backdrop-good-memes-line-1`}>BRIGHTER DAYS</tspan>
        </text>
        <g id={`hero-backdrop-smile`} className={`hero-backdrop-corner-doodle`} transform={`translate(180 14)`}>
          <path id={`hero-backdrop-smile-outline`} className={`hero-backdrop-smile-outline`} d={`M-3-24C24-31 42-17 40 6C39 27 21 37 0 29C-20 22-24-14-3-24Z`} />
          <path id={`hero-backdrop-smile-face`} className={`hero-backdrop-smile-face`} d={`M-3-5-3 0M20-5 20 0M-6 10Q8 26 24 10`} />
        </g>
      </g>
      <g
        id={`hero-backdrop-happier-you-motif`}
        transform={`translate(1271 863) rotate(6)`}
        className={`hero-backdrop-corner-motif`}
      >
        <text id={`hero-backdrop-happier-you-text`} className={`hero-backdrop-message`}>
          <tspan x={`0`} y={`0`} id={`hero-backdrop-happier-you-line-0`}>SAME INTERNET</tspan>
          <tspan x={`8`} y={`30`} id={`hero-backdrop-happier-you-line-1`}>HAPPIER YOU</tspan>
        </text>
        <path
          id={`hero-backdrop-heart`}
          transform={`translate(60 55)`}
          className={`hero-backdrop-corner-doodle`}
          d={`M0 7C-16-10-30 8-18 21L0 37 18 20C31 7 15-10 0 7Z`}
        />
      </g>
    </svg>
  </div>
);

export default HeroBackdrop;
