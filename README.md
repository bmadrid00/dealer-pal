# CarCar

Team:

* Dasia - Sales microservice
* Bradley - Service microservice

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice
Dasia:
I built the sales application that retrieves the automobile data from the inventory microsrvice.

To integrate the two microservices I used a poller with a function to get the automobile data. 
The poller uses the RESTful API to retrieve and update the AutoMobileVO.

I used 4 different aggregates automobile, salesperson, customer and sale.

    Models:
        AutomobileVO - retrives the vin from the inventory microservice
        Salesperson - the persons attributes of first name, last name and employee ID
        Customer - the customers attributes of first name, last name and phone number
        Sale - a sale has 4 attributes and 3 are foreign keys to the models above automobile, salesperson and customer.
               The sale also has the price of the automobile. 
        
        The foreign keys in the sales model have the one to many relatioships where one salesperson can have many sales
        and one customer can have many automobiles. This looked nice in the Salesperson List with the dropdown showing 
        what each sales person sold!








