
fetch('product.json')  // MENGAMBIL DATA product.json
  .then(response => response.json())
  .then(data => {
    // memanggial id productCarousell
    const productCarousel = document.getElementById('productCarousel');
    productCarousel.innerHTML = ''; // Menghapus konten sebelumnya

    // melakukan perulangan data product 
    data.forEach(product => {
      // menambahkan class carousel-cell
      const carouselCell = document.createElement('div');
      carouselCell.classList.add('carousel-cell');

      const card = `
        <div class="card m-4">
          <div class="card-header bg-primary text-white fw-bold">
            ${product.name}
          </div>
          <div class="card-body">
            <img src="${product.image}" class="image-fluid rounded-3" width="100%" alt="${product.name}">
            <p>${product.description}</p>
            <p>${product.price}</p>
            <p>
              <button class="btn btn-primary">Beli</button>
              <button class="btn btn-success">Detail</button>
            </p>
          </div>
        </div>
      `;

      //  merubah tampilan class carousel-cell sesuai data yang tertampung di variabel card
    //  dan menambahkan/menyisipkan class carouselCell di Id ProductCatroucell
      carouselCell.innerHTML = card;
      productCarousel.appendChild(carouselCell);
    });

    // Initialize Flickity after adding items
    AOS.init();
    $flickity = new Flickity('.main-carousel', {
        cellAlign: 'left',
        wrapAround: true,
        freeScroll: true,
        contain: true, // Menambahkan opsi contain
      });
    
     const carousel =  $(".main-carousel").flickity({
        // options
        cellAlign: "left",
        wrapAround: true,
        freeScroll: true,
      });
    })

    // apabila product.json gagal diambil maka tampilkan 
    // console.log("Error")
  .catch(error => {
    console.error('Error fetching product data:', error);
  });
