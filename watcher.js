console.log("No more ideas (watcher)");


import { createClient } from "https://esm.sh/@supabase/supabase-js@2?bundle";

const supabaseUrl = 'https://bwjdnnnbcctgnegixujz.supabase.co';
const supabaseAnonKey = 'sb_publishable_TIz-tI0AQgFr5Xa2EgpCjg_50ZlIKre';

const supabase = createClient(supabaseUrl, supabaseAnonKey);


/* ------- ACHIEVEMENTS STORAGE-------- */
const ACHIEVEMENTS = {
    candidat: {
        name: "Candidat",
        description: "Participer au classement",
        emoji: "🗳️"
    },
    curieux: {
        name: "Curieux",
        description: "Ouvrir la page des succès",
        emoji: "👀"
    },
    premier_pas: {
        name: "Premier pas",
        description: "Créer une leçon",
        emoji: "🐣"
    },
    eleve_applique: {
        name: "Élève appliqué",
        description: "Créer 10 leçons",
        emoji: "📚"
    },
    bientot_professeur: {
        name: "Bientôt professeur",
        description: "Créer 50 leçons",
        emoji: "🧑‍🏫"
    },
    premiere_def: {
        name: "Première définition",
        description: "Ajouter une définition",
        emoji: "🪶"
    },
    prise_en_main: {
        name: "Prise en main",
        description: "Ajouter 10 fois",
        emoji: "🧩"
    },
    collection_naissante: {
        name: "Collection naissante",
        description: "Ajouter 50 fois",
        emoji: "📦"
    },
    bibliotheque_locale: {
        name: "Bibliothèque locale",
        description: "Ajouter 100 fois",
        emoji: "📑"
    },
    archive_professionelle: {
        name: "Archive professionelle",
        description: "Ajouter 250 fois",
        emoji: "🗄️"
    },
    maitre_des_defs: {
        name: "Maître des définitions",
        description: "Ajouter 500 fois",
        emoji: "🧿"
    },
    debut_revision: {
        name: "Première révision",
        description: "Terminer une leçon",
        emoji: "✏️"
    },
    quinze_sur_vingt: {
        name: "15/20 garantit",
        description: "Terminer 10 leçons",
        emoji: "📝"
    },
    vingt_et_un_sur_vingt: {
        name: "21/20 garantit",
        description: "Terminer 50 leçons",
        emoji: "🚀"
    },
    monstre_revisions: {
        name: "Monstre des révisions",
        description: "Terminer 100 leçons",
        emoji: "🧠"
    },
    a1: {
        name: "Niveau A1",
        description: "Terminer une leçon de verbes",
        emoji: "📕"
    },
    a2: {
        name: "Niveau A2",
        description: "Terminer 10 leçons de verbes",
        emoji: "📗"
    },
    b1: {
        name: "Niveau B1",
        description: "Terminer 25 leçons de verbes",
        emoji: "📘"
    },
    b2: {
        name: "Niveau B2",
        description: "Terminer 50 leçons de verbes",
        emoji: "📙"
    },
    c1: {
        name: "Niveau C1",
        description: "Terminer 100 leçons de verbes",
        emoji: "📄"
    },
    bilingue: {
        name: "Bilingue",
        description: "Terminer 250 leçons de verbes",
        emoji: "🌍"
    },
    etincelle: {
        name: "Étincelle",
        description: "Démarrer une série",
        emoji: "✨"
    },
    briquet: {
        name: "Briquet",
        description: "Atteindre 7 jours de série",
        emoji: "🔥"
    },
    feu_de_camp: {
        name: "Feu de camp",
        description: "Atteindre 25 jours de série",
        emoji: "🏕️"
    },
    incendie: {
        name: "Incendie",
        description: "Atteindre 50 jours de série",
        emoji: "🌋"
    },
    brasier: {
        name: "Brasier",
        description: "Atteindre 75 jours de série",
        emoji: "🎇"
    },
    soleil: {
        name: "soleil",
        description: "Atteindre 100 jours de série",
        emoji: "☀️"
    },
    sans_faute: {
        name: "Sans faute",
        description: "Avoir 100% à une leçon d'au moins 10 questions",
        emoji: "💯"
    },
    tireur_elite: {
        name: "Tireur d'élite",
        description: "Faire 10 bonnes réponses d'affilée",
        emoji: "🎯"
    },
    tireur_dans_le_pied: {
        name: "Tireur dans le pied",
        description: "Faire 10 mauvaises réponses d'affilée",
        emoji: "🦶"
    },
    score_moyen: {
        name: "Score moyen",
        description: "Obtenir 50% à une leçon",
        emoji: "⚖️"
    },
    speedrunner: {
        name: "Speedrunner",
        description: "Finir une leçon d'au moins 5 questions en moins de 10 secondes",
        emoji: "⚡"
    },
    premiers_points: {
        name: "Premiers points",
        description: "Gagner ses premiers points",
        emoji: "🪙"
    },
    bon_debut: {
        name: "Bon début",
        description: "Gagner 100 points",
        emoji: "📈"
    },
    collectionneur_savoir: {
        name: "Collectionneur de savoir",
        description: "Gagner 250 points",
        emoji: "📖"
    },
    en_route: {
        name: "En route",
        description: "Gagner 500 points",
        emoji: "🛣️"
    },
    inarretable: {
        name: "Inarrêtable",
        description: "Gagner 1000 points",
        emoji: "🚄"
    },
    cresus: {
        name: "Crésus",
        description: "Gagner 5000 points",
        emoji: "💰"
    },
    picsou: {
        name: "Picsou",
        description: "Gagner 10000 points",
        emoji: "🦆"
    },
    champion: {
        name: "Champion",
        description: "Atteindre le podium du classement",
        emoji: "🏅"
    },
    legende: {
        name: "Légende",
        description: "Atteindre la première place du classement",
        emoji: "👑"
    },
    insomniaque: {
        name: "Insomniaque",
        description: "Faire une leçon entre 23 heures et 4 heures",
        emoji: "🌙"
    },
    leve_tot: {
        name: "Lève-tôt",
        description: "Faire une leçon entre 5 et 7 heures",
        emoji: "🌅"
    },
    coeur_brise: {
        name: "Cœur brisé",
        description: "Perdre sa série",
        emoji: "💔"
    },
    sauvetage_in_extremis: {
        name: "Sauvetage in-extremis",
        description: "Utiliser un gel",
        emoji: "🧊"
    },
    toi_je_taime_bien: {
        name: "Toi je t'aime bien",
        description: "Avoir son compte béni par le dev",
        emoji: "😎"
    },
    amateur: {
        name: "Amateur",
        description: "Débloquer 5 succès",
        emoji: "📘"
    },
    collectionneur: {
        name: "Collectionneur",
        description: "Débloquer 10 succès",
        emoji: "🗃️"
    },
    completioniste: {
        name: "Complétioniste",
        description: "Obtenir tous(...?) les succès",
        emoji: "🏆"
    },
    the_end: {
        name: "La Fin",
        description: "Bien joué. C'était sympa, hein ?",
        emoji: "🏁"
    }
};

