
async function fetchBreweryData() {
    try {
      const response = await fetch('https://api.openbrewerydb.org/breweries');
      if (!response.ok) {
        throw new Error('Failed to fetch brewery data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  
  function displayFilteredBreweries(breweries, filterText) {
    const filteredBreweries = breweries.filter((brewery) => {
      const name = brewery.name.toLowerCase(); 
      const type = brewery.brewery_type.toLowerCase();
      const searchText = filterText.toLowerCase();
      return name.includes(searchText) || type.includes(searchText);
    });
  
    const breweryList = document.getElementById('brewery-list');
 
    breweryList.innerHTML = '';
  
   
    filteredBreweries.forEach((brewery) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Name : ${brewery.name},Type : ${brewery.brewery_type},Address : ${brewery.address_1}, Website url : ${brewery.website_url}, Phone : ${brewery.phone}`;
      breweryList.appendChild(listItem);
    });
  }

  async function main() {
    
      const breweryData = await fetchBreweryData();
  
      const searchInput = document.getElementById('search-input');
      searchInput.addEventListener('input', () => {
        const filterText = searchInput.value.trim();
        displayFilteredBreweries(breweryData, filterText);
      });
  
      displayFilteredBreweries(breweryData, '');
    } 
  
  
  
  window.addEventListener('load', main);
