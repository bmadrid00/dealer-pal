from django.shortcuts import render
from .encoders import CustomerEncoder, SalespersonEncoder, SaleEncoder
from .models import Customer, Sale, Salesperson, AutomobileVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json



@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        try:
            salespeople = Salesperson.objects.all()
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve Salespeople"}, status=404)
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            salespeople = Salesperson.objects.create(**content)
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Unable to create Salesperson"}, status=400)
        return JsonResponse(salespeople, encoder=SalespersonEncoder, safe=False)


@require_http_methods(["GET", "DELETE", "PUT"])
def api_details_salesperson(request, employee_id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(employee_id=employee_id)
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve Salesperson"}, status=400)
        return JsonResponse({"message": "Unable to retrieve salesperson"}, encoder=SalespersonEncoder)
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(employee_id=employee_id).delete()
        if count == 0:
            return JsonResponse({"message": "Unable to delete salesperson"}, status=404)
        return JsonResponse({"deleted": count > 0}, status=200)
    else:
        content = json.loads(request.body)
        try:
            Salesperson.objects.filter(employee_id=employee_id).update(**content)
            salesperson = Salesperson.objects.get(employee_id=employee_id)
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Unable to update Salesperson information"}, status=400)
        return JsonResponse(salesperson, encoder=SalespersonEncoder, safe=False)
    

@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        try:
            customers = Customer.objects.all()
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve customers"}, status=400)
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Unable to create Customer"})
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
    
@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve customer"}, status=404)
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        if count == 0:
            return JsonResponse({"message": "Unable to delete customer"}, status=404)
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try: 
            Customer.objects.filter(id=pk).update(**content)
            customer = Customer.objects.get(id=pk)
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve customer"}, status=400)
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)

@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        try:
            sales = Sale.objects.all()
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Unable to retrieve sales"}, status=400)
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.get(id=content['customer'])
            content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer ID"},
                status=400,
            )
        try:
            automobile = AutomobileVO.objects.get(vin=content['automobile'])
            content['automobile'] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid vin ID"},
                status=400,
            )
        try:
            salesperson = Salesperson.objects.get(employee_id=content['salesperson'])
            content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson ID"},
                status=400,
            )
        try:
            sales = Sale.objects.create(**content)
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Unable to create sale"}, status=400)
        return JsonResponse(sales, encoder=SaleEncoder, safe=False)

@require_http_methods(["GET", "POST", "DELETE"])
def api_sale(request, pk):
    if request.method == "DELETE":
        count, _ = Sale.objects.filter(id=pk).delete()
        if count == 0:
            return JsonResponse({"message": "Unable to delete sale"}, status=404)
        return JsonResponse({"deleted": count > 0}, status=200)
