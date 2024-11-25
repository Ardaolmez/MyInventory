export async function addToChartAPIStorage(chartType, data) {
    try {
      const response = await fetch("http://localhost:5000/api/store-chart-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chartType, data }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to store chart data: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Server response:", result);
      return result;
    } catch (error) {
      console.error("Error in addToChartAPIStorage:", error.message);
      throw error;
    }
  }
  
  export function isArrayWith2x2Vectors(inputString) {
    try {
      const normalizedString = inputString
        .replace(/'/g, '"')
        .replace(/\(([^)]+)\)/g, "[$1]");
  
      const parsedArray = JSON.parse(normalizedString);
  
      if (!Array.isArray(parsedArray)) {
        return false;
      }
  
      return parsedArray.every(
        (element) =>
          Array.isArray(element) &&
          element.length > 1 &&
          typeof element[element.length - 1] === "number"
      );
    } catch (err) {
      console.error("Parsing error:", err);
      return false;
    }
  }
  
  export function convertToArray(inputString) {
    if (!isArrayWith2x2Vectors(inputString)) {
      throw new Error("Input is not a valid array with 2x2 vectors.");
    }
  
    const normalizedString = inputString
      .replace(/'/g, '"')
      .replace(/\(([^)]+)\)/g, "[$1]");
  
    const parsedArray = JSON.parse(normalizedString);
    return concatenateElements(parsedArray);
  }
  
  export function concatenateElements(array) {
    return array.map((subArray) => {
      const elementsToConcatenate = subArray.slice(0, -1);
      const number = subArray[subArray.length - 1];
      const concatenatedString = elementsToConcatenate.join(" ");
      return [concatenatedString, number];
    });
  }
// waitForUserResponse.js
export function waitForUserResponse(setAwaitingChartType, messages, setMessages, chartData) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const userResponse = messages[messages.length - 1]; // Get the last user message
        if (userResponse?.from === "user") {
          const chartType = userResponse.text.toLowerCase();
          clearInterval(interval); // Stop checking once we get the response
  
          if (["bar", "line", "pie"].includes(chartType)) {
            addToChartAPIStorage(chartType, chartData)
              .then(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    from: "ai",
                    text: `Chart data has been successfully added to the ${chartType} chart.`,
                  },
                ]);
                resolve(chartType); // Resolve the Promise with the chartType
              })
              .catch((err) => {
                console.error("Error storing chart data:", err);
                setMessages((prev) => [
                  ...prev,
                  {
                    from: "ai",
                    text: "There was an error saving the chart data. Please try again later.",
                  },
                ]);
                resolve(null); // Resolve the Promise with null in case of error
              });
          } else {
            setMessages((prev) => [
              ...prev,
              {
                from: "ai",
                text: "Invalid chart type provided. No action taken.",
              },
            ]);
            resolve(null); // Resolve the Promise with null for invalid input
          }
  
          setAwaitingChartType(false); // Reset awaiting state
        }
      }, 1000); // Check every 1 second
    });
  }
  