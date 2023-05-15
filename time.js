const h2 = document.querySelector(".time");

//새로운 시간 업데이트
function callNewDate() {
  const newDate = new Date();

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();

  //10시 미만 일때 시간 앞에 0을 붙여준다 ex) 01,02,03...
  const hour =
    newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();

  //10분 미만 일때 분 앞에 0을 붙여준다 ex) 01,02,03...
  const minutes =
    newDate.getMinutes() < 10
      ? "0" + newDate.getMinutes()
      : newDate.getMinutes();

  //10초 미만 일때 초 앞에 0을 붙여준다 ex) 01,02,03...
  const seconds =
    newDate.getSeconds() < 10
      ? "0" + newDate.getSeconds()
      : newDate.getSeconds();

  const time =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hour +
    ":" +
    minutes +
    ":" +
    seconds;

  return time;
}

//최초 로딩시 보여지는 시간
h2.innerHTML = callNewDate();

//최초 로딩 이후 1초마다 시간 업데이트
setInterval(function () {
  h2.innerHTML = callNewDate();
}, 1000);
