function signUp() {
    // récupération des données
    var selectRole = document.getElementById("selectRole").value;

    var firstName = document.getElementById("firstName").value;
    var verifFn = verifInput(firstName.length > 3 && firstName.length < 16, "firstNameError", "Invalid First Name");


    var lastName = document.getElementById("lastName").value;
    var verifLn = verifInput(lastName.length > 3 && lastName.length < 16, "lastNameError", "Invalid Last Name");


    var email = document.getElementById("email").value;
    var validEmail = validateEmail(email);
    var verifEmail = verifInput(validEmail, "emailError", "Invalid Email");


    var tel = document.getElementById("tel").value;
    var verifTel = verifInput(tel.length == 8 && !isNaN(tel), "telError", "Must have 8 numbers");
    // function existTel(tel) {
    //     var users= getFromLs("users");

    //     for (let i = 0; i < users.length; i++) {
    //        if (condition) {
    //          const element = array[i];
    //        } else {

    //        }

    //     }

    // }


    var password = document.getElementById("password").value;
    var validPassword = checkPassword(password);
    var verifPassword = verifInput(validPassword, "passwordError", "Invalid Password");


    var confirmPwd = document.getElementById("confirmPassword").value;
    var verifCnfPwd = verifInput(confirmPwd == password, "confirmPasswordError", "Confirm Password");

    var address = document.getElementById("address").value;
    var verifAddress = verifInput(address.length > 11 && address.length < 51, "addressError", "Your address must have between 10 and 50 characters");

    var fax = document.getElementById("fax").value;
    var verifFax = verifInput(fax.length == 8 && !isNaN(fax), "faxError", "Must have 8 numbers");

    var patent = document.getElementById("patent").value;
    var verifPatent = verifInput(patent.length == 13, "patentError", "Invalid Patent");
    // console.log(firstName, lastName,email,tel, password, confirmPwd, address);

    // création du key users, remplir le key
    if (selectRole == "client" && verifFn && verifLn && verifEmail && verifTel && verifPassword && verifCnfPwd && verifAddress) {

        var idUser = JSON.parse(localStorage.getItem("idUser") || "2");
        var user = {
            id: idUser,
            firstName: firstName,
            lastName: lastName,
            email: email,
            tel: tel,
            password: password,
            address: address,
            fax: "",
            patent: "",
            role: "client",
            status: "on hold"
        }
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("idUser", idUser + 1);
        location.reload();
    }
    else if (selectRole == "owner" && verifFn && verifLn && verifEmail && verifTel && verifPassword && verifCnfPwd && verifAddress && verifFax && verifPatent) {


        var idUser = JSON.parse(localStorage.getItem("idUser") || "2");
        var user = {
            id: idUser,
            firstName: firstName,
            lastName: lastName,
            email: email,
            tel: tel,
            password: password,
            address: address,
            fax: fax,
            patent: patent,
            role: "owner",
            status: "on hold"
        }
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("idUser", idUser + 1);
        location.reload();
    }

}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

// création de l'admin d'une manière statique
function addAdmin() {
    var admin = {
        id: "1",
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        password: "Admin@123",
        tel: "22333444",
        role: "admin",
        status: "confirmed"
    }
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(admin);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("adminAdded", true);
}

// masquer les inputs du owner quand on a un client et les afficher quand on un owner
function changeForm() {
    var role = document.getElementById("selectRole").value;

    if (role == "client") {
        document.getElementById("forOwner").style.display = "none";
    } else {
        document.getElementById("forOwner").style.display = "block";
    }
}

// fonction générique pour récupérer les données 
function verifInput(condition, idSpan, msgError) {
    var test = true;

    if (condition) {
        document.getElementById(idSpan).innerHTML = "";
    } else {
        document.getElementById(idSpan).innerHTML = msgError;
        document.getElementById(idSpan).style.color = "red";
        test = false;
    }
    return test;
}

function logIn() {
    var tel = document.getElementById("tel").value;
    var password = document.getElementById("password").value;

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    // sauvegarder le user (l'objet)
    var findedUser;

    for (let i = 0; i < users.length; i++) {
        if (users[i].tel == tel && users[i].password == password) {
            findedUser = users[i];
        }
    }

    if (findedUser && findedUser.status == "confirmed") {
        document.getElementById("loginError").innerHTML = "";

        // sauvegarder l'id du user dans LS
        var connectedUser = localStorage.setItem("connectedUser", findedUser.id);

        switch (findedUser.role) {
            case "admin":
                location.replace("indexHouses.html");
                break;

            case "owner":
                location.replace("indexOwnerHouse.html");
                break;

            case "client":
                location.replace("indexHouses.html");
                break;

            default:
                break;
        }

    } else if (findedUser && findedUser.status == "on hold") {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'your account is saved, please wait for the confirmation',
            showConfirmButton: true,
            timer: 10000
        })
    }
    else {
        document.getElementById("loginError").innerHTML = "Authenticate Failed Verif Tel or Password";
        document.getElementById("loginError").style.color = "red";
    }
}

function addHouse() {
    // récupération des données
    var houseName = document.getElementById("houseName").value;
    var verifHn = verifInput(houseName.length > 3 && houseName.length < 16, "houseNameError", "Invalid House Name");


    var city = document.getElementById("city").value;
    var verifCity = verifInput(city.length > 3 && city.length < 16, "cityError", "Invalid City");

    var view = document.getElementById("view").value;
    var verifView = verifInput(view.length > 3 && view.length < 16, "viewError", "Invalid View");

    var nbRoom = document.getElementById("nbRoom").value;
    var verifNbRoom = verifInput(nbRoom > 0 && nbRoom < 11, "nbRoomError", "Invalid Number");


    var addressHouse = document.getElementById("addressHouse").value;
    var verifAdrRoom = verifInput(addressHouse.length > 11 && addressHouse.length < 51, "adrHouseError", "Your address must have between 10 and 50 characters");

    var imgHouse = document.getElementById("imgHouse").value;
    var newImgHouse = replaceCh(imgHouse);
    var verifImgHouse = verifInput(newImgHouse != 0, "imgHouseError", "Add image");

    // console.log(houseName, city, nbRoom, addressHouse, imgHouse, newImgHouse);
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    // console.log(connectedUser);

    var nbHouse = nbHouses(connectedUser);
    // console.log(nbHouse);

    if (nbHouse >= 3) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'you cannot add another House!',
            footer: '<a href="">Why do I have this issue?</a>'
        })

    }

    if (verifHn && verifCity && verifView && verifNbRoom && verifAdrRoom && verifImgHouse && nbHouse <= 2) {

        var idHouse = JSON.parse(localStorage.getItem("idHouse") || "1");
        localStorage.setItem("nbRoom", nbRoom);
        localStorage.setItem("thisIdHouse", idHouse);

        var house = {
            id: idHouse,
            idOwner: connectedUser,
            houseName: houseName,
            city: city,
            view: view,
            nbRoom: nbRoom,
            addressHouse: addressHouse,
            imgHouse: newImgHouse,
            status: "on hold"
        }


        var houses = JSON.parse(localStorage.getItem("houses") || "[]");
        houses.push(house);
        localStorage.setItem("houses", JSON.stringify(houses));
        localStorage.setItem("idHouse", idHouse + 1);
        location.replace("addRoom.html");
    }

}

