//canvas variables
var canvas = document.getElementById('practice');
var ctx = canvas.getContext('2d');

//game variables
var startingScore = 50;
var continueAnimating = false;
var score;

//block variables
var gem = new Image(); // Create new img element
gem.src = 'img/diamond.png';
var blockWidth = 35;
var blockHeight = 35;
var blockSpeed = 55;
var block = {
  x: 0,
  y: canvas.height - blockHeight,
  width: blockWidth,
  height: blockHeight,
  blockSpeed: blockSpeed
};

//rock variables
var drop = new Image(); // Create new img element
drop.src = 'img/drop.png';
var rockWidth = 15;
var rockHeight = 15;
var totalRocks = 10;
var rocks = [];

for (var i = 0; i < totalRocks; i++) {
  addRock();
}

function addRock() {
  var rock = {
    width: rockWidth,
    height: rockHeight
  };
  resetRock(rock);
  rocks.push(rock);
}

//Rock position and speed
function resetRock(rock) {
  rock.x = Math.random() * (canvas.width - rockWidth);
  rock.y = 15 + Math.random() * 30;
  rock.speed = 7 + Math.random() * 0.5;
}


//Moving hero left and right
document.onkeydown = function(event) {
  if (event.keyCode === 39) {
    event.preventDefault();
    block.x += block.blockSpeed;
    if (block.x >= canvas.width - block.width) {
      continueAnimating = false;
      alert("Game Over " + score);
    }
  } else if (event.keyCode == 37) {
    event.preventDefault();
    block.x -= block.blockSpeed;
    if (block.x <= 0) {
      block.x = 0;
      if (block.x <= canvas.width - block.width) {
        continueAnimating = false;
        alert("Game Over" + score);
      }
    }
  }
};

function animate() {
  if (continueAnimating) {
    requestAnimationFrame(animate);
  }


  //checking collision
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];


    //rock-block collision test
    if (isColliding(rock, block)) {
      score -= 10;
      resetRock(rock);

      if (score <= 0) {
        continueAnimating = false;
        alert("game over");
      }



    }

    //rocks moving downs
    rock.y += rock.speed;


    //rock below canvas
    if (rock.y > canvas.height) {
      resetRock(rock);
    }
  }
  drawAll();

}

function isColliding(a, b) {
  return !(
    b.x > a.x + a.width || b.x + b.width < a.x ||
    b.y > a.y + a.height || b.y + b.height < a.y);
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFB36C";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //hero
  ctx.drawImage(gem, block.x, block.y, block.width, block.height);

  //rocks
  for (var i = 0; i < rocks.length; i++) {
    var rock = rocks[i];
    ctx.fillstyle = "black";
    ctx.drawImage(drop, rock.x, rock.y, rock.width, rock.height);
  }

  //Score menu
  ctx.font = "20px Monoton";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 15);
}

$("#start").click(function() {
  score = startingScore;
  block.x = 100;
  for (var i = 0; i < rocks.length; i++) {
    resetRock(rocks[i]);
  }
  if (!continueAnimating) {
    continueAnimating = true;
    animate();
  }
});

drawAll();
