
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
    // console.log(jsonData);
    // console.log(jsonData.items);

    let data = jsonData.items;
    return data;

}).then((data) => {

    // 渲染網頁
    let roomlistMain = document.querySelector(".js-roomlist-main");
    roomlistMain.innerHTML = "";
    let str = "";

    for (let i = 0; i < data.length; i++) {
        let id = data[i].id;
        let img = data[i].imageUrl;
        let name = data[i].name;
        let normal = data[i].normalDayPrice;
        let holiday = data[i].holidayPrice;
        // console.log(data);

        str += `<li class="roomlist-main-li">
                    <div class="roomlist-one js-roomlist-one" style="background-image: url(${img})" data-id=${id}></div>
                    <ul class="roomlist-two">
                        <li class="roomlist-two-li-one">
                            <h2>${name}</h2>
                        </li>
                        <li class="roomlist-two-li-two">
                            <div>
                                <p><span>NT.${normal}</span>&nbsp;平日</p>
                            </div>
                            <div class="roomlist-two-li-div">
                                <p>NT.${holiday}&nbsp;假日</p>
                            </div>
                        </li>
                    </ul>
                </li>`
    }
    roomlistMain.innerHTML += str;

    // 點擊圖片 頁面跳轉
    roomlistMain.addEventListener("click", function (e) {

        if (e.target.className == "roomlist-one js-roomlist-one") {
            let elDiv = e.target.dataset.id;

            // 存取至 localStorage
            localStorage.setItem('roomsId', elDiv);
            window.location.replace("room.html");

        } else {
            console.log("不是圖片位置");
        }
    }, false);

    // 輪播房間圖片
    carousel(data);


}).catch((err) => {
    console.log('錯誤:', err);
})


// 輪播房間圖片
function carousel(data) {
    let roomlistHeader = document.querySelector(".js-roomlist-header");

    function doSetTimeout(i) {
        setTimeout(function () {
            let imgUrl = data[i].imageUrl;
            // 更換圖片
            roomlistHeader.style.backgroundImage = `url(${imgUrl})`;
            // 轉場效果
            roomlistHeader.style.transition = "all 0.8s ease-in-out";
        }, i * 5000);
    }

    for (let i = 0; i < data.length; i++) {
        doSetTimeout(i);
    }
}