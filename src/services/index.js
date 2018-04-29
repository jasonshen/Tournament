const API_ROOT = "https://www.headlightlabs.com/api";
const apiKey = "Q2yenUWtRcyYCnE93r1yIg";

const submitImage = (image) => {
  console.log(image)
  const formData = new FormData();
  formData.append('image', image);
  formData.append('api_key', apiKey);

  return fetch(`${API_ROOT}/gcpd_lookup`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error));
};

const submitReport = (image) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('api_key', apiKey);

  return fetch(`${API_ROOT}/gcpd_report`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error));
};

export const adapter = {
  submitImage,
  submitReport
}
