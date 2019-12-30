const APIKEY = '12c912723bfd4c449c8ff829df1f9c05';
const TOKEN =
  '8ef6820a89e26e39f0bfa97b74866e99a0fdbef4c9f1c3b69f51e67ffe4c7dad';
// const BOARDID = '5de8c4ed3b994e43d4b3850f';
const LISTID = '5de8c4fc9dacaf23bf6bcbe1';

function show(apiKey, token, listId) {
  fetch(
    `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${token}`
  )
    .then(response => response.json())
    .then(listObj => listObj.map(obj => console.log(obj.name)))
    .catch(err => console.log(`List Id Not found ${err}`));
}

show(APIKEY, TOKEN, LISTID);
