console.log("Let\'s go!");
 
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let all_buttons = document.querySelectorAll("button");
const all_selects = document.querySelectorAll("select");
const beetweens = document.querySelectorAll(".beetween");
const links = document.querySelectorAll("a");
let all_class_files;
let all_small_buttons;
let all_delete_buttons;
const ask_div = document.getElementById("ask_div");
const ultra_container = document.getElementById("ultra_container");
const parameter_div = document.getElementById("parameter_div");
const color = document.getElementById("color");
let first = 1;
const toggle_text = document.getElementById("toggle_text");
let toggle_t = false;
const giga_msg = document.getElementById("giga_msg");
giga_msg.style.opacity = "0";
giga_msg.style.display = "none";
let parameter_toggle = false;
let sonor_effects = false;


document.querySelectorAll('input').forEach((e) => {e.value = "";});

function actu_color() {
    setTimeout(() => {
        if (localStorage.getItem("color") !== null) {
            let color_safe;
            
            if (localStorage.getItem("color").startsWith("#")) {
                color_safe = localStorage.getItem("color");
            } else {
                color_safe =  "#" + localStorage.getItem("color");
            }
                
            document.querySelector("body").style.backgroundColor = color_safe;
            if (!(ultra_container === null)) {
                ultra_container.style.backgroundColor = color_safe;
            }
            parameter_div.style.backgroundColor = color_safe;
            if (!(ask_div === null)) {
                ask_div.style.backgroundColor = color_safe;
            }
        }

        if (localStorage.getItem("text_color") !== null) {
            all_buttons = document.querySelectorAll("button");
            document.querySelector("body").style.color = localStorage.getItem("text_color");
            all_buttons.forEach((i) => {i.style.color = localStorage.getItem("text_color")});
            all_selects.forEach((i) => {i.style.color = localStorage.getItem("text_color")});
            beetweens.forEach((i) => {i.style.backgroundColor = localStorage.getItem("text_color")});
            links.forEach((i) => {i.style.color = localStorage.getItem("text_color")});

            all_class_files = document.querySelectorAll(".file");
            
            if (!(all_class_files === undefined)) {
                all_class_files.forEach((i) => {i.style.border = "solid 1px " + localStorage.getItem("text_color"); console.log(i.style.border);});
            }
            document.querySelectorAll("li").forEach((i) => {i.style.color = localStorage.getItem("text_color")});
            parameter_div.style.border = "solid 1px " + localStorage.getItem("text_color");

            if (document.getElementById("account_small") != undefined) {
                document.getElementById("account_small").style.border = "1px solid " + localStorage.getItem("text_color");
            }
            if (document.querySelectorAll(".session_div").length != 0) {
                document.querySelectorAll(".session_div").forEach((e) => {e.style.border = "1px solid " + localStorage.getItem("text_color")});
            }
            if (document.querySelectorAll(".lesson_div").length != 0) {
                document.querySelectorAll(".lesson_div").forEach((e) => {e.style.border = "1px solid " + localStorage.getItem("text_color")});
            }

            if (localStorage.getItem("text_color") === "white") {
                toggle_t = true;
                toggle_text.innerText = "Texte en noir";
                if (!document.getElementById("for_file") === null) {
                    document.getElementById("for_file").classList.remove("black_hover");
                    document.getElementById("for_file").classList.add("white_hover");
                }
            } else {
                toggle_t = false;
                toggle_text.innerText = "Texte en blanc";
                if (!document.getElementById("for_file") === null) {
                    document.getElementById("for_file").classList.remove("white_hover");
                    document.getElementById("for_file").classList.add("black_hover");  
                }
            }
        }
    }, 30);
}

actu_color();


function giga_show(msg) {
    giga_msg.style.transition = "opacity 1s";
    giga_msg.innerText = msg;
    giga_msg.style.opacity = "1";
    giga_msg.style.display = "block";
    setTimeout(() => {
        giga_msg.style.opacity = "0";
        setTimeout(() => {
            giga_msg.style.display = "none";
        }, 1000);
    }, 3000);
}


function getPack(baseName) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith(baseName + ";")) {
            return key;
        }
    }
    return null;
}

function parameter() {
    if (parameter_toggle === false) {
        parameter_div.style.display = "block";
        parameter_div.style.opacity = 1;
        parameter_toggle = true;
        document.getElementById("parameter_cover").style.display = "block";
    } else {
        parameter_div.style.opacity = 0;
        parameter_toggle = false;
        document.getElementById("parameter_cover").style.display = "none";
        setTimeout(() => {
            parameter_div.style.display = "none";
        }, 500);
        
    }
}



color.addEventListener("input", () => {
    if (first === 0) {
        document.querySelector("body").style.backgroundColor = color.value;
        if (!(ultra_container === null)) {
            ultra_container.style.backgroundColor = color.value;
        }
        parameter_div.style.backgroundColor = color.value;
        if (!(ask_div === null)) {
            ask_div.style.backgroundColor = color.value;
        }
        let safe_color = color.value.replace("#", "");
        localStorage.setItem("color", safe_color);
    } else {
        first = 0;
    }
});


function toggle_text_f() {
    if (toggle_t === false) {
        toggle_text.innerText = "Texte en noir";
        localStorage.setItem("text_color", "white");
        actu_color();
        toggle_t = true;
    } else {
        toggle_text.innerText = "Texte en blanc";
        localStorage.setItem("text_color", "black");
        actu_color();
        toggle_t = false;
    }
    
}


function toggle_sound() {
    if (sonor_effects === true) {
        sonor_effects = false;
    } else {
        sonor_effects = true;
    }
}

function playSound(name) {
    if (!name) return;
    name.currentTime = 0;
    name.play();
}