let user_let;
let user_data = null;
let lessons_created_local = null;

const notification = new Audio("notification.mp3");
let sonor_effects = document.getElementById("toggle_sound") ? document.getElementById("toggle_sound").checked : null;

function playSound(name) {
    if (!name) return;
    name.currentTime = 0; 
    name.play();
}

["pointerdown", "keydown", "touchstart"].forEach(eventType => {

    document.addEventListener(eventType, unlockAudio, {
        once: true
    });

});

function unlockAudio() {

    const audio = new Audio("notification.mp3");

    audio.volume = 0;

    audio.play();

    console.log("Audio unlocked");
}


let renderer = document.createElement("div");
renderer.id = "renderer"
document.querySelector("body").appendChild(renderer);


const { data: { user } } = await supabase.auth.getUser()
if (user) {
    user_let = user;

    const { data, error } = await supabase
    .from('leaderboard_data')
    .select('*') 
    .eq('user_id', user_let.id);

    if (error) console.log(error.code);

    if (!(data.length === 0)) {
        if (data[0].is_participating === true) {
            user_data = structuredClone(data[0]);

            if (!window.location.pathname.endsWith("secret.html")) {
                lessons_created_local = user_data.Informations.lessons_created;

                update_streak_state();
            }    

            if (Object.keys(user_data.Informations.all_achievements).length >= 5) {
                if ( await give_achievement("amateur", ACHIEVEMENTS.amateur)) {
                    await update_supabase();
                }
            }
            if (Object.keys(user_data.Informations.all_achievements).length >= 10) {
                if ( await give_achievement("collectionneur", ACHIEVEMENTS.collectionneur)) {
                    await update_supabase();
                }
            }
            if (Object.keys(user_data.Informations.all_achievements).length === 48) {
                if ( await give_achievement("completioniste", ACHIEVEMENTS.completioniste)) {
                    await update_supabase();
                }
            }

            if (!window.location.pathname.endsWith("secret.html")) {

                display_achievements(user_data.Informations.all_achievements);

                document.addEventListener("lesson_end", (event) => {
                    lesson_ending(event.detail);
                });
            }
        } 
    }
}

