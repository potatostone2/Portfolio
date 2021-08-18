'use strict';

// 네비게이션바 투명 -> 배경색 처리
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
});

// 네비게이션바 메뉴를 누를 때 스크롤 처리
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
    const target = e.target;
    const link  = target.dataset.link;
    if(link == null){
        return false;
    }  
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// 네비게이션바 토글 버튼
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', (e) => {
    navbarMenu.classList.toggle('open');
});

// 홈 섹션 연락처 버튼을 누를 때 스크롤 처리
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', (e) => {
    scrollIntoView('#contact');
});

// 아래로 스크롤될 때 홈을 서서히 희미하게 처리
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
    home.style.opacity = 1 - window.scrollY / homeHeight;    
});

// 스크롤 down시 arrowUp 버튼 보여주기
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=>{
    if(window.scrollY > homeHeight/2){
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
});

// "arrowUp" 버튼 클릭시 홈으로 이동
arrowUp.addEventListener('click',() => {
    scrollIntoView('#home');
});


// Projects 필터링
const workBtnContainer = document.querySelector('.work__categories');
const projectsContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }

    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = 
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectsContainer.classList.add('anim-out');
    setTimeout(()=>{
        projects.forEach( (project) => {
        
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectsContainer.classList.remove('anim-out');
    }, 300);
    
});


/*  Function  */
function scrollIntoView(selector){
    const scrollTo =  document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior:'smooth' });   
}