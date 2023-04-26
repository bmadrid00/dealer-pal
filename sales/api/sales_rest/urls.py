from django.urls import path

from .views import (
    api_details_salesperson,
    api_list_salespeople,
    api_customer,
    api_customers,
    api_sale,
    api_sales
)

urlpatterns = [
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path("salespeople/<int:employee_id>/", api_details_salesperson, name="api_details_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sale, name="api_sale"),
]