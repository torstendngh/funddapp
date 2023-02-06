/**
 * Works out days left until deadline
 * @param {date} deadline 
 * @returns {number}
 */
export const daysLeft = (deadline) => {
  const difference = deadline - (Date.now() / 1000);
  const remainingDays = difference / 86400;
  return remainingDays.toFixed(0);
};

/**
 * Calculates percentage for progress bar
 * @param {number} goal 
 * @param {number} raisedAmount 
 * @returns {number}
 */
export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

/**
 * Checks if url is a valid image and calls callback function if so
 * @param {string} url 
 * @param {function} callback 
 */
export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

/**
 * Truncates a string like "0x0000000000" -> "0x00..."
 * @param {string} string 
 * @param {number} cutoff 
 * @returns {string}
 */
export const truncateString = (string, cutoff) => {
  if (string.length > cutoff) {
    return string.slice(0, cutoff) + "...";
  } else {
    return string;
  }
}

/**
 * Go to project detail page when project is clicked
 * @param {*} navigate - navigate hook (const navigate = useNavigate();)
 * @param {object} project 
 */
export const handleNavigateToProject = (navigate, project) => {
  navigate(`/project-details/${project.title}`, { state: project });
};
