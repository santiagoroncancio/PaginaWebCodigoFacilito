 import styles from "./maps/styles";

 function initMap(){

    const coords={
        lat:38.136170,
        lng:-0.669740
    }

     let map = new google.maps.Map(document.getElementById('mapa'),{
        center: coords,
        zoom:16,
        styles:styles,
     });

     let marker = new google.maps.Marker({
         position:coords,
         map,
         title:"Un lugar maravilloso"
     });
 }

//  initMap();