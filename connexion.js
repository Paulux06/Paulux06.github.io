var connectMode = true;
var confirmDIVheight = "0px";
var emailDIVheight = "0px";
var consoleDIVheight = "0px";

var client = {pseudo: "", password: "", email: "", index: 0};

function connexionSetup()
{
    confirmDIVheight = document.getElementById("confirm-container").getBoundingClientRect().height.toString()+"px";
    emailDIVheight = document.getElementById("email-container").getBoundingClientRect().height.toString()+"px";
    consoleDIVheight = document.getElementById("connexion-console-container").getBoundingClientRect().height.toString()+"px";
    document.getElementById("confirm-container").style.height = "0px";
    document.getElementById("email-container").style.height = "0px";
    document.getElementById("connexion-console-container").style.height = "0px";

    if (isClientSaved())
    {
        setClientName("Connexion ...")
        loadClientStore();
        connect();
    }
}

function resetClientStore()
{
    localStorage.removeItem("client_pseudo");
    localStorage.removeItem("client_password");
    localStorage.removeItem("client_email");
    localStorage.removeItem("client_index");
}
function loadClientStore()
{
    client.pseudo = localStorage.getItem("client_pseudo");
    client.password = localStorage.getItem("client_password");
    client.email = localStorage.getItem("client_email");
    client.index = localStorage.getItem("client_index");
    document.getElementById("email-input").value = client.email;
    document.getElementById("pseudo-input").value = client.pseudo;
    document.getElementById("confirm-input").value = client.password;
    document.getElementById("password-input").value = client.password;
}
function saveClientStore()
{
    localStorage.setItem("client_pseudo", client.pseudo);
    localStorage.setItem("client_password", client.password);
    localStorage.setItem("client_email", client.email);
    localStorage.setItem("client_index", client.index);
}
function isClientSaved() {return localStorage.getItem("client_pseudo") != null}

function showMessage(message="message console")
{
    document.getElementById("connexion-console-text").innerHTML = message;
    document.getElementById("connexion-console-container").style.height = consoleDIVheight;
    setTimeout(() => {
        document.getElementById("connexion-console-container").style.height = "0px";
    }, 1500);
}

function showConnect()
{
    var container = document.getElementById("connexion-panel-container");
    var panel = document.getElementById("connexion-panel-div");
    container.style.top = "0px";
    container.style.opacity = "1"
    panel.style.marginTop = "100px";

    if (client.pseudo != "")
    {
        document.getElementById("connect-mode-button").value = "Se déconnecter";
    }
}

function hideConnect()
{
    var container = document.getElementById("connexion-panel-container");
    var panel = document.getElementById("connexion-panel-div");
    container.style.opacity = "0";
    panel.style.marginTop = "0px";
    setTimeout(() => {container.style.top = "-100vh";}, parseInt(root.getPropertyValue("--animation-medium")));
}

function switchConnectMode()
{
    if (client.pseudo == "")
    {
        connectMode = !connectMode;
        var confirm = document.getElementById("confirm-container");
        var email = document.getElementById("email-container");
        if (connectMode) //hide useless fields
        {
            confirm.style.height = "0px";
            email.style.height = "0px";
            document.getElementById("connect-mode-button").value = "S'inscrire";
        }
        else
        {
            confirm.style.height = confirmDIVheight;
            email.style.height = emailDIVheight;
            document.getElementById("connect-mode-button").value = "Se connecter";
        }
    }
    else //disconnect client
    {
        client = {pseudo: "", password: "", email: "", index: 0};
        setClientName();
        document.getElementById("connect-mode-button").value = 
        (connectMode? "S'inscrire" : "Se connecter")
        resetClientStore();
    }
}

