console.log("Here we go !");

import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabaseUrl = 'https://bwjdnnnbcctgnegixujz.supabase.co';
const supabaseAnonKey = 'sb_publishable_TIz-tI0AQgFr5Xa2EgpCjg_50ZlIKre';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const signin_message = getID("signin_message");
const signup_message = getID("signup_message");

let user_let;

let opened_sessions = new Set();

let whole_data = null;
async function update() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      user_let = user;
      document.querySelector("#connection").innerText = "connected";
      getID("sign_div").style.display = "none";
      getID("account_div").style.display = "block";
      see_profile();
      const { data, error } = await supabase
        .from('sessions')
        .select('data').eq('uid', user_let.id);
        if (error) {
            console.log(error.code);
        }
        if (data[0] === undefined) {
            const { data, error } = await supabase
            .from('sessions')
            .insert([
            {
                uid: user_let.id,
                data: "",   
            }
            ]);

            if (error) {
                console.error("Erreur :", error);
            } else {
                console.log("Ligne insérée :", data);
            }
        }
    } else {
      document.querySelector("#connection").innerText = "not connected";
      getID("sign_div").style.display = "block";
      getID("account_div").style.display = "none";
    }
}

update();

function getID(id) {
    return document.getElementById(id);
}

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
        return;
    } 
    if (!validateEmail(mail_input.value)) {
        signin_message.innerHTML = "Email invalide"
        getID("signin_button").disabled = true;
        return;
    }
    if (mail_input.value.length > 30) {
        signin_message.innerHTML = "Email trop long <br>(maximum 30 caractères)";
        getID("signin_button").disabled = true;
        return;
    }
    if (password_input.value.length > 30) {
        signin_message.innerHTML = "Mot de passe trop long <br>(maximum 30 caractères)";
        getID("signin_button").disabled = true;
        return;
    }
    if (password_input.value.length < 7) {
        signin_message.innerHTML = "Mot de passe trop court <br>(minimum 7 caractères)";
        getID("signin_button").disabled = true;
        return;
    }
    signin_message.innerHTML = "";
    getID("signin_button").disabled = false;
}

getID("signin_button").addEventListener("click", sign_in);
async function sign_in() {
    let mail_input = getID("signin_email");
    let password_input = getID("signin_password");

    const { data, error } = await supabase.auth.signInWithPassword({

        email: mail_input.value,
    
        password: password_input.value,
    
    })

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
        return;
    } 
    if (!validateEmail(mail_input.value)) {
        signup_message.innerHTML = "Email invalide"
        getID("signup_button").disabled = true;
        return;
    }
    if (mail_input.value.length > 30) {
        signup_message.innerHTML = "Email trop long <br>(maximum 30 caractères)";
        getID("signup_button").disabled = true;
        return;
    }
    if (password_input.value.length > 30) {
        signup_message.innerHTML = "Mot de passe trop long <br>(maximum 30 caractères)";
        getID("signup_button").disabled = true;
        return;
    }
    if (password_input.value.length < 7) {
        signup_message.innerHTML = "Mot de passe trop court <br>(minimum 7 caractères)";
        getID("signup_button").disabled = true;
        return;
    }
    signup_message.innerHTML = "";
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


document.getElementById("signout").addEventListener("click", signOut);
async function signOut() {
    const { error } = await supabase.auth.signOut();
    update();
}