function nbHouses(idUser) {

    var houses = JSON.parse(localStorage.getItem("houses") || "[]");
    var nbHouse = 0;
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].idOwner == idUser) {
            nbHouse = nbHouse + 1;
        }
    }
    return nbHouse;

}



function addRoom() {
    // récupération des données
    var roomName = document.getElementById("roomName").value;
    var verifRmName = verifInput(roomName.length > 3 && roomName.length < 16, "roomNameError", "Invalid Room Name");


    var capacity = Number(document.getElementById("capacity").value);
    var verifCapacity = verifInput(capacity > 0 && capacity < 11, "capacityError", "Invalid Capacity");

    var price = document.getElementById("price").value;
    var verifPrice = verifInput(price > 0 && price < 2000, "priceError", "Invalid Price");

    var descriptionRoom = document.getElementById("descriptionRoom").value;
    var verifDescRoom = verifInput(descriptionRoom.length > 21 && descriptionRoom.length < 501, "descriptionRoomError", "Your description must have between 20 and 100 characters");

    // .files traja3li fi file liste
    var files = document.getElementById("imgRoom").files;
    // console.log(files);

    // déclaration d'une variable vide pour stocker les paths des images
    var filesPaths = [];
    
    // stocker les paths des images
    for (let i = 0; i < files.length; i++) {
        var file = files[i];
        filesPaths.push(replaceChRoom(file.name))
    }
    // console.log(filesPaths);

    var verifFilesPaths = verifInput(filesPaths.length != 0, "imgRoomError", "Add Imagess")

    // console.log(roomName,capacity, price,descriptionRoom, files,filesPaths);
    var nbRoom = JSON.parse(localStorage.getItem("nbRoom"));
    if (nbRoom == 0) {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'you cannot add another Room!',
            footer: '<a href="">Why do I have this issue?</a>'
        })

    }

    if (verifRmName && verifCapacity && verifPrice && verifDescRoom && verifFilesPaths && nbRoom != 0) {

        var idRoom = JSON.parse(localStorage.getItem("idRoom") || "1");
        var thisIdHouse = localStorage.getItem("thisIdHouse");

        var room = {
            id: idRoom,
            idHouse: thisIdHouse,
            roomName: roomName,
            capacity: capacity,
            price: price,
            descriptionRoom: descriptionRoom,
            imgsRoom: filesPaths,
            status: "on hold"
        }

        var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
        rooms.push(room);
        localStorage.setItem("rooms", JSON.stringify(rooms));
        localStorage.setItem("idRoom", idRoom + 1);
        localStorage.setItem("nbRoom", nbRoom - 1);
        location.reload();

    }
}

// pour convertir une image (Expression régulière)
function replaceCh(ch) {

    var newCH = ch.replace(/[\\/]+/g, '/');
    var res = newCH.replace("C:/fakepath", "D:/Houda/Desktop/Formation_FullStack_JS/travelix-master/images");
    return res;

}

function replaceChRoom(ch) {

    return "D:/Houda/Desktop/Formation_FullStack_JS/travelix-master/images/" + ch;
}

// fonction générique pour récupérer un key from LS
function getFromLs(key) {
    return (JSON.parse(localStorage.getItem(key) || "[]"));
}



// fct générique pour récupérer un objet from LS
function searchById(id, key) {

    var tab = JSON.parse(localStorage.getItem(key) || "[]");
    var object;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            object = tab[i];
            break;
        }
    }
    // console.log(object);
    return object;
}

function displayHouse() {
    var houses = getFromLs("houses");
   
    var houseCart = "";

    for (let i = 0; i < houses.length; i++) {
        if (houses[i].status == "confirmed") {
            houseCart = houseCart + `<div class="col-lg-6 offers_col">
     <div class="offers_item">
         <div class="row">
             <div class="col-lg-6">
                 <div class="offers_image_container">
                     <!-- Image by https://unsplash.com/@kensuarez -->
                     <div class="offers_image_background" style="background-image:url(${houses[i].imgHouse})"></div>
                     <div class="offer_name"><a href="#">${houses[i].houseName}</a></div>
                 </div>
             </div>
             <div class="col-lg-6">
                 <div class="offers_content">
                     <div class="offers_price">${houses[i].city}<span>${houses[i].view}</span></div>
                     <div class="rating_r rating_r_4 offers_rating">
                         <i></i>
                         <i></i>
                         <i></i>
                         <i></i>
                         <i></i>
                     </div>
                     <p class="offers_text">${houses[i].nbRoom} Rooms</p>
                     <div class="offers_icons">
                         <ul class="offers_icons_list">
                             <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                             <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                             <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                             <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
                         </ul>
                     </div>

                     <div class="buttons_container">
					<div class="button"><div class="button_bcg"></div><a onclick="showRooms(${houses[i].id})">read more<span></span><span></span><span></span></a></div>
                 </div>
                 
                 </div>
             </div>
         </div>
     </div>
 </div>`
        }
    }
    document.getElementById("housesCart").innerHTML = houseCart;

}

