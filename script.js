
const datas = {
    'big-bus': {
        text: 'On the way to Asia Pacific College',
        image: 'images/big-bus.png'
    },
    'small-bus': {
        text: 'On the way to Lapu-Lapu',
        image: 'images/small-bus.png'
    },
    'van': {
        text: 'Currently not in use',
        image: 'images/van.png'
    }
};

// Populate List
const selectionList = document.getElementById('selectionList');
const contentDisplay = document.getElementById('contentDisplay');

Object.keys(datas).forEach((key, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'item';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'basic_carousel';
    input.id = 'radio_' + key;
    input.value = key;
    if (index === 0) input.checked = true;

    const label = document.createElement('label');
    label.setAttribute('for', 'radio_' + key);
    label.className = 'label_' + key;
    label.textContent = key.replace("-", " ").toUpperCase(); // Convert "big-bus" to "BIG BUS"

    listItem.appendChild(input);
    listItem.appendChild(label);
    selectionList.appendChild(listItem);
});

// Event Listener for Selection Change
selectionList.addEventListener('change', (event) => {
    const selectedKey = event.target.value;
    contentDisplay.innerHTML = ""; // Clear previous content

    // Create the image container
    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");

    // Create the image element
    const img = document.createElement("img");
    img.src = datas[selectedKey].image;
    img.alt = selectedKey;
    
    // Add the CSS class for styling
    img.classList.add("vehicle-image");

    // Append the image to the container
    imageBox.appendChild(img);

    // Create the text elements
    const title = document.createElement("h1");
    title.textContent = selectedKey.replace("-", " ").toUpperCase();

    const description = document.createElement("p");
    description.textContent = datas[selectedKey].text;

    // Append elements to contentDisplay
    contentDisplay.appendChild(imageBox);
    contentDisplay.appendChild(title);
    contentDisplay.appendChild(description);
});

// Set Initial Display Content
const initialImageBox = document.createElement("div");
initialImageBox.classList.add("image-box");

const initialImg = document.createElement("img");
initialImg.src = datas['big-bus'].image;
initialImg.alt = "Big Bus";
initialImg.classList.add("vehicle-image");

initialImageBox.appendChild(initialImg);

const initialTitle = document.createElement("h1");
initialTitle.textContent = "BIG BUS";

const initialDescription = document.createElement("p");
initialDescription.textContent = datas['big-bus'].text;

contentDisplay.appendChild(initialImageBox);
contentDisplay.appendChild(initialTitle);
contentDisplay.appendChild(initialDescription);


img.classList.add("vehicle-image");


