const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDorm = document.querySelector('.form');
const inputDom = document.querySelector('.form-input');
const resultsDom = document.querySelector('.results');

formDorm.addEventListener('submit', (e)=> {
  e.preventDefault();
  const inputValue = inputDom.value;
  if(!inputValue){
    resultsDom.innerHTML = `<div class="error">Enter search terms</div>`;
    return;
  }

fetchData(inputValue)
})

async function fetchData(searchValue) {
  resultsDom.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;

    if(results.length === 0){
      resultsDom.innerHTML = `<div class="error">search term does not exist</div>`;
      return;
    }

    displayHTML(results)
    
  } catch (error) {
    resultsDom.innerHTML = `<div class="error">there was an error</div>`;
  }
}

function displayHTML(data) {
  const cardList = data.map((item)=>{
    console.log(item)

    const {pageid, title, snippet} = item

    return `
    <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
      <h4>${title}</h4>
      <p>${snippet}</p>
    </a>`

  }).join('');
  
resultsDom.innerHTML = `<div class="articles">
          ${cardList}
</div>`
  
  
}

