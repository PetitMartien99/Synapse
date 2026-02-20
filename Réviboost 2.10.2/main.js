console.log("Let\'s go!");
 

function clear_local() {
    localStorage.clear();
    actu_files();
}

//clear_local()

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


const all_buttons = document.querySelectorAll("button");
const all_selects = document.querySelectorAll("select");
const beetweens = document.querySelectorAll(".beetween");
let all_class_files;
let all_small_buttons;
let all_delete_buttons;
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
let interrogation_time;
let questions_number;
let right_answers;
let time_stat; 
let sonor_effects = false;

const fail = new Audio("Échec.mp3");
const victory = new Audio("Victoire.mp3");
const correct = new Audio("Correct.mp3");


document.querySelectorAll('input').forEach((e) => {e.value = "";});

function updateTypeUI_add() {
    if (localStorage.getItem(getPack(pack_title_add.value))) {
        if (getPack(pack_title_add.value).split(";")[1] === "defs") {
            add_p.innerText = "Ajouter une définition";
            def_title.placeholder = "Nom de la définition";
            def.placeholder = "Définition";
        } else if (getPack(pack_title_add.value).split(";")[1] === "dates") {
            add_p.innerText = "Ajouter une date";
            def_title.placeholder = "Date";
            def.placeholder = "Ce qu'il s'y est passé";
        } else {
            add_p.innerText = "Ajouter une égalité";
            def_title.placeholder = "Premier membre";
            def.placeholder = "Deuxième membre";
        }
    }
}

pack_title_add.addEventListener("input", updateTypeUI_add);


function actu_files() {
    
    let actual_color;
    /*updateTypeUI_ask();*/
    if (localStorage.getItem("text_color") !== null) {
        actual_color = localStorage.getItem("text_color");
    } else {
        actual_color = "black";
    }

    contain_files.innerHTML = "";

    if (localStorage.key(0) === null) {
        document.querySelector("h2").innerText = "";
        toggle_files_button.style.display = "none";
        return;
    }

    document.querySelector("h2").innerText = "Leçons";
    toggle_files_button.style.display = "block";

    for (let i = 0; i < localStorage.length; i++) {

        let name = localStorage.key(i).split(";")[0];
        if (name === "color") {
            continue;
        } else if (name === "text_color") {
            continue;
        }
        
        let type = localStorage.key(i).split(";")[1];
        let pack = localStorage.key(i);
        let div = document.createElement("div");
        div.className = "file";
        div.style.border = "2px solid " + actual_color;
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
        delete_button.style.color = actual_color;
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
            if (type === "egal") {
                new_li.innerHTML = title + " = " + def;
            } else {
                new_li.innerHTML = "<div class='titles'>" + title + "</div> : " + def;
            }
            
            ul.appendChild(new_li);

            let delete_def = document.createElement("button");
            delete_def.className = "delete_def";
            delete_def.style.color = actual_color;
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
    all_class_files = document.querySelectorAll(".file");
    all_small_buttons = document.querySelectorAll(".delete_button");
    all_delete_buttons = document.querySelectorAll(".delete_def");
    actu_color();
}

actu_files();

function actu_color() {
    setTimeout(() => {
        if (localStorage.getItem("color") !== null) {
            let color_safe;
            
            if (localStorage.getItem("color").startsWith("#")) {
                color_safe = localStorage.getItem("color");
            } else {
                color_safe =  "#" + localStorage.getItem("color");
            }
                
            body.style.backgroundColor = color_safe;
            ultra_container.style.backgroundColor = color_safe;
            parameter_div.style.backgroundColor = color_safe;
            ask_div.style.backgroundColor = color_safe;
        }

        if (localStorage.getItem("text_color") !== null) {
            body.style.color = localStorage.getItem("text_color");
            all_buttons.forEach((i) => {i.style.color = localStorage.getItem("text_color")});
            all_selects.forEach((i) => {i.style.color = localStorage.getItem("text_color")});
            beetweens.forEach((i) => {i.style.backgroundColor = localStorage.getItem("text_color")});

            all_class_files.forEach((i) => {i.style.border = "solid 2px " + localStorage.getItem("text_color")});
            all_small_buttons.forEach((i) => {i.style.color = localStorage.getItem("text_color")});
            all_delete_buttons.forEach((i) => {i.style.color = localStorage.getItem("text_color")});
            document.querySelectorAll("li").forEach((i) => {i.style.color = localStorage.getItem("text_color")});
            parameter_div.style.border = "solid 2px " + localStorage.getItem("text_color");

            if (localStorage.getItem("text_color") === "white") {
                toggle_t = true;
                toggle_text.innerText = "Texte en noir";
                document.getElementById("for_file").classList.remove("black_hover");
                document.getElementById("for_file").classList.add("white_hover");
            } else {
                toggle_t = false;
                toggle_text.innerText = "Texte en blanc";
                document.getElementById("for_file").classList.remove("white_hover");
                document.getElementById("for_file").classList.add("black_hover");               
            }
        }
    }, 30);
}

/*actu_color()*/

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
            giga_show("Pas assez d'éléments pour être interrogé");
            return;
        }
    }   

    questions_number = about_ask.length;

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
    } else if (getPack(pack_title_ask.value).split(";")[1] === "dates") {
        about_ask_type = "dates";
    } else {
        about_ask_type = "egal";
    }

    interrogation_time = 0;
    time_stat = setInterval(() => {interrogation_time += 0.1;}, 100);
    right_answers = 0;

    
    ultra_container.style.display = "none";
    body.style.overflow = "hidden";
    askQuestion();
}


