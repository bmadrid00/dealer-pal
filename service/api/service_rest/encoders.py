from .models import Appointment, AutomobileVO, Technician
from common.json import ModelEncoder, DateEncoder


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = ["id", "date", "time", "reason", "status", "vin", "customer", "technician"]

    encoders = {
        "technician": TechnicianEncoder(),
    }


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]
