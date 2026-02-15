from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from apis.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView
from drf_spectacular.utils import extend_schema


@extend_schema(exclude=True)
class PrivateSchemaView(SpectacularAPIView):
    pass

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/referesh/", TokenRefreshView.as_view(), name="get_refresh_token"),
    path("api-auth/", include('rest_framework.urls')),
    path("notes/", include("apis.urls"))
]

if settings.DEBUG:
    urlpatterns += [
        path('api/schema/', PrivateSchemaView.as_view(), name='schema'),
        path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),
    ]