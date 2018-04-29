export const API_ROOT = "https://www.headlightlabs.com/api"
export const API_KEY = "5PX7kG7H88FQZitt7NQDpg"

// const uploadPhoto = (event) => {
//       event.persist();
//       event.preventDefault();
//
//       let data = new FormData()
//       data.append('image', event.target[0].files[0])
//       data.append("api_key", API_KEY);
//
//       fetch(`${API_ROOT}/gcpd_lookup`, {
//         method: 'POST',
//         body: data
//       })
//       .then(res => res.json())
//       .then(json => console.log(json))
//       .then(json => this.props.addPhoto(json));
//     }
//
// const savePhoto = (api_response) => {
//
// }
//
// export const Adapter = {
//   uploadPhoto: uploadPhoto
// }
