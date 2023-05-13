import axios from 'axios'

async function getData(url) {
    const res = await axios(url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw new Error("Apologies for the error. Please try again.");
    });
    return res;
  }

  export default getData;