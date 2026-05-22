console.log("Here we go ! (account)");

import { createClient } from "https://esm.sh/@supabase/supabase-js@2?bundle";

const supabaseUrl = 'https://bwjdnnnbcctgnegixujz.supabase.co';
const supabaseAnonKey = 'sb_publishable_TIz-tI0AQgFr5Xa2EgpCjg_50ZlIKre';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const signin_message = getID("signin_message");
const signup_message = getID("signup_message");

let user_let;
let opened_sessions = new Set();
let whole_data = null; 
let toggle_account_small = true;
let toggle_import_3 = true;
const selects_sessions = [getID("add_data_input"), getID("import_data_input")]


const params = new URLSearchParams(window.location.search);

if (params.has("vaA3")) {
    redirect(2);
}
if (params.has("vaA4")) {
    redirect(4);
}
if (params.has("vaA5")) {
    redirect(3);
}

if (params.has("veTa3")) {
    redirect(5);
}

if (params.has("veTr3")) {
    redirect(6);
}

if (params.has("veTr4")) {
    redirect(8);
}


if (params.has("vaEr3")) {
    redirect(7);
}



async function redirect(id) {
    const { data, error } = await supabase
        .from('public_data')
        .select('json_data') 
        .eq('id', id);

    const new_data = data[0].json_data; 

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("sb-") || key.startsWith("color") || key.startsWith("text_color")) continue;
        localStorage.removeItem(key);
        i--;
    }

    const session = new_data[0];

    for (let lesson of session.lessons) {
        if (!(lesson.name === "text_color")) {
            let secure_name = lesson.name;
            if (lesson.verbs) {
                secure_name = "?verbs" + lesson.name;
            }
            if (lesson.isClass) {
                secure_name = "?class" + lesson.name;
            }
            if (typeof lesson.items !== "string") {
                localStorage.setItem(secure_name, JSON.stringify(lesson.items));
            } else {
                localStorage.setItem(secure_name, lesson.items);
            }
        }   
    }
    document.location.href = "https://petitmartien99.github.io/Synapse/index.html";
}


