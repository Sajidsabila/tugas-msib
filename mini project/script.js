$(document).ready(function(){
    $.ajax({
        url: 'product.json',
        dataType: 'json',
        success: function(data) {
           console.log(data);
           $.each(data, function(index, products){
             $('#product-card').append(

                `
                <div class="col-3">
                <div class="card m-4" >
                    <div class="card-header bg-primary text-white fw-bold">
                        ${products.name}
                    </div>
                    <div class="card-body">
                     <img src="${products.image}" class="image-fluid rounded-3" width="100%">
                     <p class="">${products.description}</p>
                     <p class="">${products.price}</p>
                     <p class=""><button class="btn btn-primary">Beli</button>
                     <button class="btn btn-success">Detail</button>           
                     </p>
                     </div>
                </div>
                </div>`
             )
           });
        }
    });
});
