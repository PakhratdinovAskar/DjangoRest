from rest_framework import serializers


class ImageSerializer(serializers.Serializer):
    url = serializers.ImageField()

class VideoSerializer(serializers.Serializer):
    url = serializers.FileField()