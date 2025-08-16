export const fetchHandler = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log("response", response.json());
      return response.json() as Promise<T>;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};
