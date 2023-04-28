# CarCar

Team:

* Dasia - Sales microservice
* Bradley - Service microservice

## Design

We used React for our front-end to easily display our data. 

## Service microservice

For this microservice I built 3 models. Technician contains the name and a unique employee id field. Appointment model keeps
track of date, time, reason for appointment, status of appointment, vin of vehicle, customer and technician with a foreign key to technician.
AutomobileVO is used with only a unique VIN property as all of it's other data is stored from a different api.

To update the automobileVO from the inventory api I decided to just use a simple poller as the scope of the project did not require anything more
advanced and only one microservice needed this data. For building the api I decided to go with django as it provided an easy way to quickly
build a restful api and have it running ready for requests and the scope of this project did not require consideration of other frameworks.

For front end I utilized React library for javascript as the use of JSX and react components made it very easy to dynamically display
information from my api. All styling was done with bootstrap css.

## Sales microservice

Dasia:
I built the sales microservice that retrieves the automobile data from the inventory microservice.

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
hat each sales person sold!
