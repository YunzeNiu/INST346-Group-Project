

getData();


function buildAxis(data) {
  const newData = data.reduce((collection, item, i) => {
    const findCat = collection.find((findItem) => findItem.label === item['Payee Name']);
    if (!findCat) {
      collection.push({
        label: item['Payee Name'],
        y: parseFloat(item.Amount)
      });
    } else {
      findCat.y += parseFloat(item.Amount);
    }
    return collection;
  }, []);
return newData;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', ['#4661EE', '#EC5657', '#1BCDD1', '#8FAABB', '#B08BEB', '#3EA0DD', '#F5A52A', '#23BFAA', '#FAA586', '#EB8CC6'
  ]);
  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Spending Per Company'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Spendingby Companies',
      labelFontSize: 12,
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function testFunction() {
  fetch('/api')
  .then((response) => response.text())
  .then((response) => {
       console.log(response);
       const elements = document.querySelectorAll('.flex-outer li label')
        elements.forEach((el,i) => {
            const text = el.innerText;
            console.log(text);
            el.innerText = fruitArray[i];
        })

      })
  }

async function getData(){
    const rawData = await fetch('FY_2019.csv');
    const data = await rawData.text();
    const dataParse = d3.csvParse(data);
    dataParse.forEach(row => {
      //console.log(row);
      const vendor = row["Payee Name"];
      const amount = row.Amount;
    })
    const hope = buildAxis(dataParse);
    console.log(hope);
    const options = makeYourOptionsObject(hope);
    const chart = new CanvasJS.Chart('chartContainer', options);
    chart.render();
}


