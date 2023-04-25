from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField()


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=12)


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="cars",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="purchases",
        on_delete=models.CASCADE
    )
    price = models.PositiveIntegerField()
