const BASE_URL = "https://voice-to-text-qea8m1kmm-mahalakshmi-vs-projects.vercel.app";

export const testBackend = async () => {
  try {
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error connecting to backend:", error);
    return "Backend not reachable";
  }
};
