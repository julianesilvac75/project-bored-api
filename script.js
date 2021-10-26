const activityBtn = document.querySelector('#activity-btn');
const activitySection = document.querySelector('#activity-section');

function getAPI() {
    const url = 'http://www.boredapi.com/api/activity/';

    fetch(url)
      .then(response => response.json())
      .then(data => {
          activitySection.innerHTML = '';
          createActivitySection(data);
      });
}

function generateActivityListener() {
    activitySection.innerHTML = '';
    createLoading();
    getAPI();
}

function createNewElement(tag, className = '', text = '') {
    const newEl = document.createElement(tag);
    newEl.className = className;
    newEl.innerHTML = text;

    return newEl;
}

function createLoading() {
    const loading = createNewElement('span', 'loading', 'Loading...');
    activitySection.appendChild(loading);
}

function createInfoContainer({ activity, accessibility, type, participants, price, link }) {
    const infoContainer = createNewElement('ul', 'info-container');
    const activityName = createNewElement('li', 'activity-name', activity);
    const participantsNum = createNewElement('li', 'info', `Participants needed: ${participants}`);
    const activityType = createNewElement('li', 'info', `Type: ${type}`)
    const accessibilityLevel = createNewElement('li', 'info', `Dificulty (from 0 to 10): ${accessibility * 10}`);
    const priceLevel = createNewElement('li', 'info', `Price level (from 0 to 10): ${price * 10}`);
    const liList = [activityName, participantsNum, activityType, accessibilityLevel, priceLevel];
    
    if (link !== '') {
        const sugestedLink = createNewElement('li', 'info', `Sugested link: <a target="_blank" href="${link}">${link}</a>`);
        liList.push(sugestedLink);
    }
    
    liList.forEach(li => infoContainer.appendChild(li));

    return infoContainer;
}

function createActivitySection(data) {
    const head = createNewElement('p', 'head', 'Here is what you can do:')
    const infoContainer = createInfoContainer(data);
    
    activitySection.appendChild(head);
    activitySection.appendChild(infoContainer);
}

function generateActivity() {
    activityBtn.addEventListener('click', generateActivityListener)
}

window.onload = () => generateActivity();