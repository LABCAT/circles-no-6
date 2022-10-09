import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import { Midi } from '@tonejs/midi'
import PlayIcon from './functions/PlayIcon.js';
import { TetradicColourCalculator } from './functions/ColourCalculators';
import BubbleCircles from './classes/BubbleCircles';

import audio from "../audio/circles-no-6.ogg";
import midi from "../audio/circles-no-6.mid";

const P5SketchWithAudio = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.audioLoaded = false;

        p.player = null;

        p.PPQ = 3840 * 4;

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    console.log(result);
                    const noteSet1 = result.tracks[12].notes; // SubTractor 1 - HyperBottom
                    const noteSet2 = result.tracks[7].notes; // Combinator 2 - Gates of Heaven
                    p.scheduleCueSet(noteSet1, 'executeCueSet1');
                    p.scheduleCueSet(noteSet2, 'executeCueSet2');
                    p.audioLoaded = true;
                    document.getElementById("loader").classList.add("loading--complete");
                    document.getElementById("play-icon").classList.remove("fade-out");
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
            p.song.onended(p.logCredits);
        }

        p.scheduleCueSet = (noteSet, callbackName, poly = false)  => {
            let lastTicks = -1,
                currentCue = 1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks || poly){
                    note.currentCue = currentCue;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                    currentCue++;
                }
            }
        } 

        p.maxDist = 0;

        p.baseHue = 0;
        
        p.baseHueOptions = [0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340];

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.background(0);
            p.colorMode(p.HSB);
            p.maxDist = p.dist(0, 0, p.width, p.height);
         
        }

        p.draw = () => {
            if(p.audioLoaded && p.song.isPlaying()){
                p.bubbleCircles.forEach(circles => {
                    circles.draw();
                });
            }
        }

        p.backgroundX = 0;

        p.backgroundY = 0;

        p.bgCirles = [];

        p.bgDelay = [];

        p.colourSet = [];

        p.executeCueSet1 = (note) => {
            const stepSize = 20,
                { currentCue } = note;
            if(currentCue % 7 === 1) {
                p.baseHue = parseInt(p.random(p.baseHueOptions));
                const colours = TetradicColourCalculator(p, p.baseHue);
                p.colourSet = [];
                colours.forEach(colour => {
                    const hue = parseInt(colour._getHue());
                    if(hue  !== p.baseHue) {
                        p.colourSet.push(hue);
                    }
                });
            }
            
            p.background(0);
            p.backgroundX = p.random(0, p.width);
            p.backgroundY = p.random(0, p.height);
            let count = 0;
            for(let i = 0; i <= p.width + stepSize; i += stepSize) {
                for(let j = 0; j <= p.height + stepSize; j += stepSize) {
                    let size = p.dist(p.backgroundX, p.backgroundY, i, j);
                    size = size / p.maxDist * 66;
                    p.bgCirles[count] = {
                        x: i,
                        y: j,
                        size: size
                    }
                    count++;
                }
            }

            p.fill(p.baseHue, 100, 100);
            p.noStroke();
            for (let i = 0; i < p.bgCirles.length; i++) {
                const bgCirle = p.bgCirles[i],
                    { x, y, size } = bgCirle;
                p.ellipse(x, y, size, size);
            }
        }

        p.bubbleCircles = [];

        p.executeCueSet2 = (note) => {
            const { currentCue } = note;

            if(currentCue % 7 === 1) {
                p.bubbleCircles = [];
            }

            p.bubbleCircles[currentCue % 7] = new BubbleCircles(
                p,
                p.backgroundX,
                p.backgroundY,
                p.colourSet[currentCue % 3]
            );

        }   

        p.hasStarted = false;

        p.mousePressed = () => {
            if(p.audioLoaded){
                if (p.song.isPlaying()) {
                    p.song.pause();
                } else {
                    if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                        p.reset();
                        if (typeof window.dataLayer !== typeof undefined){
                            window.dataLayer.push(
                                { 
                                    'event': 'play-animation',
                                    'animation': {
                                        'title': document.title,
                                        'location': window.location.href,
                                        'action': 'replaying'
                                    }
                                }
                            );
                        }
                    }
                    document.getElementById("play-icon").classList.add("fade-out");
                    p.canvas.addClass("fade-in");
                    p.song.play();
                    if (typeof window.dataLayer !== typeof undefined && !p.hasStarted){
                        window.dataLayer.push(
                            { 
                                'event': 'play-animation',
                                'animation': {
                                    'title': document.title,
                                    'location': window.location.href,
                                    'action': 'start playing'
                                }
                            }
                        );
                        p.hasStarted = false
                    }
                }
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (
                !p.creditsLogged &&
                parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
                p.creditsLogged = true;
                    console.log(
                    "Music By: http://labcat.nz/",
                    "\n",
                    "Animation By: https://github.com/LABCAT/"
                );
                p.song.stop();
            }
        };

        p.reset = () => {

        }

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.canvas = p.resizeCanvas(p.canvasWidth, p.canvasHeight);
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
            <PlayIcon />
        </div>
    );
};

export default P5SketchWithAudio;