function askQuestion() {

    if (about_ask.length === asked.length) {
        if (pre_shown === true) {
            shown === false;
            toggle_files();
        }

        if (questions_type === "write") {
            asking.className = "hide";
        }

        if (questions_type === "write") {
            asking.className = "shown";
        }

        clearInterval(time_stat);
        let percent = Math.round((right_answers*100) / questions_number);
        if (sonor_effects === true) {
            playSound(victory);
        }
        let text = "Bravo, tu as fini de réviser la leçon !<br><div id='results'><div id='speed'><img id='chrono' src='chronometer.png'><br><div id='animate_time'></div> secondes</div><div id='precision'><img id='cible' src='Cible.png'><br><div id='animate_precision'></div>%</div></div>";
        show(text);
        animateNumber(document.getElementById("animate_time"), Math.round(interrogation_time));
        animateNumber(document.getElementById("animate_precision"), percent);
        asking.className = "hide";
        let count = 0;
        const interval = setInterval(() => {
            spawnConfetti();
            count++;

            if (count >= 120) {
                clearInterval(interval);
            }
        }, 30);

        let continue_button = document.createElement("button");
        continue_button.innerText = "Continuer";  
        if (toggle_t === true) {
            continue_button.style.color = "white";
        } else {
            continue_button.style.color = "black";
        }
        ask_div.appendChild(continue_button);
        
        
        continue_button.onclick = () => {
            continue_button.remove();
            ask_div.style.opacity = "0";
            msg.style.opacity = "0";
            ask_div.style.display = "none";
            ask_div.style.opacity = "1";
            msg.style.opacity = "1";
            ultra_container.style.display = "block";
            body.style.overflow = "auto";
        };
        
        return;
    }

    let interrogation_side = getRandom(0, 2);

    let question_id = getRandom(0, about_ask.length);

    while (asked.includes(question_id)) {
        question_id = getRandom(0, about_ask.length);
    }
    asked.push(question_id);

    let title;
    let def;
    
    if (interrogation_side === 0) {
        title = about_ask[question_id].title;
        def = about_ask[question_id].def;
    } else {
        def = about_ask[question_id].title;
        title = about_ask[question_id].def;
    }

    let torf_var;

    if (questions_type !== "torf") {
        if (interrogation_side === 0) {
            if (about_ask_type === "defs") {
                if (/^[aeiouyAEIOUY]/.test(title)) {
                    show("Quelle est la définition d\'" + title + " ?");
                } else {
                    show("Quelle est la définition de " + title + " ?");
                }
            } else if (about_ask_type === "dates") {
                if (/^\d/.test(title)) {
                    show("Que s'est-il passé le " + title + " ?");
                } else {
                    show("Que s'est-il passé en " + title + " ?");
                }
            } else if (about_ask_type === "egal") {
                show(title + " est égal à :");
            }
        } else {
            if (about_ask_type === "defs") {
                show("Quel est le terme définit par \"" + title + "\" ?");
            } else if (about_ask_type === "dates") {
                show("Quelle date va avec \"" + title + "\" ?");
            } else if (about_ask_type === "egal") {
                show(title + " est égal à :");
            }
        }
    } else {
        
        if (getRandom(0, 2) === 1) {
            torf_var = "Vrai";
            if (interrogation_side === 1) {
                show(title + " : " + def);
            } else {
                show(def + " : " + title);
            }       
        } else {
            torf_var = "Faux";
            let thing_id = getRandom(0, about_ask.length);
            while (title === about_ask[thing_id].title || title === about_ask[thing_id].def || def === about_ask[thing_id].title || def === about_ask[thing_id].def) {
                thing_id = getRandom(0, about_ask.legnth);
            }
            if (interrogation_side == 1) {
                show(title + " : " + about_ask[thing_id].title);
            } else {
                show(title + " : " + about_ask[thing_id].def);
            }
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
        if (questions_type === "torf") {
            show("La réponse était " + torf_var.toLowerCase());
        } else {
            show("La réponse était : " + def);
        }
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
                asking.readOnly = true;
                setTimeout(() => {
                    asking.readOnly = false;
                    reveal.className = "hide";
                    show("");
                    asking.value = "";
                    asking.className = "hide";
                    right_answers += 1;
                    if (sonor_effects === true) {
                        playSound(correct);
                    }
                    playCheckAnimation();
                    setTimeout(() => {
                        
                        askQuestion();
                        next.remove();
                        reveal.remove();
                        asking.className = "shown";
                                                  
                    }, 2000);
                }, 700);
            }
        });
    } else if (questions_type === "qcm") {
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


        let p2;
        let p2_text;
        let p3;
        let p3_text;
        let p4;
        let p4_text;

        if (interrogation_side === 0) {
            p2 = document.createElement("p");
            p2_text = about_ask[getRandom(0, about_ask.length)].def;
            while (p2_text === def) {
                p2_text = about_ask[getRandom(0, about_ask.length)].def;
            }

            p3 = document.createElement("p");
            p3_text = about_ask[getRandom(0, about_ask.length)].def;
            while (p3_text === def || p3_text === p2_text) {
                p3_text = about_ask[getRandom(0, about_ask.length)].def;
            }

            p4 = document.createElement("p");
            p4_text = about_ask[getRandom(0, about_ask.length)].def;
            while (p4_text === def || p4_text === p2_text || p4_text === p3_text) {
                p4_text = about_ask[getRandom(0, about_ask.length)].def;
            }
        } else {
            p2 = document.createElement("p");
            p2_text = about_ask[getRandom(0, about_ask.length)].title;
            while (p2_text === def) {
                p2_text = about_ask[getRandom(0, about_ask.length)].title;
            }

            p3 = document.createElement("p");
            p3_text = about_ask[getRandom(0, about_ask.length)].title;
            while (p3_text === def || p3_text === p2_text) {
                p3_text = about_ask[getRandom(0, about_ask.length)].title;
            }

            p4 = document.createElement("p");
            p4_text = about_ask[getRandom(0, about_ask.length)].title;
            while (p4_text === def || p4_text === p2_text || p4_text === p3_text) {
                p4_text = about_ask[getRandom(0, about_ask.length)].title;
            }
        }

        for (let i = 0; i < 3; i++) {

            
            if (randomise[0] === 0) {

                let p1 = document.createElement("p");
                p1.innerText = def;
                p1.className = "phover";
                p1.addEventListener("click", () => {
                    writer.innerHTML = "";
                    reveal.className = "hide";
                    show("");
                    right_answers += 1;
                    if (sonor_effects === true) {
                        playSound(correct);
                    }
                    playCheckAnimation();
                    setTimeout(() => {
                        askQuestion();
                        next.remove();
                        reveal.remove();
                        
                    }, 2000);
                });
                writer.appendChild(p1);


                randomise.shift();
            }
            if (randomise[0] === 1) {

                p2.innerHTML = p2_text;
                p2.className = "phover";
                p2.addEventListener("click", () => {
                    writer.innerHTML = "";
                    reveal.className = "hide";
                    show("");
                    if (sonor_effects === true) {
                        playSound(fail);
                    }
                    playCrossAnimation();
                    setTimeout(() => {
                        show("Dommage... La bonne réponse était " + def);
                        next.className = "shown";
                        next.onclick = () => {
                            askQuestion();
                            next.remove();
                            reveal.remove();
                        };
                    }, 2000);
                })
                writer.appendChild(p2);

                randomise.shift();
            }
            if (randomise[0] === 2) {
                
                
                p3.innerHTML = p3_text;
                p3.className = "phover";
                p3.addEventListener("click", () => {
                    writer.innerHTML = "";
                    reveal.className = "hide";
                    show("");
                    if (sonor_effects === true) {
                        playSound(fail);
                    }
                    playCrossAnimation();
                    setTimeout(() => {
                        show("Dommage... La bonne réponse était " + def);
                        next.className = "shown";
                        next.onclick = () => {
                            askQuestion();
                            next.remove();
                            reveal.remove();
                        };
                    }, 2000);
                })
                writer.appendChild(p3);

                randomise.shift();
            }
            if (randomise[0] === 3) {

                p4.innerHTML = p4_text;
                p4.className = "phover";
                p4.addEventListener("click", () => {
                    writer.innerHTML = "";
                    reveal.className = "hide";
                    show("");
                    if (sonor_effects === true) {
                        playSound(fail);
                    }
                    playCrossAnimation();
                    setTimeout(() => {
                        show("Dommage... La bonne réponse était " + def);
                        next.className = "shown";
                        next.onclick = () => {
                            askQuestion();
                            next.remove();
                            reveal.remove();
                        };
                    }, 2000);
                })
                writer.appendChild(p4);

                randomise.shift();
            }
        }
    } else if (questions_type === "torf") {

        let p1 = document.createElement("p");
        p1.innerText = torf_var;
        p1.className = "phover";
        p1.addEventListener("click", () => {
            writer.innerHTML = "";
            reveal.className = "hide";
            show("");
            right_answers += 1;
            if (sonor_effects === true) {
                playSound(correct);
            }
            playCheckAnimation();
            setTimeout(() => {
                askQuestion();
                next.remove();
                reveal.remove();
                            
            }, 2000);
        });

        let p2 = document.createElement("p");
        if (torf_var === "Vrai") {
            p2.innerHTML = "Faux";
        } else {
            p2.innerHTML = "Vraix";
        }
        p2.className = "phover";
        p2.addEventListener("click", () => {
            writer.innerHTML = "";
            reveal.className = "hide";
            show("");
            if (sonor_effects === true) {
                playSound(fail);
            }
            playCrossAnimation();
            setTimeout(() => {
                show("Dommage... La bonne réponse était " + torf_var.toLowerCase() + ".");
                next.className = "shown";
                next.onclick = () => {
                    askQuestion();
                    next.remove();
                    reveal.remove();
                };
            }, 2000);
        });

        if (getRandom(0, 2) === 1) {
            writer.appendChild(p1);
            writer.appendChild(p2);
        } else {
            writer.appendChild(p2);
            writer.appendChild(p1);
        }

    }
}


