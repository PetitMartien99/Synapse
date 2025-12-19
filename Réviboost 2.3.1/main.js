console.log("Let\'s go!");


function clear_local() {
    localStorage.clear();
    actu_files();
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


const all_buttons = document.querySelectorAll("button");
const all_selects = document.querySelectorAll("select");
const pack_title_ask = document.getElementById("pack_title_ask");
const pack_title_add = document.getElementById("pack_title_add");
const add_p = document.getElementById("add_p");
const pack_title = document.getElementById("pack_title");
const def_title = document.getElementById("def_title");
const def = document.getElementById("def");
const body = document.querySelector("body");
const contain_files = document.getElementById("contain_files");
const asking = document.getElementById("asking");
asking.className = "hide";
asking.value = "";
const msg = document.getElementById("msg");
const writer = document.getElementById("writer");
const toggle_files_button = document.getElementById("toggle");
const ask_div = document.getElementById("ask_div");
const pack_type = document.getElementById("pack_type");
const parameter_div = document.getElementById("parameter_div");
const ultra_container = document.getElementById("ultra_container");
const color = document.getElementById("color");
let first = 1;
const toggle_text = document.getElementById("toggle_text");
let toggle_t = false;
const giga_msg = document.getElementById("giga_msg");
giga_msg.style.opacity = "0";
giga_msg.style.display = "none";
let pre_shown;
let shown = true;
let asked = [];
let about_ask_type;
let questions_type_select = document.getElementById("questions_type_select");
let questions_type;
let about_ask;
let parameter_toggle = false;


setTimeout(() => {
    if (localStorage.getItem("color") !== null) {
        body.style.backgroundColor = localStorage.getItem("color");
        ultra_container.style.backgroundColor = localStorage.getItem("color");
        parameter_div.style.backgroundColor = localStorage.getItem("color");
        ask_div.style.backgroundColor = localStorage.getItem("color");
    }

    if (localStorage.getItem("text_color") !== null) {
        body.style.color = localStorage.getItem("text_color");
        all_buttons.forEach((i) => {i.style.color = localStorage.getItem("text_color")});
        all_selects.forEach((i) => {i.style.color = localStorage.getItem("text_color")});
        document.querySelectorAll("li").forEach((i) => {i.style.color = localStorage.getItem("text_color")});

        if (localStorage.getItem("text_color") === "white") {
            toggle_t = true;
            toggle_text.innerText = "Texte en noir";
        } else {
            toggle_t = false;
            toggle_text.innerText = "Texte en blanc";
        }
    }
}, 10);

document.querySelectorAll('input').forEach((e) => {e.value = "";});

function updateTypeUI_add() {
    if (localStorage.getItem(getPack(pack_title_add.value))) {
        if (getPack(pack_title_add.value).split(";")[1] === "defs") {
            add_p.innerText = "Ajouter une définition";
            def_title.placeholder = "Nom de la définition";
            def.placeholder = "Définition";
        } else {
            add_p.innerText = "Ajouter une date";
            def_title.placeholder = "Date";
            def.placeholder = "Ce qu'il s'y est passé";
        }
    }
}

pack_title_add.addEventListener("input", updateTypeUI_add);



function actu_files() {
    
    /*updateTypeUI_ask();*/

    contain_files.innerHTML = "";

    if (localStorage.key(0) === null) {
        document.querySelector("h2").innerText = "";
        toggle_files_button.style.display = "none";
        return;
    }

    document.querySelector("h2").innerText = "Leçons";
    toggle_files_button.style.display = "block";

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === "color") {
            return;
        }
        if (localStorage.key(i) === "text_color") {
            return;
        }

        let name = localStorage.key(i).split(";")[0];
        let pack = localStorage.key(i);
        let div = document.createElement("div");
        div.className = "file";
        div.innerHTML = "<span>" + name + "</span>";
        div.addEventListener("click", () => {
            pack_title_add.value = name;
          
            pack_title_ask.value = name;

            updateTypeUI_add();
            /*updateTypeUI_ask();*/
        });


        contain_files.appendChild(div);

        let delete_button = document.createElement("button");
        delete_button.className = "delete_button";
        delete_button.innerText = "X";
        delete_button.onclick = function() {
            setTimeout(() => {
                pack_title_add.value = "";
                pack_title_ask.value = "";
                pack_title.value = "";
            }, 10);     
            localStorage.removeItem(pack);
            actu_files();
        };

        div.appendChild(delete_button);


        let ul = document.createElement("ul");
        div.appendChild(ul);
        for (let i = 0; i < JSON.parse(localStorage.getItem(pack)).length; i++) {
            let title = JSON.parse(localStorage.getItem(pack))[i].title;
            let def = JSON.parse(localStorage.getItem(pack))[i].def;
            let new_li = document.createElement("li");
            new_li.innerHTML = "<div class='titles'>" + title + "</div> : " + def;
            ul.appendChild(new_li);

            let delete_def = document.createElement("button");
            delete_def.className = "delete_def";
            delete_def.innerText = "X";
            delete_def.onclick = function() {
                let new_pack = JSON.parse(localStorage.getItem(pack));
                new_pack.splice(i, 1);
                localStorage.setItem(pack, JSON.stringify(new_pack));
                actu_files();

            }
            new_li.appendChild(delete_def);
        }

    }
    updateTypeUI_add();
}

