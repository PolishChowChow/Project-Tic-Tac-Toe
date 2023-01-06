


function copyright(){
    const paragraph = document.querySelector("p#copyright");
    paragraph.textContent = "Copyright "+ new Date().getFullYear();
}
copyright();