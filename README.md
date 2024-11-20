Here's a simple implementation of Yoshi dodging blue energy balls using Pygame.
Yoshi Dodging Game

Requirements

Python 3
Pygame
Code

Python
import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Set up some constants
WIDTH, HEIGHT = 640, 480
YOSHI_SIZE = 50
ENERGY_BALL_SIZE = 20
YOSHI_SPEED = 5
ENERGY_BALL_SPEED = 3

# Create the game screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))

# Define some colors
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Yoshi class
class Yoshi(pygame.Rect):
    def __init__(self):
        super().__init__(WIDTH / 2, HEIGHT - YOSHI_SIZE * 2, YOSHI_SIZE, YOSHI_SIZE)

    def move(self, keys):
        if keys[pygame.K_LEFT] and self.left > 0:
            self.x -= YOSHI_SPEED
        if keys[pygame.K_RIGHT] and self.right < WIDTH:
            self.x += YOSHI_SPEED

# EnergyBall class
class EnergyBall(pygame.Rect):
    def __init__(self):
        super().__init__(random.randint(0, WIDTH - ENERGY_BALL_SIZE), 0, ENERGY_BALL_SIZE, ENERGY_BALL_SIZE)

    def move(self):
        self.y += ENERGY_BALL_SPEED

# Score class
class Score:
    def __init__(self):
        self.value = 0
        self.font = pygame.font.Font(None, 36)

    def display(self):
        text = self.font.render(f'Score: {self.value}', True, (255, 255, 255))
        screen.blit(text, (10, 10))

# Initialize game objects
yoshi = Yoshi()
energy_ball = EnergyBall()
score = Score()
clock = pygame.time.Clock()

# Game loop
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    keys = pygame.key.get_pressed()
    yoshi.move(keys)

    energy_ball.move()
    if energy_ball.bottom > HEIGHT:
        energy_ball = EnergyBall()
        score.value += 1
    if yoshi.colliderect(energy_ball):
        pygame.quit()
        sys.exit()

    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, GREEN, yoshi)
    pygame.draw.rect(screen, BLUE, energy_ball)
    score.display()
    pygame.display.flip()

    clock.tick(60)
How to Run

Install Pygame using pip: pip install pygame
Save the code in a file named yoshi_game.py
Run the game using Python: python yoshi_game.py
import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Set up some constants
WIDTH, HEIGHT = 640, 480
YOSHI_SIZE = 50
ENERGY_BALL_SIZE = 20
YOSHI_SPEED = 5
ENERGY_BALL_SPEED = 3

# Create the game screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))

# Define some colors
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
WHITE = (255, 255, 255)

# Yoshi class
class Yoshi(pygame.Rect):
    def __init__(self):
        super().__init__(WIDTH / 2, HEIGHT - YOSHI_SIZE * 2, YOSHI_SIZE, YOSHI_SIZE)

    def move(self, keys):
        if keys[pygame.K_LEFT] and self.left > 0:
            self.x -= YOSHI_SPEED
        if keys[pygame.K_RIGHT] and self.right < WIDTH:
            self.x += YOSHI_SPEED

# EnergyBall class
class EnergyBall(pygame.Rect):
    def __init__(self):
        super().__init__(random.randint(0, WIDTH - ENERGY_BALL_SIZE), 0, ENERGY_BALL_SIZE, ENERGY_BALL_SIZE)

    def move(self):
        self.y += ENERGY_BALL_SPEED

# Score class
class Score:
    def __init__(self):
        self.value = 0
        self.font = pygame.font.Font(None, 36)

    def display(self):
        text = self.font.render(f'Score: {self.value}', True, WHITE)
        screen.blit(text, (10, 10))

# Initialize game objects
yoshi = Yoshi()
energy_balls = [EnergyBall()]
score = Score()
clock = pygame.time.Clock()

# Game loop
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    keys = pygame.key.get_pressed()
    yoshi.move(keys)

    for energy_ball in energy_balls:
        energy_ball.move()
        if energy_ball.bottom > HEIGHT:
            energy_balls.remove(energy_ball)
            score.value += 1
        if yoshi.colliderect(energy_ball):
            # Game over
            screen.fill((0, 0, 0))
            text = pygame.font.Font(None, 64).render('Game Over', True, WHITE)
            screen.blit(text, (WIDTH / 2 - text.get_width() / 2, HEIGHT / 2))
            pygame.display.flip()
            pygame.time.wait(2000)
            pygame.quit()
            sys.exit()

    if random.random() < 0.05:
        energy_balls.append(EnergyBall())

    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, GREEN, yoshi)
    for energy_ball in energy_balls:
        pygame.draw.rect(screen, BLUE, energy_ball)
    score.display()
    pygame.display.flip()

    clock.tick(60)