function clearInputs()
{
    document.getElementById("pseudo-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("password-input").value = "";
    document.getElementById("confirm-input").value = "";
}

function setClientName(name="se connecter")
{document.getElementById("header-connexion-button").value = name;}

function connect()
{
    database.ref().child("accounts").once('value').then((info) => {
        var data = JSON.parse(JSON.stringify(info));
        if (data == null) 
        {
            showMessage("Désolé, une erreur s'est produite.");
            return;
        }
        var keys = Object.keys(data);
        var email_input = document.getElementById("email-input").value;
        var pseudo_input = document.getElementById("pseudo-input").value;
        var confirm_input = document.getElementById("confirm-input").value;
        var password_input = document.getElementById("password-input").value;
        var stay_connected = document.getElementById("stay-connected-box").checked;

        if (client.pseudo != "")
        {
            pseudo_input = client.pseudo;
            email_input = client.email;
            password_input = confirm_input = client.password;
            stay_connected = true;
        }

        if (pseudo_input.length < 1)
        {
            showMessage("Aucun pseudo renseigné.");
            return;
        }
        if (password_input.length < 1)
        {
            showMessage("Aucun mot de passe renseigné.");
            return;
        }

        if (connectMode) // en mode "se connecter"
        {
            var inscrit = false;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (data[key]["pseudo"] == pseudo_input)
                {
                    inscrit = true;
                    if (getEncrypted(password_input, parseInt(key)) == data[key]["password"])
                    {
                        showMessage("Connexion réussie, bienvenue "+data[key]["pseudo"]+".");
                        clearInputs();
                        client = {
                            pseudo: data[key]["pseudo"],
                            email: data[key]["email"],
                            password: password_input,
                            index: parseInt(key)
                        }
                        setClientName(data[key]["pseudo"]);
                        if (stay_connected)
                            saveClientStore();
                    }
                    else
                    {
                        showMessage("Mauvais mot de passe.");
                        setClientName();
                        client = {pseudo: "", password: "", email: "", index: 0};
                        return;
                    }
                }
            }
            if (!inscrit)
            {
                showMessage("Vous n'êtes pas encore inscrit.");
                setTimeout(switchConnectMode, 1000);
                return;
            }
        }
        else
        {
            if (email_input.length < 1)
            {
                showMessage("Aucun Email renseigné.");
                return;
            }
            if (confirm_input.length < 1)
            {
                showMessage("Veillez confirmer le mot de passe.");
                return;
            }
            var alreadyUsed = false;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (data[key]["email"] == email_input)
                {
                    alreadyUsed = true;
                    showMessage("Cet Email est déja pris.");
                    return;
                }
                if (data[key]["pseudo"] == pseudo_input)
                {
                    alreadyUsed = true;
                    showMessage("Ce pseudo est déja pris.");
                    return;
                }
            }
            if (!alreadyUsed)
            {
                if (password_input != confirm_input)
                {
                    showMessage("Les mots de passe ne correspondent pas.");
                    return;
                }
                if (password_input.length > 4)
                {
                    for (let i = 0; i < password_input.length; i++) {
                        if(password_input[i] == "\\" || password_input[i] == "\'")
                        {
                            showMessage("Les charactères ' et \\ sont interdits dans les mots de passe.");
                            password_input = "";
                            return;
                        }
                    }
                    var IDfound = false;
                    var accountIndex = 0;
                    var key = 0;
                    while(!IDfound)
                    {
                        accountIndex = Math.round(Math.random() * 100000);
                        key=accountIndex;
                        for (let i = 0; i < keys.length; i++) {
                            IDfound = (parseInt(keys[i], 10) != accountIndex)
                            if (!IDfound)
                                break;
                        }
                    }
                    var newAccount = {
                        "pseudo": pseudo_input,
                        "password": getEncrypted(password_input, key),
                        "email": email_input
                    };
                    console.log(password_input+" made "+newAccount.password);
                    var Accounts = JSON.parse(JSON.stringify(data));
                    Accounts[accountIndex] = newAccount;
                    database.ref().child("accounts").set(Accounts);
                    showMessage("Compte créé, bienvenue "+pseudo_input+".");
                    console.log("created with key "+key);
                    client = {
                        pseudo: pseudo_input,
                        email: email_input,
                        password: password_input,
                        index: parseInt(key)
                    }
                    setClientName(pseudo_input);
                    if (stay_connected)
                        saveClientStore();
                }
                else
                {
                    showMessage("le mot de passe est trop court.");
                    return;
                }
            }
        }

        setTimeout(() => {
            hideConnect();
        }, 1000);
        return true;
    });
}