async function lesson_ending(details) {

    console.log("===== WE GOT ACTIVATED =====");

    console.log("Informations AVANT :", structuredClone(user_data.Informations));

    user_data.Informations.points += details.points_number;

    console.log(user_data);

    if (user_data.Informations.points >= 10000) {
        await give_achievement("picsou", ACHIEVEMENTS.picsou);
    }
    if (user_data.Informations.points >= 5000) {
        await give_achievement("cresus", ACHIEVEMENTS.cresus);
    }
    if (user_data.Informations.points >= 1000) {
        await give_achievement("inarretable", ACHIEVEMENTS.inarretable);
    }
    if (user_data.Informations.points >= 500) {
        await give_achievement("en_route", ACHIEVEMENTS.en_route);
    } 
    if (user_data.Informations.points >= 250) {
        await give_achievement("collectionneur_savoir", ACHIEVEMENTS.collectionneur_savoir);
    } 
    if (user_data.Informations.points >= 100) {
        await give_achievement("bon_debut", ACHIEVEMENTS.bon_debut);
    } 
    if (user_data.Informations.points >= 10) {
        await give_achievement("premiers_points", ACHIEVEMENTS.premiers_points);
    } 

    user_data.Informations.lessons_done += 1;

    if (user_data.Informations.lessons_done >= 100) {
        await give_achievement("monstre_revisions", ACHIEVEMENTS.monstre_revisions);
    } else if (user_data.Informations.lessons_done >= 50) {
        await give_achievement("vingt_et_un_sur_vingt", ACHIEVEMENTS.vingt_et_un_sur_vingt);
    } else if (user_data.Informations.lessons_done >= 10) {
        await give_achievement("quinze_sur_vingt", ACHIEVEMENTS.quinze_sur_vingt);
    } else if (user_data.Informations.lessons_done >= 1) {
        await give_achievement("debut_revision", ACHIEVEMENTS.debut_revision);
    }  
 

    if (details.percentage === 50) {
        await give_achievement("score_moyen", ACHIEVEMENTS.score_moyen);
    }

    if (details.percentage === 100 && details.questions_length > 9) {
        await give_achievement("sans_faute", ACHIEVEMENTS.sans_faute);
    }

    if (details.time < 15 && details.questions_length > 4) {
        await give_achievement("speedrunner", ACHIEVEMENTS.speedrunner);
    }

    console.log("Points ajoutés :", details.points_number);
    console.log("Total points :", user_data.Informations.points);

    const info = structuredClone(user_data.Informations);

    const today = getTodayString();

    // --- INIT SAFE ---
    let streak = info.streak ?? 0;
    let skips = info.skips ?? 0;

    console.log("Streak initiale :", streak);
    console.log("Skips initiaux :", skips);

    let lastAction = info.last_action_date || null;

    let lastSkipReward = info.last_skip_reward || null;

    console.log("last_action_date DB :", info.last_action_date);
    console.log("lastAction parsed :", lastAction);

    console.log("last_skip_reward DB :", info.last_skip_reward);
    console.log("lastSkipReward parsed :", lastSkipReward);

    // --- WEEKLY SKIP ---
    if (lastSkipReward) {
        console.log("lastAction =", lastAction, typeof lastAction);
        console.log("today =", today, typeof today);
        const diffWeeks = Math.floor(
            (
                dayStringToNumber(today) -
                dayStringToNumber(lastSkipReward)
            ) / 7
        );

        console.log("Diff semaines :", diffWeeks);

        if (diffWeeks > 0) {

            console.log("Ajout de skips :", diffWeeks);

            skips += diffWeeks;
            lastSkipReward = today;

        } else {

            console.log("Pas de skip ajouté");
        }

    } else {

        console.log("Première initialisation des skips");

        lastSkipReward = today;
    }

    // --- FIRST ACTION EVER ---
    if (!lastAction) {

        console.log("Première action EVER");

        streak = 1;
        lastAction = today;

    } else {

        const diffDays =
            dayStringToNumber(today) -
            dayStringToNumber(lastAction);

        console.log("Diff jours :", diffDays);

        // même jour
        if (diffDays === 0) {

            console.log("Déjà fait aujourd’hui");

        }

        // jour suivant normal
        else if (diffDays === 1) {

            console.log("Jour suivant normal");

            streak += 1;

        } else {

            console.log("Plusieurs jours d’écart");

            const missed = diffDays - 1;

            console.log("Jours manqués :", missed);

            if (skips >= missed) {

                console.log("Skips consommés");

                skips -= missed;
                streak += 1;

               await give_achievement("sauvetage_in_extremis", ACHIEVEMENTS.sauvetage_in_extremis)

            } else {

                console.log("Pas assez de skips → reset");

                streak = 1;
                skips = 0;
                
                await give_achievement("coeur_brise", ACHIEVEMENTS.coeur_brise);
            }

            lastAction = today;
        }
    }

    console.log("Streak finale :", streak);
    console.log("Skips finaux :", skips);

    // --- SAVE ---
    user_data.Informations.streak = streak;
    user_data.Informations.skips = skips;
    user_data.Informations.last_action_date = today;
    user_data.Informations.last_skip_reward = lastSkipReward;

    console.log("OBJET FINAL ENVOYÉ :", structuredClone(user_data.Informations));

    const hour = new Date().getHours();

    if (hour >= 23 || hour < 4) {
        await give_achievement("insomniaque", ACHIEVEMENTS.insomniaque);
    }

    if (hour >= 5 && hour < 7) {
        await give_achievement("leve_tot", ACHIEVEMENTS.leve_tot);
    }

    if (streak >= 100) {
        await give_achievement("soleil", ACHIEVEMENTS.soleil);
    } else if (streak >= 75) {
        await give_achievement("brasier", ACHIEVEMENTS.brasier);
    } else if (streak >= 50) {
        await give_achievement("incendie", ACHIEVEMENTS.incendie);
    } else if (streak >= 25) {
        await give_achievement("feu_de_camp", ACHIEVEMENTS.feu_de_camp);
    } else if (streak >= 7) {
        await give_achievement("briquet", ACHIEVEMENTS.briquet);
    }


    await update_supabase();

    console.log("===== FIN =====");
}