function showRooms(idHouse) {
    var connectedUser = localStorage.getItem("connectedUser");
    var users = getFromLs("users");
    localStorage.setItem("hsToReserve", idHouse);

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == connectedUser) {
            if (users[i].role == "client") {
                location.replace("indexRooms.html");
            }
            if (users[i].role == "admin") {
                location.replace("indexRoomsForAdmin.html");
            }
        }
    }
}
function displayRoomForAdmin() {

    var rooms = getFromLs("rooms");
    var hsToReserve = localStorage.getItem("hsToReserve");

    var roomCart = "";

    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].idHouse == hsToReserve && rooms[i].status == "confirmed") {

            roomCart = roomCart + `<div class="offers_item rating_4">
    <div class="row">
    <div class="col-lg-1 temp_col"></div>
<div class="col-lg-3 col-1680-4">
    <div class="offers_image_container">
        <!-- Image by https://unsplash.com/@kensuarez -->
        <div class="offers_image_background" style="background-image:url(${rooms[i].imgsRoom[0]})"></div>
        <div class="offer_name"><a href="uniqueRoom.html">${rooms[i].roomName}</a></div>
    </div>
</div>
<div class="col-lg-8">
    <div class="offers_content">
        <div class="offers_price"> ${rooms[i].roomName}<span>per night / ${rooms[i].capacity} person(s)</span></div>
        <div class="rating_r rating_r_4 offers_rating" data-rating="4">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
        <p class="offers_text">${rooms[i].descriptionRoom}.</p>
        <div class="offers_icons">
            <ul class="offers_icons_list">
                <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
            </ul>
        </div>  
    </div>
</div>
</div>
</div>`;
        }
    }

    document.getElementById("roomsCartForAdmin").innerHTML = roomCart;

}

function displayRoom() {
    var rooms = getFromLs("rooms");
    var hsToReserve = localStorage.getItem("hsToReserve");

    var roomCart = "";

    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].idHouse == hsToReserve && rooms[i].status == "confirmed") {

            roomCart = roomCart + `<div class="offers_item rating_4">
    <div class="row">
    <div class="col-lg-1 temp_col"></div>
<div class="col-lg-3 col-1680-4">
    <div class="offers_image_container">
        <!-- Image by https://unsplash.com/@kensuarez -->
        <div class="offers_image_background" style="background-image:url(${rooms[i].imgsRoom[0]})"></div>
        <div class="offer_name"><a href="uniqueRoom.html">${rooms[i].roomName}</a></div>
    </div>
</div>
<div class="col-lg-8">
    <div class="offers_content">
        <div class="offers_price"> ${rooms[i].roomName}<span>per night / ${rooms[i].capacity} person(s)</span></div>
        <div class="rating_r rating_r_4 offers_rating" data-rating="4">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
        <p class="offers_text">${rooms[i].descriptionRoom}.</p>
        <div class="offers_icons">
            <ul class="offers_icons_list">
                <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
            </ul>
        </div>
        
        <div class="button search_button" onclick="showOneRoom(${rooms[i].id})">details<span></span><span></span><span></span></div>
        
    </div>
</div>
</div>
</div>`;
        }
    }

    document.getElementById("roomsCart").innerHTML = roomCart;
}

function showOneRoom(idRoom) {
    localStorage.setItem("rmToReserve", idRoom);
    location.replace("book.html");
}

function displayOneRoom() {
    // var rooms=getFromLs("rooms");
    var rmToReserve = localStorage.getItem("rmToReserve");
    var room = searchById(rmToReserve, "rooms");
    var houses = getFromLs("houses");
    // console.log(room, houses); 

    // console.log(houses);
    var adr = "";
    for (let i = 0; i < houses.length; i++) {
        if (room.idHouse == houses[i].id) {
            // console.log(room.idHouse);   
            adr = houses[i].addressHouse;
            console.log(adr);
            break;
        }
    }

    var uniqueRmCart = "";
    uniqueRmCart = uniqueRmCart + `<div class="hotel_title_container d-flex flex-lg-row flex-column">
    <div class="hotel_title_content">
        <h1 class="hotel_title">${room.roomName}</h1>
        <div class="rating_r rating_r_4 hotel_rating">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
        <div class="hotel_location">${adr}</div>
    </div>
    <div class="hotel_title_button ml-lg-auto text-lg-right">
        
        <button type="button" class="button search_button" onclick="toBook()">Book</button>
    </div>
</div>

<!-- Listing Image -->

<div class="hotel_image">
    <img src="${room.imgsRoom[0]}" alt="">
    <div class="hotel_review_container d-flex flex-column align-items-center justify-content-center">
        <div class="hotel_review">
            <div class="hotel_review_content">
                <div class="hotel_review_title">very good</div>
                <div class="hotel_review_subtitle">100 reviews</div>
            </div>
            <div class="hotel_review_rating text-center">8.1</div>
        </div>
    </div>
</div>

<!-- Hotel Gallery -->

<div class="hotel_gallery">
    <div class="hotel_slider_container">
        <div class="owl-carousel owl-theme hotel_slider">`;
    for (let i = 0; i < room.imgsRoom.length; i++) {
        uniqueRmCart = uniqueRmCart + `<div class="owl-item">
               <a class="colorbox cboxElement" href="${room.imgsRoom[i]}">
                   <img src="${room.imgsRoom[i]}" alt="">
               </a>
           </div>`;
    }
    uniqueRmCart = uniqueRmCart + `</div>

        <!-- Hotel Slider Nav - Prev -->
        <div class="hotel_slider_nav hotel_slider_prev">
            <svg version="1.1" id="Layer_6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="28px" height="33px" viewBox="0 0 28 33" enable-background="new 0 0 28 33" xml:space="preserve">
                <defs>
                    <linearGradient id='hotel_grad_prev'>
                        <stop offset='0%' stop-color='#fa9e1b'/>
                        <stop offset='100%' stop-color='#8d4fff'/>
                    </linearGradient>
                </defs>
                <path class="nav_path" fill="#F3F6F9" d="M19,0H9C4.029,0,0,4.029,0,9v15c0,4.971,4.029,9,9,9h10c4.97,0,9-4.029,9-9V9C28,4.029,23.97,0,19,0z
                M26,23.091C26,27.459,22.545,31,18.285,31H9.714C5.454,31,2,27.459,2,23.091V9.909C2,5.541,5.454,2,9.714,2h8.571
                C22.545,2,26,5.541,26,9.909V23.091z"/>
                <polygon class="nav_arrow" fill="#F3F6F9" points="15.044,22.222 16.377,20.888 12.374,16.885 16.377,12.882 15.044,11.55 9.708,16.885 11.04,18.219 
                11.042,18.219 "/>
            </svg>
        </div>
        
        <!-- Hotel Slider Nav - Next -->
        <div class="hotel_slider_nav hotel_slider_next">
            <svg version="1.1" id="Layer_7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="28px" height="33px" viewBox="0 0 28 33" enable-background="new 0 0 28 33" xml:space="preserve">
                <defs>
                    <linearGradient id='hotel_grad_next'>
                        <stop offset='0%' stop-color='#fa9e1b'/>
                        <stop offset='100%' stop-color='#8d4fff'/>
                    </linearGradient>
                </defs>
            <path class="nav_path" fill="#F3F6F9" d="M19,0H9C4.029,0,0,4.029,0,9v15c0,4.971,4.029,9,9,9h10c4.97,0,9-4.029,9-9V9C28,4.029,23.97,0,19,0z
            M26,23.091C26,27.459,22.545,31,18.285,31H9.714C5.454,31,2,27.459,2,23.091V9.909C2,5.541,5.454,2,9.714,2h8.571
            C22.545,2,26,5.541,26,9.909V23.091z"/>
            <polygon class="nav_arrow" fill="#F3F6F9" points="13.044,11.551 11.71,12.885 15.714,16.888 11.71,20.891 13.044,22.224 18.379,16.888 17.048,15.554 
            17.046,15.554 "/>
            </svg>
        </div>

    </div>
</div>

<!-- Hotel Info Text -->

<div class="hotel_info_text">
    <p>${room.descriptionRoom} .</p>
</div>

<!-- Hotel Info Tags -->

<div class="hotel_info_tags">
    <ul class="hotel_icons_list">
        <li class="hotel_icons_item"><img src="images/post.png" alt=""></li>
        <li class="hotel_icons_item"><img src="images/compass.png" alt=""></li>
        <li class="hotel_icons_item"><img src="images/bicycle.png" alt=""></li>
        <li class="hotel_icons_item"><img src="images/sailboat.png" alt=""></li>
    </ul>
</div>`

    document.getElementById("uniqueRmsCart").innerHTML = uniqueRmCart;

}

