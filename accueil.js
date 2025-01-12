function loadAccueil() {
    if (loadingBusy) return;
    CURRENT_SECTION = "accueil";
    loadingBusy = true;
    clearContent();

    /********************************************
    *                                           *
    *                   QUOTE                   *
    *                                           *
    ********************************************/
    var quote_container = document.createElement("div");
    quote_container.classList.add("title-container");
    var quote_text = document.createElement("h1");
    quote_text.classList.add("title-text"); quote_text.innerHTML = "Apprendre à programmer"
    quote_container.appendChild(quote_text);
    if (CURRENT_SECTION == "accueil") MAIN_PAGE_CONTAINER.appendChild(quote_container);
    
    /********************************************
    *                                           *
    *             LANGUAGES CHOICE              *
    *                                           *
    ********************************************/
    var languages_container = document.createElement("div");
    languages_container.classList.add("inlines-container");
    var languages_centering = document.createElement("div");
    languages_centering.classList.add("inlines-centering");
    var languages_borders = document.createElement("div");
    languages_borders.classList.add("inlines-borders");
    var languages = [
        {title: "HTML / CSS / JavaScript", img: "./resources/accueil/javascript.png", onclick: ()=>{clearContent(); spawnInProgress();}},
        {title: "C / C++", img: "./resources/accueil/cpp.png", onclick: ()=>{clearContent(); spawnInProgress();}},
        {title: "Java", img: "./resources/accueil/java.png", onclick: ()=>{clearContent(); spawnInProgress();}},
        {title: "Python", img: "./resources/accueil/python.png", onclick: ()=>{clearContent(); spawnInProgress();}}
    ]
    for (let i = 0; i < languages.length; i++) {
        setTimeout(() => {
            var pic = new Image();
            pic.onload = ()=>{
                var language_container = document.createElement("div");
                var language_text = document.createElement("h2");
                language_text.classList.add("inline-text");
                language_text.innerHTML = languages[i].title;
                language_container.classList.add("inline-container");
                language_container.style.backgroundImage = "url("+languages[i].img+")";
                language_container.onclick = languages[i].onclick;
                language_container.appendChild(language_text);
                var space = document.createElement("div"); space.classList.add("inlines-space");
                if (i > 0) languages_container.appendChild(space);
                languages_container.appendChild(language_container);
            }
            pic.src = languages[i].img;
        }, 600+i*200);
    }
    languages_borders.appendChild(languages_container);
    languages_centering.appendChild(languages_borders);
    if (CURRENT_SECTION == "accueil") MAIN_PAGE_CONTAINER.appendChild(languages_centering);
    setTimeout(() => {languages_borders.style.transform = "scale(1, 1)";}, 250);

    /********************************************
    *                                           *
    *                   QUOTE                   *
    *                                           *
    ********************************************/
    setTimeout(() => {
        var quote_container = document.createElement("div");
        quote_container.classList.add("title-container");
        var quote_text = document.createElement("h1");
        quote_text.classList.add("title-text"); quote_text.innerHTML = "Mes projets"
        quote_text.onclick = ()=>{loadProjects();};
        quote_container.appendChild(quote_text);
        if (CURRENT_SECTION == "accueil") MAIN_PAGE_CONTAINER.appendChild(quote_container);
    }, 500);

    /********************************************
    *                                           *
    *              PROJECT CHOICE               *
    *                                           *
    ********************************************/
    setTimeout(() => {
        var project_centerer = document.createElement("div");
        var project_border = document.createElement("div");
        var project_container = document.createElement("div");
        var project_left = document.createElement("div");
        var project_separator = document.createElement("div");
        var project_right = document.createElement("div");
        var project_l_top = document.createElement("div");
        var project_separator2 = document.createElement("div");
        var project_l_bottom = document.createElement("div");
        var project_r_top = document.createElement("div");
        var project_separator3 = document.createElement("div");
        var project_r_bottom = document.createElement("div");
        var project_l_top_text = document.createElement("h2");
        var project_l_bottom_text = document.createElement("h2");
        var project_r_top_text = document.createElement("h2");
        var project_r_bottom_text = document.createElement("h2");
        project_centerer.classList.add("quad-centerer");
        project_container.classList.add("quad-container");
        project_border.classList.add("quad-borders");
        project_left.classList.add("quad-left");
        project_right.classList.add("quad-right");
        project_l_top.classList.add("quad-l-top");
        project_l_bottom.classList.add("quad-l-bottom");
        project_r_top.classList.add("quad-r-top");
        project_r_bottom.classList.add("quad-r-bottom");
        project_l_top_text.classList.add("quad-l-top-text");
        project_l_bottom_text.classList.add("quad-l-bottom-text");
        project_r_top_text.classList.add("quad-r-top-text");
        project_r_bottom_text.classList.add("quad-r-bottom-text");
        project_separator.classList.add("quad-separator");
        project_separator2.classList.add("quad-separator");
        project_separator3.classList.add("quad-separator");
        project_l_top_text.innerHTML = "Flow";
        project_l_bottom_text.innerHTML = "Processors";
        project_r_top_text.innerHTML = "Robot";
        project_r_bottom_text.innerHTML = "FyneWav";

        project_l_bottom.appendChild(project_l_bottom_text);
        project_l_top.appendChild(project_l_top_text);
        project_r_top.appendChild(project_r_top_text);
        project_r_bottom.appendChild(project_r_bottom_text);
        project_l_top.style.backgroundImage = 'url("./resources/projets/flow.png")';
        project_l_top.onclick = ()=>{clearContent(); spawnInProgress();}
        project_left.appendChild(project_l_top);
        project_left.appendChild(project_separator);
        setTimeout(() => {
            project_r_top.style.backgroundImage = 'url("./resources/projets/robot.jpg")';
            project_r_top.onclick = ()=>{clearContent(); spawnInProgress();}
            project_left.appendChild(project_l_bottom);
        }, 100);
        setTimeout(() => {
            project_l_bottom.style.backgroundImage = 'url("./resources/projets/processors.png")';
            project_l_bottom.onclick = ()=>{clearContent(); spawnInProgress();}
            project_right.appendChild(project_r_top);
            project_right.appendChild(project_separator2);
        }, 200);
        setTimeout(() => {
            project_r_bottom.style.backgroundImage = 'url("./resources/projets/fynewav.png")';
            project_r_bottom.onclick = ()=>{clearContent(); spawnInProgress();}
            project_right.appendChild(project_r_bottom);
        }, 300);
        project_container.appendChild(project_left);
        project_container.appendChild(project_separator3);
        project_container.appendChild(project_right);
        project_border.appendChild(project_container);
        project_centerer.appendChild(project_border);
        if (CURRENT_SECTION == "accueil") MAIN_PAGE_CONTAINER.appendChild(project_centerer);
        setTimeout(() => {project_border.style.transform = "scale(1, 1)";}, 100);
        loadingBusy = false;
    }, 600);
}