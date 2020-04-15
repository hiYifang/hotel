// 獲取所有的資料
const id = localStorage.getItem('roomsId');
let url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`;
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

    // 顯示已預約的日期
    function calendarButton() {
        let bookingData = jsonData.booking;
        let bookingDataYear, bookingDataMonth, bookingDataDay;
        let dayA = document.querySelectorAll(".days a");
        let dayAYear, dayAMonth, dayADay;

        bookingData.forEach((item) => {
            bookingDataYear = item.date.split("-")[0];
            bookingDataMonth = Number(item.date.split("-")[1]);
            bookingDataDay = item.date.split("-")[2];

            // 網頁載入後 尋找日期 添加css
            dayA.forEach((itemTwo) => {
                dayADay = itemTwo.dataset.day;
                dayAMonth = itemTwo.dataset.month;
                dayAYear = itemTwo.dataset.year;
                if (dayADay == bookingDataDay && dayAMonth == bookingDataMonth && dayAYear == bookingDataYear) {
                    itemTwo.classList.add("active-day-a");
                }
            })
        })
    }
    calendarButton();

    let data = jsonData.room;
    return data;

}).then((data) => {

    // 渲染網頁
    let roomHeader = document.querySelector(".js-room-header");
    roomHeader.innerHTML = "";

    let str = "";
    let name = data[0].name;
    let imgOne = data[0].imageUrl[0];
    let imgTwo = data[0].imageUrl[1];
    let imgThree = data[0].imageUrl[2];

    str = `
            <ul>
                <li class="room-header-left" style="background-image: url(${imgOne});">
                    <h1>
                        <a href="roomList.html">
                            <img src="img/logo_block.svg" alt="logo_block">
                        </a>
                    </h1>
                </li>
                <li class="room-header-right">
                    <ul>
                        <li class="room-header-right-top" style="background-image: url(${imgTwo});"></li>
                        <li class="room-header-right-bottom" style="background-image: url(${imgThree});"></li>
                    </ul>
                </li>
            </ul>
            <ul class="js-lightbox">
                <li>
                    <img width="100px" height="100px" src="${imgOne}" alt="${name} 1/3 ">
                </li>
                <li>
                    <img width="100px" height="100px" src="${imgTwo}" alt="${name} 2/3 ">
                </li>
                <li>
                    <img width="100px" height="100px" src="${imgThree}" alt="${name} 3/3 ">
                </li>
            </ul>`

    roomHeader.innerHTML = str;

    let roomMainLeft = document.querySelector(".js-room-main-left");
    roomMainLeft.innerHTML = "";

    let str2 = "";
    let guestMin = data[0].descriptionShort.GuestMin;
    let guestMax = data[0].descriptionShort.GuestMax;
    let bed = data[0].descriptionShort.Bed[0];
    let privateBath = data[0].descriptionShort["Private-Bath"];
    let footage = data[0].descriptionShort.Footage;
    let description = data[0].description;
    let checkInEarly = data[0].checkInAndOut.checkInEarly;
    let checkInLate = data[0].checkInAndOut.checkInLate;
    let checkOut = data[0].checkInAndOut.checkOut;

    str2 = `<div class="room-main-left-title">${name}</div>
            <div class="room-main-left-descriptionshort">
                <p>房客人數限制： ${guestMin} - ${guestMax} 人</p>
                <p>床型： ${bed}</p>
                <p>衛浴數量： ${privateBath} 間</p>
                <p>房間大小： ${footage} 平方公尺</p>
            </div>
            <div class="room-main-left-description">${description}</div>
            <div class="divider"></div>
            <div class="room-main-left-check">
                <ul>
                    <li>
                        <h2>Check In</h2>
                        <p>${checkInEarly} - ${checkInLate}</p>
                    </li>
                    <li>
                        <h2>Check Out</h2>
                        <p>${checkOut}</p>
                    </li>
                </ul>
            </div>
            <div class="room-main-left-amenities">
                <ul>
                    <li><i class="fas fa-wifi js-fas">WiFi</i></li>
                    <li><i class="fas fa-phone js-fas">電話</i></li>
                    <li><i class="fas fa-mountain js-fas">漂亮視野</i></li>
                    <li><i class="fas fa-utensils js-fas">早餐</i></li>
                    <li><i class="fas fa-wind js-fas">空調</i></li>
                    <li><i class="fas fa-smoking-ban js-fas">禁止吸煙</i></li>
                    <li><i class="fas fa-glass-martini-alt js-fas">Bar</i></li>
                    <li><i class="fas fa-icicles js-fas">冰箱</i></li>
                    <li><i class="fas fa-baby js-fas">適合兒童</i></li>
                    <li><i class="fas fa-concierge-bell js-fas">Service</i></li>
                    <li><i class="fas fa-couch js-fas">沙發</i></li>
                    <li><i class="fas fa-dog js-fas">寵物攜帶</i></li>
                </ul>
            </div>`

    roomMainLeft.innerHTML = str2;

    // 判斷狀態
    status(data);

    let roomMainMedium = document.querySelector(".js-room-main-medium");
    roomMainMedium.innerHTML = "";

    let str3 = "";
    let normal = data[0].normalDayPrice;
    let holiday = data[0].holidayPrice;

    str3 = `<ul>
                <li class="room-main-medium-normal js-normal">NT. ${normal}</li>
                <li>平日(一～四)</li>
                <li class="room-main-medium-holiday js-holiday">NT. ${holiday}</li>
                <li>假日(五～日)</li>
            </ul>`

    roomMainMedium.innerHTML = str3;

    // 燈箱效果
    lightbox();

    // 儲存預約資料
    let roomMainRightButton = document.querySelector(".js-button");
    let bookWrap = document.querySelector(".js-book-wrap");
    let cancelBtn = document.querySelector(".js-cancel-btn");
    let postBtn = document.querySelector(".js-post-btn");

    roomMainRightButton.addEventListener("click", function () {

        // 顯示視窗
        bookWrap.style.display = "flex";

        // 取消預約
        cancelBtn.addEventListener("click", function () {
            // 隱藏視窗
            bookWrap.style.display = "none";
        }, false);

        // 確定預約
        postBtn.addEventListener("click", async function () {
            let arrFormat = await formatDate();

            // 記錄預約資料
            let res = await fetch(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer 2VI5ll5Z1Zh60BIOdvmrHuJpA7KrSyWTmZFsszWigJ7zA4o6WzYAahuYNRBB"
                },
                body: JSON.stringify({
                    name: document.getElementById("bookName").value,
                    tel: document.getElementById("bookPhone").value,
                    // 呼叫日期換算功能
                    date: arrFormat
                })
            })

            // 收集錯誤訊息
            let resJson = await res.json();
            // console.log(resJson.message);

            console.log(arrFormat);

            if (arrFormat.length == 0) {
                // 隱藏視窗
                bookWrap.style.display = "none";

                Swal.fire({
                    type: 'error',
                    title: '喔喔...',
                    text: '您必須輸入日期!'
                })
            } else if (resJson.message === "您必須提供訂房者名稱(name)。") {
                // 隱藏視窗
                bookWrap.style.display = "none";

                Swal.fire({
                    type: 'error',
                    title: '喔喔...',
                    text: '您必須提供訂房者名稱(name)!'
                })
            } else if (resJson.message === "您必須提供訂房者電話(tel)。") {
                // 隱藏視窗
                bookWrap.style.display = "none";

                Swal.fire({
                    type: 'error',
                    title: '喔喔...',
                    text: '您必須提供訂房者電話(tel)!'
                })
            } else if (resJson.message === "您所提供的訂房時間(date)已有訂房。") {
                // 隱藏視窗
                bookWrap.style.display = "none";

                Swal.fire({
                    type: 'warning',
                    title: 'Sorry...',
                    text: '您所提供的訂房時間(date)已有訂房!'
                })
            } else {
                // 隱藏視窗
                bookWrap.style.display = "none";

                // 套用 SweetAlert2 (icon 改成 type)
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: "預約成功 歡迎入住",
                    showConfirmButton: false,
                    timer: 1500
                })
            }




        }, false);

    }, false);

    // (1+2)套用 flatpickr 處理日期換算功能
    flatpickr("#bookDate", {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        disable: [
            function (date) {
                // disable every multiple of 8
                return !(date.getDate() % 8);
            }
        ],
        onClose: function (selectedDates, dateStr, instance) {

            // 計算兩個時間差 (天數)
            let dateArr = dateStr.split(" to ");
            // + 是 隱形的 getTime()
            let dateStart = +new Date(dateArr[0]);
            let dateEnd = +new Date(dateArr[1]);
            let dates = (Math.abs(dateEnd - dateStart)) / (1000 * 60 * 60 * 24);

            let arrProduct = [];

            for (let i = 0; i <= dates; i++) {
                // 一天的毫秒
                let millisecond = 86400000;
                arrProduct.push(new Date(dateStart));
                dateStart += millisecond;
            }

            // 預約日期轉換成星期
            let arrWeek = [];
            let normalNum = 0;
            let holidayNum = 0;

            for (let k = 0; k < arrProduct.length; k++) {
                let week = arrProduct[k].getDay();
                arrWeek.push(week);

                if (week === 1 || week === 2 || week === 3 || week === 4) {
                    normalNum += 1;
                } else {
                    holidayNum += 1;
                }
            }

            // 渲染網頁
            let bookDivNight = document.querySelector(".js-night");
            bookDivNight.innerHTML = "";

            let str4 = "";
            str4 = `<p><span>${normalNum}</span>夜</p><p><span>${holidayNum}</span>夜</p>`

            bookDivNight.innerHTML = str4;

            // 計算金額
            let bookDivPrice = document.querySelector(".js-price");
            bookDivPrice.innerHTML = "";

            // let normalPrice = document.querySelector(".js-normal").textContent.split(" ")[1];
            // let holidayPrice = document.querySelector(".js-holiday").textContent.split(" ")[1];
            let normalCost = normalNum * normal;
            let holidayCost = holidayNum * holiday;
            let sumCost = normalCost + holidayCost;

            let str5 = "";
            str5 = `<div>= NT.${sumCost}</div>`

            bookDivPrice.innerHTML = str5;

        }
    });

    // 刪除所有預約資料
    let roomMainRightDeleteButton = document.querySelector(".js-delete-button");
    roomMainRightDeleteButton.addEventListener("click", function () {
        deleteBooking();
    }, false);

}).catch((err) => {
    console.log('錯誤:', err);
})

// 判斷狀態
function status(data) {
    document.querySelectorAll(".js-fas").forEach((item, index) => {
        if (index === 0) {
            item.dataset.active = data[0].amenities["Wi-Fi"];
            // console.log(item.dataset.active);
        } else if (index === 1) {
            item.dataset.active = data[0].amenities["Breakfast"];
        } else if (index === 2) {
            item.dataset.active = data[0].amenities["Mini-Bar"];
        } else if (index === 3) {
            item.dataset.active = data[0].amenities["Room-Service"];
        } else if (index === 4) {
            item.dataset.active = data[0].amenities["Television"];
        } else if (index === 5) {
            item.dataset.active = data[0].amenities["Air-Conditioner"];
        } else if (index === 6) {
            item.dataset.active = data[0].amenities["Refrigerator"];
        } else if (index === 7) {
            item.dataset.active = data[0].amenities["Sofa"];
        } else if (index === 8) {
            item.dataset.active = data[0].amenities["Great-View"];
        } else if (index === 9) {
            item.dataset.active = data[0].amenities["Smoke-Free"];
        } else if (index === 10) {
            item.dataset.active = data[0].amenities["Child-Friendly"];
        } else if (index === 11) {
            item.dataset.active = data[0].amenities["Pet-Friendly"];
        }

        if (item.dataset.active === "false") {
            item.style.color = "#c9ccd0";
        } else {
            item.style.color = "#000000";
        }
    });
}

// 燈箱效果
function lightbox() {
    const viewer = new Viewer(document.querySelector(".js-lightbox"), {
        // 具體參數配置
        // 若啟用 inline:true 模式，則沒有關閉的按鈕；這裡使用 Modal mode
        // 回調函數，具體查看演示
        viewed() {
            // 縮放圖片比例
            viewer.zoomTo(0.3);
        }
    });
}

// 刪除所有預約功能 ＆ 套用 SweetAlert2 (icon 改成 type)
function deleteBooking() {

    // 套用 SweetAlert2
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '確定刪除所有的預約資料?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定刪除!',
        cancelButtonText: '取消刪除!'
    }).then((result) => {
        if (result.value) {
            swalWithBootstrapButtons.fire('已經刪除!')

            // 刪除所有預約資料
            fetch('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer 2VI5ll5Z1Zh60BIOdvmrHuJpA7KrSyWTmZFsszWigJ7zA4o6WzYAahuYNRBB"
                }
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log('錯誤:', err)
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire('繼續保留資料囉')
        }
    })
}


// 日期換算功能
// (1)獲得預約日期
function datesProduction() {
    // 計算兩個時間差 (天數)
    let dateArr = document.getElementById("bookDate").value.split(" to ");
    // + 是 隱形的 getTime()
    let dateStart = +new Date(dateArr[0]);
    let dateEnd = +new Date(dateArr[1]);
    let dates = (Math.abs(dateEnd - dateStart)) / (1000 * 60 * 60 * 24);
    // console.log(dateStart, dateEnd, dates);

    let arrProduct = [];

    for (let i = 0; i <= dates; i++) {
        // 一天的毫秒
        let millisecond = 86400000;
        arrProduct.push(new Date(dateStart));
        dateStart += millisecond;
    }
    return arrProduct;
}

// (2)轉換日期格式
async function formatDate() {
    // 非同步 等datesProduction()執行完 再往下執行
    let arrProduct = await datesProduction();
    let arrFormat = [];
    let dt, year, month, date;
    for (let j = 0; j < arrProduct.length; j++) {
        // 轉換日期格式 (Y-m-d)
        year = arrProduct[j].getFullYear();
        month = arrProduct[j].getMonth() + 1;
        date = arrProduct[j].getDate();

        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }

        dt = year + "-" + month + "-" + date;
        arrFormat.push(dt);
    }
    return arrFormat;
}



