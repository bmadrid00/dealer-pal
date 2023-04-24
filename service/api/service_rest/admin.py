from django.contrib import admin
from .models import Appointment, AutomobileVO, Technician

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display=['id']

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    list_display=['id']


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display=['id']
