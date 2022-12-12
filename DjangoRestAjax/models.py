from django.db import models

# Create your models here.
class Person(models.Model):
    login = models.TextField()
    password = models.TextField()

class Image(models.Model):
    url = models.ImageField(upload_to='image/')
    person = models.ForeignKey('Person', on_delete=models.CASCADE)

class Video(models.Model):
    url = models.FileField(upload_to='video/')
    person = models.ForeignKey('Person', on_delete=models.CASCADE)


# class unloadImage(models.Model):
#     image = models.ImageField(upload_to='image/')
#
# class unloadVideo(models.Model):
#     video = models.FileField(upload_to='video/')
