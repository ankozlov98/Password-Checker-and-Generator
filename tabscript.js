function openTab(evt, passwordFeat) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(passwordFeat).style.display = "block";
    evt.currentTarget.className += " active";
}
const button1 = document.getElementById("tab1");
const button2 = document.getElementById("tab2");

button1.addEventListener("click", openTab(evt,'check'));
button2.addEventListener("click", openTab(evt,'generate'));