const cols = document.querySelectorAll(".col");
document.addEventListener('keydown', (event) =>{
event.preventDefault(); //чинит баг свича замка при смене его положения с некст обновлением цветов. Отменяет дефолтное поведение. А ебучие линии, при свиче замка и скроле цветов, фиксятся аутлайном none на батоне

//console.log(event.code); // будет показывать нажатые клавиши
//console.log(event);
if (event.code.toLowerCase() ==='space'){
    setRandomColors();
}
});

document.addEventListener('click', (event)=>{
console.log(event.target.dataset);
const type = event.target.dataset.type
if (type ==='lock'){
    const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];//всегда i  
    console.log(node);
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
}else if(type==='copy'){
copyToClickBoard(event.target.textContent); // при клике на символы будет копирование названия цвета
}});

function generateRandomColor(){
    const hexCodes = '0123456789ABCDEF' //все символы Ep в создании цвета в 16-ричной системе счисления

    let color = '';
    for(let i=0;i<6;i++){
        color += hexCodes[Math.floor(Math.random()*hexCodes.length)];
    }
    return '#'+color;
};
function setRandomColors(isInitial){
const colors = isInitial ? getColorsFromHash() : []; // если только что был запуск, то взять цвета с хэша, если нет, то рандом ебашить нид
cols.forEach((col, index)=>{
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    //const color = generateRandomColor(); вместо этого можно заюзать библиотеку сцаную
    if(isLocked){
        colors.push(text.textContent)
        return;
    };
    const color = isInitial ? colors[index] ? colors[index] : chroma.random() : chroma.random(); // учёт того, первичная ли загрузка. Also учёт undef, чтобы не было проёба
    if(!isInitial){
    colors.push(color);
    }
    text.textContent = color;
    col.style.background = color;
    setTextColor(button,color);
    setTextColor(text,color);
})
updateColorsHash(colors);
};
function copyToClickBoard(text){
    return navigator.clipboard.writeText(text) 
};
function setTextColor(text, color){
const luminance = chroma(color).luminance(); // от 0 до 1
text.style.color = luminance > 0.5? 'black' : 'white';
};
function updateColorsHash(colors = []){
document.location.hash = colors.map((col)=>{return col.toString().substring(1)}
).join('-')
};

function getColorsFromHash(){
if(document.location.hash.length >1){
return document.location.hash.substring(1).split('-').map((color)=> '#'+ color) // херь есть тк это дефолт работа хэша, чтобы законтрить эту херь, используется substring
}
return [];
};

setRandomColors(true);

// if в консоле прописать document.location.hash = '424242' ---->то ссылка URL изменится и в этом хэше можно хранить все цвета, которые сохранены