async function see_profile() {
    const mail_address = getID("mail_address");
    

    mail_address.innerHTML = "<span class='titles'>Email:</span> " + user_let.email;


    let test_token = true;
    for (let i = 0; i < localStorage.length; i++) { 
        if (localStorage.key(i).startsWith("color")) {
           continue;
        }
        if (localStorage.key(i).startsWith("text_color")) {
            continue;
        }
        if (localStorage.key(i).startsWith("sb-")) {;
            continue;
        }
        test_token = false;
    }
    if (test_token) {
        getID("add_data_input").style.display = "none";
        getID("add_data_p").innerHTML = "Il n'y a aucun pack <br>actuellement chargé.";
        getID("add_data_button").style.display = "none";
    }


    const { data, error } = await supabase
        .from('sessions')
        .select('data')
        .eq('uid', user_let.id);

    if (error) {
        console.log(error.code);
    }


    whole_data = data[0].data;
    const see_div = getID("see_data_div");
    if (whole_data === null) {
        see_div.innerHTML = "<h2>Sessions</h2><p>Il n'y a pas de sessions dans le compte</p>";
    } else {
        see_div.innerHTML = "<h2>Sessions</h2>";
        let sessions = whole_data.split("*");
        for (let i = 0; i < sessions.length; i++) {
            let session_div = document.createElement("div");
            session_div.className = "session_div";
            session_div.style.border = "solid 1px " + localStorage.getItem("text_color");
            session_div.innerHTML = "<h3>" + sessions[i].split("@")[0] + "</h3>";
            see_div.appendChild(session_div);

            let delete_session = document.createElement("button");
            delete_session.innerText =  "X";
            delete_session.style.color = localStorage.getItem("text_color");
            delete_session.className = "delete_session";
            session_div.appendChild(delete_session);

            session_div.addEventListener("click", () => {getID("import_data_input").value = sessions[i].split("@")[0]; check_import()});

            session_div.dataset.session = sessions[i].split("@")[0];

            if (sessions[i].split("@")[1].split("#").length < 3) {
                session_div.innerHTML += "<p>Cette session est vide</p>";
            } else {
                for (let j = 0; j < sessions[i].split("@")[1].split("#").length; j++) {
                    let lesson_name = sessions[i].split("@")[1].split("#")[j].split("?")[0];
                    if (lesson_name === "text_color" || lesson_name === "color") {
                        continue;
                    } else {
                        lesson_name = lesson_name.split(";")[0];
                    }
                    let lesson_div = document.createElement("div");
                    lesson_div.className = "lesson_div";
                    lesson_div.style.border = "solid 1px " + localStorage.getItem("text_color");
                    lesson_div.innerHTML = "<h4>" + lesson_name + "</h4>";
                    session_div.appendChild(lesson_div);  

                    lesson_div.dataset.session = sessions[i].split("@")[0];
                    lesson_div.dataset.lesson = lesson_name;

                    let delete_lesson = document.createElement("button");
                    delete_lesson.innerText =  "X";
                    delete_lesson.style.color = localStorage.getItem("text_color");
                    delete_lesson.className = "delete_lesson";
                    lesson_div.appendChild(delete_lesson);

                    let ul = document.createElement("ul");
                    lesson_div.appendChild(ul);

                    if (JSON.parse(sessions[i].split("@")[1].split("#")[j].split("?")[1]).length === 0) {
                        let p = document.createElement("p");
                        p.innerText = "La leçon est vide";
                        lesson_div.appendChild(p);
                    } else {       
                        for (let k = 0; k < JSON.parse(sessions[i].split("@")[1].split("#")[j].split("?")[1]).length; k++) {   
                            let thing = JSON.parse(sessions[i].split("@")[1].split("#")[j].split("?")[1])[k];    
                            let title = thing.title;
                            let def = thing.def;
                            let new_li = document.createElement("li");
                            if (sessions[i].split("@")[1].split("#")[j].split("?")[0].split(";")[1] === "egal") {
                                new_li.innerHTML = title + " = " + def;
                            } else {
                                new_li.innerHTML = "<div class='titles'>" + title + "</div> : " + def;
                            }

                            new_li.dataset.session = sessions[i].split("@")[0];
                            new_li.dataset.lesson = lesson_name;
                            new_li.dataset.title = title;
                            new_li.dataset.def = def;

                            let delete_def = document.createElement("button");
                            delete_def.innerText =  "X";
                            delete_def.style.color = localStorage.getItem("text_color");
                            delete_def.className = "delete_def";
                            delete_def.addEventListener("click", () => {delete_object("def", new_li)});
                            new_li.appendChild(delete_def);

                            ul.appendChild(new_li);
                        }
                    }
                    delete_lesson.addEventListener("click", () => {delete_object("lesson", lesson_div)});
                }

                delete_session.addEventListener("click", () => {delete_object("session", session_div)});
            }
            
            if (sessions[i].split("@")[1].split("#").length < 3) {
                continue;
            } else {
                let unsee = document.createElement("button");
                unsee.innerText = ">";
                unsee.style.color = localStorage.getItem("text_color");
                unsee.className = "unsee";
                let to_hide = session_div.querySelectorAll(".lesson_div");
                unsee.addEventListener("click", () => {
                    if (to_hide[0] === undefined) {
                        return;
                    }
                    const name = sessions[i].split("@")[0];
                    if (to_hide[0].style.display === "none") {
                        to_hide.forEach((e) => {e.style.display = "block"});
                        unsee.innerText = "v";
                        opened_sessions.add(name);
                    } else {
                        to_hide.forEach((e) => {e.style.display = "none"});
                        unsee.innerText = ">";
                        opened_sessions.delete(name);
                    }
                });
                const name = sessions[i].split("@")[0];

                if (opened_sessions.has(name)) {
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
}


async function delete_object(object_class, object) {
    let sessions = whole_data.split("*").filter(Boolean);

    if (object_class === "session") {
        sessions = sessions.filter(s => !s.startsWith(object.dataset.session + "@"));
    } else {
        for (let i = 0; i < sessions.length; i++) {
            if (!sessions[i].startsWith(object.dataset.session + "@")) continue;

            let [sessionName, rest] = sessions[i].split("@");
            let lessons = rest.split("#");

            if (object_class === "lesson") {
                lessons = lessons.filter(l => {
                    let lessonName = l.split("?")[0].split(";")[0];
                    return lessonName !== object.dataset.lesson;
                });
            } else if (object_class === "def") {
                for (let j = 0; j < lessons.length; j++) {
                    let [lessonRaw, json] = lessons[j].split("?");
                    let lessonName = lessonRaw.split(";")[0];
                    if (lessonName !== object.dataset.lesson) continue;

                    let defs = JSON.parse(json || "[]");
                    defs = defs.filter(d => !(d.title === object.dataset.title && d.def === object.dataset.def));
                    lessons[j] = lessonRaw + "?" + JSON.stringify(defs);
                }
            }

            sessions[i] = sessionName + "@" + lessons.join("#");
        }
    }

    whole_data = sessions.join("*");

    const { error } = await supabase
        .from('sessions')
        .update({ data: whole_data })
        .eq('uid', user_let.id);

    if (!error) see_profile();
}




getID("delete_account").addEventListener("click", delete_account);
function delete_account() {
    alert("Pour supprimer votre compte, contactez le créateur du site (Alban)");
}

getID("add_data_button").disabled = true;
const name_input = getID("add_data_input");
name_input.addEventListener("input", () => {
    const message = getID("add_data_p");
    const button = getID("add_data_button");
    const regex = /[*@\[\]{}"',;?]/;
    if (name_input.value.length < 3) {
        message.style.display = "block";
        message.innerHTML = "Le nom est trop court<br>(minimum 3 caractères)";
        button.disabled = true;
        return;
    }
    if (name_input.value.length > 30) {
        message.style.display = "block";
        message.innerHTML = "Le nom est trop long<br>(maximum 30 caractères)";
        button.disabled = true;
        return;
    }
    if (regex.test(name_input.value) === true) {
        message.style.display = "block";
        message.innerHTML = "Le nom contient des <br>caractères spéciaux";
        button.disabled = true;
        return;
    }
    message.innerHTML = "";
    message.style.display = "none";
    button.disabled = false;
});

getID("add_data_button").addEventListener("click", exporting_data);
async function exporting_data() {
    if (name_input.value === "") {
        return;
    }
    let total = "";
    
    const { data, error } = await supabase
        .from('sessions')
        .select('data')
        .eq('uid', user_let.id);

    if (error) {
        console.log(error.code);
        return;
    }

    let existingData = data[0].data;

    if (existingData === null) {
        existingData = "";
        total += name_input.value + "@";
    } else {
        let all = existingData.split("*");
        const duplicate = all.some(e => e.split("@")[0] === name_input.value);

        if (duplicate) {
            getID("add_data_p").innerHTML = "Il y a déjà une session <br>du même nom";
            return; 
        }

        total += "*" + name_input.value + "@";
    }

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith("sb-")) continue;
        if (i != 0) total += "#";
        total += localStorage.key(i) + "?" + localStorage.getItem(localStorage.key(i));
    }

    let total_total = existingData + total;

    const { data: data_see, error: error_see } = await supabase
        .from('sessions')
        .update({ data: total_total })
        .eq('uid', user_let.id);

    if (error_see) {
        console.log(error_see.code);
    } else {
        getID("add_data_p").innerHTML = "Session enregistrée";
        name_input.value = "";
        whole_data = total_total;
        see_profile();
    }
}


const import_data_input = getID("import_data_input");
import_data_input.addEventListener("input", check_import);

function check_import() {
    const button = getID("import_data_button");

    const message = getID("import_data_p");
    if (whole_data === null || whole_data === "") {
        message.style.display = "block";
        message.innerText = "Il n'y a pas de session à importer";
        button.disabled = true;
        return;
    }
    
    const sessions_name = [];
    for (let i = 0; i < whole_data.split("*").length; i++) {
        sessions_name.push(whole_data.split("*")[i].split("@")[0]);
    }

    if (!(sessions_name.includes(import_data_input.value))) {
        message.style.display = "block";
        message.innerText = "Il n'y a aucune session de ce nom";
        button.disabled = true;
        return;
    }


    let test = true;
    for (let i = 0; i < whole_data.split("*").length; i++) {
        if (!(whole_data.split("*")[i].split("@")[0] === import_data_input.value)) {continue};
        for (let j = 0; j < whole_data.split("*")[i].split("@")[1].split("#").length; j++) {
            if (!(whole_data.split("*")[i].split("@")[1].split("#")[j].startsWith("color") || whole_data.split("*")[i].split("@")[1].split("#")[j].startsWith("text_color"))) {
                test = false;
            }
        }
    }
    if (test) {
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

function import_data() {

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).split(";")[0] === "color") {
         } else if (localStorage.key(i).split(";")[0] === "text_color") { 
         } else if (localStorage.key(i).split(";")[0].startsWith("sb-")) {
         } else {
            localStorage.removeItem(localStorage.key(i));
        }
    }

    const session_name = import_data_input.value;

    let total;

    for (let i = 0; i < whole_data.split("*").length; i++) {
        if (!whole_data.split("*")[i].split("@")[0] === session_name) {continue};

        total = whole_data.split("*")[i].split("@")[1];
    }


    let packs_hash = total.split("#"); 
        for (let i = 0; i < packs_hash.length; i++) { 
            let lesson_hash = packs_hash[i].split("?");
            let title_pack = lesson_hash[0];

            if (title_pack === "color") {
                let safe = "#" + lesson_hash[1];
                localStorage.setItem(title_pack, safe);
            } else {
                localStorage.setItem(title_pack, lesson_hash[1]);
            }
        } 
    console.log("Here");
    import_data_input.value = "";
    setTimeout(() => {
        getID("import_data_p").innerHTML = "Session importée";
        getID("import_data_p").style.display = "block";
    }, 50);   
}