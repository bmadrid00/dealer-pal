from django.db import models
from django.urls import reverse

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    employee_id = models.CharField(max_length=35, unique=True)


    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)



class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=15)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=75)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})

    def cancel(self):
        status = "Cancelled"
        self.status = status
        self.save()

    def finish(self):
        status = "Finished"
        self.status = status
        self.save()
