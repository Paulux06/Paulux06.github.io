var computedStyle = null;
var MAIN_PAGE_CONTAINER = document.createElement("div");
var ANIMATION_LENGTH_QUICK = 0;
var ANIMATION_LENGTH_NORMAL = 0;
var ANIMATION_LENGTH_SLOW = 0;
var CURRENT_SECTION = "";
var loadingBusy = false;
var loadingStart = 0;

window.onload = () => {
    connexionSetup();
    loadingStart = new Date().getTime() / 1000;
    waitUntilSigned();
}

function waitUntilSigned() {
    var displayName = document.getElementById("header-promo-pseudo")
    var timedout = new Date().getTime() / 1000 - loadingStart > 3;
    if (displayName.innerHTML == "Anonyme" && client.pseudo != "") {
        if (timedout) {
            document.getElementById("main-loading-info").innerHTML = "Délai dépassé.";
            displayPage();
            return;
        }
        document.getElementById("main-loading-info").innerHTML = "Connexion à votre compte ...";
        setTimeout(waitUntilSigned, 250);
        return;
    }
    displayPage();
    return;
}

function displayPage() {
    setTimeout(removeLoading, 0);
    computedStyle = getComputedStyle(document.documentElement);
    MAIN_PAGE_CONTAINER = document.getElementById("main-page-container");
    ANIMATION_LENGTH_QUICK = parseInt(computedStyle.getPropertyValue("--animation-length-quick"));
    ANIMATION_LENGTH_NORMAL = parseInt(computedStyle.getPropertyValue("--animation-length-normal"));
    ANIMATION_LENGTH_SLOW = parseInt(computedStyle.getPropertyValue("--animation-length-slow"));
    setupHeader();
    setTimeout(loadAccueil, 500);
}

function clearContent() {
    while(MAIN_PAGE_CONTAINER.firstChild) {
        MAIN_PAGE_CONTAINER.removeChild(MAIN_PAGE_CONTAINER.firstChild);
    }
}

window.addEventListener("keydown", (ev)=>{
    if (ev.key == "Enter") {
        if (panel_state) connect();    
        switch(CURRENT_SECTION) {
            case "chat":
                sendMessage(document.getElementById("chat-box"));
                break;
            default:
                break;
        }
    }
})

function removeLoading() {
    var loadingContainer = document.getElementById("main-loading-container");
    var loadingLogo = document.getElementById("main-loading-logo");
    loadingContainer.style.opacity = "0";
    loadingLogo.style.animationPlayState = "paused";
    loadingLogo.style.transform = "rotate(0deg) scale(2)";
    setTimeout(() => {
        loadingContainer.style.display = "none";
    }, ANIMATION_LENGTH_SLOW);
}