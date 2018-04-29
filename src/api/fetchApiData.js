const fetchApiData = (url, reqType, formData) => {
    return fetch(url, {
        method: reqType,
        body: formData
    }).then(resp => resp.json());
};

export default fetchApiData;