getID("see_defs_3").addEventListener("click", () => {see_3_unconnected()});
async function see_3_unconnected() {
    let id = Number.parseInt(getID("import_stuff_select").value);

    const { data, error } = await supabase
        .from('public_data')
        .select('json_data') 
        .eq('id', id);

    const new_data = data[0].json_data; 

    let we_are_verbs = false;

        let data_div = document.createElement("div");
        data_div.className = "see_data_div_3";
        getID("see_3").appendChild(data_div);

        for (let i = 0; i < new_data.length; i++) {
            const session = new_data[i];
            let session_div = document.createElement("div");
            session_div.className = "session_div";
            session_div.style.border = "solid 2px var(--text-color)";
            session_div.innerHTML = "<h3>" + session.name + "</h3>";
            data_div.appendChild(session_div);

            for (let j = 0; j < session.lessons.length; j++) {
                const lesson = session.lessons[j];
                if (lesson.name === "text_color") {
                    continue;
                }
                let lesson_div = document.createElement("div");
                lesson_div.className = "lesson_div";
                lesson_div.style.border = "solid 1px var(--text-color)";
                lesson_div.innerHTML = "<h4>" + lesson.name + "</h4>";
                session_div.appendChild(lesson_div);

                let ul = document.createElement("ul");
                lesson_div.appendChild(ul);

                if (!lesson.items || !lesson.items.length) {
                    if (!lesson.verbs) {
                        let p = document.createElement("p");
                        p.innerText = "La leçon est vide";
                        lesson_div.appendChild(p);
                        continue;
                    }
                }

                let items = lesson.items;
            
                if (!lesson.verbs) {
                    for (let k = 0; k < items.length; k++) {
                        const item = items[k];
                        let new_li = document.createElement("li");
                        if (item.kind === "egal") new_li.innerHTML = item.title + " = " + item.def;
                        else {
                            new_li.innerHTML = "<div class='titles'>" + item.title + " :</div> " + item.def;
                        }


                        ul.appendChild(new_li);
                    }
                } else {

                    we_are_verbs = true;

                    let tab = document.createElement("div");
                    tab.className = "verbs-grid";
                    let verbs = lesson.items;
                    lesson_div.appendChild(tab);
                    let header_div = document.createElement("div");
                    header_div.className = "header";
                    header_div.style.gridTemplateColumns = `repeat(${verbs.columns.length}, minmax(65px, 1fr)) 0.15fr`;
                    tab.appendChild(header_div);
                    verbs.columns.forEach((e, colIndex) => {
                        let input = document.createElement("input");
                        header_div.appendChild(input);
                        input.value = e;
                    });

                    if (verbs.verbs.length !== 0) {
                        verbs.verbs.forEach((e, rowIndex) => {
                            let row_div = document.createElement("div");
                            row_div.className = "row";
                            tab.appendChild(row_div);
                            e.forEach((v) => {
                                let input = document.createElement("input");
                                row_div.appendChild(input);
                                input.value = v;
                            });
        
                            row_div.style.gridTemplateColumns = `repeat(${e.length}, minmax(65px, 1fr)) 0.15fr`;
                        });
                    }            
                } 
                
                if (!we_are_verbs) {
                    let delete_session = document.createElement("button");
                    delete_session.innerText = "X";
                    delete_session.style.color = "var(--text-color)";
                    delete_session.className = "delete_session";
                    session_div.appendChild(delete_session); 
                    delete_session.addEventListener("click", e => { e.stopPropagation(); data_div.removeChild(session_div); });
                }

            }
            
            if (we_are_verbs) {
            let delete_session = document.createElement("button");
                delete_session.innerText = "X";
                delete_session.style.color = "var(--text-color)";
                delete_session.className = "delete_session";
                session_div.appendChild(delete_session); 
                delete_session.addEventListener("click", e => { e.stopPropagation(); getID("see_3").removeChild(data_div); });   
            }


            if (session.lessons.length >= 1) {
                let unsee = document.createElement("button");
                unsee.innerText = ">";
                unsee.style.color = "var(--text-color)";
                unsee.className = "unsee";
                let to_hide = session_div.querySelectorAll(".lesson_div");
                session_div.querySelector("h3").addEventListener("click", () => {
                    const name = session.name;
                    if (to_hide[0].style.display === "none") {
                        to_hide.forEach(e => e.style.display = "block");
                        unsee.innerText = "v";
                        opened_sessions.add(name);
                    } else {
                        to_hide.forEach(e => e.style.display = "none");
                        unsee.innerText = ">";
                        opened_sessions.delete(name);
                    }
                });
                if (opened_sessions.has(session.name)) {
                    to_hide.forEach(e => e.style.display = "block");
                    unsee.innerText = "v";
                } else {
                    to_hide.forEach(e => e.style.display = "none");
                    unsee.innerText = ">";
                }
                session_div.querySelector("h3").appendChild(unsee);
            }
        }
    

    if (we_are_verbs) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("sb-") || key.startsWith("color") || key.startsWith("text_color")) continue;
            localStorage.removeItem(key);
            i--;
        }

        const session = new_data[0];
    
        for (let lesson of session.lessons) {
            if (!(lesson.name === "text_color")) {
                let secure_name = lesson.name;
                if (lesson.verbs) {
                    secure_name = "?verbs" + lesson.name;
                }
                if (lesson.isClass) {
                    secure_name = "?class" + lesson.name;
                }
                if (typeof lesson.items !== "string") {
                    localStorage.setItem(secure_name, JSON.stringify(lesson.items));
                } else {
                    localStorage.setItem(secure_name, lesson.items);
                }
            }   
        }
    }
}


getID("see_defs_3_connected").addEventListener("click", see_3_connected);
async function see_3_connected() {
    let id = Number.parseInt(getID("import_stuff_select_connected").value);

    const { data, error } = await supabase
        .from('public_data')
        .select('json_data') 
        .eq('id', id);

   if (error) console.log(error);



    let correct_data = data[0].json_data;
    let global_test = false;
    correct_data.forEach((i) => {
        let test = false;
        whole_data.forEach((e) => {
            if (e.name === i.name) {
                test = true;
            }
        });
        if (!test) {
            whole_data.push(i);
            global_test = true;
        }
    });
    const { error: err } = await supabase
    .from("sessions")
    .update({ json_data: whole_data })
    .eq('uid', user_let.id);
    see_profile();
    if (getID("see_3_connected").style.top === "50%" && global_test) import_div();
}


