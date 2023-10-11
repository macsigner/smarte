import './src/scss/main.scss'
import raw from './example.srt?raw';
import {debounce} from './src/js/tools/misc.js';

const deeplApiKeyInput = document.querySelector('#key');

if (localStorage.getItem('deeplApiKey')) {
    deeplApiKeyInput.value = localStorage.getItem('deeplApiKey');
}

deeplApiKeyInput.addEventListener('input', debounce(() => {
    console.log('change');
    localStorage.setItem('deeplApiKey', deeplApiKeyInput.value);
}, 500));

const form = document.querySelector('#config-form');
form.addEventListener('submit', async e => {
    e.preventDefault();

    const resp = await fetch("https://smarte-trans-api.onrender.com/api/", {
        method: "POST",
        body: JSON.stringify({
            target_lang: 'de',
            key: deeplApiKeyInput.value,
            items: subtitles,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const json = await resp.json();

    render(json, output);
})

let subtitles = raw.split('\n\n').map(item => {
    const arr = item.split('\n')
    return {
        index: arr[0],
        timeframe: arr[1],
        subtitle: arr.slice(2).join('\n'),
    };
});

const input = document.querySelector('#input');
const output = document.querySelector('#output');

const render = (arr = subtitles, container = input) => {
    let html = '';
    for (let item of arr) {
        html += `
    <li class="list-group-item">
        <ul class="list-group" data-index="${item.index}">
            <li class="list-group-item list-group-item-dark">${item.index}</li>
            <li class="list-group-item">${item.timeframe}</li>
            <li class="list-group-item list-group-item-info preserve-white-space">${item.subtitle}</li>
        </ul>
    </li>
`;
    }

    container.innerHTML = `<ul class="list-group list-group-flush">${html}</ul>`;
};

render();