function getTodayString() {
    const now = new Date();

    return `${now.getFullYear()}-${
        String(now.getMonth() + 1).padStart(2, "0")
    }-${
        String(now.getDate()).padStart(2, "0")
    }`;
}

function dayStringToNumber(dayString) {
    console.log(dayString, typeof dayString);

    const [year, month, day] = dayString.split("-").map(Number);

    return Math.floor(
        Date.UTC(year, month - 1, day) / 86400000
    );
}

/* ------- ACHIEVEMENTS DISPLAY LEADERBOARD -------- */

function display_achievements(data) {
    if (!window.location.pathname.endsWith("leaderboard.html")) {
        return;
    }
    console.log(data);
    if (Object.keys(data).length < 50) {
        document.getElementById("total_achievements_p").innerHTML = "<strong>" + Object.keys(data).length + "</strong> débloqués sur 49";
    } else {
        document.getElementById("total_achievements_p").innerHTML = "<strong>" + Object.keys(data).length + "</strong> débloqués sur 50";

    }

    let total = document.getElementById("total_achievements_div");
    for (const key in ACHIEVEMENTS) {
        if (!data[key]) continue;

        let achievement_div = document.createElement("div");
        achievement_div.className = "achievement";

        let achievement_img = document.createElement("p");
        achievement_img.className = "achievement_img";
        achievement_img.innerText = data[key].emoji;
        achievement_div.appendChild(achievement_img);

        let title_and_description = document.createElement("div");
        title_and_description.className = "title_and_description";
        achievement_div.appendChild(title_and_description);

        let title = document.createElement("div");
        title.className = "title";
        title.innerText = data[key].name;
        title_and_description.appendChild(title);

        let description = document.createElement("div");
        description.className = "description";
        description.innerText = data[key].description;
        title_and_description.appendChild(description);

        total.appendChild(achievement_div);
    }
}

