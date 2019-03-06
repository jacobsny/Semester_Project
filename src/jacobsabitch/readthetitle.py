import pygame
#import psyco#
#psyco.full()#
pygame.init()

def game(xaxis, yaxis):
    kill = True
    screen = pygame.display.set_mode((500, 500)) #update for ratio aspects in the future#
    screen.fill([255, 255, 255]) #TEST#
    x = 50
    y = 50
    holders = [[120, 120], [430, 130]]
    later = [x, y] #until i figure out how to have a val update in a function
    while kill:
        pygame.time.delay(100)
        for run in pygame.event.get():
            if run.type == pygame.QUIT:
                pygame.quit()
                kill = False
        l = window(xaxis, yaxis, later, screen, holders)
        later = l[0]
        holders = l[1]

def collectbles(screen, holders, x, y):
        normal = (255, 0, 255)
        why = []
        counter = 0
        for i in holders:
            pygame.draw.rect(screen, normal, (i[0], i[1], 6, 12))
            why.append([i[0], i[1]])
            if i[0] == x and i[1] == y: #THIS IS A BAREBONES FUNCTION FOR DEMO ONE ONLY#
                pygame.draw.rect(screen, (255, 255, 255), (i[0], i[1], 6, 12))
                why.remove([i[0], i[1]])
                counter + 1
        return why




def window(xaxis, yaxis, later, screen, holders):
    pygame.display.set_caption("tester")
    x = later[0]
    y = later[1]
    vel = 10
    updatelater = playerprofile(x, y, vel)
    screen.fill([255, 255, 255])
    ## Just to see if they display, the function in the backend will remove them
    why = collectbles(screen, holders, updatelater[0], updatelater[1])
    pygame.draw.circle(screen, (0, 255, 17), (updatelater[0], updatelater[1]), updatelater[2])
    dirt = (updatelater[0], updatelater[1])
    pygame.display.update()
    return [dirt, why]



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