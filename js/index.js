class Controle{
    constructor(){

        this.headerBar();
        this.searchBoxAnimation();
        this.main_background_screen();
        this.tagVideo = document.querySelector('#tagVideo');
        this.header = document.querySelector('header')
        this.cont = 0;
        
        this.topdez();

        /* Scroll */
        this.scrollExecution();

    }

    rightArrowConfiguration(rightArrow, leftArrow, scroll, scrollIndex, cont, indexSectionMarkup){

        rightArrow.addEventListener('click', e=>{

            cont += 1;

            if(cont == 0){cont = 1};

            switch(cont){
               
                case 1:

                    /* scroll */
                    this.scrollStyleFunction(indexSectionMarkup, 3, 1);
                    document.querySelectorAll('.SagaWinxFinal')[scrollIndex].scrollIntoView({ behavior: "smooth" });

                    /* Estilização de seta esquerda */
                    scroll.style.margin = '0';
                    leftArrow.setAttribute('class', 'generalArrowStyle ativo');
                   
                    break;
                
                case 2:

                    this.scrollStyleFunction(indexSectionMarkup, 5, 3);
                    document.querySelectorAll('.OidnbFinal')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    break;
                
                case 3:

                    this.scrollStyleFunction(indexSectionMarkup, 7, 5);
                    document.querySelectorAll('.bakiFinal')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    break;

                case 4:
    
                    this.scrollStyleFunction(indexSectionMarkup, 9, 7);
                    document.querySelectorAll('.dahmerFinal')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    break;
    
                case 5:
    
                    this.scrollStyleFunction(indexSectionMarkup, 11, 9);
                    document.querySelectorAll('.mistaUmFinal')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    break;
    
                case 6:
    
                    this.scrollStyleFunction(indexSectionMarkup, 13, 11);
                    document.querySelectorAll('.misturaDoisFinal')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    break;
    
                case 7:
    
                    this.scrollStyleFunction(indexSectionMarkup, 15, 13);
                    document.querySelectorAll('.misturaTresFinal')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    break;
    
                case 8:

                    this.scrollStyleFunction(indexSectionMarkup, 1, 15);
                    document.querySelectorAll('.inicioMortePCarona')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    cont = 0;
                    break;
    
            };

        });


        leftArrow.addEventListener('click', e=>{

            //consertar rolagem

            //if(cont == 0){cont = 0};
            
            switch(cont){
                
                case 0:

                    document.querySelectorAll('.misturaTresFinal')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    //this.scrollStyleFunction(indexSectionMarkup, 15, 1)
                    cont = 6;
                    
                case 1:
                    
                    //
                    document.querySelectorAll('.inicioMortePCarona')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    this.scrollStyleFunction(indexSectionMarkup, 1, 3);
                    cont -= 1;
                    
                    break;

                case 2:

                    this.scrollStyleFunction(indexSectionMarkup, 3, 5);
                    document.querySelectorAll('.SagaWinxInicio')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    cont -= 1;
                    
                    break;

                
                case 3:

                    this.scrollStyleFunction(indexSectionMarkup, 5, 7);
                    document.querySelectorAll('.OidnbInicio')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    cont -= 1;
                    
                    break;

                case 4:

                    this.scrollStyleFunction(indexSectionMarkup, 7, 9);
                    document.querySelectorAll('.bakiInicio')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    cont -= 1;
                    
                    break;

                case 5:

                    this.scrollStyleFunction(indexSectionMarkup, 9, 11)
                    document.querySelectorAll('.inicioDahmer')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    cont -= 1;
                    
                    break;

                case 6:

                    
                    this.scrollStyleFunction(indexSectionMarkup, 11, 13);
                    document.querySelectorAll('.misturaUmInicio')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    cont -= 1;
                    
                    break;

                case 7:
                    
                    this.scrollStyleFunction(indexSectionMarkup, 13, 15)
                    document.querySelectorAll('.misturaDoisInicio')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    cont -= 1;
                    
                    break;

                /*case 8:

                    this.scrollStyleFunction(indexSectionMarkup, 15, 1);
                    document.querySelectorAll('.inicioMortePCarona')[scrollIndex].scrollIntoView({ behavior: "smooth" });
                    cont -= 1;
                    //console.log('ok')
                    break;*/

            }
        })

    }

    scrollExecution(){

        let rightArrow = document.querySelectorAll('#rightArrow');
        let leftArrow = document.querySelectorAll('#leftArrow');
        let scroll = document.querySelectorAll('.scroll');

        this.rightArrowConfiguration(rightArrow[0], leftArrow[0], scroll[0], 0, 0, 0);
        this.rightArrowConfiguration(rightArrow[2], leftArrow[2], scroll[1], 1, 0, 2);
        this.rightArrowConfiguration(rightArrow[3], leftArrow[3], scroll[2], 2, 0, 3);

    }

    /* Estilização do scroll */
    scrollStyleFunction(index, branco, cinza){

        let lista = document.querySelectorAll('.rotation')[index].childNodes

        lista[branco].style.background = '#fff';
        lista[cinza].style.background = '#414141';
        
    }

    //Função que deixa a barra header visivel ou não de acordo com o scroll
    headerBar(){

        let tag = document.querySelector('.mainNavigation')
        window.addEventListener('scroll', ()=>{

            if(window.scrollY > 0){

                tag.removeAttribute('id');
                tag.setAttribute('id', 'visivel');

            }else{

                tag.removeAttribute('id');
                tag.setAttribute('id', 'naovisivel');


            }

        });

    }

    //Animação da caixa de pesquisa
    searchBoxAnimation(){

        window.addEventListener('click', (e)=>{
            
            let id = e.target.parentElement.parentElement.id;
            let buttonBox = document.querySelector("#searchtBoxInt");
            let inputSearch = document.querySelector('#searchtBoxInt__pesq');

            console.log(id)
            if(id == "searchtBoxInt" || id == ""){
                
                buttonBox.setAttribute('class', 'search_box_styling');
                inputSearch.style.width = '250px';

            }else if(id != "searchtBoxInt"){
                
                buttonBox.removeAttribute('class');
                inputSearch.style.width = '0px';

            }

        })

    }

    //Fundo de tela

    main_background_screen(){

        let video = document.querySelector('#video')
        let ImgButton = document.querySelector('#muteImg');
        
        video.style.display = 'none';

        //quando o video começar
        setTimeout(()=>{

            video.style.display = 'block';
            this.header.style.background='transparent';
        
        }, 3000)

        document.querySelector("#tagVideo").onended = ()=>{

            //Voltando com a imagem
            video.style.display = 'none';
            this.header.style.backgroundImage = 'url(https://occ-0-933-420.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABWMZa8iWRT8VWOH6tIdbS_gfxSRLwxaMw7QiiBwy-V-q52w2yA5aNeyVqGNrbS2MMXYV8o39ofeoVPFmmNYs7oqwj7yISMASgvQz.webp?r=618)';

            //Mudando a função do botão
            ImgButton.src="https://img.icons8.com/ios-glyphs/20/null/recurring-appointment.png";

        }

    }


    /* Seta dos top 10 */

    topdez(){

        let cont = 0
        let lista = document.querySelector('#topdez .rotation').childNodes
        
        document.querySelector("#topicsOfTheMonth #rightArrow").addEventListener('click', e=>{

            cont++
            switch(cont){

                case 1:

                    document.querySelector('#fim').scrollIntoView({ behavior: "smooth" });
                    //scroll.style.margin = '0';
                    document.querySelector("#topicsOfTheMonth #leftArrow").setAttribute('class', 'generalArrowStyle ativo');

                case 2:
                    
                    document.querySelector('#inicio').scrollIntoView({ behavior: "smooth" });
                    cont = 0
            }
            
        })

        document.querySelector("#topicsOfTheMonth #leftArrow").addEventListener('click', e=>{

            switch(cont){

                case 0:
                    document.querySelector('#fim').scrollIntoView({ behavior: "smooth" });

                case 2:
                    document.querySelector('#inicio').scrollIntoView({ behavior: "smooth" });

            }

        })

    }
    
}

new Controle()