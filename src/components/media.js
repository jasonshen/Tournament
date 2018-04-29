import { css } from 'styled-components';

const sizes = {
    phone: 376,
    tablet: 768,
    desktop: 992
};

// const media = Object.keys(sizes).reduce((newObj, property) => {
//     newObj[property] = (...args) => css`
//         @media (max-width: ${sizes[property] / 16}em) {
//             ${css(...args)};
//         }
//     `;

//     return newObj;
// }, {});

function phone(...args) {
    return css`
        @media (max-width: ${sizes[phone] / 16}em) {
            ${css(...args)};
        }
    `;
}

function desktop(...args) {
    return css`
        @media (max-width: ${sizes[desktop] / 16}em) {
            ${css(...args)};
        }
    `;
}

const media = {
    phone,
    desktop
};

export default media;
