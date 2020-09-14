export const pushData = async (e) => {
  const information = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ezww6AGdTOyciw0GhscO/scores/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
    body: e,
  }).then(response => response);
  return information.json();
};

export const getData = async () => {
  const data = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ezww6AGdTOyciw0GhscO/scores').then(result => result).catch((e) => e);
  let jData = await data.json();
  jData = await jData.result;

  await jData.sort((a, b) => b.score - a.score);
  return jData;
};

export default { pushData, getData };