/*! Using p5.js */
import {Conway} from "./js/Conway.js"
import {Ball} from "./js/Ball.js";

(() => {
    let conway, ball, timer;
    let newFps, slider, sliderVal;
    let navBar;
    let fps = 30;
    const k = 150;

    window.setup = function () {
        //set resolution
        const resolution = innerWidth > innerHeight ? innerWidth / k : innerHeight / k;

        //initialize canvas
        const canvas = window.createCanvas(resolution * k, resolution * k);
        canvas.parent('sketch-div');

        //set fps
        frameRate(fps);

        //set timer
        timer = 6 * fps;

        //configure slider
        slider = document.getElementById("ranging");

        //configure navbar
        navBar = document.getElementById("navbar");

        //initialize sketches
        conway = new Conway(resolution, "white");
        ball = new Ball(window.innerWidth/2,window.innerHeight/2, 0, 300 / fps);
    }

    window.draw = function () {
        //clear frame
        clear();
        background(246, 113, 157);

        //adjust frame speed from slider
        sliderVal = Math.ceil(slider.value/10);
        switch (sliderVal) {
            case 0: newFps = 1; break;
            case 1: newFps = 2; break;
            case 2: newFps = 3; break;
            case 3: newFps = 5; break;
            case 4: newFps = 7; break;
            case 5: newFps = 10; break;
            case 6: newFps = 15; break;
            case 7: newFps = 20; break;
            case 8: newFps = 25; break;
            case 9: newFps = 30; break;
            case 10: newFps = 60; break;
            default: break;
        }
        if (newFps !== fps) {
            fps = newFps;
            frameRate(fps);
        }

        //on mouse click
        if (window.mouseIsPressed
            && window.mouseY < window.innerWidth - navBar.offsetHeight) {
            timer = 3 * fps;
            ball.x = window.mouseX;
            ball.y = window.mouseY;
        }

        //draw sketches
        conway.draw();
        //ball time limit
        if (timer > 0) {
            ball.draw();
            conway.grow(ball.x, ball.y);
            if (ball.detectWallCollision()) ball.wallCollisionResolution();
        }
        //manage timer
        timer > 0 ? timer -= 1 : timer = 0;
    }

    window.mouseDragged = function () {
        //ball interaction
        if (window.mouseY < window.innerWidth - navBar.offsetHeight) {
            let dx = window.winMouseX - window.pwinMouseX;
            let dy = window.winMouseY - window.pwinMouseY;
            let angle = Math.atan2(dy, dx);
            ball.dirY = Math.sin(angle);
            ball.dirX = Math.cos(angle);
            ball.v = max(Math.abs(dx), Math.abs(dy));
        }
    }


    window.windowResized = function () {
        const resolution  = innerWidth > innerHeight ? innerWidth / k : innerHeight / k;
        window.resizeCanvas(resolution * k, resolution * k);

        //update sketches
        conway.resolution = resolution;
    }

})();
