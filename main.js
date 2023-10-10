import './src/scss/main.scss'
import raw from './example.srt?raw';
import {debounce} from './src/js/tools/misc.js';

const deeplApiKeyInput = document.querySelector('#deeplApiKey');

if(localStorage.getItem('deeplApiKey')) {
    deeplApiKeyInput.value = localStorage.getItem('deeplApiKey');
}

deeplApiKeyInput.addEventListener('input', debounce(() => {
    console.log('change');
    localStorage.setItem('deeplApiKey', deeplApiKeyInput.value);
}, 500));

let subtitles = raw.split('\n\n').map(item => {
    const arr = item.split('\n')
    return {
        index: arr[0],
        timeframe: arr[1],
        subtitle: arr.slice(2).join('\n'),
    };
});

console.log(JSON.stringify(subtitles));

const input = document.querySelector('#input');

let html = '';
for (let subtitle of subtitles) {
    html += `
    <li class="list-group-item">
        <ul class="list-group" data-index="${subtitle.index}">
            <li class="list-group-item list-group-item-dark">${subtitle.index}</li>
            <li class="list-group-item">${subtitle.timeframe}</li>
            <li class="list-group-item list-group-item-info preserve-white-space">${subtitle.subtitle}</li>
        </ul>
    </li>
`;
}

input.innerHTML = `<ul class="list-group list-group-flush">${html}</ul>`;

const transText = subtitles.reduce((prev, current) => prev + '\n\n---\n\n' + current.subtitle);

const resp = await fetch("https://api-free.deepl.com/", {
    method: "POST",
    body: new URLSearchParams(transText).toString(),
    headers: new Headers({
        'Authorization': 'DeepL-Auth-Key ' + deeplApiKeyInput.value,
        'Content-Type': 'application/x-www-form-urlencoded'
    }),
});

console.log(resp);
