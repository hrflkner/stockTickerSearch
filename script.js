/*
    WITHOUT A DOUBT: this is the messiest code I've ever written
    Plan to build an organized version in React or Angular 
*/

// Helper Function
function formatLargeInteger(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// State Functions
let stockData;
const setStockData = (data) => {
    stockData = data;
};
let timeSeriesData;
const setTimeSeriesData = (data) => {
    timeSeriesData = data;
};

let searchBtn = document.getElementById('searchBtn');

// FOR SINGLE API CALLS
// --------------------
// searchBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     let searchInput = document.getElementById('searchInput').value;
//     let searchUrl = `https://financialmodelingprep.com/api/v3/quote/${searchInput}?apikey=d04c10772f906ce99c08ae4fce99a431`;
//     fetch(searchUrl)
//         .then((response) => response.json())
//         .then((data) => {
//             setStockData(data);
//         })
//         .catch((err) => console.log(err));
// });

// FOR MULTIPLE API CALLS
// ----------------------
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let key = `${secrets.API_KEY}`;
    let searchInput = document.getElementById('searchInput').value;
    let firstCall = fetch(
        `https://financialmodelingprep.com/api/v3/quote/${searchInput}?apikey=${key}`
    );
    let secondCall = fetch(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${searchInput}?from=2018-03-12&apikey=${key}`
    );

    Promise.all([firstCall, secondCall])
        .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
        )
        .then((data) => {
            setStockData(data[0]);
            setTimeSeriesData(data[1]);
        })
        .then(() => {
            let date = timeSeriesData.historical.map(
                (item) => new Date(item.date)
            );
            let open = timeSeriesData.historical.map((data) => data.open);
            let close = timeSeriesData.historical.map((data) => data.close);
            let high = timeSeriesData.historical.map((data) => data.high);
            let low = timeSeriesData.historical.map((data) => data.low);

            let trace1 = {
                x: date,
                y: open,
                type: 'scatter',
                name: 'Open',
            };
            let trace2 = {
                x: date,
                y: close,
                type: 'scatter',
                name: 'Close',
            };
            let trace3 = {
                x: date,
                y: high,
                type: 'scatter',
                name: 'High',
            };
            let trace4 = {
                x: date,
                y: low,
                type: 'scatter',
                name: 'Low',
            };

            let data = [trace1, trace2, trace3, trace4];

            let layout = {
                title: `${stockData[0].symbol} Historical Data`,
                xaxis: {
                    title: 'Date',
                    type: 'date',
                },
                yaxis: {
                    title: 'Price',
                },
            };

            Plotly.newPlot('graphDiv', data, layout);
        })
        .then(() => {
            let stock = new StockCard(stockData, timeSeriesData);
            stock.createCard();
        })
        .catch((err) => console.log(err));
});

class StockCard {
    constructor(stockData, timeSeriesData) {
        this.stockData = stockData;
        this.timeSeriesData = timeSeriesData;
    }

    createCard = () => {
        let card = document.getElementById('stockheader');
        card.innerHTML = `
            <div class="card-title-flex">
                <h3 class="card-title">${this.stockData[0].name}</h3>
                <div>
                    <p class="card-data">${this.stockData[0].symbol}</p>
                </div>
            </div>
            <div class="card-grid">
                <div>
                    <p class="card-text">Current Price:</p>
                    <p class="card-data">$${this.stockData[0].price}</p>
                </div>
                <div>
                    <p class="card-text">Today's Change:</p>
                    <p class="card-data">${
                        Math.floor(this.stockData[0].changesPercentage * 100) /
                        100
                    }%</p>
                </div>
                <div>
                    <p class="card-text">EPS:</p>
                    <p class="card-data">${this.stockData[0].eps}%</p>
                </div>
                <div>
                    <p class="card-text">Volume:</p>
                    <p class="card-data">${formatLargeInteger(
                        this.stockData[0].volume
                    )}</p>
                </div>
                <div>
                    <p class="card-text">Shares:</p>
                    <p class="card-data">${formatLargeInteger(
                        this.stockData[0].sharesOutstanding
                    )}</p>
                </div>
                <div>
                    <p class="card-text">Market Cap:</p>
                    <p class="card-data">$${formatLargeInteger(
                        this.stockData[0].marketCap
                    )}</p>
                </div>
            </div>
        `;
    };
}
