console.log("Yaahhhaaaa! (main)");

function clear_local() {
    localStorage.clear();
    actu_files();
}

//clear_local()
 
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


const pack_title_ask = document.getElementById("pack_title_ask");
const pack_title_add = document.getElementById("pack_title_add");
const add_p = document.getElementById("add_p");
const pack_title = document.getElementById("pack_title");
let def_title = document.getElementById("def_title");
let def_type = document.getElementById("def_type");
let def = document.getElementById("def");
const body = document.querySelector("body");
const contain_files = document.getElementById("contain_files");
const asking = document.getElementById("asking");
asking.className = "hide";
asking.value = "";
const msg = document.getElementById("msg");
const writer = document.getElementById("writer");
const pack_type = document.getElementById("pack_type");
const selects_lessons = pack_title_add;
let asked = [];
let questions_type_select = document.getElementById("questions_type_select");
let questions_type;
let about_ask;
let interrogation_time;
let questions_number;
let right_answers;
let wrong_answers_memory = 0;
let right_answers_in_row = 0;
let wrong_answers_in_row = 0;
let time_stat; 
let verbs_column;
let help_toggle = false;
const help_div = document.getElementById("help_div");
let bonus_mode = false;
let wrong_questions = [];
let remaining_bonus = 0;
let data_source = [];


let opened_sessions = new Set();

const fail = new Audio("Échec.mp3");
const victory = new Audio("Victoire.mp3");
const correct = new Audio("Correct.mp3");


function updateTypeUI_add() {
    if (document.getElementById('def_title') === null) {
        return;
    }
    def_title = document.getElementById("def_title");
    def = document.getElementById("def");
    document.getElementById("add_pack_button").innerText = "Ajouter à la leçon";
    if (def_type.value === "defs") {
        add_p.innerText = "Nouvelle définition";
        def_title.placeholder = "Nom de la définition";
        def.placeholder = "Définition";
    } else if (def_type.value === "dates") {
        add_p.innerText = "Nouvelle date";
        def_title.placeholder = "Date";
        def.placeholder = "Ce qu'il s'y est passé";
    } else {
        add_p.innerText = "Nouvelle égalité";
        def_title.placeholder = "Premier membre";
        def.placeholder = "Deuxième membre";
    }
    
}

function toggle_add_def(what) {

    pack_title_add.style.display = "block";
    document.getElementById("add_pack_button").style.display = "block";

    let hasLessons = false;
    let hasClass = false;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith("?class")) {
            hasClass = true;
        }

        if (!key.startsWith("color") && !key.startsWith("text_color") && !key.startsWith("sb-") && !key.startsWith("?class")) {
            hasLessons = true;
        }
    }

    if (!hasLessons) {
        pack_title_add.style.display = "none";
        document.getElementById("add_switch").innerHTML = hasClass ? '<p>Pour ajouter des defs, créez une leçon de verbes ou de defs.</p>' : '<p>Aucune leçon présente</p>';
        document.getElementById("add_pack_button").innerText = "";
        document.getElementById("add_pack_button").style.display = "none";
        return;
    }

    if (pack_title_add.value === "" || pack_title_add.value === null) {
        if (pack_title_add.querySelectorAll("option")[0].value) {
           pack_title_add.value = pack_title_add.querySelectorAll("option")[0].value;  
        }
    }

    if (what === "normal") {
        document.getElementById("add_switch").innerHTML = '<input id="def_title" type="text" placeholder="Nom de la définition"><textarea id="def" cols="20" rows="5" placeholder="Définition"></textarea><select id="def_type"><option value="defs">Définition</option><option value="dates">Date</option><option value="egal">Égalité</option></select>';
        def_type = document.getElementById("def_type");
        def_type.addEventListener("input", updateTypeUI_add);
        updateTypeUI_add();
    } else if (what === "verb") {
        add_p.innerText = "Nouvelle ligne";
        document.getElementById("add_switch").innerHTML = "";
        document.getElementById("add_pack_button").innerText = "Ajouter une ligne";
    }
}

function toggle_ask_def() {

    let hasLessons = false;
    let hasClass = false;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("?class")) {
            hasClass = true;
        }
        if (!key.startsWith("color") && !key.startsWith("text_color") && !key.startsWith("sb-") && !key.startsWith("?class")) {
            hasLessons = true;
        }
    }

    if (!hasLessons) {

        pack_title_ask.style.display = "none";
        questions_type_select.style.display = "none";
        document.getElementById("ask_length_input").style.display = "none";
        document.getElementById("ask_length").style.display = "none";
        document.getElementById("ask_button").style.display = "none";
        document.getElementById("length_p").style.display = "block";
        document.getElementById("length_p").innerText = hasClass ? "Pour réviser, créez une leçon de verbes ou de defs." : "Aucune leçon présente";
        return;
    }

    questions_type_select.style.display = "inline";
    document.getElementById("ask_button").style.display = "block";
    pack_title_ask.style.display = "block";

    let get_stuff = get_pack_value();

    if (get_stuff.valid === false) {
        if (get_stuff.lessons.length === 0) {
            questions_type_select.style.display = "none";
            document.getElementById("ask_length_input").style.display = "none";
            document.getElementById("ask_length").style.display = "none";
            document.getElementById("ask_button").style.display = "none";
            document.getElementById("length_p").style.display = "block"
            document.getElementById("length_p").innerText = "Aucune leçon sélectionnée";
            return;
        } else {
            questions_type_select.style.display = "none";
            document.getElementById("ask_length_input").style.display = "none";
            document.getElementById("ask_length").style.display = "none";
            document.getElementById("ask_button").style.display = "none";
            document.getElementById("length_p").style.display = "block"
            document.getElementById("length_p").innerText = "Il y a différents types de leçons";
            return;
        }
    }

    if (get_stuff.kind === "verb") {
        let first_cols = JSON.parse(localStorage.getItem("?verbs" + get_stuff.lessons[0])).columns;

        for (let i = 0; i < get_stuff.lessons.length; i++) {
            let e = get_stuff.lessons[i];
        
            let cols = JSON.parse(localStorage.getItem("?verbs" + e)).columns;
        
            if (JSON.stringify(cols) !== JSON.stringify(first_cols)) {
                questions_type_select.style.display = "none";
                document.getElementById("ask_length_input").style.display = "none";
                document.getElementById("ask_length").style.display = "none";
                document.getElementById("ask_button").style.display = "none";
                document.getElementById("length_p").style.display = "block";
                document.getElementById("length_p").innerHTML = "Les colonnes ne <br>correspondent pas";
                return;
            }
        }
    }


    if (get_stuff.kind === "normal") {

        let isEmpty = true;
        get_stuff.lessons.forEach((e) => {
            if (JSON.parse(localStorage.getItem(e)) && JSON.parse(localStorage.getItem(e)).length > 0) {
                isEmpty = false;
            }
        });

        if (isEmpty) {
            questions_type_select.style.display = "none";
            document.getElementById("ask_length_input").style.display = "none";
            document.getElementById("ask_length").style.display = "none";
            document.getElementById("ask_button").style.display = "none";
            document.getElementById("length_p").style.display = "block"
            document.getElementById("length_p").innerText = "La leçon est vide";
            return;
        }

        document.getElementById("length_p").innerText = "Nombre de questions :";
        document.getElementById("ask_length_input").style.display = "inline";

        questions_type_select.innerHTML = '<option value="auto">Autovalidation</option><option value="memory">Memory</option><option value="qcm">Choix multiples</option><option value="write">Restitution écrite</option>';
        questions_type_select.value = 'auto';

        let input_max = 0;
        get_stuff.lessons.forEach((e) => {
            input_max += JSON.parse(localStorage.getItem(e)).length;
        });

        document.getElementById("ask_length_input").max = input_max * 2;
        document.getElementById("ask_length_input").value = input_max;

        if (input_max === 0) {
            document.getElementById("ask_length").style.display = "none";
            document.getElementById("length_p").style.display = "none";
        } else {
            document.getElementById("ask_length").style.display = "flex";
            document.getElementById("length_p").style.display = "block";
        }

    } else if (get_stuff.kind === "verb") {

        let isEmpty = true;
        get_stuff.lessons.forEach((e) => {
            if (JSON.parse(localStorage.getItem("?verbs" + e)).verbs.length > 0) {
                isEmpty = false;
            }
        });

        if (isEmpty) {
            questions_type_select.style.display = "none";
            document.getElementById("ask_length_input").style.display = "none";
            document.getElementById("ask_length").style.display = "none";
            document.getElementById("ask_button").style.display = "none";
            document.getElementById("length_p").style.display = "block"
            document.getElementById("length_p").innerText = get_stuff.lessons.length === 1 ? "La leçon est vide" : "Les leçons sont vides";
            return;
        }

        document.getElementById("length_p").innerText = "Nombre de questions :";
        document.getElementById("ask_length_input").style.display = "inline";

        questions_type_select.innerHTML = '<option value="random">Aléatoire</option><option value="choice">Déterminé</option>';
        questions_type_select.value = 'random';
        
        let input_max = 0;
        get_stuff.lessons.forEach((e) => {
            input_max += JSON.parse(localStorage.getItem("?verbs" + e)).verbs.length;
        });

        document.getElementById("ask_length_input").max = input_max * 2;
        document.getElementById("ask_length_input").value = input_max;
       
        if (input_max === 0) {
            document.getElementById("ask_length").style.display = "none";
            document.getElementById("length_p").style.display = "none";
        } else {
            document.getElementById("ask_length").style.display = "flex";
            document.getElementById("length_p").style.display = "block";
        }
    }

    document.getElementById("ask_length_p").innerText = document.getElementById("ask_length_input").value;
    toggle_verbs_select();
}

