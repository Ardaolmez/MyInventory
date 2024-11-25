function isArrayWith2x2Vectors(inputString) {
    try {
      // Normalize the input string: convert single quotes to double quotes and tuples to arrays
      const normalizedString = inputString
        .replace(/'/g, '"')
        .replace(/\(([^)]+)\)/g, "[$1]"); // Convert tuples to arrays
  
      const parsedArray = JSON.parse(normalizedString);
  
      // Validate it's an array
      if (!Array.isArray(parsedArray)) {
        return false;
      }
  
      // Validate each tuple in the array
      return parsedArray.every(
        (element) =>
          Array.isArray(element) && // Ensure it's an array
          element.length > 2 && // Ensure it's not a 2-tuple
          typeof element[element.length - 1] === "number" // Ensure the last element is a number
      );
    } catch (err) {
      console.error("Parsing error:", err);
      return false;
    }
  }
  
  function convertToArray(inputString) {
    if (!isArrayWith2x2Vectors(inputString)) {
      throw new Error("Input is not a valid array with 2x2 vectors.");
    }
  
    // Normalize and parse the string
    const normalizedString = inputString
      .replace(/'/g, '"')
      .replace(/\(([^)]+)\)/g, "[$1]"); // Convert tuples to arrays
  
    const parsedArray = JSON.parse(normalizedString);
  
    // Use concatenateElements to process the array
    return concatenateElements(parsedArray);
  }
  
  function concatenateElements(array) {
    return array.map(subArray => {
      const elementsToConcatenate = subArray.slice(0, -1); // All elements except the last one
      const number = subArray[subArray.length - 1]; // The last element (number)
      const concatenatedString = elementsToConcatenate.join(' '); // Concatenate with space
      return [concatenatedString, number]; // Return the new structure
    });
  }
  
  // Test case
  const inputString = `[('Jane', 'Peacock', 21), ('Margaret', 'Park', 20), ('Steve', 'Johnson', 18)]`;
  
  if (isArrayWith2x2Vectors(inputString)) {
    const result = convertToArray(inputString);
    console.log("Converted Array:", result);
  } else {
    console.log("Input is not a valid array with 2x2 vectors.");
  }