actu_files();



function createPack() {
    if (pack_title.value != "") {
        if (!localStorage.getItem(getPack(pack_title.value.trim()))) {
            localStorage.setItem(pack_title.value + ";" + pack_type.value, "[]");
            actu_files();
        } else {
            giga_show("Cette leçon existe déjà.");
        }
    
    } else {
       giga_show("Entrez un titre de leçon.");
    }
}


function addPack() {
    if (pack_title_add.value != "" && def_title.value != "" && def.value != "") {
        if (localStorage.getItem(getPack(pack_title_add.value)) != null) {
            let pack = JSON.parse(localStorage.getItem(getPack(pack_title_add.value)));

            if (pack.some(item => item.title.trim() === def_title.value.trim())) {
                giga_show("Cette définition existe déjà dans cette leçon.");
                return;
            }
            

            pack.push({title: def_title.value, def: def.value});
            let new_pack = JSON.stringify(pack);
            localStorage.setItem(getPack(pack_title_add.value), new_pack);
            actu_files();
            def_title.value = "";
            def.value = "";
        } else {
            giga_show("Cette leçon n'existe pas.");
            return;
        }
    } else {
        giga_show("Tout doit être complété.");
    }
}



function start() {
    about_ask = JSON.parse(localStorage.getItem(getPack(pack_title_ask.value)));
    questions_type = questions_type_select.value;
    if (questions_type != "write") {
        if (about_ask.length < 5) {
            giga_show("Pas assez d'éléments pour faire un QCM");
            return;
        }
    }   

    if (pack_title_ask.value === "") {
        return;
    }
    
    if (!localStorage.getItem(getPack(pack_title_ask.value))) {
        giga_show("Cette leçon n'existe pas");
        return;
    }


    pre_shown = shown;
    if (shown === true) {
        toggle_files();
    }

    
    

    ask_div.style.display = "flex";
    if (questions_type === "write") {
        asking.className = "shown";
    }
    asked = [];
    

    if (getPack(pack_title_ask.value).split(";")[1] === "defs") {
        about_ask_type = "defs";
    } else {
        about_ask_type = "dates";
    }
    
    ultra_container.style.display = "none";
    askQuestion();
}