updateTypeUI_add();
def_type.addEventListener("input", updateTypeUI_add);

pack_title_add.addEventListener("change", () => {
    if (localStorage.getItem(pack_title_add.value) !== null) {
        toggle_add_def("normal");
    } else if (localStorage.getItem("?verbs" + pack_title_add.value) !== null) {
        toggle_add_def("verb");
    }
});

pack_title_ask.addEventListener("change", () => {
    toggle_ask_def()
});

questions_type_select.addEventListener("change", () => {
    toggle_verbs_select();

    let getting_stuff = get_pack_value();
    if (questions_type_select.value === "memory") {
        let memo_length = 0;
        getting_stuff.lessons.forEach((e) => {
            memo_length += JSON.parse(localStorage.getItem(e)).length;
        });
        document.getElementById("ask_length_input").max = memo_length;
        document.getElementById("ask_length_input").value = memo_length;
        document.getElementById("ask_length_p").innerText = "Max";
    } else {
        let max_input_input = 0;
        getting_stuff.lessons.forEach((e) => {
            max_input_input += getting_stuff.kind === "verb" ? JSON.parse(localStorage.getItem("?verbs" + e)).length : JSON.parse(localStorage.getItem(e)).length;
        });
        document.getElementById("ask_length_input").max = max_input_input * 2;
        document.getElementById("ask_length_input").value = max_input_input;
        document.getElementById("ask_length_p").innerText = max_input_input;
    }
});

function toggle_verbs_select() {
    let select = document.getElementById("verbs_select");
    if (questions_type_select.value === "choice") {
        select.style.display = "block";
        select.innerHTML = "";
        for (let i = 0; i < JSON.parse(localStorage.getItem("?verbs" + get_pack_value().lessons[0])).columns.length; i++) {
            let option = document.createElement("option");
            option.value =  JSON.parse(localStorage.getItem("?verbs" + get_pack_value().lessons[0])).columns[i];
            option.innerText =  JSON.parse(localStorage.getItem("?verbs" + get_pack_value().lessons[0])).columns[i];
            select.appendChild(option);
        }
        
    } else {
        select.style.display = "none";
    }
}

let ask_length_input = document.getElementById("ask_length_input");
document.getElementById("ask_length_p").innerHTML = ask_length_input.value;
ask_length_input.addEventListener("input", () => {
    if (ask_length_input.value >= Number.parseInt(ask_length_input.max)) {
        document.getElementById("ask_length_p").innerText = "Max";
        return;
    }
    document.getElementById("ask_length_p").innerHTML = ask_length_input.value;
});


function get_pack_value() {
    let selected = Array.from(
        document.querySelectorAll('#menu input[type="checkbox"]:checked')
    ).map(cb => cb.parentElement.textContent.trim());

    if (selected.length === 0) {
        return { valid: false, lessons: [] };
    }

    let firstIsVerb = localStorage.getItem("?verbs" + selected[0]) !== null;
    let isOkay = true;

    for (let i = 1; i < selected.length; i++) {
        let isVerb = localStorage.getItem("?verbs" + selected[i]) !== null;

        if (isVerb !== firstIsVerb) {
            isOkay = false;
            break;
        }
    }

    let kind = firstIsVerb ? "verb" : "normal";

    return {
        valid: isOkay,
        lessons: selected,
        kind: kind
    };
}


function get_euclide(number) {
    const quotient = Math.floor(number/60);
    const remainder = number % 60;

    if (number < 60) {
        return number + " secondes";
    } else if (number === 60) {
        return "1 minute";
    } else if (remainder === 0) {
        return quotient + " minutes";
    } else if (number < 120) {
        return "1 minute " + remainder + " secondes";
    } else if (number > 120) {
        return quotient + " minutes " + remainder + " secondes";
    }
}


