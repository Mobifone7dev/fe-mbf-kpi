const API_URL = process.env.NEXTAUTH_APP_API_URL;
const CHECK_PACKAGE_URL = `${API_URL}/website/package`;
const CHECK_TYPE_URL = `${API_URL}/website/type`;



export const getSearchTypeSubscriber = async (e) => {

  const response = await fetch(`${CHECK_TYPE_URL}?isdn=${e}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  });
  const responseBody = await response.json();
  return responseBody;
};
export function getQSParamFromURL(key, url) {
  if (!url) return "";
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(key);
}
export const convertToFloat2Fixed = (number) => {
  if (Number(number)) {
    const tempNumber = parseFloat(number).toFixed(2)
    return Number(tempNumber)

  } else {
    return 0

  }
}
export function daysInMonth(dateInput) {
  return new Date(dateInput.getFullYear(), dateInput.getMonth() + 1, 0).getDate();
}
 export function changeFormatDateFirstDateInMonth (date) {
const yyyy = date.getFullYear();
let mm = date.getMonth() + 1; // Months start at 0!
let dd = date.getDate();

if (dd < 10) dd = '01';
if (mm < 10) mm = '0' + mm;

const formattedDate = dd + '-' + mm + '-' + yyyy;

return formattedDate;
}


