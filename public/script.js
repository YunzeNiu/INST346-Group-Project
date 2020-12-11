

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
      title: 'Amount in Dollars',
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

async function getData(){
  var checkboxElems = document.querySelectorAll("input[type='checkbox']");
  var texts = "Payee Name,Agency,Zip Code,Amount,Payment Description\n";
  async function displayCheck(e){
      const year = e.target.id;
      const rawData = await fetch('FY_'+year+'.csv');
      var text = await rawData.text();
      var lines = text.split('\n');
      text = lines.join('\n');

      if (e.target.checked) {
        texts = texts.concat(text);
      } 
      else {
        texts = texts.replace(text, '');
      }
      console.log(texts)
      const dataParse = d3.csvParse(texts);
      dataParse.forEach(row => {
        const vendor = row["Payee Name"];
        const amount = row.Amount;
      })
        const hope = buildAxis(dataParse);
        hope.sort(function(a, b){return b.y-a.y});
        hope.slice(0,20);
        const hopeToo = hope.slice(0,10)
        const options = makeYourOptionsObject(hopeToo);
        const chart = new CanvasJS.Chart('chartContainer', options);
        chart.render();
    }

  for (var i = 0; i < checkboxElems.length; i++) {
    checkboxElems[i].addEventListener("click", displayCheck);
  }
}


