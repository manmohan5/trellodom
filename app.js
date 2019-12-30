const API_KEY = '12c912723bfd4c449c8ff829df1f9c05';
const TOKEN =
  '8ef6820a89e26e39f0bfa97b74866e99a0fdbef4c9f1c3b69f51e67ffe4c7dad';
const BOARDID = '5de8c4ed3b994e43d4b3850f';
const LIST_ID = '5de8c4fc9dacaf23bf6bcbe1';
const list = document.getElementById('list-cards');
const crdBtn = document.getElementById('add-card-button');
const frmEle = document.getElementById('add-card-form');
const closeFrm = document.getElementById('close-form');
const createCard = document.getElementById('create-card-button');

function init() {
  fetch(
    `https://api.trello.com/1/lists/${LIST_ID}/cards?fields=name&key=${API_KEY}&token=${TOKEN}`
  )
    .then(response => {
      return response.json();
    })
    .then(response => {
      addCards(response);
    })
    .catch(err => {
      console.log(err);
    });
}
window.onload = init();

addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) {
    deleteCard(e);
  }
});

// for creating a form
crdBtn.addEventListener('click', () => {
  crdBtn.style.display = 'none';
  frmEle.style.display = 'inline';
  frmEle.style.visibility = 'visible';
});

// from add card
createCard.addEventListener('click', () => {
  const cardName = document.getElementById('card-name').value;
  if (cardName) {
    addCardToTrello([cardName]);
  }
  crdBtn.style.display = 'inline';
  crdBtn.style.display = 'visible';
  frmEle.style.display = 'none';
});

// for  close form
closeFrm.addEventListener('click', () => {
  frmEle.style.display = 'none';
  crdBtn.style.display = 'inline';
  crdBtn.style.display = 'visible';
});

function addCardToTrello(cardName) {
  const URL = `https://api.trello.com/1/cards?name=${cardName}&idList=${LIST_ID}&keepFromSource=all&key=${API_KEY}&token=${TOKEN}`;
  fetch(URL, {
    method: 'POST'
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      addCards([{ id: response.id, name: response.name }]);
    })
    .catch(err => {
      console.log(err);
    });
}

function deleteCard(e) {
  const id = e.target.parentElement.parentElement.id;
  fetch(`https://api.trello.com/1/cards/${id}?key=${API_KEY}&token=${TOKEN}`, {
    method: 'delete'
  })
    .then(data => console.log(data))
    .catch(error => {
      console.log(error);
    });
  e.target.parentElement.remove();
}

function addCards(cardList) {
  cardList.map(card => {
    let elem = document.createElement('div');
    elem.classList.add('card');
    elem.id = card.id;
    elem.innerHTML = `<div class="card-body d-flex justify-content-between align-items-center "><h6 class="card-title font-weight-bold mb-0">${card.name}</h6><button class="btn btn-secondary btn-sm p-1 delete" id="delete-card-button">X</button></div>`;
    list.appendChild(elem);
    crdBtn.style.display = 'inline';
    crdBtn.style.display = 'visible';
    frmEle.style.display = 'none';
  });
}
