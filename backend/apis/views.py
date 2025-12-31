from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, NoteSerialzer
from .models import Note


class NoteListCreate(generics.ListCreateAPIView): # list and let create new one
    serializer_class = NoteSerialzer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_note: Note = Note.objects.filter(author=user)    
        return user_note
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            return serializer.errors
        
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerialzer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_note: Note = Note.objects.filter(author=user)    
        return user_note
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


    