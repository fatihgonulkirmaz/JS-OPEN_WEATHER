const url = 'https://api.openweathermap.org/data/2.5/'
const key ='681a08338cd8c1f698daafe235645f56'

const setQuerry = (e) => {
    if(e.keyCode == '13') /*burdaki 13 klavyedki enter tuşuu temsil eder*/ 
        getResult(searchBar.value)/*kullanıcının girdiği şehir adını temsil eder.*/ 
}

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    //*Bu satır, template literals (şablon dizgileri) kullanarak URL'yi oluşturur. 
    /*${url} ifadesi, önceden tanımlanmış olan url değişkeninin değerini içerir. 
    weather?q=${cityName} ifadesi, şehir adını URL'ye ekler. appid=${key} ifadesi, API anahtarını URL'ye ekler. 
    units=metric ifadesi, metrik birimlerle hava durumu sonuçlarını almayı sağlar. 
    /*lang=tr ifadesi ise Türkçe dilini kullanarak sonuçların dilini ayarlar.*/ 
    fetch(query) /*urlye istek gönderir*/ 
    .then(weather => {
        return weather.json();
    })
    .then(displayResult) /*hava durum sonuçlarını gösterir*/ 
}

const displayResult = (result) => {
   let city = document.querySelector('.city')  
   city.innerText = `${result.name}, ${result.sys.country}`;

   let temp = document.querySelector('.temp')
   temp.innerText = `${Math.round(result.main.temp)}°C`; /*derece küsüratlı ise tam sayıya yuvarlar*/ 

   let desc = document.querySelector('.desc')
   desc.innerText = result.weather[0].description /* Bu, ilk hava durumu durumu öğesinin "description" özelliğini ifade eder. 
   Bu özellik, hava durumu durumunun açıklamasını içerir, örneğin "açık", "parçalı bulutlu" veya "yağmurlu" gibi.*/ 

   let minmax = document.querySelector('.minmax');
   minmax.innerText = `${Math.round(result.main.temp_min)}°C - ${Math.round(result.main.temp_max)}°C`;
   

}

const searchBar = document.getElementById('searchBar')/*şehri gireblmek için*/
searchBar.addEventListener('keypress',setQuerry);/*searchBar elementine bir olay dinleyicisi ekliyor. Olay, her bir tuşa basıldığında tetikleniyor.*/
