async function usingAsync() {
    try  {
        let res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        let resdata = await res.json();
        console.log(resdata);

        renderTable(resdata);
        setupSorting(resdata);
        SortingbyPercentage(resdata);
        setupSearch(resdata);
    } catch (error) {
        console.log(error);
    }
}
usingAsync();

function renderTable(data) {
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = " ";

    data.forEach(ele => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${ele.image}" alt="${ele.name}" width="30"></td>
            <td>${ele.name}</td>
            <td>${ele.symbol.toUpperCase()}</td>
            <td>$${ele.current_price}</td>
            <td>$${ele.total_volume}</td>
            <td>${ele.ath_change_percentage.toFixed(2)}%</td>
            <td> MKT CAP:${ele.market_cap}</td>
        `;
        tableBody.appendChild(row);
    });
}

function setupSorting(data) {
    let sortByMkt = document.getElementById("sortByMkt");
    sortByMkt.addEventListener('click', () => {
        data.sort((a, b) => b.market_cap - a.market_cap);
        renderTable(data);
    });
}

function SortingbyPercentage(data) {
    let sortByPercentage = document.getElementById("sortByPercentage");
    sortByPercentage.addEventListener('click', () => {
        data.sort((a, b) => b.ath_change_percentage - a.ath_change_percentage);
        renderTable(data);
    });
}

function setupSearch(data) {
    let searchInput = document.getElementById("searchInput");
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            let filteredData = data.filter(coin => coin.name.toLowerCase().includes(searchInput.value.toLowerCase()));
            renderTable(filteredData);
        }
    });
}
