from django.urls import path
from .views import api_technicians, api_technician, api_appointment, api_appointment_cancel, api_appointment_finish, api_appointments

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:employee_id>/", api_technician, name="api_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:pk>/", api_appointment, name="api_appointment"),
    path("appointments/<int:pk>/cancel/", api_appointment_cancel, name="api_appointment_cancel"),
    path("appointments/<int:pk>/finish/", api_appointment_finish, name="api_appointment_finish"),
]