async function update() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        user_let = user;
        document.querySelector("#connection").innerText = "connected";
        getID("sign_div").style.display = "none";
        getID("account_div").style.display = "block";

        const { data, error } = await supabase
            .from('sessions')
            .select('json_data') 
            .eq('uid', user_let.id);

        if (error) console.log(error.code);

        if (!data[0]) {
            const { data: inserted, error: errInsert } = await supabase
                .from('sessions')
                .insert([{ uid: user_let.id, json_data: [] }]);
            if (errInsert) console.error("Erreur :", errInsert);
            else console.log("Ligne insérée :", inserted);
        }
        
        see_profile();
    } else {
        getID("parameter_cover").style.display = "none";
        document.querySelector("#connection").innerText = "not connected";
        getID("sign_div").style.display = "block";
        getID("account_div").style.display = "none";
    }
}

update();

function getID(id) { return document.getElementById(id); }

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

getID("signin_email").addEventListener("input", check_signin);
getID("signin_password").addEventListener("input", check_signin);
getID("signin_button").disabled = true;

function check_signin() {
    let mail_input = getID("signin_email");
    let password_input = getID("signin_password");

    if (mail_input.value === "" || password_input.value === "") {
        signin_message.innerHTML = "Remplissez tous les champs";
        getID("signin_button").disabled = true;
        signin_message.style.display = "block";
        return;
    }

    if (!validateEmail(mail_input.value)) {
        signin_message.innerHTML = "Email invalide";
        getID("signin_button").disabled = true;
        signin_message.style.display = "block";
        return;
    }

    if (mail_input.value.length > 30) {
        signin_message.innerHTML = "Email trop long <br>(maximum 30 caractères)";
        getID("signin_button").disabled = true;
        signin_message.style.display = "block";
        return;
    }

    if (password_input.value.length > 30) {
        signin_message.innerHTML = "Mot de passe trop long <br>(maximum 30 caractères)";
        getID("signin_button").disabled = true;
        signin_message.style.display = "block";
        return;
    }

    signin_message.innerHTML = "";
    signin_message.style.display = "none";
    getID("signin_button").disabled = false;
}

getID("signin_button").addEventListener("click", sign_in);

async function sign_in() {
    let mail_input = getID("signin_email");
    let password_input = getID("signin_password");

    const { data, error } = await supabase.auth.signInWithPassword({
        email: mail_input.value,
        password: password_input.value,
    });

    update();

    if (error) {
        console.log("Error: " + error.code);
        if (error.code === "invalid_credentials") {
            signin_message.innerText = "Identifiants invalides";
            signin_message.style.display = "block";
        }
    } else {
        mail_input.value = "";
        password_input.value = "";
        signin_message.style.display = "none";
        
    }
}

getID("signup_email").addEventListener("input", check_signup);
getID("signup_password").addEventListener("input", check_signup);
getID("signup_button").disabled = true;

function check_signup() {
    let mail_input = getID("signup_email");
    let password_input = getID("signup_password");

    if (mail_input.value === "" || password_input.value === "") {
        signup_message.innerHTML = "Remplissez tous les champs";
        getID("signup_button").disabled = true;
        signup_message.style.display = "block";
        return;
    }

    if (!validateEmail(mail_input.value)) {
        signup_message.innerHTML = "Email invalide";
        getID("signup_button").disabled = true;
        signup_message.style.display = "block";
        return;
    }

    if (mail_input.value.length > 30) {
        signup_message.innerHTML = "Email trop long <br>(maximum 30 caractères)";
        getID("signup_button").disabled = true;
        signup_message.style.display = "block";
        return;
    }

    if (password_input.value.length > 30) {
        signup_message.innerHTML = "Mot de passe trop long <br>(maximum 30 caractères)";
        getID("signup_button").disabled = true;
        signup_message.style.display = "block";
        return;
    }

    if (password_input.value.length < 7) {
        signup_message.innerHTML = "Mot de passe trop court <br>(minimum 7 caractères)";
        getID("signup_button").disabled = true;
        signup_message.style.display = "block";
        return;
    }

    signup_message.innerHTML = "";
    signup_message.style.display = "none";
    getID("signup_button").disabled = false;
}

getID("signup_button").addEventListener("click", sign_up);

async function sign_up() {
    let mail_input = getID("signup_email");
    let password_input = getID("signup_password");

    const { data, error } = await supabase.auth.signUp({
        email: mail_input.value,
        password: password_input.value,
    });

    if (error) {
        console.log(error);
        if (error.code === "email_address_invalid") {
            signup_message.innerHTML = "Adresse mail invalide";
        }
        return;
    }

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: mail_input.value,
        password: password_input.value
    });

    if (loginError) {
        console.log("Erreur login après signup :", loginError);
        return;
    }

    user_let = loginData.user;
    update(); 
}


