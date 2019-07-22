
var gameWidth = 640;

var gameHeight = 320;

var player = {
    x: 300, // X position of the player, distance to the right of the upper top left corner.
    y: 220, // Y position of the player, distance down from the upper top left corner.
    h: 50, //Height of the player
    w: 20, //Width of the player
    playerColor: 'tan', //color of the player
    isMoving: false, //checks if the player isw moving
    isJumping: false, //checks if the player is jumping up
    isFalling: false, // checks if the player is falling down after jumping
    isOnGround: true //checks if the player is on the ground
}

var ground = { //dimentions of the ground
    x: 0,
    y: 270,
    h: 50, //must be same height as the player for collision to work properly
    w: gameWidth, //ground takes up the entire width of the game-area
    groundColor: '#3b2508'
}

var jumpUP = function() { //if jumpUP is called
  if(player.y == 220) { // and if the player's height is currently where it would be if he was 
                        // standing on the ground, ie: not mid-jump.
    player.isOnGround = false; //he is no-longer on the ground
    player.isFalling = false; //he is not falling yet
    player.isJumping = true; //he is in fact jumping
    };
  }

var fallDown = function() { //if fallDown is called
    player.isOnGround = false; //he is no-longer on the ground
    player.isFalling = true; //he is now falling
    player.isJumping = false; //he is not jumping up
  }

var touchGround = function() { //if touchGround is called
    player.isOnGround = true; //the player is on the ground
    player.isFalling = false; //the player is no longer falling, because the ground is solid and all
    //no need to say isJumping = false because fallDown already declared that, 
    //also it would prevent jumping once on the ground
}

var jump = function() { //if jump is called
  player.y = player.y - 5; //the player's y coordinate is changed by moving -5 pixels 
                           //from the top of the screen everytime it's called
}

var fall = function() { //if fall is called
  player.y = player.y + 5; //the player's y coordinate is changed by moving 5 pixels 
                           //from the top of the screen everytime it's called
}

var stand = function() { //if stand is called
  player.y = player.y; //the player's y coordinate doesn't move
}

var canvas = document.getElementById("mycanvas"); //looks at the canvas I think...
      var ctx = canvas.getContext("2d"); //gets context that it's 2d I guess.


    window.addEventListener("keydown", keyPress, false); //if any key is pressed it calls keyPress
    window.addEventListener("keyup", keyUnPress, false); //if any key stops being pressed it calls KeyUnPress

    function keyPress(e) { //if a key is pressed
      if (e.keyCode == "32") { //and that key's keycode is 32 (spacebar)
          jumpUP() //call jumpUP
      }
  }
  function keyUnPress(e) { //if a key stops being pressed
    if (e.keyCode == "32") { //and that key's keycode is 32 (spacebar)
        fallDown() //call fallDown
    }
}

      // canvas.addEventListener('mousedown', jumpUP); //edited out mouse events that I used to test jumping
      // canvas.addEventListener('mouseup', fallDown);

      var update = function() { //updates the current position of the elements that changed (ie: if the player moves)
  
        if(checkCollision(player, ground)){ //sends 'player' and 'ground' to be checked for collision
                          //if true
          touchGround();  //call touchGround
      }

        //update player
        if(player.isJumping) { //if isJumping is true
          jump() //call jump (and keep calling until it's false)
        }
        if(player.isFalling) { //if isFalling is true
          fall() //call fall (and keep calling until it's false)
        }
        if(player.isOnGround) { //if isOnGround is true
          stand() //call stand (and keep calling until it's false)
        };
         //Gravity
        var topLimit = player.y == 180 - player.h; //topLimit is true when the top of the player player hits y=180.
        //maximum height you can jump before falling

        if(topLimit) { //if topLimit is true
          fallDown(); //call fallDown
        }

    };

    var draw = function() { //draws all changes on the canvas
  
        ctx.clearRect(0,0,gameWidth,gameHeight); //clears the canvas from the upper left corner, to the bottom right W,H,W,H

        //the player being drawn

        ctx.fillStyle = player.playerColor; //chooses the player's color, what it will fill in 'player' with

        //remember to capitalize the second part word fill(S)tyle!!!

    ctx.fillRect(player.x, player.y, player.w, player.h); //fills in the space between the coodinates of the 
                                                          //dimentions of the player
    
      ctx.fillStyle = ground.groundColor; //chooses the ground's color, what it will fill in 'ground' with

    ctx.fillRect(ground.x, ground.y, ground.w, ground.h); //fills in the space between the coodinates of the 
                                                          //dimentions of the ground
    };

    var step = function() { //everytime step is called
    

        update(); //it will call update first
        draw(); //then it will call draw

        window.requestAnimationFrame(step); //umm... idk what this does
    };

    var checkCollision = function(rect1, rect2) { //checks two elements sent to it
      var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);  //if the widths are close, 
                                                                                     //closeOnWidth is true
      var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h); //if the height is close,
                                                                                     //closeOnHeight is true
  
      return closeOnHeight && closeOnWidth; //if both closeOnWidth and closeOnHeight are true,
                                            //checkCollision returns true
  };

        step(); //calls step (so kinda a loop.)
