from django.urls import path
from .views import NoteDelete, NoteListCreate

urlpatterns = [
    path("", NoteListCreate.as_view(), name="note_list"),
    path("delete/<int:pk>", NoteDelete.as_view(), name="note_delete")
]
