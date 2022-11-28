(function() {
  const mobile = window.matchMedia('(min-width: 0px) and (max-width: 1023px)');
  const desktop = window.matchMedia('(min-width: 1024px)'); // Enable (for mobile)


  const body = document.querySelector('body');
  const cards = document.querySelector('.cards');
  const bttnAdd = document.querySelector('.bttn-add');
  const bttnRemove = document.querySelector('.bttn-remove');
  const bttnFill = document.querySelector('.bttn-fill');
  const bttnClear = document.querySelector('.bttn-clear');
  const bttnHistory = document.querySelector('.bttn-history');

  const modalOverlay = document.querySelector('.modal-overlay');
  const modalHistory = document.querySelector('.modal.modal_history');
  const modalHistoryList = document.querySelector('.modal__list');
  const modalMore = document.querySelector('.modal.modal_more');
  const modalMoreTitle = document.querySelector('.more-js-title');
  const modalMoreText = document.querySelector('.more-js-text');

  const FILLING_AMOUNT = 3;
  let fillEnable = false;

  const showedData = [];

  function cardsViewType() {
    const cardsList = document.querySelectorAll('.card');

    if(cardsList.length > 1) {
      cards.classList.add('alot');
    } else {
      cards.classList.remove('alot');
    }
  }

  // showedData = {
  //   history: true/false  
  // }


  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => dataLoaded(json))
  .catch(function(error) {})

  function dataLoaded(data) {
    let dataIndex = 0;
  

    function printCard(cardData, preloader) {
      let el = document.createElement('li');
      el.classList.add('card');

      el.insertAdjacentHTML("beforeend", 
        `<h3 class="card__title">${cardData.title}</h3>
        <p class="card__content">${cardData.body.slice(0, 100) + '...'}</p>
        <div class="card__bttns">
          <button class="card__bttn-more bttn">more</button>
          <button class="card__bttn-remove bttn">remove</button>
        </div>
        <div class="loader-wrapper">
          <div class="loader">
          </div>
          <div class="loader-section section-left"></div>
          <div class="loader-section section-right"></div>
        </div>`);

      const bttnMore = el.querySelector('.card__bttn-more');
      const bttnRemove = el.querySelector('.card__bttn-remove');

      bttnMore.addEventListener('click', function() {
        body.classList.add('more-active');

        modalMoreTitle.textContent = cardData.title
        modalMoreText.textContent = cardData.body
      })

      bttnRemove.addEventListener('click', function() {
        cardData.history = true;
        el.remove()
      })

      cards.append(el);
      cardsViewType();
      if(preloader) {
        setTimeout(function() {
          el.classList.add("loaded")
        }, 3000);
      } else {
        el.classList.add("loaded")
      }
      
    }

    function addingCard() {
      if(dataIndex >= data.length) {
        return false;
      }
      let cardData = data[dataIndex];
      // showedData[dataIndex] = {...cardData, history: false};
      showedData[dataIndex] = Object.assign({history: false}, cardData);
      printCard(showedData[dataIndex], true);
      dataIndex++;
    }


    bttnAdd.addEventListener('click', addingCard)

    bttnRemove.addEventListener('click', function() {
      const currentCards = document.querySelectorAll('.card');
      if(currentCards == 0) {
        return false;
      }
      
      currentCards[currentCards.length - 1].remove();
      showedData[currentCards.length - 1].history = true;
    })

    bttnFill.addEventListener('click', function() {
      this.classList.toggle('active');
      fillEnable = !fillEnable;

      if(mobile.matches) {
        while (dataIndex <= data.length && cards.scrollLeft + cards.offsetWidth >= cards.scrollWidth) {
          addingCard()
        }
      } else {
        while (dataIndex <= data.length && cards.offsetHeight <= screen.height) {
          addingCard()
        }
      }



      
    })

    bttnClear.addEventListener('click', function() {
      bttnFill.classList.remove('active');
      fillEnable = false;
      const currentCards = document.querySelectorAll('.card');

      currentCards.forEach(function(item, index) {
        if(index == 0) {
          return false
        }

        item.remove()
        showedData[index].history = true;
      })
    })

    bttnHistory.addEventListener('click', function() {
      body.classList.add('history-active');
      modalHistoryList.innerHTML = '';
      console.log('history')

      showedData.forEach(function(item, index) {
        if(item.history === false) {
          return false;
        }

        let el = document.createElement('li');
        el.classList.add('modal__list-item');
    
        el.insertAdjacentHTML("beforeend",
          `<h4>${item.title}</h4>
          <button class="bttn">restore</button>`);

        const bttnRestore =  el.querySelector('button');

        bttnRestore.addEventListener('click', function() {
          printCard(item, false);
          item.history = false;
          el.remove();
        })

        
        modalHistoryList.append(el);
      })
    })

    modalOverlay.addEventListener('click', function(e) {
      if(!e.target.classList.contains('modal-overlay')) {
        return false
      }

      body.classList.remove('history-active', 'more-active');
    })


    if(mobile.matches) {
      cards.addEventListener("scroll", event => {
        if(fillEnable == false) {
          return false;
        }

        if(cards.scrollLeft + cards.offsetWidth + 50 >= cards.scrollWidth) {
          for (let index = 0; index < FILLING_AMOUNT; index++) {
  
            addingCard()
          }
        }
      }, { passive: true });
    } else {
      window.addEventListener('scroll', function() {
        if(fillEnable == false) {
          return false;
        }
        
        const documentRect = this.document.documentElement.getBoundingClientRect();
  
        if(documentRect.bottom < document.documentElement.clientHeight + 150) {
          for (let index = 0; index < FILLING_AMOUNT; index++) {
  
            addingCard()
          }
        }
      })
    }
  }
  
})()