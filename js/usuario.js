class Usuario{

    constructor(){

        this.submit = document.querySelector("input[type='submit']");
        this.message();
        this.turningPage();
        //this.fill();

    }

    /*fill(){

        if(document.querySelector('#name').value == ' '){

            this.submit.style.background = '#c51010';
            this.submit.style.border = 'none';
            this.submit.style.color = '#fff';

        }
        if((document.querySelector('#name').value != ' ')){

            this.submit.style.background = '#fff';
            this.submit.style.border = '1px solid #fff';
            this.submit.style.color = '#000';

        }
        
    }*/

    message(){
        
        let checkButton = document.querySelector('#check');
        let  messageBox = document.querySelector('#message');
        let span = document.querySelector('#fillingOutTheForm span');


        checkButton.addEventListener('mouseover', e=>{

            messageBox.style.display = 'block';

            span.addEventListener('mouseover', e=>{

                messageBox.style.display = 'block';

            });
     
        });

        checkButton.addEventListener('mouseout', e=>{

            messageBox.style.display = 'none';

            span.addEventListener('mouseout', e=>{

                messageBox.style.display = 'none';

            });

        });

    }

    //Botão de cancelar
    turningPage(){

        document.querySelector("input[value='Cancelar']").addEventListener('click', e=>{

            history.go(-1);

        });

    }


    //Manipulando pagina de usuarios

}
new Usuario();