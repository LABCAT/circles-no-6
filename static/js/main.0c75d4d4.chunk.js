(this["webpackJsonpcircles-no-6"]=this["webpackJsonpcircles-no-6"]||[]).push([[0],{17:function(e,t,i){},30:function(e,t,i){"use strict";i.r(t);var n=i(1),a=i.n(n),o=i(9),s=i.n(o),r=(i(17),i(2));window.p5=r;i(19);var c=i(10),d=i(0);function h(){return Object(d.jsxs)("svg",{id:"play-icon",className:"fade-out",xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 0 24 24",width:"24",children:[Object(d.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(d.jsx)("path",{d:"M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"})]})}var u=i(11),l=i(12),g=function(){function e(t,i,n,a){Object(u.a)(this,e),this.p=t,this.x=i,this.y=n,this.colour=this.isObject(a)?a:this.p.color(a,100,100),this.hue=this.colour._getHue(),this.count=this.p.random(4,16),this.circles=[];for(var o=0;o<this.count;o++)this.circles.push({x:this.x,y:this.y,size:parseInt(this.p.random(16,64)),colour:this.p.color(this.hue,this.p.random(50,100),this.p.random(50,100))})}return Object(l.a)(e,[{key:"isObject",value:function(e){return"object"===typeof e&&null!==e&&!Array.isArray(e)}},{key:"draw",value:function(){for(var e=0;e<this.circles.length;e++){var t=this.circles[e],i=t.x,n=t.y,a=t.size,o=t.colour;a>0&&(this.p.fill(o._getHue(),o._getSaturation(),o._getBrightness(),.2),this.p.stroke(o),this.p.strokeWeight(2),this.p.ellipse(i,n,a,a),this.p.noFill(),this.p.ellipse(i,n,a/2,a/2),this.p.ellipse(i,n,a/4,a/4),this.circles[e].x=i-this.p.random(-40,40),this.circles[e].y=n-this.p.random(-40,40),this.circles[e].size=a-this.p.random(.1,.4))}}}]),e}(),p=i.p+"static/media/circles-no-6.bfb4df36.ogg",w=i.p+"static/media/circles-no-6.eaa06bdd.mid",f=function(){var e=Object(n.useRef)(),t=function(e){e.canvas=null,e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.audioLoaded=!1,e.player=null,e.PPQ=15360,e.loadMidi=function(){c.Midi.fromUrl(w).then((function(t){console.log(t);var i=t.tracks[12].notes,n=t.tracks[7].notes;e.scheduleCueSet(i,"executeCueSet1"),e.scheduleCueSet(n,"executeCueSet2"),e.audioLoaded=!0,document.getElementById("loader").classList.add("loading--complete"),document.getElementById("play-icon").classList.remove("fade-out")}))},e.preload=function(){e.song=e.loadSound(p,e.loadMidi),e.song.onended(e.logCredits)},e.scheduleCueSet=function(t,i){for(var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=-1,o=1,s=0;s<t.length;s++){var r=t[s],c=r.ticks,d=r.time;(c!==a||n)&&(r.currentCue=o,e.song.addCue(d,e[i],r),a=c,o++)}},e.maxDist=0,e.baseHue=0,e.baseHueOptions=[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340],e.stepSize=60,e.setup=function(){e.canvas=e.createCanvas(e.canvasWidth,e.canvasHeight),e.background(0),e.background(0,0,100),e.colorMode(e.HSB),e.maxDist=e.dist(0,0,e.width,e.height)},e.draw=function(){e.audioLoaded&&e.song.isPlaying()&&e.bubbleCircles.forEach((function(e){e.draw()}))},e.backgroundX=0,e.backgroundY=0,e.bgCirles=[],e.bgDelay=[],e.colourSet=[],e.centerLocations=[],e.setPatternCenter=function(t){var i=0===t?7:t,n=e.width/2-e.width/8,a=e.width/2+e.width/8,o=e.height/2-e.height/8,s=e.height/2+e.height/8;if(i>3){if(4===i)for(var r=0;r<4;r++)e.centerLocations[r]={lowX:r%2?e.width/8:e.width/2+e.width/8,upX:r%2?e.width/2-e.width/8:e.width-e.width/8,lowY:r<2?e.height/8:e.height/2+e.height/8,upY:r<2===1?e.height/2-e.height/8:e.height-e.height/8},e.shuffle(e.centerLocations);var c=e.centerLocations[i-4];n=c.lowX,a=c.upX,o=c.lowY,s=c.upY}else i>2?(n=e.width/2+e.width/8,a=e.width-e.width/8):i>1&&(n=e.width/8,a=e.width/2-e.width/8);e.backgroundX=e.random(n,a),e.backgroundY=e.random(o,s)},e.executeCueSet1=function(t){var i=t.currentCue;if(i%7===1){i>7&&(e.stepSize=e.stepSize-10),e.baseHue=parseInt(e.random(e.baseHueOptions));var n=function(e,t){for(var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:100,a=[],o=0;o<4;){t=(t+=90*o)<360?t:t-360;var s=e.color(t,i,n,1);a.push(s),o++}return a}(e,e.baseHue);e.colourSet=[];for(var a=0;a<n.length;a++){var o=n[a],s=parseInt(o._getHue());0===a?e.baseHue=s:e.colourSet.push(s)}}e.background(0),e.setPatternCenter(i%7);e.width>=e.height?(Math.max(e.backgroundX,e.width-e.backgroundX),e.stepSize):(Math.max(e.backgroundY,e.height-e.backgroundY),e.stepSize);for(var r=0,c=0;c<=e.width+e.stepSize;c+=e.stepSize)for(var d=0;d<=e.height+e.stepSize;d+=e.stepSize){var h=e.dist(e.backgroundX,e.backgroundY,c,d);h=h/e.maxDist*66,e.bgCirles[r]={x:c,y:d,size:h},r++}e.noStroke();for(var u=0;u<e.bgCirles.length;u++){e.fill(e.baseHue,100,100,90/e.bgCirles.length*u/100);var l=e.bgCirles[u],g=l.x,p=l.y,w=l.size;e.ellipse(g,p,w,w)}},e.bubbleCircles=[],e.executeCueSet2=function(t){var i=t.currentCue;i%7===1&&(e.bubbleCircles=[]),e.bubbleCircles[i%7]=new g(e,e.backgroundX,e.backgroundY,e.colourSet[i%3])},e.hasStarted=!1,e.mousePressed=function(){e.audioLoaded&&(e.song.isPlaying()?e.song.pause():(parseInt(e.song.currentTime())>=parseInt(e.song.buffer.duration)&&(e.reset(),"undefined"!==typeof window.dataLayer&&window.dataLayer.push({event:"play-animation",animation:{title:document.title,location:window.location.href,action:"replaying"}})),document.getElementById("play-icon").classList.add("fade-out"),e.canvas.addClass("fade-in"),e.song.play(),"undefined"===typeof window.dataLayer||e.hasStarted||(window.dataLayer.push({event:"play-animation",animation:{title:document.title,location:window.location.href,action:"start playing"}}),e.hasStarted=!1)))},e.creditsLogged=!1,e.logCredits=function(){!e.creditsLogged&&parseInt(e.song.currentTime())>=parseInt(e.song.buffer.duration)&&(e.creditsLogged=!0,console.log("Music By: http://labcat.nz/","\n","Animation By: https://github.com/LABCAT/"),e.song.stop())},e.reset=function(){},e.updateCanvasDimensions=function(){e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.canvas=e.resizeCanvas(e.canvasWidth,e.canvasHeight)},window.attachEvent?window.attachEvent("onresize",(function(){e.updateCanvasDimensions()})):window.addEventListener&&window.addEventListener("resize",(function(){e.updateCanvasDimensions()}),!0)};return Object(n.useEffect)((function(){new r(t,e.current)}),[]),Object(d.jsx)("div",{ref:e,children:Object(d.jsx)(h,{})})};var b=function(){return Object(d.jsx)(f,{})};s.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(b,{})}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.0c75d4d4.chunk.js.map