

function UnixToDate(date) {
  if (!date) return undefined;
  const unixTimestamp = date.slice(0, -3);
  const date_ = new Date(unixTimestamp * 1000);

  const hours = date_.getHours();
  const minutes = date_.getMinutes();
  // const seconds = date_.getSeconds();
  // 👇️ Format as hh:mm
  const time = `${padTo2Digits(hours)}h${padTo2Digits(minutes)}`;

  const year = date_.getFullYear();
  const month = padTo2Digits(date_.getMonth() + 1);
  const day = padTo2Digits(date_.getDate());

  const dateTime = `${day}-${month}-${year} à ${time}`;

  return dateTime; // 👉️ 24-09-2022 09:25:32

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
}
export default UnixToDate;
