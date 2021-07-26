//Parte responsável por "ficar de olho" no documento se uma tecla vai ser pressionada.
document.body.addEventListener('keyup', (e)=>{
    playSound(e.code.toLocaleLowerCase());

});

//Parte responsável por esperar apertar o botão Tocar e tocar a música criada.
document.querySelector('.composer button').addEventListener('click', ()=>{
    let song = document.querySelector('#input').value;

    if (song !== ''){
        let songArray = song.split('');
        playComposition(songArray);
    }
});

//Pequena alteração do porjeto, permite que o usuário clique no botão para fazer o som.
let keys = document.querySelectorAll('.key')
keys.forEach((key)=>{
    key.addEventListener('click', (e)=>{
        playSound(e.target.dataset['key']);
    });
})

//Função responável por chamar o audio relacionado com a tecla pressionada
function  playSound(sound){
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    //Condicional responsavel por tocar o som, caso o elemento seja válido
    if(audioElement){
        audioElement.currentTime = 0; //Seta o ponteiro do som para 0. Agiliza o toque de várias notas.
        audioElement.play(); //Toca o som correspondente a tecla.
    }

    //Condicional que altera o CSS para mostrar que a tecla foi apertada
    if(keyElement){
        keyElement.classList.add('active');
        setTimeout(()=>{
            keyElement.classList.remove('active');
        },1000)
    }
};

//Função responsável por tocar a música criada no input
function playComposition(songArray){
    let wait = 0; //Controladora que vai impedir do JS tocar tudo ao mesmo tempo muito rápidamente

    for (let songItem of songArray){
        setTimeout(()=>{
            playSound(`key${songItem}`);
        },wait)
        wait+= 250;
    }
};