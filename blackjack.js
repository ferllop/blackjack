var baraja = [];
var croupier = [];
var jugador = [];

/* Función croupier que crea una baraja nueva en forma de array*/
croupier.creabaraja = function(){
   var valores = ["AS", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
   var puntos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
   var palos = [" de diamantes", " de corazones", " de treboles", " de picas"];
   var carta = {};
   baraja.nueva = [];
   for (var i=0; i<palos.length; i++){
      for (var j=0; j<valores.length; j++){
      carta = {valor: valores[j], palo: palos[i], puntos: puntos[j]};
      baraja.nueva[baraja.nueva.length] = carta;
      } 
   }
return baraja.nueva;
}

/* Función crupier que remueve las cartas de forma aleatoria */
croupier.remueve = function(){
   var removiendo = this.baraja;
   for (var i=1; i<=100; i++){
      var de1 = Math.floor(Math.random()*(removiendo.length - 0)) + 0;
      do {
         var de2 = Math.floor(Math.random()*(removiendo.length - 0))+0;
      } while (de1===de2);
      var removiendo1 = removiendo[de1];
      var removiendo2 = removiendo[de2];   
      removiendo[de1] = removiendo2;
      removiendo[de2] = removiendo1;
   }
   baraja.removida = removiendo;
   baraja.enjuego = baraja.removida;
} 

/* Función croupier que empieza un juego nuevo */
croupier.juegonuevo = function(){
   baraja.enjuego = [];
   jugador.mano = [];
   croupier.mano = [];
   jugador.puntosmano = 0;
   croupier.puntosmano = 0;
   croupier.baraja = croupier.creabaraja();
   croupier.remueve();
}

/* Función croupier que reparte una carta al jugador y a él mismo */
croupier.reparte = function(){
   jugador.mano[jugador.mano.length] = baraja.enjuego[0]; 
   console.log("la carta repartida al jugador es " + jugador.mano[jugador.mano.length - 1].valor + jugador.mano[jugador.mano.length - 1].palo + " y vale " + jugador.mano[jugador.mano.length - 1].puntos);
      for (i=0; i<baraja.enjuego.length; i++){
         baraja.enjuego[i] = baraja.enjuego[i+1];
      }   
   baraja.enjuego.length = baraja.enjuego.length - 1;
   croupier.mano[croupier.mano.length] = baraja.enjuego[0];
   console.log("la carta repartida al croupier es " + croupier.mano[croupier.mano.length - 1].valor + croupier.mano[croupier.mano.length - 1].palo + " y vale " + croupier.mano[croupier.mano.length - 1].puntos);
   for (i=0; i<baraja.enjuego.length; i++){
      baraja.enjuego[i] = baraja.enjuego[i+1];
   }   
   baraja.enjuego.length = baraja.enjuego.length - 1;
}

/* Función croupier que puntua su mano */
croupier.puntua = function(){
   croupier.puntosmano = 0;
   for (var i=0; i<croupier.mano.length; i++){
      croupier.puntosmano = croupier.puntosmano + croupier.mano[i].puntos   
   }
   console.log("la mano del croupier vale " + croupier.puntosmano);
}

/* Función jugador que puntua su mano */
jugador.puntua = function(){
   jugador.puntosmano = 0;
   for (var i=0; i<jugador.mano.length; i++){
      jugador.puntosmano = jugador.puntosmano + jugador.mano[i].puntos;
   }
   console.log("la mano del jugador vale " + jugador.puntosmano);
}

/* Función jugador que decide pasar o no, aleatoriamente, cuando la puntuación de su mano es mayor que 15. */
jugador.decide = function(){
   jugador.paso = false;
   var decision = 0;
   if (jugador.puntosmano > 15 && jugador.puntosmano < 21 && croupier.puntosmano < 21){
      decision = Math.floor(Math.random() * 2);
      if (decision === 1){
         jugador.paso = true;
         console.log("la mano del jugador vale más de 15 y decide plantarse");
      } else {
         console.log("la mano del jugador vale más de 15 y pero pide otra");
      }
   } else {
      if (croupier.puntosmano <= 21 && jugador.puntosmano <= 21){
         console.log("la mano del jugador vale menos o igual que 15 y por lo tanto continua");
      }
      if (jugador.puntosmano === 21){
         console.log("Blackjack");
      }
   }
}

function blackjack(){
   croupier.juegonuevo();
   do {
      blackjack.fin = false;
      croupier.reparte();
      jugador.puntua();
      croupier.puntua();
      jugador.decide();
      if (jugador.paso === true){
         blackjack.fin = true;
      }
      if (croupier.puntosmano >= 21){
         blackjack.fin = true;
      }
      if (jugador.puntosmano >= 21){
        blackjack.fin = true;
      }
   } while (blackjack.fin === false); 

   console.log("La partida termina con las siguientes manos");
   for (var i=0; i<jugador.mano.length; i++){
      console.log("Jugador: " + jugador.mano[i].valor + jugador.mano[i].palo + " y vale " + jugador.mano[i].puntos);  
   }
   console.log("Jugador: valor total " + jugador.puntosmano);
   for (var i=0; i<croupier.mano.length; i++){
     console.log("Croupier: " + croupier.mano[i].valor + croupier.mano[i].palo + " y vale " + croupier.mano[i].puntos);  
   }   
   console.log("Croupier: valor total " + croupier.puntosmano);
   if (croupier.puntosmano > jugador.puntosmano && croupier.puntosmano <= 21){
      console.log("La partida la gana la casa!");
   } else{
      if (jugador.puntosmano > 21){
         console.log("La partida la gana la casa!");
      } else{
         console.log("La partida la gana el jugador");
      }
   }
}

