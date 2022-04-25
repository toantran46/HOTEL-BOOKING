export const formatDate = (d) => {
  let date = new Date(d);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const formatMoney = (number) => {
  return Number(number.toFixed(1)).toLocaleString() + "đ";
};
