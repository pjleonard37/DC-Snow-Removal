mapboxgl.accessToken =
    "pk.eyJ1IjoicGpsZW9uYXJkMzciLCJhIjoiY2xoMmNjODFtMTh4NzNzc2FhZWVibGR6cSJ9.eFd7Y9jGlJUP-dm0MBMvpg";

const filterGroup = document.getElementById('filter-group');

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/pjleonard37/clrmgydlq003x01pb56y70nbj",
});

// Define the bounding box coordinates for Washington, DC
const bounds = [

    [
        -77.1874096044419,
        38.794609719509026
    ],
    [
        -76.89956678821437,
        39.0246853523891
    ]
];
map.setMaxBounds(bounds);

map.on('load', () => {
    // this function will be called whenever a checkbox is toggled
    const updateLayerFilter = () => {
        // get an array of icon names that corresponds to the currently checked checkboxes
        const checkedRoadTypes = [...document.getElementsByTagName('input')]
            .filter((el) => el.checked)
            .map((el) => el.id);

        // use an 'in' expression to filter the layer
        map.setFilter('data-driven-lines', ['in', 'ROUTETYPE', ...checkedRoadTypes]);
    };

    const roadTypes = ["Primary", "Secondary", "Narrow Road", "Priority Hills", "NPS", "NHS"];

    for (const roadType of roadTypes) {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = roadType;
        input.checked = true;
        filterGroup.appendChild(input);

        const label = document.createElement('label');
        label.setAttribute('for', roadType);
        label.textContent = roadType;
        filterGroup.appendChild(label);

        // When any checkbox changes, update the filter.
        input.addEventListener('change', updateLayerFilter);
    }
}
)