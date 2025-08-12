# payments/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/payment/", views.index, name="api-payment"),
    path("booking-success/", views.booking_success, name="booking-success"),
    path("booking-cancelled/", views.booking_cancelled, name="booking-cancelled"),
]
