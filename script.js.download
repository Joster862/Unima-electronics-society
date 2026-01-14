document.addEventListener("DOMContentLoaded", function() {
    let slides=document.querySelectorAll(".slide");
    let index=0;
    function showSlide(){
        slides.forEach(slide=>slide.classList.remove("active"));
        slides[index].classList.add("active");
        index=(index+1)%slides.length;
    }
    setInterval(showSlide,5000);
});

//menu bar toggle
document.addEventListener("DOMContentLoaded",function(){
    const navright=document.getElementById("navright");
    const navmenu=document.getElementById("navmenu");
    console.log("JS loaded")
    navright.addEventListener("click",function(){
        console.log("Clicked")
        navmenu.classList.toggle("active");
        if (navright.textContent==="☰"){
            navright.textContent="✖";
        }else{
            navright.textContent="☰";
        }
    });
});