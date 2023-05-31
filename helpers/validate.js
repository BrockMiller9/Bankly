function validateRequestBody(body) {
  const allowedFields = ["first_name", "last_name", "phone", "email", "_token"];
  const errors = [];

  for (const field in body) {
    if (!allowedFields.includes(field)) {
      errors.push(`Invalid field: ${field}`);
    } else {
      const value = body[field];
      switch (field) {
        case "first_name":
        case "last_name":
        case "phone":
          if (typeof value !== "string") {
            errors.push(`Invalid type for field ${field}: expected string`);
          }
          break;
        case "email":
          const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          if (!emailRegex.test(value)) {
            errors.push(`Invalid email format for field ${field}`);
          }
          break;
      }
    }
  }

  return errors;
}

module.exports = validateRequestBody;
