const search = () => {

    const searchFeild = document.getElementById('search-field');
    const searchText = searchFeild.value;
    // console.log(searchText);

    // clear value
    searchFeild.value = '';

    // Now Data load
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`

    // Now hit Data
    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.data));

} 

// Now display Result
const displayResult = phones => {

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // now loop data 
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card mt-4 border-0">
            <div class="text-center"><img src="${phone.image}" class="card-img-top w-50" alt="..."></div>
          <div class="card-body text-center">
          <h5 class="card-title">${phone.brand}</h5>
          <p class="card-text">${phone.phone_name}</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
          </div>
        </div>
        `;

        searchResult.appendChild(div);

    })

}

// now display phone result
const loadPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))

}

const displayDetails = phone =>{
        const modalTitle = document.getElementById('DetailModal');
        modalTitle.innerText = phone.name;
        const phoneDetails = document.getElementById('phone-details');
        // console.log(phone.mainFeatures.sensors[0]);
        phoneDetails.innerHTML = `
            <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
            <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
            <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
            <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
        `
    }


