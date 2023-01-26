

const images    = document.querySelector('.images');
const observe   = document.querySelector('.observe');
const input     = document.querySelector('input') ;
const errorMsg  = document.querySelector('.error-msg ');
var query       = "random";
var pageNumber  = 1;

const observer = new IntersectionObserver((entries) => {

entries.forEach(entry=>{

   if (entry.isIntersecting) {
      pageNumber++;
      request();
 }     
    })
})
observer.observe(observe);

async function request(){
  const requete = await fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=30&query=${query}&lang=fr&client_id=-GhBOCwCIO01DJ585SYIFgYo3dSoNMgHBGcCpQCVdBw`, {
    method: 'GET'
  });
  try {
    
  if(!requete.ok) {
    throw new Error(`Erreur: ${requete.status}`)
  } else {
    let data = await requete.json();

  if (!data.total) {
    images.appendChild(errorMsg);
    errorMsg.textContent="Error: rien de tel dans notre base de données ... tentez un mot clé plus précis !";
    } 
   showImg(data.results);
console.log(data);
  }
} catch (error) {
    errorMsg.textContent=`${error}`;
}
}

  const form = document.querySelector('form');
  form.addEventListener('submit', handlsubmit);
 
  function handlsubmit(e){
    e.preventDefault();
    query= input.value;
    const imgInput = document.querySelectorAll('.input-img');
    imgInput.forEach(element=> element.remove());
    errorMsg.remove();
    request();
    }

  function showImg(data) {  
    data.forEach((element)=>{
      const imgCreat = document.createElement('img');
      imgCreat.setAttribute("class","input-img");
      images.append(imgCreat);
      imgCreat.src= element.urls.regular;
     
      })
    }
  
 const scrollBtn = document.querySelector('button');
 
  scrollBtn.addEventListener('click', handelClick);
   function handelClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
   }