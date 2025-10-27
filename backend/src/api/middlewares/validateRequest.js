const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    console.log("Eisu", error.issues);
    
    // Custom error message mapping
    const errorMessages = {
      'brand': 'Brand is required',
      'storeId': 'Store ID is required',
    };
    
    // Transform errors with custom messages
    const formattedErrors = error.issues.map((issue) => {
      const fieldName = issue.path[issue.path.length - 1]; // Get the last path element (field name)
      const customMessage = errorMessages[fieldName];
      
      return {
        ...issue,
        message: customMessage || issue.message, // Use custom message if available
      };
    });

    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }
};

module.exports = validateRequest;