function displayOwnerHouse() {
    var connectedUser = localStorage.getItem("connectedUser");
    var houses = getFromLs("houses");

    var houseOwnerCart = "";

    for (let i = 0; i < houses.length; i++) {
        if (houses[i].idOwner == connectedUser && houses[i].status == "confirmed") {

            houseOwnerCart = houseOwnerCart + `<div class="col-lg-6 offers_col">
     <div class="offers_item">
         <div class="row">
             <div class="col-lg-6">
                 <div class="offers_image_container">
                     <!-- Image by https://unsplash.com/@kensuarez -->
                     <div class="offers_image_background" style="background-image:url(${houses[i].imgHouse})"></div>
                     <div class="offer_name"><a href="#">${houses[i].houseName}</a></div>
                 </div>
             </div>
             <div class="col-lg-6">
                 <div class="offers_content">
                     <div class="offers_price">${houses[i].city}<span>${houses[i].view}</span></div>
                     <div class="rating_r rating_r_4 offers_rating">
                         <i></i>
                         <i></i>
                         <i></i>
                         <i></i>
                         <i></i>
                     </div>
                     <p class="offers_text">${houses[i].nbRoom} Rooms</p>
                     <div class="offers_icons">
                         <ul class="offers_icons_list">
                             <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                             <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                             <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                             <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
                         </ul>
                     </div>
                     <div class="buttons_container">
					<div class="button"><div class="button_bcg"></div><a onclick="showOwnerRooms(${houses[i].id})">read more<span></span><span></span><span></span></a></div>
                 </div>
                     
                 </div>
             </div>
         </div>
     </div>
 </div>`

        }

    }

    document.getElementById("housesOwnerCart").innerHTML = houseOwnerCart;

}

function showOwnerRooms(idHouse) {
    localStorage.setItem("hsOwnerToReserve", idHouse);
    location.replace("indexOwnerRoom.html");

}

function displayOwnerRoom() {
    var rooms = getFromLs("rooms");
    var hsOwnerToReserve = localStorage.getItem("hsOwnerToReserve");

    var roomOwnerCart = "";

    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].idHouse == hsOwnerToReserve && rooms[i].status == "confirmed") {

            roomOwnerCart = roomOwnerCart + `<div class="offers_item rating_4">
    <div class="row">
    <div class="col-lg-1 temp_col"></div>
<div class="col-lg-3 col-1680-4">
    <div class="offers_image_container">
        <!-- Image by https://unsplash.com/@kensuarez -->
        <div class="offers_image_background" style="background-image:url(${rooms[i].imgsRoom[0]})"></div>
        <div class="offer_name"><a href="#">${rooms[i].roomName}</a></div>
    </div>
</div>
<div class="col-lg-8">
    <div class="offers_content">
        <div class="offers_price">${rooms[i].roomName}<span>per night / ${rooms[i].capacity} person(s)</span></div>
        <div class="rating_r rating_r_4 offers_rating" data-rating="4">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
        <p class="offers_text">${rooms[i].descriptionRoom}.</p>
        <div class="offers_icons">
            <ul class="offers_icons_list">
                <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
            </ul>
        </div>
        
    </div>
</div>
</div>
</div>`;
        }
    }

    document.getElementById("roomsOwnerCart").innerHTML = roomOwnerCart;

}

function houseOwnerSearch(evt) {

    var code = evt.keyCode;
    if (code == 13) {
        var hsNameOwnerSearch = document.getElementById("searchInputOwnerHouse").value;
        localStorage.setItem("hsNameOwnerSearch", hsNameOwnerSearch);
        console.log(hsNameOwnerSearch);
        location.replace("houseOwnerSearch.html");
    }

}
function roomOwnerSearch(evt) {

    var code = evt.keyCode;
    if (code == 13) {
        var rmNameOwnerSearch = document.getElementById("searchInputOwnerRoom").value;
        localStorage.setItem("rmNameOwnerSearch", rmNameOwnerSearch);
        // console.log(rmNameSearch);
        location.replace("roomOwnerSearch.html");
    }

}