function actu_files() {

    let actual_color = localStorage.getItem("text_color") || "black";
    contain_files.innerHTML = "";

    let hasLessons = false;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith("color") && !key.startsWith("text_color") && !key.startsWith("sb-")) {
            hasLessons = true;
        }
    }

    document.getElementById("lessons").innerText = "Leçons ouvertes";

    let old_select_value = selects_lessons.options[selects_lessons.selectedIndex];
    selects_lessons.innerHTML = "";
    let old_checked_inputs = [];
    pack_title_ask.querySelector("#menu").querySelectorAll("label").forEach((e) => {
        if (e.querySelector("input").checked) {
            old_checked_inputs.push(e);
        }
        pack_title_ask.querySelector("#menu").removeChild(e);
    });

    contain_files.style.justifyContent = "flex-start";
    if (!hasLessons) {
        contain_files.innerHTML = "<p>Il n'y a aucune leçon</p>";
        contain_files.style.justifyContent = "center";
        toggle_add_def();
        toggle_ask_def();
        return;
    }


    const fragment = document.createDocumentFragment();

    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("color") || key.startsWith("text_color") || key.startsWith("sb-") || key.startsWith("tinymce-custom-colors-forecolor") || key.startsWith("tinymce-custom-colors-hilitecolor")) continue;
        let displayName = key.startsWith("?verbs") || key.startsWith("?class")? key.slice(6) : key;

        let option = document.createElement("option");
        option.value = displayName;
        option.innerText = displayName;
        if (!key.startsWith("?class")) {
            selects_lessons.appendChild(option);
        }
            
        if (selects_lessons.options.length > 0) {
            selects_lessons.value = selects_lessons.options[0].value;
        }

        let label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="1">${displayName}`;
        old_checked_inputs.forEach((e) => {
            if (e.innerText === displayName) {
                label.querySelector("input").checked = true;
            }
        });
        if (!(key.startsWith("?class"))) {
            pack_title_ask.querySelector("#menu").appendChild(label);
            pack_title_ask.querySelector("#menu").appendChild(document.createElement("br"));
        }

        let div = document.createElement("div");
        div.className = "file";
        div.style.border = `solid 2px var(--text-color)`;
        div.innerHTML = `<span>${displayName}</span>`;
        div.style.padding = "10px";
        fragment.appendChild(div); 
        
        if (!(key.startsWith("?class"))) {
            div.addEventListener("click", () => { 
                let isVerb = key.startsWith("?verbs"); 
                let safeName = isVerb ? key.slice(6) : key; 
                pack_title_add.value = safeName; 
                document.querySelectorAll("#menu label").forEach((e) => {
                    if (e.innerText.includes(safeName)) {
                        if (e.querySelector("input").checked === true) {
                            e.querySelector("input").checked = false;
                        } else {
                            e.querySelector("input").checked = true;
                        }
                        
                    }
                });
                toggle_add_def(isVerb ? "verb" : "normal"); 
                toggle_ask_def(); 
            });
        }
        
        let delete_button = document.createElement("button");
        delete_button.className = "delete_button";
        delete_button.innerHTML = "<div class='file_big_image'></div>";
        delete_button.onclick = (e) => {
            e.stopPropagation();
            localStorage.removeItem(key);
            actu_files();
        };
        div.appendChild(delete_button);

        if (!key.startsWith("?verbs") && !key.startsWith("?class")) {

            const packItems = JSON.parse(localStorage.getItem(key));
            if (packItems.length === 0) {
                let p = document.createElement("p");
                p.innerText = "Cette leçon est vide";
                div.appendChild(p);
            } else {
                let ul = document.createElement("ul");
                packItems.forEach((item, idx) => {
                    let li = document.createElement("li");
                    li.innerHTML = item.kind === "egal" ? `${item.title} = ${item.def}` : `<div class='titles'>${item.title} :</div> ${item.def}`;
                    
                    let delete_def = document.createElement("button");
                    delete_def.className = "delete_def";
                    delete_def.innerHTML = "<div class='file_small_image'></div>";
                    delete_def.onclick = () => {
                        packItems.splice(idx, 1);
                        localStorage.setItem(key, JSON.stringify(packItems));
                        actu_files();
                    };
                    li.appendChild(delete_def);
                    ul.appendChild(li);
                });
                div.appendChild(ul);
            }

        } else if (key.startsWith("?verbs")) {

            let verbsData = JSON.parse(localStorage.getItem(key));
            let tab = document.createElement("div");
            tab.className = "verbs-grid";
            div.appendChild(tab);

            let header_div = document.createElement("div");
            header_div.className = "header";
            header_div.style.gridTemplateColumns = `repeat(${verbsData.columns.length}, minmax(65px, 1fr)) 0.15fr`;
            verbsData.columns.forEach((col, colIndex) => {
                let input = document.createElement("input");
                input.value = col;
                input.addEventListener("change", () => {
                    changeVerbs("update_col", key, null, colIndex, input.value);
                });
                header_div.appendChild(input);
            });

            if (verbsData.columns.length <= 4) {
                let add_button = document.createElement("button");
                add_button.innerText = "+";
                add_button.style.color = actual_color;
                add_button.addEventListener("click", () => changeVerbs("add_col", key));
                header_div.appendChild(add_button);
            } else {
                let no_button = document.createElement("div");
                no_button.id = "no_button";
                header_div.appendChild(no_button);
            }

            tab.appendChild(header_div);

            verbsData.verbs.forEach((rowValues, rowIndex) => {
                let row_div = document.createElement("div");
                row_div.className = "row";
                row_div.style.gridTemplateColumns = `repeat(${rowValues.length}, minmax(65px, 1fr)) 0.15fr`;
                rowValues.forEach((val, colIndex) => {
                    let input = document.createElement("input");
                    input.value = val;
                    input.addEventListener("change", () => {
                        let newRow = Array.from(row_div.querySelectorAll("input")).map(e => e.value);
                        changeVerbs("update_row", key, rowIndex, null, newRow);
                    });
                    row_div.appendChild(input);
                });
                let delete_row_button = document.createElement("button");
                delete_row_button.className = "delete_row";
                delete_row_button.innerHTML = "<div class='file_small_image'></div>";
                delete_row_button.addEventListener("click", () => changeVerbs("delete_row", key, rowIndex));
                row_div.appendChild(delete_row_button);
                tab.appendChild(row_div);
            });

            if (verbsData.columns.length > 1) {
                let addRowDiv = document.createElement("div");
                addRowDiv.className = "row";
                addRowDiv.style.gridTemplateColumns = `repeat(${verbsData.columns.length}, minmax(65px, 1fr)) 0.15fr`;
                verbsData.columns.forEach((_, colIndex) => {
                    let button = document.createElement("button");
                    button.className = "delete_col";
                    button.innerHTML = "<div class='file_big_image'></div>";
                    button.addEventListener("click", () => changeVerbs("delete_col", key, null, colIndex));
                    addRowDiv.appendChild(button);
                });
                let nothing_div = document.createElement("div");
                nothing_div.style.width = "35px";
                addRowDiv.appendChild(nothing_div);

                tab.appendChild(addRowDiv);
            }

        } else if (key.startsWith("?class")) {
            const packItems = localStorage.getItem(key);

            let editor = document.createElement("div");
            editor.className = "editor";
            
            div.style.padding = "0px";
            div.querySelector("span").style.marginLeft = "10px";
            div.querySelector("span").style.marginTop = "10px";
            
            div.appendChild(editor);
            
            if ($(editor).data('trumbowyg')) {
                $(editor).trumbowyg('destroy');
            }
            
            $.trumbowyg.langs.fr.backColor = "Surlignage";
            $.trumbowyg.langs.fr.removeformat = "Enlever couleurs";

            $(editor).trumbowyg({
                lang: 'fr',
                semantic: false,
            
                btnsDef: {
                    spoiler: {
                        title: 'Spoiler',
                        text: 'Spoiler',
                        hasIcon: false,
                        fn: function () {
                            console.log("🟢 spoiler clicked");
                        
                            const $ed = $(this.$c).find('.trumbowyg-editor');
                        
                            $ed.focus();
                        
                            const restoreResult = $(this.$ed).trumbowyg('restoreRange');
                        
                            const sel = window.getSelection();
                        
                            if (!sel) {
                                console.log("❌ no selection object");
                                return;
                            }
                        
                            if (sel.rangeCount === 0) {
                                console.log("❌ no range in selection");
                                return;
                            }
                        
                            const range = sel.getRangeAt(0);                        
                            const text = range.toString();

                            if (!text) {
                                console.log("❌ empty selection text");
                                return;
                            }
                        
                            const span = document.createElement('span');
                            span.className = 'spoiler';
                            span.textContent = text;
                        
                            range.deleteContents();                        
                            range.insertNode(span);
                        
                            sel.removeAllRanges();
                        
                            console.log("✅ spoiler finished");
                        }
                    }
                },
            
                btns: [
                    ['h1', 'h2'],
                    ['strong', 'em', 'underline'],
                    ['foreColor', 'backColor'],
                    ['spoiler'],
                    ['removeformat']
                ]
            }).on('tbwinit', function () {
                $(editor).trumbowyg('html', packItems);
            });
            
            $(editor).on('keydown', function (e) {
                if (e.key === 'Tab') {
                    e.preventDefault();
            
                    document.execCommand('insertText', false, '        ');
                }
            });

            editor.dataset.twInit = "1";

            let timeout;

            editor.addEventListener("input", () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                  localStorage.setItem(key, $(editor).trumbowyg('html'));
                }, 300);
            });

        }

            let test = true;
            if (!key.startsWith("?verbs") && !key.startsWith("?class")) {
                if (JSON.parse(localStorage.getItem(key)).length === 0 && !key.startsWith("?class")) {
                    test = false;
                }
            }

            if (test) {
                let unsee = document.createElement("button");
                unsee.innerText = ">";
                unsee.style.color = "var(--text-color)";
                unsee.className = "unsee";

                let contentToHide;

                if (key.startsWith("?verbs")) {
                    contentToHide = div.querySelector(".verbs-grid");
                } else if (key.startsWith("?class")) {
                    contentToHide = div.querySelectorAll("div")[1];
                } else {
                    contentToHide = div.querySelectorAll("li");
                }

                div.querySelector("span").addEventListener("click", () => {
                    if (contentToHide instanceof NodeList) {
                        contentToHide.forEach(e => e.style.display = e.style.display === "none" ? "flex" : "none");
                    } else {
                        contentToHide.style.display = contentToHide.style.display === "none" ? "flex" : "none";
                    }
                    unsee.innerText = unsee.innerText === ">" ? "v" : ">";
                    opened_sessions.has(displayName) ? opened_sessions.delete(displayName) : opened_sessions.add(displayName);
                });

                if (opened_sessions.has(displayName)) {
                    if (contentToHide instanceof NodeList) contentToHide.forEach(e => e.style.display = "flex");
                    else contentToHide.style.display = "flex";
                    unsee.innerText = "v";
                } else {
                    if (contentToHide instanceof NodeList) contentToHide.forEach(e => e.style.display = "none");
                    else contentToHide.style.display = "none";
                    unsee.innerText = ">";
                }

                div.querySelector("span").appendChild(unsee);
            }
    }
    
    fragment.appendChild(document.createElement("p"));
    fragment.appendChild(document.createElement("p"));

    contain_files.appendChild(fragment);

    if (localStorage.getItem(selects_lessons.value) !== null) {
        toggle_add_def("normal");
    } else if (localStorage.getItem("?verbs" + selects_lessons.value) !== null){
        toggle_add_def("verb");
    }

    toggle_ask_def();

    updateTypeUI_add();

    if (document.querySelector('.trumbowyg-editor') !== null) {
        document.querySelector('.trumbowyg-editor').style.userSelect = 'text';
    }

    if (old_select_value !== undefined && old_select_value !== null) {
        if (selects_lessons.querySelector(`option[value="${old_select_value.value}"]`)) {
            selects_lessons.value = old_select_value.value;
        }
    }
}

actu_files();


toggle_add_def();
toggle_ask_def();




function changeVerbs(action, key, rowIndex = null, colIndex = null, value = null) {
    let data = JSON.parse(localStorage.getItem(key));

    if (action === "update_col") {
        data.columns[colIndex] = value;
    }

    if (action === "update_row") {
        data.verbs[rowIndex] = value;
    }

    if (action === "add_row") {
        let new_row = [];
        data.columns.forEach((c) => {
            new_row.push("");
        })
        data.verbs.push(new_row);
    }

    if (action === "delete_row") {
        data.verbs.splice(rowIndex, 1);
    }

    if (action === "delete_col") {
        data.columns.splice(colIndex, 1);
        data.verbs.forEach((v) => {
            v.splice(colIndex, 1);
        });
    }

    if (action === "add_col") {
        data.columns.push("");
        data.verbs.forEach((v) => {
            v.push("");
        });
    }

    localStorage.setItem(key, JSON.stringify(data));
    if (!(action === "update_row")) {
        actu_files();
    }
}


function createPack() {
    const forbiddenRegex = /[*@\[\]{}";?]/;
    const forbiddenNames = ["-sb", "color", "text_color"];
    const packName = pack_title.value.trim();

    if (!packName) {
        giga_show("Il faut entrer un titre de leçon");
        return;
    }

    if (forbiddenRegex.test(packName)) {
        giga_show("Il y a des caractères interdits.");
        return;
    }

    if (forbiddenNames.some(prefix => packName.startsWith(prefix))) {
        giga_show("Ce nom est interdit");
        return;
    }

    if (localStorage.length >= 25) {
        giga_show("Il y a trop de leçons dans ce cours.");
        return;
    }

    const lessonSelect = document.getElementById("lesson_select");
    const type = lessonSelect ? lessonSelect.value : "normal";

    let exists_test = false;
    for (let i = 0; i < localStorage.length; i++) {
        if (forbiddenNames.some(prefix => localStorage.key(i).startsWith(prefix))) {
            continue;
        }
        
        let name = localStorage.key(i);
        let safe_name_old;
        let safe_name_new;
        if (name.startsWith("?verbs")) {
            safe_name_old = name.slice(6);
        } else {
            safe_name_old = name;
        }
        if (packName.startsWith("?verbs")) {
            safe_name_new = packName.slice(6);
        } else {
            safe_name_new = packName;
        }

        if (wash(safe_name_old) === wash(safe_name_new)) {
            exists_test = true;
            break;
        }
    }

    if (exists_test) {
        giga_show("Cette leçon existe déjà.");
        return;
    }

    if (type === "normal") {
        localStorage.setItem(packName, "[]");
    } else if (type === "verbs") {
        localStorage.setItem("?verbs" + packName, JSON.stringify({
            columns: ["Infinitif", "Présent", "Prétérit", "Participe passé", "Traduction"],
            verbs: []
        }));
    } else if (type === "class") {
        localStorage.setItem("?class" + packName, "");
    }

    document.dispatchEvent(new CustomEvent("lesson_create", {
        detail: {}
    }));

    pack_title.value = "";
    actu_files();
}


function addPack() {
    const regex = /["<>\\]/;
    if (regex.test(def_title.value) || regex.test(def.value)) {
        giga_show("Il y a des caractères interdits");
        return;
    }

    const packKey = localStorage.getItem("?verbs" + pack_title_add.value) ? "?verbs" + pack_title_add.value : pack_title_add.value;

    if (!localStorage.getItem(packKey)) {
        if (packKey.startsWith("?verbs")) {
            giga_show("Cette leçon n'existe pas.");
        } else {
            giga_show("Tout doit être complété.");
        }
        return;
    }

    if (!packKey.startsWith("?verbs")) {
        if (!pack_title_add.value || !def_title.value || !def.value) {
            giga_show("Tout doit être complété.");
            return;
        }

        const pack = JSON.parse(localStorage.getItem(packKey));

        if (pack.length >= 50) {
            giga_show("Il y a trop d'éléments dans cette leçon.");
            return;
        }

        if (pack.some(item => item.title.trim() === def_title.value.trim())) {
            giga_show("Cette définition existe déjà dans cette leçon.");
            return;
        }

        pack.push({ title: def_title.value, def: def.value, kind: def_type.value });
        localStorage.setItem(packKey, JSON.stringify(pack));
        def_title.value = "";
        def.value = "";
        actu_files();
        document.dispatchEvent(new CustomEvent("lesson_add", {
            detail: {}
        }));
    } else {

        if (JSON.parse(localStorage.getItem(packKey)).verbs.length >= 150) {
            giga_show("Il y a trop de verbes dans cette leçon.")
            return;
        }

        changeVerbs("add_row", packKey);
        document.dispatchEvent(new CustomEvent("lesson_add", {
            detail: {}
        }));
    }


}


let verbs;
let all_columns;

function start() {

    const pack = get_pack_value();

    verbs = pack.kind === "verb";

    let ask_length_number = parseInt(document.getElementById("ask_length_input").value);

    about_ask = [];

    let data = [];

    if (verbs) {

        all_columns = JSON.parse(localStorage.getItem("?verbs" + pack.lessons[0])).columns;

        pack.lessons.forEach((e) => {
            data = data.concat(JSON.parse(localStorage.getItem("?verbs" + e)).verbs);
        });

    } else {

        pack.lessons.forEach((e) => {
            data = data.concat(JSON.parse(localStorage.getItem(e)));
        });
    }

    questions_type = questions_type_select.value;

    data_source = data;

    let base_length = data_source.length;
    bonus_mode = ask_length_number > base_length;
    remaining_bonus = ask_length_number - base_length;

    if (!bonus_mode) {
        for (let i = 0; i < ask_length_number; i++) {
            let new_item = data_source[getRandom(0, data_source.length)];
            while (about_ask.includes(new_item)) {
                new_item = data_source[getRandom(0, data_source.length)];
            }
            about_ask.push(new_item);
        }
    } else {
        about_ask = [...data_source];
    }

    if (verbs && document.getElementById("questions_type_select") !== null) {
        all_columns.forEach((e, i) => {
            if (e === document.getElementById("verbs_select").value) {
                verbs_column = i;
            }
        });
    }

    
    if ((questions_type === "qcm" && about_ask.length < 5) || (questions_type === "memory" && about_ask.length < 6)) {
        giga_show("Pas assez d'éléments pour être interrogé");
        return;
    }

    if (questions_type === "memory") {
        about_ask = splitIntoMemoryRounds(about_ask);
    }

    questions_number = 0;

    ask_div.style.display = "flex";
    if (questions_type === "write") asking.className = "shown";

    asked = [];
    wrong_questions = [];
    interrogation_time = 0;
    time_stat = setInterval(() => { interrogation_time += 0.1; }, 100);
    right_answers = 0;
    wrong_answers_memory = 0;
    right_answers_in_row = 0;
    wrong_answers_in_row = 0;

    document.getElementById("quit_lesson").className = "shown";
    ultra_container.style.display = "none";
    body.style.overflow = "hidden";

    askQuestion();
}

document.getElementById("quit_lesson").addEventListener("click", () => {
    ["#reveal", "#next", "#accept", "#refuse"].forEach(id => {
        const el = ask_div.querySelector(id);
        if (el) ask_div.removeChild(el);
    });

    document.querySelectorAll(".phover").forEach(e => {
        if (document.getElementById("writer").contains(e)) {
            document.getElementById("writer").removeChild(e);
        }
    });

    asking.className = "hide";
    ask_div.style.display = "none";
    ask_div.style.opacity = "1";
    msg.style.opacity = "1";
    ultra_container.style.display = "block";
    body.style.overflow = "auto";
});

function check_input(reveal, next, def) {
    if (wash(asking.value) === wash(def)) {
        asking.readOnly = true;
        setTimeout(() => {
            asking.readOnly = false;
            reveal.className = "hide";
            show("");
            asking.value = "";
            asking.className = "hide";
            right_answers += 1;
            right_answers_in_row += 1;
            wrong_answers_in_row = 0;
            if (sonor_effects) playSound(correct);
            playCheckAnimation();
            setTimeout(() => {
                askQuestion();
                next.remove();
                reveal.remove();
            }, 1900);
        }, 700);
    }
}


function askQuestion() {
    if (right_answers_in_row === 10) {
        document.dispatchEvent(new CustomEvent("10_right_in_row", {
            detail: {}
        }));
    }

    if (wrong_answers_in_row === 10) {
        document.dispatchEvent(new CustomEvent("10_wrong_in_row", {
            detail: {}
        }));
    }

    if (about_ask.length === asked.length) {
        if (bonus_mode && remaining_bonus > 0) {
            console.log(remaining_bonus);
            let next_batch = [];
    
            if (wrong_questions.length > 0) {
                next_batch = wrong_questions.slice(0, remaining_bonus);
            } else {
                for (let i = 0; i < remaining_bonus; i++) {
                    next_batch.push(data_source[getRandom(0, data_source.length)]);
                }
            }
    
            remaining_bonus -= next_batch.length;
            if (remaining_bonus < 0) remaining_bonus = 0;
    
            about_ask = next_batch;
            asked = [];
            wrong_questions = [];
    
            return askQuestion();
        }


        if (questions_type === "write") asking.className = "hide";
        clearInterval(time_stat);
        let percent;
        if (questions_type === "memory") {
            percent = Math.round((right_answers * 100) / wrong_answers_memory);
        } else {
            percent = Math.round((right_answers * 100) / questions_number);
        }
        Math.round((right_answers * 100) / questions_number);
        if (sonor_effects === true) playSound(victory);
        document.getElementById("quit_lesson").className = "hide";

        let points;
        if (questions_type === "memory") {
            points = Math.round((right_answers * 70) - (wrong_answers_memory * 30) / 3);
            if (points < 0) points = 0;
        } else {
            points = Math.round((right_answers * percent * asked.length) / 120);
        }
        console.log(points);

        document.dispatchEvent(new CustomEvent("lesson_end", {
            detail: {
                points_number: points,
                questions_length: asked.length,
                time: Math.round(interrogation_time),
                percentage: percent
            }
        }));

        if (questions_type === "random" || questions_type === "choice") {
            document.dispatchEvent(new CustomEvent("lang_end", {
                detail: {}
            }));
        }

        let text = "Bravo, tu as fini de réviser la leçon !<br><div id='results'><div id='speed'><img id='chrono' src='Chronometer.png'><br><div id='animate_time'></div></div><div id='precision'><img id='cible' src='Cible.png'><br><div id='animate_precision'></div></div><div id='points'><img id='point' src='points.png'><br><div id='animate_points'></div></div></div>";
        show(text);
        animateNumber("time", document.getElementById("animate_time"), Math.round(interrogation_time));
        animateNumber("percent", document.getElementById("animate_precision"), percent);
        animateNumber("points", document.getElementById("animate_points"), points);

        let count = 0;
        let it_is_scrollable = false;
        console.log(getComputedStyle(ask_div.querySelector("p").style.overflowY));
        if (getComputedStyle(ask_div.querySelector("p").style.overflowY) === "scroll") {
            ask_div.querySelector("p").style.overflowY = "hidden";
            it_is_scrollable = true;
        }
        const interval = setInterval(() => {
            spawnConfetti();
            count++;
            if (count >= 150) {
                clearInterval(interval);

                if (it_is_scrollable) {
                    ask_div.querySelector("p").style.overflowY = "scroll";
                }
            }
        }, 25);

        let continue_button = document.createElement("button");
        continue_button.innerText = "Continuer";
        continue_button.id = "continue";
        continue_button.style.color = toggle_t ? "white" : "black";
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

    questions_number += 1;

    let interrogation_side = getRandom(0, 2);
    let question_id = getRandom(0, about_ask.length);
    while (asked.includes(question_id)) question_id = getRandom(0, about_ask.length);
    asked.push(question_id);

    let title, def;
    if (interrogation_side === 0) {
        title = about_ask[question_id].title;
        def = about_ask[question_id].def;
    } else {
        def = about_ask[question_id].title;
        title = about_ask[question_id].def;
    }

    if (questions_type === "auto" || questions_type === "qcm" || questions_type === "write") {

        if (interrogation_side === 0) {
            if (about_ask[question_id].kind === "defs") show("Quelle est la définition de : <br>\"" + title + "\" ?");
            else if (about_ask[question_id].kind === "dates") {
                if (/^\d/.test(title)) show("Que s'est-il passé le " + title + " ?");
                else show("Que s'est-il passé en " + title + " ?");
            } else if (about_ask[question_id].kind === "egal") show("\"" + title + "\" est égal à :");
        } else {
            if (about_ask[question_id].kind === "defs") show("Quel est le terme défini par :<br>\"" + title + "\" ?");
            else if (about_ask[question_id].kind === "dates") show("Quelle date va avec \"" + title + "\" ?");
            else if (about_ask[question_id].kind === "egal") show("\"" + title + "\" est égal à :");
        }

    } else if (questions_type === "random" || questions_type === "choice") {

        let show_div = document.createElement("div");
        show_div.innerHTML = "<p id='complete_verbs_grid'>Complète :</p> <br>";
        show_div.className = "verbs-grid";
        let the_column;

        let header = document.createElement("div");
        header.className = "header";
        header.style.gridTemplateColumns = `repeat(${all_columns.length}, minmax(65px, 1fr))`;
        all_columns.forEach((c) => {
            let input = document.createElement("input");
            input.className = "header_fixed";
            input.value = c === "" ? "VIDE!" : c;
            input.disabled = true;
            header.appendChild(input);
        });
        show_div.appendChild(header);

        the_column = questions_type === "random" ? getRandom(0, all_columns.length) : verbs_column;

        let row = document.createElement("div");
        row.className = "row";
        row.style.gridTemplateColumns = `repeat(${all_columns.length}, minmax(65px, 1fr))`;

        all_columns.forEach((e, index) => {
            let input = document.createElement("input");
            input.className = "ask_verbs_input";
            if (index === the_column) input.value = about_ask[question_id][the_column] || "VIDE!";
            row.appendChild(input);
        });
        show_div.appendChild(row);
        show(show_div);

    } else if (questions_type === "memory") {

        let memory_container = document.createElement("div");
        memory_container.innerHTML = "<p style='text-align: center'>Trouve les paires :</p>";

        let memory_div = document.createElement("div");
        memory_div.className = "memory";
        memory_container.appendChild(memory_div);

        let table = about_ask[question_id];
        table = shuffle(table);

        let all_titles = [];
        let all_defs = [];
        table.forEach((e, i) => {
            all_titles.push({title_or_def: e.title, id: i});
            all_defs.push({title_or_def: e.def, id: i});
        });
        all_titles = shuffle(all_titles);
        all_defs = shuffle(all_defs);
        
        let the_length = all_titles.length + all_defs.length;

        for (let i = 0; i < the_length; i++) {

            let card = document.createElement("div");
            card.className = "card";
            memory_div.appendChild(card);

            let card_inner = document.createElement("div");
            card_inner.className = "card-inner";
            card.appendChild(card_inner);

            let card_front = document.createElement("div");
            card_front.className = "card-front";
            card_inner.appendChild(card_front);

            let card_back = document.createElement("div");
            card_back.className = "card-back";
            card_inner.appendChild(card_back);

            if (getRandom(0, 2) === 0) {
                if (all_titles.length !== 0) {
                    card_back.innerHTML = all_titles[0].title_or_def;
                    card.dataset.id = all_titles[0].id;
                    all_titles.shift();
                } else {
                    card_back.innerHTML = all_defs[0].title_or_def;
                    card.dataset.id = all_defs[0].id;
                    all_defs.shift();
                }
            } else {
                if (all_defs.length !== 0) {
                    card_back.innerHTML = all_defs[0].title_or_def;
                    card.dataset.id = all_defs[0].id;
                    all_defs.shift();
                } else {
                    card_back.innerHTML = all_titles[0].title_or_def;
                    card.dataset.id = all_titles[0].id;
                    all_titles.shift();
                }
            }   

            card.addEventListener("click", select_card);
        }

        let selected_divs = [];
        let cards_guessed = [];

        function select_card(e) {
            const card = e.currentTarget;
            card.querySelector(".card-inner").classList.toggle("card_selected");

            if (selected_divs.includes(card)) {
                const index = selected_divs.indexOf(card);
                selected_divs.splice(index, 1);
            } else {
                selected_divs.push(card);
            }

            if (selected_divs.length === 2) {
                guessing();
            }
        }

        function guessing() {
            console.log("guessing");

            memory_div.querySelectorAll(".card").forEach((e) => {
                e.removeEventListener("click", select_card);
            });

            selected_divs.forEach((e) => {
                e.classList.toggle("flipped");
            });

            setTimeout(() => {

                if (!(selected_divs[0].dataset.id === selected_divs[1].dataset.id)) {

                    wrong_answers_memory += 1;
                    wrong_answers_in_row += 1;
                    right_answers_in_row = 0;

                    ask_div.addEventListener("click", ask_div_eventListener);

                    function ask_div_eventListener() {
                        ask_div.removeEventListener("click", ask_div_eventListener);

                        selected_divs.forEach((e) => {

                            e.classList.toggle("flipped");
                            e.querySelector(".card-inner").classList.toggle("card_selected");

                            selected_divs = [];

                            setTimeout(() => {
                                memory_div.querySelectorAll(".card").forEach((e) => {
                                    if (!cards_guessed.includes(e)) e.addEventListener("click", select_card);
                                });
                            }, 700);
                        });
                    }
                } else {

                    right_answers += 1;
                    wrong_answers_in_row = 0;
                    right_answers_in_row += 1;

                    selected_divs.forEach((e) => {
                        e.querySelector(".card-inner").querySelector(".card-back").classList.add("card_over");
                        e.querySelector(".card-inner").classList.toggle("card_selected");
                        cards_guessed.push(e);
                    });

                    selected_divs = [];

                    setTimeout(() => {
                        memory_div.querySelectorAll(".card").forEach((e) => {
                            if (!cards_guessed.includes(e)) e.addEventListener("click", select_card);
                        });
                    }, 700);
                }

                if (cards_guessed.length === (table.length * 2)) {
                    memory_container.removeChild(memory_container.querySelector("p"));
                    
                    next.className = "shown";
                    next.onclick = () => {
                        askQuestion();
                        next.remove();
                        reveal.remove();
                    };
                }

            }, 700);
        }

        show(memory_container);

        setTimeout(() => {
            memory_div.querySelectorAll(".card").forEach((e) => {
                fitText(e.querySelector(".card-inner").querySelector(".card-back"));
            });
        }, 0);   
    }

    let reveal = document.createElement("button");
    reveal.id = "reveal";
    if (questions_type === "auto" || questions_type === "random" || questions_type === "choice") {
        reveal.innerText = "Valider";
    } else if (questions_type === "write" || questions_type === "qcm") {
        reveal.innerText = "Voir la réponse";
    } else if (questions_type === "memory") {
        reveal.innerText = "Voir les réponses";
    }

    reveal.className = "shown";
    reveal.style.color = toggle_t ? "white" : "black";
    ask_div.appendChild(reveal);

    let next = document.createElement("button");
    next.innerText = "Suivant";
    next.id = "next";
    next.className = "hide";
    next.style.color = toggle_t ? "white" : "black";
    ask_div.appendChild(next);

    if (questions_type === "qcm" || questions_type === "write") {
        reveal.onclick = () => {
            right_answers_in_row = 0;
            wrong_answers_in_row += 1;
            show("La réponse était : \"" + def + "\"");
            if (bonus_mode) {
                wrong_questions.push(about_ask[question_id]);
            }
            reveal.className = "hide";
            if (questions_type === "write") {
                asking.value = "";
                asking.className = "hide";
            } else writer.innerHTML = "";
            next.className = "shown";
            next.onclick = () => {
                askQuestion();
                next.remove();
                reveal.remove();
            };
        };
    } else if (questions_type === "memory") {
        reveal.className = "hide";

    } else if (questions_type === "auto") {
        reveal.onclick = reveal_it;
        document.addEventListener("keydown", pre_revealing);
        function pre_revealing(e) {
            if (e.key === "Enter") {
                reveal_it();
            }
        }
        function reveal_it() {
            document.removeEventListener("keydown", pre_revealing);

            if (asking.value !== "") {
                let user_answer = asking.value;
                asking.value = "";
                asking.className = "hide";
                if (wash(user_answer) === wash(def)) {
                    if (sonor_effects) playSound(correct);
                    show("");
                    reveal.className = "hide";
                    playCheckAnimation();
                    setTimeout(() => {
                        show("C'était la bonne réponse");
                        right_answers++;
                        right_answers_in_row += 1;
                        wrong_answers_in_row = 0;
                        next.className = "shown";
                        next.onclick = () => {
                            askQuestion();
                            next.remove();
                            reveal.remove();
                        };
                    }, 1900);
                } else {
                    reveal.className = "hide";
                    show("Ta réponse était : <br>\"" + user_answer + "\"<br> La bonne réponse était : <br> \"" + def + "\"");
                    let accept = document.createElement("button");
                    accept.innerText = "Ma réponse est bonne";
                    accept.id = "accept";
                    accept.style.color = toggle_t ? "white" : "black";
                    let refuse = document.createElement("button");
                    refuse.innerText = "Ma réponse est fausse";
                    refuse.id = "refuse";
                    refuse.style.color = toggle_t ? "white" : "black";
                    ask_div.appendChild(accept);
                    ask_div.appendChild(refuse);

                    accept.onclick = () => {
                        right_answers++;
                        right_answers_in_row += 1;
                        wrong_answers_in_row = 0;
                        accept.remove();
                        refuse.remove();
                        if (sonor_effects) playSound(correct);
                        show("");
                        playCheckAnimation();
                        setTimeout(() => {
                            askQuestion();
                            next.remove();
                            reveal.remove();
                        }, 1900);
                    };
                    refuse.onclick = () => {
                        accept.remove();
                        refuse.remove();
                        right_answers_in_row = 0;
                        wrong_answers_in_row += 1;
                        if (bonus_mode) {
                            wrong_questions.push(about_ask[question_id]);
                        }
                        if (sonor_effects) playSound(fail);
                        show("");
                        playCrossAnimation();
                        setTimeout(() => {
                            askQuestion();
                            next.remove();
                            reveal.remove();
                        }, 1900);
                    };
                }
            }
        };
    } else if (questions_type === "random" || questions_type === "choice") {
        reveal.onclick = reveal_it;
        document.addEventListener("keydown", pre_revealing);
        function pre_revealing(e) {
            if (e.key === "Enter") {
                document.removeEventListener("keydown", pre_revealing);
                reveal_it();
            }
        }

        function reveal_it() {
            document.removeEventListener("keydown", pre_revealing);

            let the_row = about_ask[question_id];
            let all_correct = true;
            let row = document.createElement("div");
            row.className = "row";
            row.style.gridTemplateColumns = `repeat(${the_row.length}, minmax(65px, 1fr))`;

            ask_div.querySelector(".row").querySelectorAll("input").forEach((e, i) => {
                let input = document.createElement("input");
                input.className = "ask_verbs_input";
                input.disabled = true;
                input.style.backgroundColor = "transparent";

                if (e.value.trim() === the_row[i]) e.style.backgroundColor = "green";
                else {
                    e.style.backgroundColor = "red";
                    all_correct = false;
                    input.value = the_row[i] || "VIDE!";
                }
                row.appendChild(input);
                ask_div.querySelector(".verbs-grid").appendChild(row);
            });

            reveal.className = "hide";

            if (all_correct) {
                if (sonor_effects) playSound(correct);
                show("");
                playCheckAnimation();
                setTimeout(() => {
                    next.className = "shown";
                    show("C'était la bonne réponse");
                    right_answers++;
                    right_answers_in_row += 1;
                    wrong_answers_in_row = 0;
                    next.onclick = () => {
                        askQuestion();
                        next.remove();
                        reveal.remove();
                    };
                }, 1900);
            } else {
                right_answers_in_row = 0;
                ask_div.querySelector(".verbs-grid").removeChild(ask_div.querySelector(".verbs-grid").querySelector("#complete_verbs_grid"));
                ask_div.querySelector(".verbs-grid").removeChild(ask_div.querySelector(".verbs-grid").querySelector("br"));
                if (sonor_effects) playSound(fail);
                if (bonus_mode) {
                    wrong_questions.push(about_ask[question_id]);
                }
                playCrossAnimation();
                setTimeout(() => {
                    next.className = "shown";
                    next.onclick = () => {
                        askQuestion();
                        next.remove();
                        reveal.remove();
                    };
                }, 1900);
            }
        };
    }

    if (questions_type === "write") {
        asking.className = "shown";
        asking.value = "";
        asking.addEventListener("input", () => {
            check_input(reveal, next, def);
        });
    } else if (questions_type === "auto") {
        asking.className = "shown";
        asking.value = "";
    } else if (questions_type === "qcm") {
        asking.className = "hide";

        let randomise = [];
        randomise.push(getRandom(0, 4));
        while (randomise.length < 4) {
            let i = getRandom(0, 4);
            if (!randomise.includes(i)) randomise.push(i);
        }

        let p2, p2_text, p3, p3_text, p4, p4_text;
        if (interrogation_side === 0) {
            p2 = document.createElement("p");
            p2_text = about_ask[getRandom(0, about_ask.length)].def;
            while (p2_text === def) p2_text = about_ask[getRandom(0, about_ask.length)].def;

            p3 = document.createElement("p");
            p3_text = about_ask[getRandom(0, about_ask.length)].def;
            while (p3_text === def || p3_text === p2_text) p3_text = about_ask[getRandom(0, about_ask.length)].def;

            p4 = document.createElement("p");
            p4_text = about_ask[getRandom(0, about_ask.length)].def;
            while (p4_text === def || p4_text === p2_text || p4_text === p3_text) p4_text = about_ask[getRandom(0, about_ask.length)].def;
        } else {
            p2 = document.createElement("p");
            p2_text = about_ask[getRandom(0, about_ask.length)].title;
            while (p2_text === def) p2_text = about_ask[getRandom(0, about_ask.length)].title;

            p3 = document.createElement("p");
            p3_text = about_ask[getRandom(0, about_ask.length)].title;
            while (p3_text === def || p3_text === p2_text) p3_text = about_ask[getRandom(0, about_ask.length)].title;

            p4 = document.createElement("p");
            p4_text = about_ask[getRandom(0, about_ask.length)].title;
            while (p4_text === def || p4_text === p2_text || p4_text === p3_text) p4_text = about_ask[getRandom(0, about_ask.length)].title;
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
                    right_answers++;
                    right_answers_in_row += 1;
                    wrong_answers_in_row = 0;
                    if (sonor_effects) playSound(correct);
                    playCheckAnimation();
                    setTimeout(() => {
                        askQuestion();
                        next.remove();
                        reveal.remove();
                    }, 1900);
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
                    if (sonor_effects) playSound(fail);
                    if (bonus_mode) {
                        wrong_questions.push(about_ask[question_id]);
                    }
                    playCrossAnimation();
                    setTimeout(() => {
                        right_answers_in_row = 0;
                        wrong_answers_in_row += 1;
                        show("Dommage... La bonne réponse était \"" + def + "\"");
                        next.className = "shown";
                        next.onclick = () => {
                            askQuestion();
                            next.remove();
                            reveal.remove();
                        };
                    }, 1900);
                });
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
                    if (sonor_effects) playSound(fail);
                    if (bonus_mode) {
                        wrong_questions.push(about_ask[question_id]);
                    }
                    playCrossAnimation();
                    setTimeout(() => {
                        right_answers_in_row = 0;
                        wrong_answers_in_row += 1;
                        show("Dommage... La bonne réponse était \"" + def + "\"");
                        next.className = "shown";
                        next.onclick = () => {
                            askQuestion();
                            next.remove();
                            reveal.remove();
                        };
                    }, 1900);
                });
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
                    if (sonor_effects) playSound(fail);
                    if (bonus_mode) {
                        wrong_questions.push(about_ask[question_id]);
                    }
                    playCrossAnimation();
                    setTimeout(() => {
                        right_answers_in_row = 0;
                        wrong_answers_in_row += 1;
                        show("Dommage... La bonne réponse était \"" + def + "\"");
                        next.className = "shown";
                        next.onclick = () => {
                            askQuestion();
                            next.remove();
                            reveal.remove();
                        };
                    }, 1900);
                });
                writer.appendChild(p4);
                randomise.shift();
            }
        }
    }
}

/*----MEMORY DISTINCT PART----
 POUR PAS TROP DE BORDEL DANS ASK_QUESTION*/

function createMemoryRounds(total) {

    const MIN_PAIRS = 6;
    const MAX_PAIRS = 8;

    if (total <= MIN_PAIRS) {
        return [total];
    }

    const rounds = Math.ceil(total / MAX_PAIRS);

    const base = Math.floor(total / rounds);

    const extra = total % rounds;

    let result = [];

    for (let i = 0; i < rounds; i++) {

        let amount = base;

        if (i < extra) {
            amount++;
        }

        result.push(amount);
    }

    return result;
}

function splitIntoMemoryRounds(questions) {

    const sizes = createMemoryRounds(questions.length);

    let result = [];

    let start = 0;

    for (let size of sizes) {

        let round = questions.slice(start, start + size);

        result.push(round);

        start += size;
    }

    return result;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function fitText(element) {

    let fontSize = 40;

    element.style.fontSize = fontSize + "px";

    while (
        (
            element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth
        )
        &&
        fontSize > 10
    ) {

        fontSize--;

        element.style.fontSize = fontSize + "px";
    }
}


function show(message) {
    msg.innerHTML = "";
    if (typeof message === "string") {
        msg.innerHTML = message;
    } else {
        msg.appendChild(message);
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

document.getElementById("help_cover").addEventListener("click", help);


function help() {

    if (help_toggle === false) {
        help_div.style.display = "block";
        help_div.style.opacity = 1;
        help_toggle = true;
        document.getElementById("help_cover").style.display = "block";
    } else {
        help_div.style.opacity = 0;
        help_toggle = false;
        document.getElementById("help_cover").style.display = "none";
        setTimeout(() => {
            help_div.style.display = "none";
        }, 500);
        
    }
}

const params = new URLSearchParams(window.location.search);

if (params.has("help")) {
    help();
}


function choose(element) {
    const buttons = {
        create: document.getElementById("choosing_create"),
        add: document.getElementById("choosing_add"),
        ask: document.getElementById("choosing_learn")
    };

    const sections = {
        create: document.getElementById("create"),
        add: document.getElementById("add"),
        ask: document.getElementById("ask")
    };

    Object.keys(buttons).forEach(key => {
        buttons[key].style.textDecoration = key === element ? "underline" : "none";
        sections[key].style.display = key === element ? "flex" : "none";
    });
}

function choose_help(element) {
    const buttons = {
        "1": document.getElementById("choosing_help1"),
        "2": document.getElementById("choosing_help2")
    };

    const sections = {
        "1": document.getElementById("help_1"),
        "2": document.getElementById("help_2")
    };

    Object.keys(buttons).forEach(key => {
        buttons[key].style.textDecoration = key === element ? "underline" : "none";
        sections[key].style.display = key === element ? "block" : "none";
    });
}


function createParticles(canvas, color) {
    const ctx = canvas.getContext("2d");
    const particles = [];
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 30;
  
    const gravity = 0.15;
  
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * -4 - 2,
        size: Math.random() * 4 + 5,
        life: 1,
        angle: Math.random() * Math.PI * 2
      });
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      particles.forEach(p => {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
  
        p.life -= 0.015;
  
        ctx.globalAlpha = Math.max(p.life, 0);
  
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
  
        ctx.fillStyle = color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
  
        ctx.restore();
      });
  
      ctx.globalAlpha = 1;
  
      if (particles.some(p => p.life > 0.01)) {
        requestAnimationFrame(animate);
      }
    }
  
    animate();
}


function playCheckAnimation() {
  // 1️⃣ Crée l'overlay
  const overlay = document.createElement('div');
  overlay.className = 'overlay-check';
  overlay.innerHTML = `
   <canvas></canvas>
    <svg viewBox="0 0 60 60">
      <g id="group">
        <circle id="circle" cx="30" cy="30" r="25"/>
        <path id="check" d="M17 30 L27 40 L44 20"/>
      </g>
    </svg>
  `;
  document.body.appendChild(overlay);

    const canvas = overlay.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

    setTimeout(() => {
        createParticles(canvas, "#2ecc71");
    }, 300);

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
    <canvas></canvas>
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

    const canvas = overlay.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
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
        createParticles(canvas, "#e74c3c");
    }, 300);
    
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

function animateNumber(type, el, target, duration = 2000) {
    let start = performance.now();

    function frame(now) {
        let t = (now - start) / duration;
        if (t > 1) t = 1;

        let eased = 1 - Math.pow(1 - t, 2);

        let value = Math.floor(eased * target);

        if (value >= target - 1) { 
            value = Math.min(value + 1, target);
        }

        if (type === "time") el.textContent = get_euclide(value);
        if (type === "percent") el.textContent = value + "%";
        if (type === "points") el.textContent = value;

        if (value < target) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}


function playSound(name) {
    if (!name) return;
    name.currentTime = 0; 
    name.play();
}

/* Le truc marche pas, mais bon je laisse si ça sert un jour; c'est un prototype pour passer de l'éditeur trumbo à du PDF

let iii = 0;

function get_pdf(html_editor) {
    const html = html_editor.innerHTML;
    console.log(JSON.stringify(html));
    console.log(iii);

    iii += 1;
    const win = window.open('', '_blank');

    win.document.write(`
    <html>
        <body>
        ${html}
        </body>
    </html>
    `);

    win.document.close();
    win.print();
}*/
