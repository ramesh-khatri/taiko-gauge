# Admin Pay Grade Section Test
## Add pay grade with valid data
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Click Add button
* Add Pay Grade name
* Click Save Button
* Verify "Successfully Saved" message is shown
* Enter Currency detail
* Click Save Button
* Verify "Successfully Saved" message is shown

## Edit pay grade with valid data
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Edit Pay Grade name
* Click Save Button
* Verify "Successfully Saved" message is shown
* Edit Currency data
* Click Save Button
* Verify "Successfully Saved" message is shown

## Should not be able to add duplicate pay grade
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Add duplicate pay grade name
* Click Save Button
* Verify "Already exists" message is shown

## Should able to cancel pay grade form
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Click Add button
* Click Cancel Button
* Verify "Pay Grades" message is shown

## Should not be able to add empty pay grade
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Click Add button
* Click Save Button
* Verify "Required" message is shown

## Should not be able to add empty currency
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Click Add button
* Add Pay Grade name
* Click Save Button
* Verify "Successfully Saved" message is shown
* Click Add Currency button
* Click Save Button
* Verify "Required" message is shown

## Should not be able to add negative salary
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Click Add button
* Add Pay Grade name
* Click Save Button
* Verify "Successfully Saved" message is shown
* Click Add Currency button
* Enter negative salary in Curreny
* Click Save Button
* Verify "Should be a positive number" message is shown

## Should not be able to add min salary greater than max salary
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Click Add button
* Add Pay Grade name
* Click Save Button
* Click Add Currency button
* Enter min salary greater than max salary
* Click Save Button
* Verify "Should be higher than Minimum Salary" message is shown

## Should able to Cancel currency form
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Click Add button
* Add Pay Grade name
* Click Save Button
* Click Add Currency button
* Click Cancel of Currency form
* Verify "Assigned Currencies" message is shown

## Should able to delete pay grade
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Select the second value
* Click on Delete Button
* Click on Ok of delete confirmation
* Verify "Successfully Deleted" message is shown

## Should able to Cancel of Delete Confirmation
* Enter valid Username and Password
* Click "LOGIN" button
* Go to Admin Section
* Go to Job Section
* Click Pay Grades
* Select the second value
* Click on Delete Button
* Click Cancel Button
* Verify "Pay Grades" message is shown