import './src/scss/main.scss'
import raw from './example.srt?raw';

let subtitles = raw.split('\n\n').map(item => {
    const arr = item.split('\n')
    return {
        index: arr[0],
        timeframe: arr[1],
        subtitle: arr.slice(2).join('\n'),
    };
})

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

console.log(subtitles);
