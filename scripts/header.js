// responsável pelo menu

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded" , alternarMenu )
} else {
    alternarMenu();
}

function alternarMenu() {
    const faBars = document.getElementById('mobile-btn');
    const icone = faBars.querySelector('i');
    const menu = document.getElementById('mobile-menu');
    
    faBars.addEventListener("click", () => {
        menu.classList.toggle('active')
        
        if (icone.classList.contains('fa-bars')) {
            icone.classList.remove('fa-bars')
            icone.classList.add('fa-x')
        } else {
            icone.classList.remove('fa-x')
            icone.classList.add('fa-bars')
        }
   })

}