getID("delete_account").addEventListener("click", () => {
    alert("Pour supprimer votre compte, contactez le créateur du site (Alban).");
})


getID("signout").addEventListener("click", signOut);
async function signOut() {
    const { error } = await supabase.auth.signOut();
    update();
}


/*
    ----------------------
    |                    |
    |     SEE PROFILE    |
    |                    |
    ----------------------
*/

async function see_profile() {
    const mail_address = getID("mail_address");
    mail_address.innerHTML = "<span class='titles'>Email:</span><br> " + user_let.email;

    const { data, error } = await supabase
        .from('sessions')
        .select('json_data')
        .eq('uid', user_let.id);

    if (error) return console.log(error.code);

    whole_data = data[0].json_data || []; 
    const see_div = getID("see_data_div_id");
    see_div.innerHTML = "";

    see_div.style.justifyContent = "flex-start";
    if (!whole_data.length) {
        see_div.style.justifyContent = "center";
        see_div.innerHTML += "<p>Il n'y a pas de packs de leçons dans le compte</p>";
        return;
    }

    selects_sessions.forEach((e) => {
        e.innerHTML = "";
    });

    for (let i = 0; i < whole_data.length; i++) {
        const session = whole_data[i];
        let session_div = document.createElement("div");
        session_div.className = "session_div";
        session_div.style.border = "solid 2px var(--text-color)";
        session_div.innerHTML = "<h3>" + session.name + "</h3>";
        see_div.appendChild(session_div);
        session_div.dataset.session = session.name;

        selects_sessions.forEach((e) => {
            let option = document.createElement("option");
            option.value = session.name;
            option.innerText = session.name;
            e.appendChild(option);
        });

        session_div.addEventListener("click", () => {
            getID("import_data_input").value = session.name;
            getID("add_data_input").value = session.name;
            check_add();
            check_import();
        });

        let check_empty = true;
        session.lessons.forEach((e) => {
            if (e.name !== "text_color") {
                check_empty = false;
            }
        })

        if (check_empty) {
            session_div.innerHTML += "<p>Ce pack est vide</p>";
            let delete_session = document.createElement("button");
            delete_session.innerHTML = "<div class='file_big_image'></div>";;
            delete_session.className = "delete_session";
            session_div.appendChild(delete_session);
            delete_session.addEventListener("click", e => { e.stopPropagation(); delete_object("session", session_div); });
            continue;
        }

        for (let j = 0; j < session.lessons.length; j++) {
            const lesson = session.lessons[j];
            if (lesson.name === "text_color") {
                continue;
            }
            let lesson_div = document.createElement("div");
            lesson_div.className = "lesson_div";
            lesson_div.style.border = "solid 1px var(--text-color)";
            lesson_div.innerHTML = "<h4>" + lesson.name + "</h4>";
            session_div.appendChild(lesson_div);
            lesson_div.dataset.session = session.name;
            lesson_div.dataset.lesson = lesson.name;

            let delete_lesson = document.createElement("button");
            delete_lesson.innerHTML = "<div class='file_big_image'></div>";
            delete_lesson.className = "delete_lesson";
            lesson_div.appendChild(delete_lesson);

            if (!(lesson.verbs === true) && !(lesson.isClass === true)) {
                let ul = document.createElement("ul");
                lesson_div.appendChild(ul);

                if (!lesson.items || !lesson.items.length) {
                    let p = document.createElement("p");
                    p.innerText = "La leçon est vide";
                    lesson_div.appendChild(p);
                    delete_lesson.addEventListener("click", () => delete_object("lesson", lesson_div));
                    continue;
                }

                let items = lesson.items;
            

                for (let k = 0; k < items.length; k++) {
                    const item = items[k];
                    let new_li = document.createElement("li");
                    if (item.kind === "egal") new_li.innerHTML = item.title + " = " + item.def;
                    else {
                        new_li.innerHTML = "<div class='titles'>" + item.title + " :</div> " + item.def;
                    }

                    new_li.dataset.session = session.name;
                    new_li.dataset.lesson = lesson.name;
                    new_li.dataset.title = item.title;
                    new_li.dataset.content = item.def;
                    new_li.dataset.kind = item.kind;

                    let delete_def = document.createElement("button");
                    delete_def.innerHTML = "<div class='file_small_image'></div>";
                    delete_def.className = "delete_def";
                    delete_def.addEventListener("click", () => delete_object("def", new_li));
                    new_li.appendChild(delete_def);

                    ul.appendChild(new_li);
                }
            } else if (lesson.verbs === true) {

                if (!lesson.items) {
                    let p = document.createElement("p");
                    p.innerText = "La leçon est vide";
                    lesson_div.appendChild(p);
                    delete_lesson.addEventListener("click", () => delete_object("lesson", lesson_div));
                    continue;
                }

                let tab = document.createElement("div");
                tab.className = "verbs-grid";
                let verbs = lesson.items;
                lesson_div.appendChild(tab);
                let header_div = document.createElement("div");
                header_div.className = "header";
                header_div.style.gridTemplateColumns = `repeat(${verbs.columns.length}, minmax(65px, 1fr)) 0.15fr`;
                tab.appendChild(header_div);
                verbs.columns.forEach((e, colIndex) => {
                    let input = document.createElement("input");
                    header_div.appendChild(input);
                    input.value = e;
                    input.addEventListener("change", () => {
                        changeVerbs("update_col", [session.name, lesson.name], null, colIndex, input.value);
                    });
                });
                
                if (!(verbs.columns.length > 4)) {
                    let add_button = document.createElement("button");
                    add_button.innerText = "+";
                    add_button.style.color = "var(--text-color)";
                    header_div.appendChild(add_button);
                    add_button.addEventListener("click", () => {
                    changeVerbs("add_col", [session.name, lesson.name], null, null, null);
                    });
                } else {
                    let no_button = document.createElement("div");
                    no_button.id = "no_button";
                    header_div.appendChild(no_button);
                }
                
                if (verbs.verbs.length !== 0) {
                    verbs.verbs.forEach((e, rowIndex) => {
                        let row_div = document.createElement("div");
                        row_div.className = "row";
                        tab.appendChild(row_div);
                        e.forEach((v) => {
                            let input = document.createElement("input");
                            row_div.appendChild(input);
                            input.value = v;
                            input.addEventListener("change", () => {
                                let value = [];
                                row_div.querySelectorAll("input").forEach((t) => {
                                    value.push(t.value);
                                });
                                changeVerbs("update_row", [session.name, lesson.name], rowIndex, null, value); 
                            });
                        });
                        let delete_row_button = document.createElement("button");
                        delete_row_button.className = "delete_row";
                        delete_row_button.innerHTML = "<div class='file_small_image'></div>";
                        row_div.appendChild(delete_row_button);
                        delete_row_button.addEventListener("click", () => {
                            changeVerbs("delete_row", [session.name, lesson.name], rowIndex, null, null);
                        });
    
                        row_div.style.gridTemplateColumns = `repeat(${e.length}, minmax(65px, 1fr)) 0.15fr`;
                    });
                } 
                let row_div = document.createElement("div");
                row_div.className = "row";
                tab.appendChild(row_div);
                verbs.columns.forEach((e, colIndex) => {
                    let button = document.createElement("button");
                    row_div.appendChild(button);
                    button.className = "delete_col";
                    button.innerHTML = "<div class='file_big_image'></div>";
                    button.addEventListener("click", () => {
                        changeVerbs("delete_col", [session.name, lesson.name], null, colIndex, null);
                    });
                });
                let nothing_div = document.createElement("div");
                nothing_div.style.width = "35px";
                row_div.appendChild(nothing_div);

                row_div.style.gridTemplateColumns = `repeat(${verbs.columns.length}, minmax(65px, 1fr)) 0.15fr`;
            } else if (lesson.isClass === true) {
                let editor = document.createElement("div");
                editor.className = "editor";
                
                lesson_div.style.padding = "0px";
                lesson_div.querySelector("h4").style.marginLeft = "10px";
                lesson_div.querySelector("h4").style.marginTop = "10px";
                lesson_div.querySelector("h4").style.fontSize = "20px";
                
                lesson_div.appendChild(editor);
                
                if ($(editor).data('trumbowyg')) {
                    $(editor).trumbowyg('destroy');
                }

                $.trumbowyg.langs.fr.backColor = "Surlignage";
                $.trumbowyg.langs.fr.removeformat = "Enlever couleurs";
                
                $(editor).trumbowyg({
                    lang: 'fr',
                    semantic: false,
                    disabled: true,
                    btnsDef: {
                        spoiler: {
                            title: 'Spoiler',
                            text: '👁 Spoiler',
                            hasIcon: false,
                            fn: function () {
                                console.log("🟢 spoiler clicked");
                            }
                        }
                    },
                    btns: [
                        ['h1', 'h2'],
                        ['bold', 'italic', 'underline'],
                        ['foreColor', 'backColor'],
                        ['removeformat']
                    ]
                }).on('tbwinit', function () {
                    $(editor).trumbowyg('html', lesson.items);
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
                    localStorage.setItem(lesson.name, $(editor).trumbowyg('html'));
                    }, 300);
                });
            }

            delete_lesson.addEventListener("click", () => delete_object("lesson", lesson_div));
        }

        let delete_session = document.createElement("button");
        delete_session.innerHTML = "<div class='file_big_image'></div>";
        delete_session.className = "delete_session";
        session_div.appendChild(delete_session);
        delete_session.addEventListener("click", e => { e.stopPropagation(); delete_object("session", session_div); });

        if (session.lessons.length >= 1) {
            let unsee = document.createElement("button");
            unsee.innerText = ">";
            unsee.style.color = "var(--text-color)";
            unsee.className = "unsee";
            let to_hide = session_div.querySelectorAll(".lesson_div, .verbs-grid");
            session_div.querySelector("h3").addEventListener("click", () => {
                const name = session.name;
                if (to_hide[0].style.display === "none") {
                    to_hide.forEach(e => e.style.display = "block");
                    unsee.innerText = "v";
                    opened_sessions.add(name);
                } else {
                    to_hide.forEach(e => e.style.display = "none");
                    unsee.innerText = ">";
                    opened_sessions.delete(name);
                }
            });
            if (opened_sessions.has(session.name)) {
                to_hide.forEach(e => e.style.display = "block");
                unsee.innerText = "v";
            } else {
                to_hide.forEach(e => e.style.display = "none");
                unsee.innerText = ">";
            }
            session_div.querySelector("h3").appendChild(unsee);
        }
    }

    check_add();
    check_import();
}

