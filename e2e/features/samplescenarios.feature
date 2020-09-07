Feature: Budget.com - Feature

@Test @SmokeTest @Regression
Scenario: Car Checkout - SUV - Lowest Price - 4 Doors and 5 Seats only
#1. Navigate to https://www.budget.com/
Given I am on Application home page
# Then I validate title is "Discount car rental rates and rental car deals | Budget Car Rental"
#2. Choose Pick-Up location as Austin Bergstrom Intl Airport, Austin, Texas.
Then I type "Austin Bergstrom Intl Airport" in "Enter your pick-up location or zip code" textbox
Then I click on "Austin Bergstrom Intl Airport" from search results
#3. Choose Pickup Date as a Week ahead of Current Date.
Then I select "from" as 7 days from current date
#4. Choose Return Date as a Week of pickup Date.
Then I select "to" as 14 days from current date
# 5. Click on Select My Car.
Then I click on "Select My Car" button
# 6. Capture and validate pickup and return locations from inputs.
Then I validate "Pick-Up" location is displayed as "Austin Bergstrom Intl Airport, AUS"
Then I validate "Return" location is displayed as "Austin Bergstrom Intl Airport, AUS"
# 7. Filter with SUV vehicles.
Then I click on "All Vehicles" filter
Then I click on "SUVs & Wagons" filter
Then I select "Price (Low to High)" from "Sort by:" dropdown
# 8. Identify Low Price SUV vehicles and click on the Pay Now.
#Vehicle Information : 4 Doors, 5 Seats 
#Note: You need to pick the lowest price of SUV, which has 4 doors and 5 seats only.
#This data changes dynamically please have an eye on it.
Then I click on "Pay Now" button for "SUV" car which has "4 Doors" and "5 Seats"
#9. Capture and validate pickup and return locations from the previous page.
Then I validate "Pick-Up" location is displayed as "Austin Bergstrom Intl Airport, AUS"
Then I validate "Return" location is displayed as "Austin Bergstrom Intl Airport, AUS"
#10. Validate Vehicle Type from chosen vehicle List.
Then I validate the vehicle type is as same as chosen vehicle
#11. Capture BaseRate and Fees Taxes and validate base rate from the previous page.
Then I validate the Base Rate is as same as quote page
#12. Validate estimated total and amount Prepaid
Then I validate the estimated total with Base Rate, Fees & Taxes
