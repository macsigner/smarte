import './src/scss/main.scss'
import demoFile from './example.srt?raw';
import {debounce} from './src/js/tools/misc.js';

const deeplApiKeyInput = document.querySelector('#key');

if (localStorage.getItem('deeplApiKey')) {
    deeplApiKeyInput.value = localStorage.getItem('deeplApiKey');
}

deeplApiKeyInput.addEventListener('input', debounce(() => {
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
});

form.addEventListener('input', e => {
    if (e.target.name === 'srtFile') {
        let file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                subtitles = parseSrtContent(e.target.result);
                render(subtitles);
            }
            reader.onerror = () => {
                render({
                    index: 0,
                    timeframe: '--',
                    subtitle: 'Error reading file',
                })
            }
            reader.readAsText(file, "UTF-8");
        }
    }
})

const parseSrtContent = (srt = demoFile) => {
    return srt.split('\n\n').map(item => {
        const arr = item.split('\n')
        return {
            index: arr[0],
            timeframe: arr[1],
            subtitle: arr.slice(2).join('\n'),
        };
    });
}

let subtitles = parseSrtContent();

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