async function changeVerbs(action, way, rowIndex = null, colIndex = null, value = null) {
    let data = whole_data.find(s => s.name === way[0]).lessons.find(e => e.name === way[1]).items;
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

    whole_data.find(s => s.name === way[0]).lessons.find(e => e.name === way[1]).items = data;
    const { error } = await supabase
        .from("sessions")
        .update({ json_data: whole_data })
        .eq("uid", user_let.id);
    see_profile();
}



const import_data_input = getID("import_data_input");
import_data_input.addEventListener("input", check_import);

function check_import() {

    const button = getID("import_data_button");
    const message = getID("import_data_p");

    if (!whole_data || whole_data.length === 0) {
        message.style.display = "block";
        message.innerText = "Il n'y a pas de pack à importer";
        import_data_input.style.display = "none";
        button.disabled = true;
        return;
    }

    import_data_input.style.display = "block";

    const session = whole_data.find(s => s.name === import_data_input.value);

    if (!session) {
        message.style.display = "block";
        message.innerText = "Il n'y a aucun pack de ce nom";
        button.disabled = true;
        return;
    }

    let empty = true;

    for (let lesson of session.lessons) {
        if (lesson.items && lesson.items.length > 0) {
            empty = false;
            break;
        }
        
        if (lesson.items.verbs) {
            if (lesson.items.verbs.length > 0) {
                empty = false;
                break;
            }
        }

    }

    if (empty) {
        message.style.display = "block";
        message.innerHTML = "Ce pack est vide";
        button.disabled = true;
        return;
    }

    message.innerHTML = "";
    message.style.display = "none";
    button.disabled = false;
}

