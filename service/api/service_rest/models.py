from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    employee_id = models.IntegerField(unique=True)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)



class Appointment(models.Model):
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=15)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=75)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )

    def cancel(self):
        status = "canceled"
        self.status = status
        self.save()

    def finish(self):
        status = "finished"
        self.status = status
        self.save()
