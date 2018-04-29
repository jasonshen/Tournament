import axios from 'axios';

const API_URL = 'https://www.headlightlabs.com/api';
const API_KEY = 'tLb6vPjRo80pAjOxK2A7oQ';

function createFormData(img) {
  const formData = new FormData();
  formData.append('api_key', API_KEY);
  formData.append('image', img);
  return formData;
}
function gcpdLookup(img) {
  const formData = createFormData(img);

  return axios({
    method: 'post',
    url: `${API_URL}/gcpd_lookup`,
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function gcpdReport(img) {
  const formData = createFormData(img);

  return axios({
    method: 'post',
    url: `${API_URL}/gcpd_report`,
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export { gcpdLookup, gcpdReport };