check_import();


getID("import_data_button").addEventListener("click", import_data);

function import_data() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("sb-") || key.startsWith("color") || key.startsWith("text_color")) continue;
        localStorage.removeItem(key);
        i--;
    }

    const session_name = import_data_input.value;
    const session = whole_data.find(s => s.name === session_name);

    for (let lesson of session.lessons) {
        if (!(lesson.name === "text_color")) {
            let secure_name = lesson.name;
            if (lesson.verbs) {
                secure_name = "?verbs" + lesson.name;
            }
            if (lesson.isClass) {
                secure_name = "?class" + lesson.name;
            }
            if (typeof lesson.items !== "string") {
                localStorage.setItem(secure_name, JSON.stringify(lesson.items));
            } else {
                localStorage.setItem(secure_name, lesson.items);
            }
        }   
    }

    check_add();
    check_create();
    check_import();
    setTimeout(() => {
        getID("import_data_p").innerHTML = "Pack importé";
        getID("import_data_p").style.display = "block";
        getID("import_data_button").disabled = true;
    }, 50);
}


async function delete_object(type, element) {
    let newData = whole_data;

    if (type === "session") {
        newData = newData.filter(s => s.name !== element.dataset.session);
    } else {
        for (let session of newData) {
            if (session.name !== element.dataset.session) continue;

            if (type === "lesson") {
                session.lessons = session.lessons.filter(l => l.name !== element.dataset.lesson);
            } else if (type === "def") {
                for (let lesson of session.lessons) {
                    if (lesson.name !== element.dataset.lesson) continue;
                    console.log(lesson.items);
                    lesson.items = lesson.items.filter(
                        item =>
                            !(item.title === element.dataset.title)
                    );
                    console.log(element.dataset.title);
                }
            }
        }
    }

    whole_data = newData;

    const { error } = await supabase
        .from("sessions")
        .update({ json_data: whole_data })
        .eq("uid", user_let.id);

    if (!error) see_profile();

    if (type === 'session') {
        getID("add_data_input").value = "";
        getID("import_data_input").value = "";
        getID("import_data_p").innerHTML = "";
        getID("add_data_p").innerHTML = "";
        getID("add_data_button").disabled = true;
        getID("import_data_button").disabled = true;
        check_add();
        check_import(); 
    }
}


