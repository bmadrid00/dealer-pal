from django.shortcuts import render
from .encoders import AppointmentEncoder, AutomobileVOEncoder, TechnicianEncoder
from .models import Appointment, AutomobileVO, Technician
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve Technicians"}, status=400)
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Unable to create Technician"}, status=400)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


@require_http_methods(["GET", "DELETE", "PUT"])
def api_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve Technician"}, status=400)
        return JsonResponse({"technician": technician}, encoder=TechnicianEncoder)
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=pk).delete()
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Unable to delete Technician"}, status=400)
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            Technician.objects.filter(id=pk).update(**content)
            technician = Technician.objects.get(id=pk)
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Unable to update Technician information"}, status=400)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve Appointments"}, status=400)
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_id=content['technician'])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician id"},
                status=400,
            )
        try:
            appointment = Appointment.objects.create(**content)
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Unable to create Appointment"}, status=400)
        return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)

@require_http_methods(["GET", "POST", "DELETE"])
def api_appointment(request, pk):
    if request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=pk).delete()
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Unable to delete Appointment"}, status=400)
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["PUT"])
def api_appointment_cancel(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.cancel()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_appointment_finish(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.finish()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )
