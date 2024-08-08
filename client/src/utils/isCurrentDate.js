// Utility function to check if the current date is equal to the provided date string
export const isCurrentDate = (dateString) => {
  // Parse the provided date string into a Date object
  const providedDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Compare the year, month, and day
  return (
    currentDate.getFullYear() === providedDate.getFullYear() &&
    currentDate.getMonth() === providedDate.getMonth() &&
    currentDate.getDate() === providedDate.getDate()
  );
};
