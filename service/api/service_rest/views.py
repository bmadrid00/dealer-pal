from django.shortcuts import render
from .encoders import AppointmentEncoder, AutomobileVOEncoder, TechnicianEncoder
from .models import Appointment, AutomobileVO, Technician
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


@require_http_methods(["GET", "POST"])
def api_technicians(request):
########################################## Technician LIST endpoint #######################################################
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve Technicians"}, status=400)
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
########################################## Technician CREATE endpoint #######################################################
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Unable to create Technician"}, status=400)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


@require_http_methods(["DELETE"])
def api_technician(request, employee_id):
##################################### Technician DELETE endpoint ################################################
    count, _ = Technician.objects.filter(employee_id=employee_id).delete()
    if count < 1:
        return JsonResponse({"message": "Technician delete of unknown id"}, status=404)
    return JsonResponse({"deleted": count > 0}, status=200)


@require_http_methods(["GET", "POST"])
def api_appointments(request):
########################################## Appointment LIST endpoint #######################################################
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
########################################## Appointment CREATE endpoint #######################################################
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


@require_http_methods(["DELETE"])
def api_appointment(request, pk):
########################################## Appointment DELETE endpoint #######################################################
    count, _ = Appointment.objects.filter(id=pk).delete()
    if count < 1:
        return JsonResponse({"message": "Appointment not found for deletion"}, status=404)
    return JsonResponse({"deleted": count > 0}, status=200)


@require_http_methods(["PUT"])
def api_appointment_cancel(request, pk):
########################################## Appointment CANCEL endpoint #######################################################
    appointment = Appointment.objects.get(id=pk)
    appointment.cancel()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_appointment_finish(request, pk):
    ########################################## Appointment FINISH endpoint #######################################################
    appointment = Appointment.objects.get(id=pk)
    appointment.finish()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )
