import os

def get_imgs():
    imgs_folder = os.walk('search/static/img/bg')

    imgs = [ '/static/img/bg/' + str(i) for i in list(imgs_folder)[0][2] ]

    return imgs