async function give_achievement(key, new_achievement) {

    if (Object.hasOwn(user_data.Informations.all_achievements, key)) {
        return false;
    }

    console.log(user_data.Informations)
    user_data.Informations.all_achievements[key] = new_achievement;

    console.log(user_data.Informations)

    render_achievement(new_achievement);

    return true;
}

function render_achievement(achievement) {
    console.log("rendering");
    console.log(achievement);

    let achievement_div = document.createElement("div");
    achievement_div.className = "achievement";

    let achievement_img = document.createElement("p");
    achievement_img.className = "achievement_img";
    achievement_img.innerText = achievement.emoji;
    achievement_div.appendChild(achievement_img);

    let title_and_description = document.createElement("div");
    title_and_description.className = "title_and_description";
    achievement_div.appendChild(title_and_description);

    let title = document.createElement("div");
    title.className = "title";
    title.innerText = achievement.name;
    title_and_description.appendChild(title);

    let description = document.createElement("div");
    description.className = "description";
    description.innerText = achievement.description;
    title_and_description.appendChild(description);

    renderer.appendChild(achievement_div);

    if (sonor_effects === true) {
        playSound(notification);
    }

    setTimeout(() => {
        achievement_div.style.opacity = 0;
        setTimeout(() => {
            renderer.removeChild(achievement_div);
        }, 500);
    }, 4000);
}

/* ----- ACHIEVEMENTS LISTENERS ------ */

document.addEventListener("lesson_create", async (event) => {
    console.log(user_data.Informations.lessons_created);
    user_data.Informations.lessons_created = lessons_created_local + 1;
    lessons_created_local += 1;
    console.log(user_data.Informations.lessons_created);

    console.log("lessons_created");
    console.log(user_data.Informations);

    /*lessons_created_local est pas ultra nécessaire, mais dans le doute je le garde parce qu'il fait pas de mal*/

    if (lessons_created_local === 1) {
        await give_achievement("premier_pas", ACHIEVEMENTS.premier_pas);
    } else if (lessons_created_local === 10) {
        await give_achievement("eleve_applique", ACHIEVEMENTS.eleve_applique);
    } else if (lessons_created_local === 50) {
        await give_achievement("bientot_professeur", ACHIEVEMENTS.bientot_professeur);
    } else if (lessons_created_local === 100) {
        await give_achievement("capes_reussi", ACHIEVEMENTS.capes_reussi);
    }

    await update_supabase();
});

document.addEventListener("lesson_add", async (event) => {

    user_data.Informations.lessons_added += 1;

    if (user_data.Informations.lessons_added >= 1) {
        await give_achievement("premiere_def", ACHIEVEMENTS.premiere_def);
    }
    if (user_data.Informations.lessons_added >= 10) {
        await give_achievement("prise_en_main", ACHIEVEMENTS.prise_en_main);
    }
    if (user_data.Informations.lessons_added >= 50) {
        await give_achievement("collection_naissante", ACHIEVEMENTS.collection_naissante);
    } 
    if (user_data.Informations.lessons_added >= 100) {
        await give_achievement("bibliotheque_locale", ACHIEVEMENTS.bibliotheque_locale);
    }
    if (user_data.Informations.lessons_added >= 250) {
        await give_achievement("archive_professionelle", ACHIEVEMENTS.archive_professionelle);
    }
    if (user_data.Informations.lessons_added >= 500) {
        await give_achievement("maitre_des_defs", ACHIEVEMENTS.maitre_des_defs);
    }

    await update_supabase();
});

document.addEventListener("lang_end", async (event) => {

    user_data.Informations.langs_done += 1;

    if (user_data.Informations.langs_done >= 1) {
        await give_achievement("a1", ACHIEVEMENTS.a1);
    }
    if (user_data.Informations.langs_done >= 10) {
        await give_achievement("a2", ACHIEVEMENTS.a2);
    }
    if (user_data.Informations.langs_done >= 25) {
        await give_achievement("b1", ACHIEVEMENTS.b1);
    } 
    if (user_data.Informations.langs_done >= 50) {
        await give_achievement("b2", ACHIEVEMENTS.b2);
    }
    if (user_data.Informations.langs_done >= 100) {
        await give_achievement("c1", ACHIEVEMENTS.c1);
    }
    if (user_data.Informations.langs_done >= 250) {
        await give_achievement("bilingue", ACHIEVEMENTS.bilingue);
    }

    await update_supabase();
});