function displayHouseOwnerSearch() {
    var houses = getFromLs("houses");
    var hsNameOwnerSearch = localStorage.getItem("hsNameOwnerSearch");

    var result = [];
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].houseName == hsNameOwnerSearch) {
            result.push(houses[i]);

        }
    }

    var shop = "";

    for (let i = 0; i < result.length; i++) {
        shop = shop + `<div class="col-lg-6 offers_col">
       <div class="offers_item">
           <div class="row">
               <div class="col-lg-6">
                   <div class="offers_image_container">
                       <!-- Image by https://unsplash.com/@kensuarez -->
                       <div class="offers_image_background" style="background-image:url(${result[i].imgHouse})"></div>
                       <div class="offer_name"><a href="#">${result[i].houseName}</a></div>
                   </div>
               </div>
               <div class="col-lg-6">
                   <div class="offers_content">
                       <div class="offers_price">${result[i].city}<span>${result[i].view}</span></div>
                       <div class="rating_r rating_r_4 offers_rating">
                           <i></i>
                           <i></i>
                           <i></i>
                           <i></i>
                           <i></i>
                       </div>
                       <p class="offers_text">${result[i].nbRoom} Rooms</p>
                       <div class="offers_icons">
                           <ul class="offers_icons_list">
                               <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                               <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                               <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                               <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
                           </ul>
                       </div>
                       <div class="buttons_container">
                        <div class="button"><div class="button_bcg"></div><a onclick="showOwnerRooms(${result[i].id})">read more<span></span><span></span><span></span></a></div>
                     </div>
                   </div>
               </div>
           </div>
       </div>
   </div>`;

    }
    document.getElementById("houseOwnerShop").innerHTML = shop;
}

function displayRoomOwnerSearch() {
    var rooms = getFromLs("rooms");
    var rmNameOwnerSearch = localStorage.getItem("rmNameOwnerSearch");
    var hsOwnerToReserve = localStorage.getItem("hsOwnerToReserve");

    var result = [];
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].idHouse == hsOwnerToReserve && rooms[i].roomName == rmNameOwnerSearch) {
            result.push(rooms[i]);

        }
    }

    var shop = "";
    for (let i = 0; i < result.length; i++) {
        shop = shop + `<div class="offers_item rating_4">
        <div class="row">
        <div class="col-lg-1 temp_col"></div>
        <div class="col-lg-3 col-1680-4">
            <div class="offers_image_container">
                <!-- Image by https://unsplash.com/@kensuarez -->
                <div class="offers_image_background" style="background-image:url(${result[i].imgsRoom[0]})"></div>
                <div class="offer_name"><a href="#">${result[i].roomName}</a></div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="offers_content">
                <div class="offers_price"> ${result[i].roomName}<span>per night / ${result[i].capacity} person(s)</span></div>
                <div class="rating_r rating_r_4 offers_rating" data-rating="4">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <p class="offers_text">${result[i].descriptionRoom}.</p>
                <div class="offers_icons">
                    <ul class="offers_icons_list">
                        <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                        <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                        <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                        <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
        </div>`;

    }
    document.getElementById("roomOwnerShop").innerHTML = shop;
}

function houseClientSearch(evt) {

    var code = evt.keyCode;
    if (code == 13) {
        var hsNameClientSearch = document.getElementById("searchInputClientHouse").value;
        localStorage.setItem("hsNameClientSearch", hsNameClientSearch);
        // console.log(hsNameClientSearch);
        location.replace("houseClientSearch.html");
    }

}
function roomClientSearch(evt) {

    var code = evt.keyCode;
    if (code == 13) {
        var rmNameClientSearch = document.getElementById("searchInputClientRoom").value;
        localStorage.setItem("rmNameClientSearch", rmNameClientSearch);
        // console.log(rmNameSearch);
        location.replace("roomClientSearch.html");
    }

}
function roomAdminSearch(evt) {
    var code = evt.keyCode;
    if (code == 13) {
        var rmNameAdminSearch = document.getElementById("searchInputAdminRoom").value;
        localStorage.setItem("rmNameAdminSearch", rmNameAdminSearch);
        // console.log(rmNameSearch);
        location.replace("roomAdminSearch.html");
    }

}

function displayHouseClientSearch() {
    var houses = getFromLs("houses");
    var hsNameClientSearch = localStorage.getItem("hsNameClientSearch");

    var result = [];
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].houseName == hsNameClientSearch) {
            result.push(houses[i]);

        }
    }

    var shop = "";

    for (let i = 0; i < result.length; i++) {
        shop = shop + `<div class="col-lg-6 offers_col">
        <div class="offers_item">
            <div class="row">
                <div class="col-lg-6">
                    <div class="offers_image_container">
                        <!-- Image by https://unsplash.com/@kensuarez -->
                        <div class="offers_image_background" style="background-image:url(${result[i].imgHouse})"></div>
                        <div class="offer_name"><a href="#">${result[i].houseName}</a></div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="offers_content">
                        <div class="offers_price">${result[i].city}<span>${result[i].view}</span></div>
                        <div class="rating_r rating_r_4 offers_rating">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                        <p class="offers_text">${result[i].nbRoom} Rooms</p>
                        <div class="offers_icons">
                            <ul class="offers_icons_list">
                                <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                                <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                                <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                                <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
                            </ul>
                        </div>
                        <div class="buttons_container">
                        <div class="button"><div class="button_bcg"></div><a onclick="showRooms(${result[i].id})">read more<span></span><span></span><span></span></a></div>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    </div>` ;

    }
    document.getElementById("houseClientShop").innerHTML = shop;
}

