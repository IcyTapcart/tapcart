function calc_d_num(num) {
  console.log("calc_d_num loaded from gh")
  var num, d_num;
  if (num <= 30) {
    d_num = num / 10;
  } else if (num <= 50) {
    d_num = (num - 30) * 0.35 + 3;
  } else if (num <= 70) {
    d_num = (num - 50) * 2 + 10;
  } else if (num <= 100) {
    d_num = ((num - 70) * 5) / 3 + 50;
  }
  d_num = parseFloat(d_num.toFixed(3));
  return d_num === 0 ? d_num : d_num + "M";
}