const name_input = getID("add_data_input");
name_input.addEventListener("input", check_add);

function check_add() {

    const button = getID("add_data_button");
    const message = getID("add_data_p");

    name_input.style.display = "block";

    if (!whole_data || whole_data.length === 0) {
        message.style.display = "block";
        message.innerText = "Il n'y a pas de pack de leçons";
        button.disabled = true;
        name_input.style.display = "none";
        return;
    }

    const session = whole_data.find(s => s.name === name_input.value);

    if (!session) {
        message.style.display = "block";
        message.innerText = "Il n'y a aucun pack de ce nom";
        button.disabled = true;
        return;
    }

    message.innerHTML = "";
    message.style.display = "none";
    button.disabled = false;
}

check_add();


getID("add_data_button").addEventListener("click", exporting_data);
async function exporting_data() {
    if (!name_input.value) return;

    const { data, error } = await supabase
        .from("sessions")
        .select('json_data')
        .eq('uid', user_let.id);

    if (error) return console.log(error.code);


    let newData = whole_data;
    newData = newData.filter(s => s.name === name_input.value);
    newData = newData[0];
    let present_lessons = [];
    newData.lessons.forEach((e) => {present_lessons.push(e.name)});

    let newStuff = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("sb-") || key === "color" || key.startsWith("text_color") || key.startsWith("tinymce-custom-colors-hilitecolor") || key.startsWith("tinymce-custom-colors-forecolor")) continue;
    
        let items = localStorage.getItem(key);
        try {
            items = JSON.parse(items);
        } catch (e) {
            console.log(e);
        }
        if (key.startsWith("?verbs")) {
            newStuff.push({
                name: key.substring(6, key.length),
                verbs: true,
                items: items
            });
        } else if (key.startsWith("?class")) {
            newStuff.push({
                name: key.substring(6, key.length),
                isClass: true,
                items: items
            });
        } else {
            newStuff.push({
                name: key,
                items: items
            });
        }
            
    }
    newStuff.forEach((e) => {
        if (present_lessons.includes(e.name)) {
            if (newData.lessons.length !== 0) {
                if (newData.lessons.length === 1) {
                    newData.lessons = [];
                } else {
                    newData.lessons = newData.lessons.filter(s => s.name !== e.name);
                }
            }
        }
    });

    if (newStuff.length === 0) {
        return;
    }
    newStuff.forEach((e) => {   
        newData.lessons.push(e);
    });

    whole_data.find(s => s.name === name_input.value).lessons = newData.lessons;

    const { error: err } = await supabase
        .from("sessions")
        .update({ json_data: whole_data })
        .eq('uid', user_let.id);

    if (!err) {
        name_input.value = "";
        check_add();
        getID("add_data_p").style.display = "block";
        getID("add_data_p").innerHTML = "Leçon(s) ajoutée(s)";
        see_profile();
        check_import();
    }
}


getID("create_session_input").addEventListener("input", check_create);
getID("create_session_button").disabled = true;

