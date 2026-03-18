console.log("Here we go !");

import { createClient } from "https://esm.sh/@supabase/supabase-js@2?bundle";

const supabaseUrl = 'https://bwjdnnnbcctgnegixujz.supabase.co';
const supabaseAnonKey = 'sb_publishable_TIz-tI0AQgFr5Xa2EgpCjg_50ZlIKre';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const signin_message = getID("signin_message");
const signup_message = getID("signup_message");

let user_let;
let opened_sessions = new Set();
let whole_data = null; 


getID("see_defs_3").addEventListener("click", see_3_unconnected);
async function see_3_unconnected() {
    const { data, error } = await supabase
        .from('public_data')
        .select('json_data') 
        .eq('id', 1);

   if (error) console.log(error);
    

   getID("see_defs_3").style.display = "none";
   getID("see_3").querySelector("p").style.display = "none";
   getID("see_3").querySelector("h2").innerText = "Defs de 3ème";

   const new_data = data[0].json_data; 

    let data_div = document.createElement("div");
    data_div.className = "see_data_div_3";
    getID("see_3").appendChild(data_div);

    for (let i = 0; i < new_data.length; i++) {
        const session = new_data[i];
        let session_div = document.createElement("div");
        session_div.className = "session_div";
        session_div.style.border = "solid 2px " + localStorage.getItem("text_color");
        session_div.innerHTML = "<h3>" + session.name + "</h3>";
        data_div.appendChild(session_div);

        for (let j = 0; j < session.lessons.length; j++) {
            const lesson = session.lessons[j];
            if (lesson.name === "text_color") {
                continue;
            }
            let lesson_div = document.createElement("div");
            lesson_div.className = "lesson_div";
            lesson_div.style.border = "solid 1px " + localStorage.getItem("text_color");
            lesson_div.innerHTML = "<h4>" + lesson.name + "</h4>";
            session_div.appendChild(lesson_div);

            let ul = document.createElement("ul");
            lesson_div.appendChild(ul);

            if (!lesson.items || !lesson.items.length) {
                let p = document.createElement("p");
                p.innerText = "La leçon est vide";
                lesson_div.appendChild(p);
                continue;
            }

            let items = lesson.items;
        

            for (let k = 0; k < items.length; k++) {
                const item = items[k];
                let new_li = document.createElement("li");
                if (item.kind === "egal") new_li.innerHTML = item.title + " = " + item.def;
                else {
                    new_li.innerHTML = "<div class='titles'>" + item.title + "</div> : " + item.def;
                }


                ul.appendChild(new_li);
            }
        }


        if (session.lessons.length >= 1) {
            let unsee = document.createElement("button");
            unsee.innerText = ">";
            unsee.style.color = localStorage.getItem("text_color");
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
}


getID("see_defs_3_connected").addEventListener("click", see_3_connected);
async function see_3_connected() {
    const { data, error } = await supabase
        .from('public_data')
        .select('json_data') 
        .eq('id', 1);

   if (error) console.log(error);



   let correct_data = data[0].json_data;
    correct_data.forEach((i) => {
        let test = false;
        whole_data.forEach((e) => {
            if (e.name === i.name) {
                test = true;
            }
        });
        if (!test) {
            whole_data.push(i);
        }
    });
    const { error: err } = await supabase
    .from("sessions")
    .update({ json_data: whole_data })
    .eq('uid', user_let.id);
    see_profile();
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

    if (password_input.value.length < 7) {
        signin_message.innerHTML = "Mot de passe trop court <br>(minimum 7 caractères)";
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
        if (error.code === "invalid_credentials") {
            signin_message.innerText = "Identifiants invalides";
        }
    } else {
        mail_input.value = "";
        password_input.value = "";
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

    update();

    if (error) {
        console.log(error.name);
        console.log(error.code);
        if (error.code === "email_address_invalid") {
            signup_message.innerHTML = "Addresse mail invalide";
        }
    } else {
        signup_message.innerHTML = "Un mail a été envoyé <br> à l'addresse mail <br> renseignée";
        mail_input.value = "";
        password_input.value = "";
    }

}


getID("delete_account").addEventListener("click", () => {
    alert("Pour supprimer votre compte, contactez le créateur du site (Alban).");
})


document.getElementById("signout").addEventListener("click", signOut);
async function signOut() {
    const { error } = await supabase.auth.signOut();
    update();
}


/*
 --------------------
|                    |
|     SEE PROFILE    |
|                    |
 --------------------
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
    see_div.innerHTML = "<h2>Sessions</h2>";

    if (!whole_data.length) {
        see_div.innerHTML += "<p>Il n'y a pas de sessions dans le compte</p>";
        return;
    }

    for (let i = 0; i < whole_data.length; i++) {
        const session = whole_data[i];
        let session_div = document.createElement("div");
        session_div.className = "session_div";
        session_div.style.border = "solid 2px " + localStorage.getItem("text_color");
        session_div.innerHTML = "<h3>" + session.name + "</h3>";
        see_div.appendChild(session_div);
        session_div.dataset.session = session.name;

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
            session_div.innerHTML += "<p>Cette session est vide</p>";
            let delete_session = document.createElement("button");
            delete_session.innerText = "X";
            delete_session.style.color = localStorage.getItem("text_color");
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
            lesson_div.style.border = "solid 1px " + localStorage.getItem("text_color");
            lesson_div.innerHTML = "<h4>" + lesson.name + "</h4>";
            session_div.appendChild(lesson_div);
            lesson_div.dataset.session = session.name;
            lesson_div.dataset.lesson = lesson.name;

            let delete_lesson = document.createElement("button");
            delete_lesson.innerText = "X";
            delete_lesson.style.color = localStorage.getItem("text_color");
            delete_lesson.className = "delete_lesson";
            lesson_div.appendChild(delete_lesson);

            let ul = document.createElement("ul");
            lesson_div.appendChild(ul);

            if (!lesson.items || !lesson.items.length) {
                let p = document.createElement("p");
                p.innerText = "La leçon est vide";
                lesson_div.appendChild(p);
                continue;
            }

            let items = lesson.items;
           

            for (let k = 0; k < items.length; k++) {
                const item = items[k];
                let new_li = document.createElement("li");
                if (item.kind === "egal") new_li.innerHTML = item.title + " = " + item.def;
                else {
                    new_li.innerHTML = "<div class='titles'>" + item.title + "</div> : " + item.def;
                }

                new_li.dataset.session = session.name;
                new_li.dataset.lesson = lesson.name;
                new_li.dataset.title = item.title;
                new_li.dataset.content = item.def;
                new_li.dataset.kind = item.kind;

                let delete_def = document.createElement("button");
                delete_def.innerText = "X";
                delete_def.style.color = localStorage.getItem("text_color");
                delete_def.className = "delete_def";
                delete_def.addEventListener("click", () => delete_object("def", new_li));
                new_li.appendChild(delete_def);

                ul.appendChild(new_li);
            }

            delete_lesson.addEventListener("click", () => delete_object("lesson", lesson_div));
        }

        let delete_session = document.createElement("button");
        delete_session.innerText = "X";
        delete_session.style.color = localStorage.getItem("text_color");
        delete_session.className = "delete_session";
        session_div.appendChild(delete_session);
        delete_session.addEventListener("click", e => { e.stopPropagation(); delete_object("session", session_div); });

        if (session.lessons.length >= 1) {
            let unsee = document.createElement("button");
            unsee.innerText = ">";
            unsee.style.color = localStorage.getItem("text_color");
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
}


const import_data_input = getID("import_data_input");
import_data_input.addEventListener("input", check_import);

function check_import() {

    const button = getID("import_data_button");
    const message = getID("import_data_p");

    if (import_data_input.value === "") {
        return;
    }

    if (!whole_data || whole_data.length === 0) {
        message.style.display = "block";
        message.innerText = "Il n'y a pas de session à importer";
        button.disabled = true;
        return;
    }

    const session = whole_data.find(s => s.name === import_data_input.value);

    if (!session) {
        message.style.display = "block";
        message.innerText = "Il n'y a aucune session de ce nom";
        button.disabled = true;
        return;
    }

    let empty = true;

    for (let lesson of session.lessons) {

        if (lesson.items && lesson.items.length > 0) {
            empty = false;
            break;
        }

    }

    if (empty) {
        message.style.display = "block";
        message.innerHTML = "Cette session est vide";
        button.disabled = true;
        return;
    }

    message.innerHTML = "";
    message.style.display = "none";
    button.disabled = false;
}


getID("import_data_button").addEventListener("click", import_data);
getID("import_data_button").disabled = true;

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
            console.log("there")
            if (typeof lesson.items !== "string") {
                localStorage.setItem(lesson.name, JSON.stringify(lesson.items));
            } else {
                localStorage.setItem(lesson.name, lesson.items);
            }
        }   
    }

    import_data_input.value = "";
    check_add();
    check_create();
    check_import();
    setTimeout(() => {
        getID("import_data_p").innerHTML = "Session importée";
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

    getID("add_data_input").value = "";
    getID("import_data_input").value = "";
    getID("import_data_p").innerHTML = "";
    getID("add_data_p").innerHTML = "";
    getID("add_data_button").disabled = true;
    getID("import_data_button").disabled = true;
}


getID("add_data_button").disabled = true;
const name_input = getID("add_data_input");
name_input.addEventListener("input", check_add);

function check_add() {
    const button = getID("add_data_button");
    const message = getID("add_data_p");

    if (name_input.value === "") {
        return;
    }

    if (!whole_data || whole_data.length === 0) {
        message.style.display = "block";
        message.innerText = "Il n'y a pas de session à importer";
        button.disabled = true;
        return;
    }

    const session = whole_data.find(s => s.name === name_input.value);

    if (!session) {
        message.style.display = "block";
        message.innerText = "Il n'y a aucune session de ce nom";
        button.disabled = true;
        return;
    }

    message.innerHTML = "";
    message.style.display = "none";
    button.disabled = false;
}


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
        if (key.startsWith("sb-") || key === "color" || key.startsWith("text_color")) continue;
    
        let items = localStorage.getItem(key);
        try {
            items = JSON.parse(items);
        } catch (e) {
            console.log(e);
        }
    
        newStuff.push({
            name: key,
            items: items
        });
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

    whole_data.filter(s => s.name === name_input.value).lessons = newData;

    const { error: err } = await supabase
        .from("sessions")
        .update({ json_data: whole_data })
        .eq('uid', user_let.id);

    if (!err) {
        name_input.value = "";
        check_add();
        getID("add_data_p").style.display = "block";
        getID("add_data_p").innerHTML = "Leçons ajoutées";
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

    let test = false;
    whole_data.forEach((e) => {
        if (e.name === input.value) {
            test = true;
        }
    })
    if (test) {
        button.disabled = true;
        message.style.display = "block";
        message.innerHTML = "Il y a déjà une session du même nom";
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
        getID("create_session_p").innerHTML = "Session ajoutée";
        see_profile();
    }
}