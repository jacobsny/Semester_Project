import pygame
#import psyco#
#psyco.full()#
pygame.init()

def game(xaxis, yaxis):
    kill = True
    screen = pygame.display.set_mode((500, 500)) #update for ratio aspects in the future#
    screen.fill([255, 255, 255])
    x = 50
    y = 50
    once = 0
    later = [x, y] #until i figure out how to have a val update in a function
    while kill:
        pygame.time.delay(100)
        for run in pygame.event.get():
            if run.type == pygame.QUIT:
                pygame.quit()
                kill = False
        l = window(xaxis, yaxis, later, screen)
        later = l

def collectbles(screen, holders, x, y):
        normal = (255, 0, 255)
        for i in holders:
            pygame.draw.rect(screen, normal, (i[0], i[1], 6, 12))


def window(xaxis, yaxis, later, screen):
    pygame.display.set_caption("tester")
    x = later[0]
    y = later[1]
    vel = 10
    updatelater = playerprofile(x, y, vel)
    screen.fill([255, 255, 255])
    holders = [[120, 120], [130, 130]]  ## Just to see if they display, the function in the backend will remove them
    collectbles(screen, holders, x, y)
    pygame.draw.circle(screen, (0, 255, 17), (updatelater[0], updatelater[1]), updatelater[2])
    dirt = (updatelater[0], updatelater[1])
    pygame.display.update()
    return dirt



def playerprofile(x, y, vel): #your going to need to add a name parameter in here which can return a plyer#
    width = 40
    #height = 60#
    move = pygame.key.get_pressed()
    if move[pygame.K_LEFT]:
        x = x - vel
    if move[pygame.K_RIGHT]:
        x = x + vel
    if move[pygame.K_UP]:
        y = y - vel
    if move[pygame.K_DOWN]:
        y = y + vel
    return [x, y, width, vel] #gunna need to include char names#



if __name__ == '__main__':
    game(10, 10)
    pygame.quit()