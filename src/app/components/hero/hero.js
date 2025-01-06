"use client"

import { useEffect, useState } from 'react';
import * as kampos from 'kampos';
import Stats from 'stats.js';

export default function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize stats.js
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = function () {
          resolve(this);
        };

        img.src = src;
      });
    };

    const imageFromSrc = '/img/img_1.jpg'; // Your initial image path
    const imageToSrc = '/img/img_2.jpg'; // Your target image path

    const promisedImages = [
      loadImage(imageFromSrc),
      loadImage(imageToSrc),
    ];

    const turbulence = kampos.effects.turbulence({ noise: kampos.noise.perlinNoise });

    const WIDTH = 854;
    const HEIGHT = 480;
    const CELL_FACTOR = 4;
    const AMPLITUDE = CELL_FACTOR / WIDTH;

    turbulence.frequency = { x: AMPLITUDE, y: AMPLITUDE };
    turbulence.octaves = 8;
    turbulence.isFractal = true;

    const mapTarget = document.createElement('canvas');
    mapTarget.width = WIDTH;
    mapTarget.height = HEIGHT;

    const dissolveMap = new kampos.Kampos({ target: mapTarget, effects: [turbulence], noSource: true });

    dissolveMap.draw();

    const dissolve = kampos.transitions.dissolve();
    dissolve.map = mapTarget;
    dissolve.high = 0.3;

    const target = document.getElementById('target');
    const hippo = new kampos.Kampos({ target, effects: [dissolve] });

    Promise.all(promisedImages).then(([fromImage, toImage]) => {
      hippo.setSource({ media: fromImage, width: WIDTH, height: HEIGHT });
      dissolve.to = toImage;
    }).then(() => {
      let direction = 1; // 1 for increasing, -1 for decreasing
      hippo.play((time) => {
        stats.begin(); // Start measuring

        // Create a linear wave effect
        const speedFactor = 0.001; // Adjust this to control the speed
        let progressValue = dissolve.progress + direction * speedFactor;
        
        if (progressValue >= 1) {
          progressValue = 1;
          direction = -1; // Switch to decreasing
        } else if (progressValue <= 0) {
          progressValue = 0;
          direction = 1; // Switch to increasing
        }

        dissolve.progress = progressValue;
        setProgress(progressValue * 100); // Update progress state

        stats.end(); // End measuring
      });
    });
  }, []);

  return (
    <div className="relative h-[600px] w-full flex flex-col justify-center items-center">
      <canvas id="target" className="absolute top-0 left-0 w-full h-full"></canvas>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-15"></div>
      <div className="flex flex-col justify-center items-center text-center z-10 text-white gap-6">
        <h2 className="text-5xl font-bold drop-shadow-extra-strong leading-[1.2] mt-20">
          Building the future,<br></br> restoring the past
        </h2>
        <p className="text-2xl drop-shadow-extra-strong leading-[1.4]">Aitame luua sinu unistuste kodu,<br></br>
        säilitame ja kanname edasi ajatuid väärtusi</p>
        <button className="bg-white bg-opacity-10 text-white text-xl font-roboto px-4 py-2 border border-white">Vaata</button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300">
        <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}