function displayRoomClientSearch() {
    var rooms = getFromLs("rooms");
    var rmNameClientSearch = localStorage.getItem("rmNameClientSearch");
    var hsToReserve = localStorage.getItem("hsToReserve");

    var result = [];
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].idHouse == hsToReserve && rooms[i].roomName == rmNameClientSearch) {
            result.push(rooms[i]);

        }
    }

    var shop = "";
    for (let i = 0; i < result.length; i++) {
        shop = shop + `<div class="offers_item rating_4">
        <div class="row">
        <div class="col-lg-1 temp_col"></div>
        <div class="col-lg-3 col-1680-4">
            <div class="offers_image_container">
                <!-- Image by https://unsplash.com/@kensuarez -->
                <div class="offers_image_background" style="background-image:url(${result[i].imgsRoom[0]})"></div>
                <div class="offer_name"><a href="uniqueRoom.html">${result[i].roomName}</a></div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="offers_content">
                <div class="offers_price">$ ${result[i].roomName}<span>per night / ${result[i].capacity} person(s)</span></div>
                <div class="rating_r rating_r_4 offers_rating" data-rating="4">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <p class="offers_text">${result[i].descriptionRoom}.</p>
                <div class="offers_icons">
                    <ul class="offers_icons_list">
                        <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                        <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                        <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                        <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
                    </ul>
                </div>
                <div class="button book_button" onclick="showOneRoom(${result[i].id})">more details<span></span><span></span><span></span></div>
                
            </div>
        </div>
        </div>
        </div>`;

    }
    document.getElementById("roomClientShop").innerHTML = shop;
}
function displayRoomAdminSearch() {
    var rooms = getFromLs("rooms");
    var rmNameAdminSearch = localStorage.getItem("rmNameAdminSearch");
    var hsToReserve = localStorage.getItem("hsToReserve");

    var result = [];
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].idHouse == hsToReserve && rooms[i].roomName == rmNameAdminSearch) {
            result.push(rooms[i]);

        }
    }

    var shop = "";
    for (let i = 0; i < result.length; i++) {
        shop = shop + `<div class="offers_item rating_4">
        <div class="row">
        <div class="col-lg-1 temp_col"></div>
        <div class="col-lg-3 col-1680-4">
            <div class="offers_image_container">
                <!-- Image by https://unsplash.com/@kensuarez -->
                <div class="offers_image_background" style="background-image:url(${result[i].imgsRoom[0]})"></div>
                <div class="offer_name"><a href="uniqueRoom.html">${result[i].roomName}</a></div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="offers_content">
                <div class="offers_price">$ ${result[i].roomName}<span>per night / ${result[i].capacity} person(s)</span></div>
                <div class="rating_r rating_r_4 offers_rating" data-rating="4">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <p class="offers_text">${result[i].descriptionRoom}.</p>
                <div class="offers_icons">
                    <ul class="offers_icons_list">
                        <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                        <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                        <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                        <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
                    </ul>
                </div>
                
                
            </div>
        </div>
        </div>
        </div>`;

    }
    document.getElementById("roomAdminShop").innerHTML = shop;

}

function displayUsers() {
    var users = getFromLs("users");

    var userTable = `<table class="table">
    <thead>
    <tr>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">Email</th>
    <th scope="col">Tel Number</th>
    <th scope="col">Role</th>
    <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>`;
    for (let i = 1; i < users.length; i++) {
        userTable = userTable + `<tr>
        <th scope="row">${users[i].firstName}</th>
        <td>${users[i].lastName}</td>
        <td>${users[i].email}</td>
        <td>${users[i].tel}</td>
        <td>${users[i].role}</td>
        <td>
        <button type="button" class="btn btn-primary" onclick="confirmUser(${users[i].id})">Confirm</button>
        <button type="button" class="btn btn-danger" onclick="deleteUser(${users[i].id})">Delete</button>

        </td>
        </tr>`;

    }
    userTable = userTable +
        `</tbody>
    </table>`;
    document.getElementById("userTable").innerHTML = userTable;
}

function confirmUser(id) {
    var users = getFromLs("users");

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users[i].status = "confirmed";
            break;
        }

    }
    localStorage.setItem("users", JSON.stringify(users));
}

function deleteUser(id) {
    localStorage.setItem("deleteIdUser", JSON.stringify(id));
    var users = getFromLs("users");

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            if (users[i].role == "owner") {
                deleteHouses();
                pos = i;
                break


            } else {
                deleteOrdersForUser();
                pos = i;
                break
            }
        }
    }
    users.splice(pos, 1);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
}

function deleteOrdersForUser() {
    var deleteIdUser = JSON.parse(localStorage.getItem("deleteIdUser"));
    var orders = getFromLs("orders");
    var newOrders = [];

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idClient != deleteIdUser) {
            newOrders.push(orders[i]);
        }
    }
    localStorage.setItem("orders", JSON.stringify(newOrders));
    localStorage.removeItem("deleteIdUser");
}
function deleteHouses() {

    var deleteIdUser = JSON.parse(localStorage.getItem("deleteIdUser"));
    var houses = getFromLs("houses");
    var rooms = getFromLs("rooms");
    var newHouses = [];
    var newRooms = [];

    for (let i = 0; i < houses.length; i++) {
        if (houses[i].idOwner == deleteIdUser) {
            var id = houses[i].id;
            for (let j = 0; j < rooms.length; j++) {
                if (rooms[j].idHouse != id) {
                    newRooms.push(rooms[j]);
                }
            }
        }
    }

    for (let i = 0; i < houses.length; i++) {
        if (houses[i].idOwner != deleteIdUser) {
            newHouses.push(houses[i]);
        }
        if (houses[i].idOwner == deleteIdUser) {
            deleteOrdersByHouseId(houses[i].id);
        }
    }
    localStorage.setItem("rooms", JSON.stringify(newRooms));
    localStorage.setItem("houses", JSON.stringify(newHouses));
    localStorage.removeItem("deleteIdUser");
}
function deleteOrdersByHouseId(id) {
    var orders = getFromLs("orders");
    var newOrders = [];
    
    for (let i = 0; i < orders.length; i++) {
        var room=searchById(orders[i].idRoom, "rooms");
        if (room.idHouse != id) {
            newOrders.push(orders[i]);
        }
    }
    localStorage.setItem("orders", JSON.stringify(newOrders));
}


