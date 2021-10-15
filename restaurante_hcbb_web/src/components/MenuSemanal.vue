<template>
    <div id="MenuSemanal">
        <h1>Menú de la semana</h1><br>
        <h3><em>¡Escoge el día y descubre el menú!</em></h3><br> 
        <div class="semana">
            <div class="lunes">
                <a target=_self href="menu_Lunes.html">
                    <img id="Lunes" src="src/assests/lunes.png" alt="Lunes">
                </a>                                           
            </div>    
            <div class="martes">
                <a target=_self href="menu_Martes.html">
                    <img id="Martes" src="src/assets/martes.png" alt="Martes">
                </a>                        
            </div>                                  
            <div class="miercoles">
                <a target=_self href="menu_Miercoles.html">
                    <img id="Miercoles" src="src/assets/miercoles.png" alt="Miércoles">
                </a>                        
            </div>      
            <div class="jueves">
                <a target=_self href="menu_Jueves.html">
                    <img id="Jueves" src="src/assets/jueves.png" alt="Jueves">
                </a>                        
            </div> 
            <div class="viernes">
                <a target=_self href="menu_Viernes.html">
                    <img id="Viernes" src="/src/assets/viernes.png" alt="Viernes">
                </a>                        
            </div>                      
        </div>
    </div>
</template>

<style scoped>
#MenuSemanal img{
    width: 300px;;
    height: 300px;;
    border-radius: 50%;
}
.semana {
    display:flex;   
    justify-content: space-around;
    margin: 0%;
}

#MenuSemanal{
    padding: 1%;
    margin: 0.5%;
    width: 100%;
    border-style: solid; 
    border-width: 3px;
    border-color:rgb(226, 27, 27);     
}
#MenuSemanal > h1{
    font-size: 50px;
}
#MenuSemanal > h3{
    font-size: 30px;
}
#Lunes:hover{
    transform: scale(150%);
    transition: .5s ease;
}
#Martes:hover{
    transform: scale(150%);
    transition: .5s ease;
}
#Miercoles:hover{
    transform: scale(150%);
    transition: .5s ease;
}
#Jueves:hover{
    transform: scale(150%);
    transition: .5s ease;
}
#Viernes:hover{
    transform: scale(150%);
    transition: .5s ease;
}
</style>