function show(message) {
    msg.innerHTML = message;
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


document.getElementById("file").addEventListener("change", () => {
    if (document.getElementById("file").value != "") {
        document.getElementById("for_file").innerText = "Fichier sélectionné";
    } else {
        document.getElementById("for_file").innerText = "Sélectionnez le fichier à importer";
    }
});


function decode() {
    const fileInput = document.getElementById("file"); 
    const file = fileInput.files[0];
    if (!file) return console.log("Aucun fichier sélectionné !");
    fileInput.value = "";
    document.getElementById("for_file").innerText = "Sélectionnez le fichier à importer";

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).split(";")[0] === "color") {
            console.log("nope"); 
         } else if (localStorage.key(i).split(";")[0] === "text_color") {
            console.log("nope"); 
         } else {
            localStorage.removeItem(localStorage.key(i));
    }
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        const total = event.target.result; 

        let packs_hash = total.split("#"); 
        for (let i = 0; i < packs_hash.length; i++) { 
            let lesson_hash = packs_hash[i].split("?");
            console.log(lesson_hash);
            let title_pack = lesson_hash[0];

            if (title_pack === "color") {
                let safe = "#" + lesson_hash[1];
                localStorage.setItem(title_pack, safe);
            } else {
                localStorage.setItem(title_pack, lesson_hash[1]);
            }
        } 
        setTimeout(() => {
            actu_files();
            actu_color();
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
        body.style.backgroundColor = color.value;
        ultra_container.style.backgroundColor = color.value;
        parameter_div.style.backgroundColor = color.value;
        ask_div.style.backgroundColor = color.value;

        let safe_color = color.value.replace("#", "");
        localStorage.setItem("color", safe_color);
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
        beetweens.forEach((i) => {i.style.backgroundColor = "white"});
        all_class_files.forEach((i) => {i.style.border = "solid 2px white"});
        all_small_buttons.forEach((i) => {i.style.color = "white"});
        all_delete_buttons.forEach((i) => {i.style.color = "white"});
        document.querySelectorAll("li").forEach((i) => {i.style.color = "white"});
        parameter_div.style.border = "solid 2px white";

        localStorage.setItem("text_color", "white");

        toggle_t = true;
    } else {
        toggle_text.innerText = "Texte en blanc";
        body.style.color = "black";
        all_buttons.forEach((i) => {i.style.color = "black"});
        all_selects.forEach((i) => {i.style.color = "black"});
        beetweens.forEach((i) => {i.style.backgroundColor = "black"});
        all_class_files.forEach((i) => {i.style.border = "solid 2px black"});
        all_small_buttons.forEach((i) => {i.style.color = "black"});
        all_delete_buttons.forEach((i) => {i.style.color = "black"});
        document.querySelectorAll("li").forEach((i) => {i.style.color = "black"});
        parameter_div.style.border = "solid 2px black";

        localStorage.setItem("text_color", "black");

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




function playCheckAnimation() {
  // 1️⃣ Crée l'overlay
  const overlay = document.createElement('div');
  overlay.className = 'overlay-check';
  overlay.innerHTML = `
    <svg viewBox="0 0 60 60">
      <g id="group">
        <circle id="circle" cx="30" cy="30" r="25"/>
        <path id="check" d="M17 30 L27 40 L44 20"/>
      </g>
    </svg>
  `;
  document.body.appendChild(overlay);

  // 2️⃣ Récupère les éléments
  const circle = overlay.querySelector('#circle');
  const check  = overlay.querySelector('#check');
  const group  = overlay.querySelector('#group');

  // 3️⃣ Force reflow pour que le navigateur voie le stroke-dashoffset initial
  void circle.offsetWidth;

  // 4️⃣ Lance l'animation après un mini délai pour que le browser ait enregistré les valeurs initiales
  setTimeout(() => {
    circle.style.strokeDashoffset = '0';
    check.style.strokeDashoffset  = '0';
    group.style.transform = 'scale(1.1)';

    // Pop effect
    setTimeout(() => {
      group.style.transform = 'scale(1)';
    }, 1200);

    // Disparition overlay
    setTimeout(() => {
      overlay.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
      overlay.style.transform = 'scale(0)';
      overlay.style.opacity   = '0';
    }, 1500);

    // Suppression finale
    setTimeout(() => {
      overlay.remove();
    }, 2000);

  }, 20); // ← ce petit délai est clé pour que le stroke s'anime
}
  
  



function playCrossAnimation() {

    const overlay = document.createElement('div');
    overlay.className = 'overlay-cross';
    overlay.innerHTML = `
    <svg viewBox="0 0 60 60">
            <g id="group">
            <circle id="circle" cx="30" cy="30" r="25"/>
            <!-- Trait 1 : bas → haut -->
            <line class="cross-line cross-1" x1="40" y1="40" x2="20" y2="20"/>
            <!-- Trait 2 : haut → bas -->
            <line class="cross-line cross-2" x1="20" y1="40" x2="40" y2="20"/>
        </g>
    </svg>
    `;
    document.body.appendChild(overlay);
  
    const circle = overlay.querySelector('#circle');
    const lines  = overlay.querySelectorAll('.cross-line');
    const group  = overlay.querySelector('#group');
  

    void circle.offsetWidth;
  

    setTimeout(() => {
      circle.style.strokeDashoffset = '0';
  
      lines[0].style.strokeDashoffset = '0';
      lines[1].style.strokeDashoffset = '0';
  
      group.style.transform = 'scale(1.1)';

      setTimeout(() => {
        group.style.transform = 'scale(1)';
      }, 1000);
  
    
      setTimeout(() => {
        overlay.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
        overlay.style.transform = 'scale(0)';
        overlay.style.opacity = '0';
      }, 1300);
  
    
      setTimeout(() => {
        overlay.remove();
      }, 1800);
  
    }, 20);
}


function couleurFluoAleatoire() {
    let colors = [
        [255, Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)], // rouge / rose fluo
        [Math.floor(Math.random() * 100), 255, Math.floor(Math.random() * 100)], // vert fluo
        [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), 255], // bleu fluo
        [255, 255, Math.floor(Math.random() * 100)], // jaune fluo
        [255, Math.floor(Math.random() * 100), 255], // magenta fluo
        [Math.floor(Math.random() * 100), 255, 255], // cyan fluo
    ];

    let c = colors[Math.floor(Math.random() * colors.length)];
    return `rgb(${c[0]},${c[1]},${c[2]})`;
}




