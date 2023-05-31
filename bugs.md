Bug #1 - In the auth register route, we are not validating the input data. We should check that all fields are present and that they are the correct type.
I added the following code to validate the input data: if(!(username && password && first_name && last_name && email && phone)) { return res.status(400).send("All input is required"); }
I then added test to make sure this validation method works properly.

bug#2 - In the auth login route , we are not validating the input data. We should check that all fields are present and that they are the correct type. We should check that all fields are present and that they are the correct type.

I added the following code to validate the input data: if(!(username && password)) { return res.status(400).send("All input is required"); }

Bug#3 - In the auth login route - we are not awaiting the bcrypt.hash function. This means that the code will continue to run before the password is hashed. This can cause issues if the code tries to use the password before it is hashed.

Bug#4 - In the user Delete route we are not awaiting the db.query function. This means that the code will continue to run before the query is finished. This can cause issues if the code tries to use the data before the query is finished.

Bug #5 -
In the user Patch Route we were not allowing both the user and the admin to modify the information. To do this we had to delte the admin middleware. We also had to make sure we were validating the input data. We should check that all fields are present and that they are the correct type. I implemented a helper function that will validate the input data. I then used this helper function to validate the input data.

Bug #6 we werent implementing the use of the secret key in the authUser function. I added the following code to implement the secret key: let payload = jwt.verify(token, SECRET_KEY);