function askQuestion() {


    

    if (about_ask.length === asked.length) {
        if (pre_shown === true) {
            shown === false;
            toggle_files();
        }

        show("Bravo, tu as fini de réviser la leçon !");
        if (questions_type === "write") {
            asking.className = "hide";
        }
        ask_div.style.opacity = "0";
        msg.style.opacity = "0";
        if (questions_type === "write") {
            asking.className = "shown";
        }
        show("");
        ask_div.style.display = "none";
        ask_div.style.opacity = "1";
        msg.style.opacity = "1";
        ultra_container.style.display = "block";
        return;
    }

    let question_id = getRandom(0, about_ask.length);

    while (asked.includes(question_id)) {
        question_id = getRandom(0, about_ask.length);
    }
    asked.push(question_id);

    let title = about_ask[question_id].title;
    let def = about_ask[question_id].def;

    if (about_ask_type === "defs") {
        if (/^[aeiouyAEIOUY]/.test(title)) {
            show("Quelle est la définition d\'" + title + " ?");
        } else {
            show("Quelle est la définition de " + title + " ?");
        }
    } else {
        if (/^\d/.test(title)) {
            show("Que s'est-il passé le " + title + " ?");
        } else {
            show("Que s'est-il passé en " + title + " ?");
        }
    }

    let reveal = document.createElement("button");
    reveal.innerText = "Révéler la réponse";
    reveal.className = "shown";
    if (toggle_t === true) {
        reveal.style.color = "white";
    } else {
        reveal.style.color = "black";
    }
    ask_div.appendChild(reveal);

    let next = document.createElement("button");
    next.innerText = "Suivant";
    next.className = "hide";
    if (toggle_t === true) {
        next.style.color = "white";
    } else {
        next.style.color = "black";
    }
    ask_div.appendChild(next);
    
    reveal.onclick = () => {
        show("La réponse était : " + def);
        reveal.className = "hide";
        if (questions_type === "write") {
            asking.value = "";
            asking.className = "hide";
        } else {
            writer.innerHTML = "";
        }
        next.className = "shown";
        next.onclick = () => {
            askQuestion();
            next.remove();
            reveal.remove();
        };
        return;
    };
  
    if (questions_type === "write") {
        asking.className = "shown";
        asking.value = "";
        asking.addEventListener("input", () => {
            if (wash(asking.value) === wash(def)) {
                show("C'est la bonne réponse !");
                reveal.className = "hide";
                asking.value = "";
                asking.className = "hide";
                next.className = "shown";
                next.onclick = () => {
                    askQuestion();
                    next.remove();
                    reveal.remove();
                    asking.className = "shown";
                };
                return;
            }
        });
    } else {
        asking.className = "hide";

        let randomise = [];
        randomise.push(getRandom(0, 4));

        while (randomise.length < 4) {
            let i = getRandom(0, 4);
            if (randomise.includes(i)) {
            } else {
                randomise.push(i);
            }
            
        }



        let p2 = document.createElement("p");
        let p2_text = about_ask[getRandom(0, about_ask.length)].def;
        while (p2_text === def) {
            p2_text = about_ask[getRandom(0, about_ask.length)].def;
        }

        let p3 = document.createElement("p");
        let p3_text = about_ask[getRandom(0, about_ask.length)].def;
        while (p3_text === def || p3_text === p2_text) {
            p3_text = about_ask[getRandom(0, about_ask.length)].def;
        }

        let p4 = document.createElement("p");
        let p4_text = about_ask[getRandom(0, about_ask.length)].def;
        while (p4_text === def || p4_text === p2_text || p4_text === p3_text) {
            p4_text = about_ask[getRandom(0, about_ask.length)].def;
        }


        for (let i = 0; i < 3; i++) {

            
            if (randomise[0] === 0) {

                let p1 = document.createElement("p");
                p1.innerText = def;
                p1.className = "phover";
                p1.addEventListener("click", () => {
                    show("C'est la bonne réponse !");
                    writer.innerHTML = "";
                    reveal.className = "hide";
                    next.className = "shown";
                    next.onclick = () => {
                        askQuestion();
                        next.remove();
                        reveal.remove();
                    };
                });
                writer.appendChild(p1);


                randomise.shift();
            }
            if (randomise[0] === 1) {

                p2.innerHTML = p2_text;
                p2.className = "phover";
                p2.addEventListener("click", () => {
                    show("Dommage... La bonne réponse était " + def);
                    writer.innerHTML = "";
                    reveal.className = "hide";
                    next.className = "shown";
                    next.onclick = () => {
                        askQuestion();
                        next.remove();
                        reveal.remove();
                    };
                })
                writer.appendChild(p2);

                randomise.shift();
            }
            if (randomise[0] === 2) {
                
                
                p3.innerHTML = p3_text;
                p3.className = "phover";
                p3.addEventListener("click", () => {
                    show("Dommage... La bonne réponse était " + def);
                    writer.innerHTML = "";
                    reveal.className = "hide";
                    next.className = "shown";
                    next.onclick = () => {
                        askQuestion();
                        next.remove();
                        reveal.remove();
                    };
                })
                writer.appendChild(p3);

                randomise.shift();
            }
            if (randomise[0] === 3) {

                
                
                p4.innerHTML = p4_text;
                p4.className = "phover";
                p4.addEventListener("click", () => {
                    show("Dommage... La bonne réponse était " + def);
                    writer.innerHTML = "";
                    reveal.className = "hide";
                    next.className = "shown";
                    next.onclick = () => {
                        askQuestion();
                        next.remove();
                        reveal.remove();
                    };
                })
                writer.appendChild(p4);

                randomise.shift();
            }
        }
    }
}


