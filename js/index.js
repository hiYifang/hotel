
let url = "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms";

fetch(url, {
  method: "GET",
  mode: "cors",
  redirect: "follow",
  headers: new Headers({
    // headers 加入 json 格式
    "Content-Type": "application/json",
    "Authorization": "Bearer 2VI5ll5Z1Zh60BIOdvmrHuJpA7KrSyWTmZFsszWigJ7zA4o6WzYAahuYNRBB"
  })
}).then((response) => {
  // 這裡會得到一個 ReadableStream 的物件
  // 可以透過 blob(), json(), text() 轉成可用的資訊
  return response.json();
}).then((jsonData) => {

  let data = jsonData.items;
  return data;

}).then((data) => {

  // 渲染房間名稱
  let indexRoomName = document.querySelector(".js-room-name");
  indexRoomName.innerHTML = "";
  let str = "";
  for (let i = 0; i < data.length; i++) {
    let name = data[i].name;
    let id = data[i].id;
    str += `<li><a class="js-room-name-a" data-id=${id} href="room.html">${name}</a></li>`
  }
  indexRoomName.innerHTML += str;

  // 點擊房間名稱 頁面跳轉
  indexRoomName.addEventListener("click", function (e) {
    // console.log(e);
    // 取消 a 連結的預設行為
    // e.preventDefault();

    // a 連結 原本就能轉址
    // 透過事件 event 的 path 屬性抓取 li 的 data-* attribute
    let elA = e.path[0].dataset.id;
    // console.log(elA);

    // 存取至 localStorage
    localStorage.setItem('roomsId', elA);

  }, false);

  // 監聽各房間
  let indexRoomNameA = document.querySelectorAll(".js-room-name-a");
  let str2 = "";

  indexRoomNameA.forEach((item, index) => {
    let indexBg = document.querySelector(".js-index-bg");
    let imgUrl = data[index].imageUrl;
    // console.log(imgUrl);

    let indexLeftBottom = document.querySelector(".js-index-left-bottom");
    let name = data[index].name;
    let num = index + 1;

    item.addEventListener("mouseover", function (e) {
      // console.log(e);

      // 背景變更
      indexBg.style.backgroundImage = `url(${imgUrl})`;

      // 編號與房名變更
      str2 = `<h2>0${num}</h2><p>${name}</p>`;
      indexLeftBottom.innerHTML = str2;
    })
  });
 

}).catch((err) => {
  console.log('錯誤:', err);
})