document.addEventListener("1st_place", async (event) => {
    if (await give_achievement("legende", ACHIEVEMENTS.legende)) {
        await update_supabase();
    }
});

document.addEventListener("podium", async (event) => {
    if (await give_achievement("champion", ACHIEVEMENTS.champion)) {
        await update_supabase();
    }
});

document.addEventListener("10_right_in_row", async (event) => {
    if (await give_achievement("tireur_elite", ACHIEVEMENTS.tireur_elite)) {
        await update_supabase();
    }
});

document.addEventListener("10_wrong_in_row", async (event) => {
    if (await give_achievement("tireur_dans_le_pied", ACHIEVEMENTS.tireur_dans_le_pied)) {
        await update_supabase();
    }
});

/* ----- UPDATE DE STREAK ------ */
async function update_streak_state() {

    console.log("===== STREAK UPDATE =====");

    console.log("AVANT :", structuredClone(user_data.Informations));

    const info = structuredClone(user_data.Informations);

    const now = getTodayString();

    let streak = info.streak ?? 0;
    let skips = info.skips ?? 0;

    let lastAction = info.last_action_date || null;
    let lastSkipReward = info.last_skip_reward || null;

    console.log("Streak :", streak);
    console.log("Skips :", skips);

    // --- GAIN SKIPS (hebdo) ---
    if (lastSkipReward) {

        const diffWeeks = Math.floor(
            (now - lastSkipReward) / (1000 * 60 * 60 * 24 * 7)
        );

        console.log("Semaines écoulées :", diffWeeks);

        if (diffWeeks > 0) {
            skips += diffWeeks;
            lastSkipReward = now;
            console.log("Skips ajoutés :", diffWeeks);
        }

    } else {

        console.log("Init skip reward");
        lastSkipReward = now;
    }

    // --- SI JAMAIS UTILISÉ ---
    if (!lastAction) {

        console.log("Pas encore de streak active");
        console.log("Rien à update côté streak");

    } else {

        const diffDays =
            dayStringToNumber(now) -
            dayStringToNumber(lastAction);

        console.log("Diff jours :", diffDays);

        if (diffDays === 0) {

            console.log("OK : streak toujours valide");
            document.getElementById("link_info").innerText = "on";

        } else if (diffDays === 1) {

            console.log("OK : progression naturelle");
            document.getElementById("link_info").innerText = "off";

        } else {

            const missed = diffDays - 1;

            console.log("Jours manqués :", missed);

            if (skips >= missed) {

                skips -= missed;

                console.log("Skips utilisés :", missed);

            } else {

                console.log("Streak cassée");

                streak = 0; // ou 1 si tu préfères reset doux
            }

            document.getElementById("link_info").innerText = "off";
        }
    }

    // --- SAVE ---
    user_data.Informations.streak = streak;
    user_data.Informations.skips = skips;
    user_data.Informations.last_skip_reward = lastSkipReward;

    // IMPORTANT :
    // on ne touche PAS last_action_date ici

    console.log("FINAL :", structuredClone(user_data.Informations));

    if (streak >= 100) {
        await give_achievement("soleil", ACHIEVEMENTS.soleil);
    } else if (streak >= 75) {
        await give_achievement("brasier", ACHIEVEMENTS.brasier);
    } else if (streak >= 50) {
        await give_achievement("incendie", ACHIEVEMENTS.incendie);
    } else if (streak >= 25) {
        await give_achievement("feu_de_camp", ACHIEVEMENTS.feu_de_camp);
    } else if (streak >= 7) {
        await give_achievement("briquet", ACHIEVEMENTS.briquet);
    }

    await update_supabase();

    console.log("===== END UPDATE =====");
}



if (window.location.pathname.endsWith("secret.html")) {
    if (await give_achievement("the_end", ACHIEVEMENTS.the_end)) {
        update_supabase();
    }
}


async function update_supabase() {
    const { error: err } = await supabase
    .from("leaderboard_data")
    .update({ Informations: user_data.Informations })
    .eq('user_id', user_let.id);

    if (err) console.log(err);
}