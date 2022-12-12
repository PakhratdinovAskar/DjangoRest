from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .models import Image as ModelImage
from .models import Video as ModelVideo
from .models import Person

def index(request):
    return render(request, 'DjangoRestAjax/index.html')


def register(request):
    if(request.POST['submit'] == 'Вход' and request.POST['login'] !='' and request.POST['password'] != ''):
        person = Person.objects.get(login = request.POST['login'], password = request.POST['password'])

        if person:
            return render(request, 'DjangoRestAjax/menu.html', {'person':person.id})
        else:
            return redirect(index)

    elif(request.POST['login'] !='' and request.POST['password'] != ''):
        person = Person.objects.create(login = request.POST['login'], password = request.POST['password'])
        return render(request, 'DjangoRestAjax/menu.html', {'person':person.id})
    else:
        return redirect(index)


class Image(APIView):
    def post(self, request):
            # unloadImage.objects.create(image=request.FILES['file'])
            # image = unloadImage.objects.all()
            print(request.POST['personId'])
            print('///////////////////')
            print(request.FILES['file'])
            print('///////////////////')
            loadImage = ModelImage()
            loadImage.url = request.FILES['file']
            loadImage.person = Person.objects.get(id=request.POST['personId'])
            loadImage.save()
        # Сериализуем извлечённый набор записей
            imageSerializer = ImageSerializer(instance=loadImage, many=False)
            return Response(imageSerializer.data)

    def get(self, request):
        # image = Image.objects.filter(person=request.GET['personId'])
        image = ModelImage.objects.filter(person=request.GET['personId']).order_by('-id')
        print(image)
        # img = reversed(list(image))
        # print('///////////////////////////////////////////')
        # print(img)
        imageSerializer = ImageSerializer(instance=image, many=True)
        print(imageSerializer)
        return Response(imageSerializer.data)


# def video(request):
#     print('22222222222')
#     return HttpResponse('http://127.0.0.1:8000/media/video/monkey-dance.mp4')

class Video(APIView):
    def get(self, request):
        video = ModelVideo.objects.all().order_by('-id')
        print(video)
        # img = reversed(list(image))
        # print('///////////////////////////////////////////')
        # print(img)
        videoSerializer = VideoSerializer(instance=video, many=True)
        return Response(videoSerializer.data)