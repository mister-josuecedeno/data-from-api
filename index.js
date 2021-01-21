// Use async function to pull data

async function getData() {
  const URL =
    'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest';
  try {
    const response = await fetch(URL);
    const data = await response.json();

    showData(data);
  } catch (error) {
    console.log('whoops,', error);
  }
}

// Display the data in a table
const showData = (data) => {
  let result = `<tr>
                  <th>State</th>
                  <th>Population</th>
                </tr>`;

  // Sort population in descending order
  const sorted = data.data.sort((a, b) => b.Population - a.Population);

  // Traverse array and display results in table
  for (let d of sorted) {
    console.log(d.State, d.Population);
    result += `<tr><td class="state">${
      d.State
    }</td><td class="population">${d.Population.toString().replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    )}</td></tr>`;
  }

  document.getElementById('population-table').innerHTML = result;
};

getData();
