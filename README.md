# CarCar

Team:

* Dasia - Sales microservice
* Bradley - Service microservice

## Design

## Service microservice

For this microservice I built 3 models. Technician contains the name and a unique employee id field. Appointment model keeps
track of date, time, reason for appointment, status of appointment, vin of vehicle, customer and technician with a foreign key to technician.
AutomobileVO is used with only a unique VIN property as all of it's other data is stored from a different api. To update the automobileVO
from the other api I decided to just use a simple poller as the scope of the project did not require anything more advanced and only one microservice needed this data.
For building the api I decided to go with django as it provided an easy way to quickly build a restful api and have it running ready for requests
and the scope of this project did not require consideration of other frameworks. For front end I utilized React library for javascript as the
use of JSX and react components made it very easy to dynamically display information from my api. All styling was done with bootstrap css.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
