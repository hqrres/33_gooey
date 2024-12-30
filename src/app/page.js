"use client";

import { useEffect } from 'react';
import { initializeGooCursor } from './components/gooey/index.js';

export default function Home() {
  useEffect(() => {
    initializeGooCursor();
  }, []);

  return (
    <div className="demo-5">
      <div>
        <div className="frame">
          <div className="frame__title"> 
            <h1 className="frame__title-main">Gooey Cursor</h1> 
            <a aria-label="Back to the article" className="frame__title-back" href="https://tympanus.net/codrops/?p=72438"> 
              <span className="oh__inner">Back to the article</span> 
              <svg width="18px" height="18px" viewBox="0 0 24 24"><path vectorEffect="non-scaling-stroke" d="M18.25 15.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h7.19L6.22 16.72a.75.75 0 101.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"></path>
              </svg>
            </a>
          </div>
          <a className="frame__prev" href="https://tympanus.net/Development/ImagePixelLoading/">Previous demo</a>
          <nav className="frame__demos">
            <span className="frame__demos-item">Variations: </span>
            <a className="frame__demos-item" href="index.html">1</a>
            <a className="frame__demos-item" href="index2.html">2</a>
            <a className="frame__demos-item" href="index3.html">3</a>
            <a className="frame__demos-item" href="index4.html">4</a>
            <span className="frame__demos-item">5</span>
            <a className="frame__demos-item" href="index6.html">6</a>
            <a className="frame__demos-item" href="index7.html">7</a>
            <a className="frame__demos-item" href="index8.html">8</a>
          </nav>
        </div>
        <div className="content">
          <h2><i>b</i>yte<i>c</i>raft</h2>
          <p>Creating flawless digital experiences with precision &amp; expertise</p>
        </div>
      </div>
      <div className="cursor">
        <div className="cursor__inner">
          {/* <!-- cursor__inner-box elements come here --> */}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="gooey">
                <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="1" seed="0" result="turbulence" />
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="100" xChannelSelector="R" yChannelSelector="G" result="displacement" />
                <feGaussianBlur in="displacement" stdDeviation="5" result="blur" />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="
                        1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 15 -7"
                    result="gooey"
                />
            </filter>

          </defs>
        </svg>
      </div>
	  </div>
  );
}
