let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Game variables
let yoshi = { x: 200, y: 200, hearts: 3, speed: 5 };
let blueBalls = [];
let score = 0;
let ballSpeed = 2;
let gameOver = false;

// Draw Yoshi
function drawYoshi() {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(yoshi.x, yoshi.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(yoshi.x - 10, yoshi.y - 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(yoshi.x + 10, yoshi.y - 10, 5, 0, Math.PI * 2);
    ctx.fill();
}

// Draw blue energy balls
function drawBlueBalls() {
    for (let i = 0; i < blueBalls.length; i++) {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(blueBalls[i].x, blueBalls[i].y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Update game state
function update() {
    if (!gameOver) {
        // Move Yoshi
        if (keysDown['ArrowLeft']) {
            yoshi.x -= yoshi.speed;
        }
        if (keysDown['ArrowRight']) {
            yoshi.x += yoshi.speed;
        }
        if (keysDown['ArrowUp']) {
            yoshi.y -= yoshi.speed;
        }
        if (keysDown['ArrowDown']) {
            yoshi.y += yoshi.speed;
        }

        // Boundary check
        if (yoshi.x < 0) yoshi.x = 0;
        if (yoshi.x > canvas.width) yoshi.x = canvas.width;
        if (yoshi.y < 0) yoshi.y = 0;
        if (yoshi.y > canvas.height) yoshi.y = canvas.height;

        // Move blue energy balls
        for (let i = 0; i < blueBalls.length; i++) {
            blueBalls[i].y += ballSpeed;
            if (blueBalls[i].y > canvas.height) {
                blueBalls.splice(i, 1);
            }
        }

        // Collision detection
        for (let i = 0; i < blueBalls.length; i++) {
            let distance = Math.sqrt(Math.pow(yoshi.x - blueBalls[i].x, 2) + Math.pow(yoshi.y - blueBalls[i].y, 2));
            if (distance < 20) {
                yoshi.hearts--;
                blueBalls.splice(i, 1);
                if (yoshi.hearts === 0) {
                    gameOver = true;
                }
            }
        }

        // Add new blue energy balls
        if (Math.random() < 0.05) {
            blueBalls.push({ x: Math.random() * canvas.width, y: 0 });
        }

        // Update score
        score++;

        // Draw everything
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawYoshi();
        drawBlueBalls();
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('Score: ' + score, 10, 10);
        ctx.fillText('Hearts: ' + yoshi.hearts, 10, 40);
    } else {
        ctx.font = '48px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2 + 30);
    }

    requestAnimationFrame(update);
}

// Handle keyboard input
let keysDown = {};
document.addEventListener('keydown', event => {
    keysDown[event.key] = true;
});
document.addEventListener('keyup', event => {
    delete keysDown[event.key];
});

## Start the game

update();