function show(message) {
    msg.innerText = message;
}



function toggle_files() {
    const files = document.querySelectorAll(".file");
    const h2 = document.querySelector("h2");

    if (shown === true) {
        shown = false;
        files.forEach(f => f.style.display = "none");
        h2.style.display = "none";
        toggle_files_button.innerText = "Montrer les leçons";
    } else {
        shown = true;
        files.forEach(f => f.style.display = "block");
        h2.style.display = "block";
        toggle_files_button.innerText = "Cacher les leçons";
    }
}  




function wash(text) {
    let washed = text;
    washed = washed.toLowerCase();
    washed = washed.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    washed = washed.replace(/[.,;:!?'"()\-–—]/g, "");
    washed = washed.replace(/\s+/g, "");
    washed = washed.trim();
    return washed;
}


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


function exporting() {
    let total = "";
    for (let i = 0; i < localStorage.length; i++) {
        if (i != 0) {
            total += "#";
        }
        total += localStorage.key(i);
        total += "?";
        total += localStorage.getItem(localStorage.key(i));
    } 
    
    downloadString(total, "data.txt");
}

function decode() {
    const fileInput = document.getElementById("file"); // ton <input type="file">
    const file = fileInput.files[0];
    if (!file) return console.log("Aucun fichier sélectionné !");

    const reader = new FileReader();
    reader.onload = (event) => {
        const total = event.target.result; // ta string entière avec # et ?

        let packs_hash = total.split("#"); 
        for (let i = 0; i < packs_hash.length; i++) { 
            let lesson_hash = packs_hash[i].split("?");
            console.log(lesson_hash);
            let title_pack = lesson_hash[0];
            localStorage.setItem(title_pack, lesson_hash[1]);
        } 
        setTimeout(() => {
            actu_files();
        }, 50);
            
        console.log("Import terminé !");
    };

    reader.readAsText(file); // lit le fichier asynchrone
}






function downloadString(str) {
    const name = document.getElementById("file_input");
    let filename;
    if (name.value !== "") {
        filename = name.value + ".txt";
    } else {
        return;
    }
    const blob = new Blob([str], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


function parameter() {
    if (parameter_toggle === false) {
        parameter_div.style.display = "block";
        parameter_div.style.opacity = 1;
        parameter_toggle = true;
    } else {
        parameter_div.style.opacity = 0;
        parameter_toggle = false;
        setTimeout(() => {
            parameter_div.style.display = "none";
        }, 500);
        
    }
}


color.addEventListener("input", () => {
    if (first === 0) {
        body.style.backgroundColor = color.value;
        ultra_container.style.backgroundColor = color.value;
        parameter_div.style.backgroundColor = color.value;
        ask_div.style.backgroundColor = color.value;

        localStorage.setItem("color", color.value);
    } else {
        first = 0;
    }
});


function toggle_text_f() {
    if (toggle_t === false) {
        toggle_text.innerText = "Texte en noir";
        body.style.color = "white";
        all_buttons.forEach((i) => {i.style.color = "white"});
        all_selects.forEach((i) => {i.style.color = "white"});

        localStorage.setItem("text_color", "white");

        toggle_t = true;
    } else {
        toggle_text.innerText = "Texte en blanc";
        body.style.color = "black";
        all_buttons.forEach((i) => {i.style.color = "black"});
        all_selects.forEach((i) => {i.style.color = "black"});

        localStorage.setItem("text_color", "black");

        toggle_t = false;
    }
    
}
