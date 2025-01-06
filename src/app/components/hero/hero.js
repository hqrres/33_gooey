"use client"

import { useEffect, useRef } from 'react';
import { Kampos, effects, noise, transitions } from 'kampos';

export default function Hero() {
  const canvasRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = canvasRef.current;
    if (!target) {
      console.error("Canvas element not found");
      return;
    }

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

    const mapTarget = document.createElement('canvas');
    const MAP_WIDTH = 854;
    const MAP_HEIGHT = 480;

    /* Change to true to see the effect with dynamic noise animation */
    const DYNAMIC = false;

    /* Try flipping between animation types */
    const TYPE = 'LIQUID';
    //const TYPE = 'SMOKE';
    const ANIMATIONS = {
      SMOKE: {
        octaves: 8,
        edge: 0.4,
        cellFactor: 4,
      },
      LIQUID: {
        octaves: 1,
        edge: 0.03,
        cellFactor: 2,
      },
    };

    mapTarget.width = MAP_WIDTH;
    mapTarget.height = MAP_HEIGHT;

    /* this factor controls the size of the blobs in the noise - increase for smaller blobs */
    const AMPLITUDE = ANIMATIONS[TYPE].cellFactor / MAP_WIDTH;
    const frequency = { x: AMPLITUDE, y: AMPLITUDE };

    /* increase number on range (1, 8) to go from water-like effect into clouds-like one */
    const octaves = ANIMATIONS[TYPE].octaves;

    /* change to false (or comment out) if you want to see the turbulence noise variant */
    const isFractal = true;

    /* create the turbulence effect we need for the map texture */
    const turbulence = effects.turbulence({
      noise: noise.simplex,
      frequency,
      isFractal,
    });

    const dissolveMap = new Kampos({
      target: mapTarget,
      effects: [turbulence],
      noSource: true,
    });

    /* create the dissolve map by generating a single noise frame */
    dissolveMap.draw();

    /* you can play with this value on the range of (0.0, 1.0) to go from hard clipping to a smooth smoke-like mask */
    const high = ANIMATIONS[TYPE].edge;

    /* create the effects/transitions we need */
    const dissolve = transitions.dissolve({ high });
    dissolve.map = mapTarget;

    /* init kampos */
    const instance = new Kampos({ target, effects: [dissolve] });

    /* make sure videos are loaded and playing*/
    Promise.all([
      loadImage(`https://picsum.photos/${MAP_WIDTH}/${MAP_HEIGHT}?random=1`),
      loadImage(`https://picsum.photos/${MAP_WIDTH}/${MAP_HEIGHT}?random=2`),
      loadImage(`https://picsum.photos/${MAP_WIDTH}/${MAP_HEIGHT}?random=3`),
      loadImage(`https://picsum.photos/${MAP_WIDTH}/${MAP_HEIGHT}?random=4`),
    ]).then((images) => {
      const width = MAP_WIDTH;
      const height = MAP_HEIGHT;
      let index = 0;

      if (DYNAMIC) {
        dissolve.textures[1].update = true;
      }

      /* paint initial scene */
      instance.setSource({ media: images[0], width, height });
      dissolve.to = images[1];
      instance.draw();

      function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
      }

      function changeImage(prevImage, nextImage) {
        /* set media source */
        instance.setSource({ media: prevImage, width, height });

        /* set media to transition into */
        dissolve.to = nextImage;

        const start = performance.now();

        /* start kampos */
        instance.play(function draw() {
          const time = performance.now() - start;

          /* this is invoked once in every animation frame */
          if (DYNAMIC) {
            turbulence.time = time * 2;
            dissolveMap.draw();
          }

          /* you can reduce time factor for slower transition, or increase for faster */
          const progress = easeOutCubic(time * (DYNAMIC ? 2e-4 : 4e-4));
          dissolve.progress = progress;

          if (progress * 100 >= 99.9) {
            instance.stop();

            // bind the event again
            bindClick();
          }
        });
      }

      function next() {
        const from = images[index];

        // next...
        index = (index + 1) % images.length;

        const to = images[index];

        changeImage(from, to);
      }

      function prev() {
        const from = images[index];

        // prev...
        index = (index - 1 + images.length) % images.length;

        const to = images[index];

        changeImage(from, to);
      }

      function click(event) {
        const { offsetX } = event;
        const width = targetRef.current.offsetWidth; // Use the width of the parent div

        targetRef.current.classList.remove('clickable');

        if (offsetX > width / 2) {
          next();
        } else {
          prev();
        }
      }

      function bindClick() {
        targetRef.current.classList.add('clickable');
        targetRef.current.addEventListener('click', click, { once: true });
      }

      bindClick();
    });
  }, []);

  return (
    <div ref={targetRef} className="relative h-[600px] w-full flex flex-col justify-center items-center">
      <canvas ref={canvasRef} id="target" className="absolute top-0 left-0 w-full h-full"></canvas>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-15"></div>
      <div className="flex flex-col justify-center items-center text-center z-10 text-white gap-6">
        <h2 className="text-5xl font-bold drop-shadow-extra-strong leading-[1.2] mt-20">
          Building the future,<br></br> restoring the past
        </h2>
        <p className="text-2xl drop-shadow-extra-strong leading-[1.4]">Aitame luua sinu unistuste kodu,<br></br>
        säilitame ja kanname edasi ajatuid väärtusi</p>
        <button className="bg-white bg-opacity-10 text-white text-xl font-roboto px-4 py-2 border border-white">Vaata</button>
      </div>
    </div>
  );
}





