import fetch from "node-fetch";

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/store-chart-data?chartType=bar");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    console.log("API Response:", result); // Log the entire response
    console.log("result.bar:", result.data); // Check the specific property
  } catch (err) {
    console.error(err.message);
  }
};

fetchData();
console.log("arda")