function displayHouses() {
    var houses = getFromLs("houses");

    var houseTable = `<table class="table">
    <thead>
    <tr>
    <th scope="col">Owner Id</th>
    <th scope="col">House Name</th>
    <th scope="col">City</th>
    <th scope="col">Room's Number</th>
    <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < houses.length; i++) {
        houseTable = houseTable + `<tr>
        <th scope="row">${houses[i].idOwner}</th>
        <td>${houses[i].houseName}</td>
        <td>${houses[i].city}</td>
        <td>${houses[i].nbRoom}</td>
        <td>
        <button type="button" class="btn btn-primary" onclick="confirmHouse(${houses[i].id})">Confirm</button>
        <button type="button" class="btn btn-danger" onclick="deleteHouse(${houses[i].id})">Delete</button>

        </td>
        </tr>`;

    }
    houseTable = houseTable +
        `</tbody>
    </table>`;
    document.getElementById("houseTable").innerHTML = houseTable;

}


function confirmHouse(id) {
    var houses = getFromLs("houses");

    for (let i = 0; i < houses.length; i++) {
        if (houses[i].id == id) {
            houses[i].status = "confirmed";
            break;
        }

    }
    localStorage.setItem("houses", JSON.stringify(houses));
}
// function confirm(id, key) {
//     var tab= getFromLs(key);

//     for (let i = 0; i < tab.length; i++) {
//         if (tab[i].id == id) {
//             tab[i].status= "confirmed";
//             break;
//            }

//     }

// }

function deleteHouse(id) {
    // il faut supprimer les rooms
    var houses = getFromLs("houses");
    var pos;
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].id == id) {
            pos = i;
            break;
        }

    }
    houses.splice(pos, 1);
    localStorage.setItem("houses", JSON.stringify(houses));
    location.reload();

}

function displayRooms() {
    var rooms = getFromLs("rooms");

    var roomTable = `<table class="table">
    <thead>
    <tr>
    <th scope="col">House Id</th>
    <th scope="col">Room Name</th>
    <th scope="col">Price</th>
    <th scope="col">Description</th>
    <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < rooms.length; i++) {
        roomTable = roomTable + `<tr>
        <th scope="row">${rooms[i].idHouse}</th>
        <td>${rooms[i].roomName}</td>
        <td>${rooms[i].price}</td>
        <td>${rooms[i].descriptionRoom}</td>
        <td>
        <button type="button" class="btn btn-primary" onclick="confirmRoom(${rooms[i].id})">Confirm</button>
        <button type="button" class="btn btn-danger" onclick="deleteRoom(${rooms[i].id})">Delete</button>

        </td>
        </tr>`;

    }
    roomTable = roomTable +
        `</tbody>
    </table>`;
    document.getElementById("roomTable").innerHTML = roomTable;

}
function confirmRoom(id) {
    var rooms = getFromLs("rooms");

    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id == id) {
            rooms[i].status = "confirmed";
            break;
        }

    }
    localStorage.setItem("rooms", JSON.stringify(rooms));
}
function deleteRoom(id) {
    // condition pour la dernière room
    var rooms = getFromLs("rooms");
    var pos;
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id == id) {
            pos = i;
            break;
        }

    }
    rooms.splice(pos, 1);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    location.reload();

}

function toBook() {
    var connectedUser = localStorage.getItem("connectedUser");

    // si client connecté sinon go to login
    if (connectedUser) {
        var test = true;
        var rmToReserve = localStorage.getItem("rmToReserve");
        // valid


        // room: get capacity
        var room = searchById(rmToReserve, "rooms");
        // valid


        var checkIn = document.getElementById("checkIn").value;
        var checkOut = document.getElementById("checkOut").value;
        // condition sur la date in<out
        if (checkIn < checkOut) {
            document.getElementById("checkInError").innerHTML = "";

        } else {
            document.getElementById("checkInError").innerHTML = "Invalid Date";
            document.getElementById("checkInError").style.color = "red";
            test = false;
        }


        var psNumber = Number(document.getElementById("psNumber").value);

        // condition sur les numéro de personne< capacity
        if (psNumber > 0 && psNumber <= room.capacity) {
            document.getElementById("psNumberError").innerHTML = "";

        } else {
            document.getElementById("psNumberError").innerHTML = "Invalid Number";
            document.getElementById("psNumberError").style.color = "red";
            test = false;
        }

        var orders = JSON.parse(localStorage.getItem("orders") || "[]");
        // order empty, c'est la 1ère réservation
        if (orders.length == 0) {
            // true: fct return true check in < out
            if (test) {
                var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");
                var order = {
                    id: idOrder,
                    idClient: connectedUser,
                    idRoom: rmToReserve,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    psNumber: psNumber,
                    status: "on hold"
                };
                
                orders.push(order);
                

                localStorage.setItem("orders", JSON.stringify(orders));
                // console.log(psNumber);
                localStorage.setItem("idOrder", idOrder + 1);

                // get room from rooms pour réduire la capacity
                var rooms = getFromLs("rooms");
                for (let i = 0; i < rooms.length; i++) {
                    if (rooms[i].id == rmToReserve) {
                        rooms[i].capacity = Number(rooms[i].capacity) - psNumber;
                        break;
                    }
                }
                localStorage.setItem("rooms", JSON.stringify(rooms));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'your order is saved, please wait for the confirmation',
                    showConfirmButton: true,
                    timer: 10000
                })


            }
        }
        // à partir de 2ème réservation
        else {
            if (test) {
                var reserved = false;
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].idRoom == rmToReserve && (orders[i].checkIn == checkIn || orders[i].checkOut == checkOut)) {
                        reserved = true;
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'choose another date please!',
                            footer: '<a href="">Why do I have this issue?</a>'
                        })
                        break;
                    }

                }
                if (!reserved) {
                    var idOrder = JSON.parse(localStorage.getItem("idOrder"));
                    var order = {
                        id: idOrder,
                        idClient: connectedUser,
                        idRoom: rmToReserve,
                        checkIn: checkIn,
                        checkOut: checkOut,
                        psNumber: psNumber,
                        status: "on hold"
                    };
                    orders.push(order);
                    localStorage.setItem("orders", JSON.stringify(orders));
                    localStorage.setItem("idOrder", idOrder + 1);

                    // get room from rooms pour réduire la capacity
                    var rooms = getFromLs("rooms");
                    for (let i = 0; i < rooms.length; i++) {
                        if (rooms[i].id == rmToReserve) {
                            rooms[i].capacity = Number(rooms[i].capacity) - psNumber;
                            break;
                        }
                    }
                    localStorage.setItem("rooms", JSON.stringify(rooms));
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'your order is saved, please wait for the confirmation',
                        showConfirmButton: true,
                        timer: 10000
                    })
                }
            }
        }
    } else {
        location.replace("logIn.html");
    }
}

function getOrdersByOwnerId(id) {
    var orders = getFromLs("orders");
    var filteredOrders = orders.filter(function (order) {
        const room = searchById(order.idRoom, 'rooms');
        const house = searchById(room.idHouse, 'houses');
        return house.idOwner == id;
    })
    return filteredOrders;
}

