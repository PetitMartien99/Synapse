console.log("Let\'s go! (general)");
 
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const parameter_div = document.getElementById("parameter_div");
const color = document.getElementById("color");
const toggle_text = document.getElementById("toggle_text");
let toggle_t = false;
const giga_msg = document.getElementById("giga_msg");
giga_msg.style.opacity = "0";
giga_msg.style.display = "none";
let parameter_toggle = false;
let sonor_effects = false;

document.getElementById("inline").querySelector("h3").innerText = "v4.0.5.15 B.";

if (localStorage.getItem("text_color") === null) {
    localStorage.setItem("text_color", "black");
}

document.querySelectorAll('input').forEach((e) => {e.value = "";});
if (localStorage.getItem("color")) {
    document.querySelector("#color").value = "#" + localStorage.getItem("color");
}

/*Pour toggle les spoilers trumbo*/
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("spoiler")) {
        e.target.classList.toggle("revealed");
    }
});

function actu_color() {

        if (localStorage.getItem("color") !== null) {
            let color_safe;
            
            if (localStorage.getItem("color").startsWith("#")) {
                color_safe = localStorage.getItem("color");
            } else {
                color_safe =  "#" + localStorage.getItem("color");
            }
                
            document.querySelector("body").style.setProperty("--background-color", color_safe);
        }

        if (localStorage.getItem("text_color") !== null) {
            document.querySelector("body").style.setProperty("--text-color", localStorage.getItem("text_color"));

            if (localStorage.getItem("text_color") === "white") {
                toggle_t = true;
                toggle_text.innerText = "Texte en noir";
            } else {
                toggle_t = false;
                toggle_text.innerText = "Texte en blanc";
            }
        }
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

document.getElementById("parameter_cover").onclick = () => {parameter()};

function parameter() {
    if (parameter_toggle === false) {
        parameter_div.style.display = "flex";
        parameter_div.style.opacity = 1;
        parameter_toggle = true;
        document.getElementById("parameter_cover").style.display = "block";
        document.getElementById("parameter_cover").onclick = () => {parameter()};
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
    document.querySelector("body").style.setProperty("--background-color", color.value);
    let safe_color = color.value.replace("#", "");
    localStorage.setItem("color", safe_color);
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


function toggleDropdown() {
    document.removeEventListener("click", toggling_click);

    document.getElementById("menu").classList.toggle("hidden");
    document.getElementById("menu").classList.toggle("flex");

    if (document.getElementById("menu").classList.contains("flex")) {
        setTimeout(() => {
            document.addEventListener("click", toggling_click);
        }, 0);
        console.log("flex");
        
    }
}
function toggling_click(e) {
    console.log("click");
        if (!document.getElementById("menu").contains(e.target)) {
            document.removeEventListener("click", toggling_click);
            toggleDropdown();
        }
}