function check_create() {
    const button = getID("create_session_button");
    const message = getID("create_session_p");
    const input = getID("create_session_input");
    const regex = /[<>"'\\]/;

    if (input.value === "") {
        button.disabled = true;
        return;  
    }
        

    if (regex.test(input.value)) {
        button.disabled = true;
        message.style.display = "block";
        message.innerHTML = "Il y a des caractères interdits";
        return;
    }

    if (input.value.length < 3) {
        button.disabled = true;
        message.style.display = "block";
        message.innerHTML = "3 caractères minimum";
        return;
    }

    if (whole_data.length >= 35) {
        button.disabled = true;
        message.style.dispay = "block";
        message.innerHTML = "Il y a déjà trop de packs de leçons";
        return;
    }

    let test = false;
    whole_data.forEach((e) => {
        if (e.name === input.value) {
            test = true;
        }
    })
    if (test) {
        button.disabled = true;
        message.style.display = "block";
        message.innerHTML = "Il y a déjà un pack du même nom";
        return;
    }

    button.disabled = false;
    message.style.display = "none";
    message.innerHTML = "";
}


getID("create_session_button").addEventListener("click", create_session);

async function create_session() {
    whole_data.push({
        "name": getID("create_session_input").value,
        "lessons": []
    });

    const { error: err } = await supabase
        .from("sessions")
        .update({ json_data: whole_data })
        .eq('uid', user_let.id);

    if (!err) {
        getID("create_session_input").value = "";
        check_create();
        getID("create_session_p").style.display = "block";
        getID("create_session_p").innerHTML = "Pack ajouté";
        see_profile();
    }
}


getID("choosing_create").addEventListener("click", () => {
    choose_account("create");
});
getID("choosing_add").addEventListener("click", () => {
    choose_account("add");
});
getID("choosing_import").addEventListener("click", () => {
    choose_account("import");
});

function choose_account(element) {
    let create_button = getID("choosing_create");
    let add_button = getID("choosing_add");
    let import_button = getID("choosing_import");
    let create = getID("create_session_div");
    let add = getID("add_data_div");
    let import_div = getID("import_data_div");

    if (element === "create") {
        create_button.style.textDecoration = "underline";
        add_button.style.textDecoration = "none";
        import_button.style.textDecoration = "none";
        create.style.display = "flex";
        add.style.display = "none";
        import_div.style.display = "none";
    }
    if (element === "add") {
        create_button.style.textDecoration = "none";
        add_button.style.textDecoration = "underline";
        import_button.style.textDecoration = "none";
        create.style.display = "none";
        add.style.display = "flex";
        import_div.style.display = "none";
    }
    if (element === "import") {
        create_button.style.textDecoration = "none";
        add_button.style.textDecoration = "none";
        import_button.style.textDecoration = "underline";
        create.style.display = "none";
        add.style.display = "none";
        import_div.style.display = "flex";
    }
}


getID("see_account_small").addEventListener("click", () => {
    account_small()
});

getID("close_account_small").addEventListener("click", () => {
    account_small()
});

function account_small() {
    if (toggle_account_small === true) {
        toggle_account_small = false;
        getID("account_small").style.opacity = 1;
        getID("account_small").style.display = "flex";
        getID("parameter_cover").style.display = "block";
        getID("parameter_cover").onclick = () => {account_small()};
    } else {
        toggle_account_small = true;
        getID("account_small").style.opacity = 0;
        setTimeout(() => {
            console.log("here");
            getID("account_small").style.display = "none";
        }, 300);
        getID("parameter_cover").style.display = "none";
        getID("parameter_cover").onclick = () => {parameter()};
    }
}

getID("import_3_button").addEventListener("click", () => {
    import_div()
});

getID("close_import").addEventListener("click", () => {
    import_div()
});

function import_div() {
    if (toggle_import_3 === true) {
        toggle_import_3 = false;
        getID("see_3_connected").style.opacity = 1;
        getID("see_3_connected").style.display = "flex";
        getID("parameter_cover").style.display = "block";
        getID("parameter_cover").onclick = () => {import_div()};
    } else {
        toggle_import_3 = true;
        getID("see_3_connected").style.opacity = 0;
        setTimeout(() => {
            getID("see_3_connected").style.display = "none";
        }, 300);
        getID("parameter_cover").style.display = "none";
        getID("parameter_cover").onclick = () => {parameter()};
    }
}