function spawnConfetti() {

    let left = Math.random() * window.innerWidth;
    let dx = (Math.random() - 0.5) * 1.5; // vitesse horizontale
    let turn_initial = getRandom(0, 180);
    let turn = getRandom(0, 2);
    let turn_speed = getRandom(1, 4);
    const fall_speed = getRandom(4, 8);
    const position = getRandom(0, window.innerWidth);
    
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor = couleurFluoAleatoire();
    confetti.style.left = position + "px";
    confetti.style.top = "0px";
    confetti.style.transform = "rotate(" + turn_initial + "deg)";
    document.body.appendChild(confetti);

    let top = 0;

    function animate() {
        dx += (Math.random() - 0.5) * 0.1;
        left += dx;

        top += fall_speed;
        confetti.style.top = top + "px";
        confetti.style.left = left + "px";
        confetti.style.transform = "rotate(" + turn_initial + "deg)";

        if (turn === 0) {
            turn_initial -= turn_speed;
        } else {
            turn_initial += turn_speed;
        }
        if (top < window.scrollY + window.innerHeight) {
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    }

    requestAnimationFrame(animate);
}

function animateNumber(el, target, duration = 2000) {
    let start = performance.now();

    function frame(now) {
        let t = (now - start) / duration;
        if (t > 1) t = 1;

        // easing normal
        let eased = 1 - Math.pow(1 - t, 2);

        let value = Math.floor(eased * target);

        // si on est presque à la fin, on force la dernière partie plus rapide
        if (value >= target - 1) { 
            value = Math.min(value + 1, target);
        }

        el.textContent = value;

        if (value < target) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}


function playSound(name) {
    if (!name) return;
    name.currentTime = 0; // pour pouvoir rejouer très vite
    name.play();
}