function displayOrdersForOwner() {

    var connectedUser = localStorage.getItem('connectedUser');
    var orders = getOrdersByOwnerId(connectedUser);

    var orderTable = `<table class="table">
    <thead>
    <tr>
    <th scope="col">Client Id</th>
    <th scope="col">Room Id</th>
    <th scope="col">Name</th>
    <th scope="col">Tel Number</th>
    <th scope="col">Person's Number</th>
    <th scope="col">Check In</th>
    <th scope="col">Check Out</th>
    <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < orders.length; i++) {
        var client = searchById(orders[i].idClient, "users");
        orderTable = orderTable + `<tr>
        <th scope="row">${orders[i].idClient}</th>
        <td>${orders[i].idRoom}</td>
        <td>${client.firstName}</td>
        <td>${client.tel}</td>
        <td>${orders[i].psNumber}</td>
        <td>${orders[i].checkIn}</td>
        <td>${orders[i].checkOut}</td>
        <td>
        <button type="button" class="btn btn-primary" onclick="confirmOrderByOwner(${orders[i].id})">Confirm</button>
        <button type="button" class="btn btn-danger" onclick="deleteOrder(${orders[i].id})">Delete</button>

        </td>
        </tr>`;

    }

    orderTable = orderTable +
        `</tbody>
    </table>`;
    document.getElementById("orderTable").innerHTML = orderTable;
}

function confirmOrderByOwner(id) {
    var orders = getFromLs("orders");

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == id) {
            orders[i].status = "confirmed";
            break;
        }
    }
    localStorage.setItem("orders", JSON.stringify(orders));
}

function deleteOrder(id) {
    var orders = getFromLs("orders");

    // get Order pour la supprimer pour (get idRoom for chage capacity)
    var order = searchById(id, "orders");
    var rooms = getFromLs("rooms");
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id == order.idRoom) {
            rooms[i].capacity = Number(rooms[i].capacity) + order.psNumber;
            break;
        }
    }
    var pos;

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == id) {
            pos = i;
            break;
        }
    }
    orders.splice(pos, 1);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    localStorage.setItem("orders", JSON.stringify(orders));
    location.reload();
}
function displayOrdersForAdmin() {
    var orders = getFromLs("orders");
    console.log(orders);

    var orderTable = `<table class="table">
    <thead>
    <tr>
    <th scope="col">Client Id</th>
    <th scope="col">Room Id</th>
    <th scope="col">Name</th>
    <th scope="col">Tel Number</th>
    <th scope="col">Person's Number</th>
    <th scope="col">Check In</th>
    <th scope="col">Check Out</th>
    
    </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < orders.length; i++) {
        var client = searchById(orders[i].idClient, "users");
        orderTable = orderTable + `<tr>
        <th scope="row">${orders[i].idClient}</th>
        <td>${orders[i].idRoom}</td>
        <td>${client.firstName}</td>
        <td>${client.tel}</td>
        <td>${orders[i].psNumber}</td>
        <td>${orders[i].checkIn}</td>
        <td>${orders[i].checkOut}</td>
        </tr>`;

    }

    orderTable = orderTable +
        `</tbody>
    </table>`;
    console.log(orderTable);
    document.getElementById("orderTableForAdmin").innerHTML = orderTable;

}

function displayBascketTable() {
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    var connectedUser = localStorage.getItem("connectedUser");
    var bascketTable = `<table class="table">
    <thead>
    <tr>
    <th scope="col">Room Name</th>
    <th scope="col">Price</th>
    <th scope="col">Person's Number</th>
    <th scope="col">Check In</th>
    <th scope="col">Check Out</th>
    <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idClient == connectedUser && orders[i].status == "confirmed") {
            var room = searchById(orders[i].idRoom, "rooms");
            bascketTable = bascketTable + `<tr>
        <th scope="row">${room.roomName}</th>
        <td>${room.price}</td>
        <td>${orders[i].psNumber}</td>
        <td>${orders[i].checkIn}</td>
        <td>${orders[i].checkOut}</td>

        <td>
        <button type="button" class="btn btn-danger" onclick="deleteOrder(${orders[i].id})">Delete</button>
        </td>
        </tr>`;
        }
    }
    bascketTable = bascketTable +
        `</tbody>
    </table>`;



    document.getElementById("bascketTable").innerHTML = bascketTable;
}

function generateHeader() {
    var connectedUser = localStorage.getItem("connectedUser");
    var headerContent = "";

    if (connectedUser) {
        var user = searchById(connectedUser, "users");
        if (user.role == "admin") {

            headerContent = headerContent + `<li class="main_nav_item"><a href="indexHouses.html">home</a></li>
            <li class="main_nav_item"><a href="dashboardAdmin.html">Dashboard Admin</a></li>
            <li class="main_nav_item">
            <div class="button search_button" onclick="logOut()">Log Out</div>`;
        } 
        else if (user.role == "owner") {
            headerContent = headerContent + `<li class="main_nav_item"><a href="indexOwnerHouse.html">home</a></li>
            <li class="main_nav_item"><a href="addHouse.html">Add House</a></li>
            <li class="main_nav_item"><a href="dashboardOwner.html">Dashboard ${user.firstName}</a></li>
            <li class="main_nav_item"><a href="contact.html">Contact</a></li>
            <li class="main_nav_item">
            <div class="button search_button" onclick="logOut()">Log Out</div>`;
        }
        else {
            headerContent = headerContent + `<li class="main_nav_item"><a href="indexHouses.html">home</a></li>
            <li class="main_nav_item"><a href="myBascket.html">my Orders</a></li>
            <li class="main_nav_item"><a href="contact.html">contact</a></li>
            <li class="main_nav_item">
            <div class="button search_button" onclick="logOut()">Log Out</div>`;
        }

    } else {
        headerContent = headerContent + `<li class="main_nav_item"><a href="indexHouses.html">home</a></li>
            <li class="main_nav_item"><a href="signUp.html">sign Up</a></li>
            <li class="main_nav_item"><a href="logIn.html">login</a></li>
            <li class="main_nav_item"><a href="contact.html">contact</a></li>`;
    }
    document.getElementById("headerContent").innerHTML = headerContent;

}
function logOut() {
    localStorage.removeItem("connectedUser");
    location.replace("logIn.html");
}
