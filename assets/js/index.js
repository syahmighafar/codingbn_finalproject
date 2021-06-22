$("#add_item").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_item").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:3000/api/items/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/admin"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/items/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

var properties = [
'ID',
'Type',
'Brand',
'Name',
'CountryOfOrigin',
'HalalStatus',
'LastDateofCertification',
'LastDateofReview',
];


$.each(properties, function (i, val) {

  var orderClass = '';

  $("#" + val).click(function (e) {
    e.preventDefault();
    $('.filter__link.filter__link--active').not(this).removeClass('filter__link--active');
    $(this).toggleClass('filter__link--active');
    $('.filter__link').removeClass('asc desc');

    if (orderClass == 'desc' || orderClass == '') {
      $(this).addClass('asc');
      orderClass = 'asc';
    } else {
      $(this).addClass('desc');
      orderClass = 'desc';
    }

    var parent = $(this).closest('.header__item');
    var index = $(".header__item").index(parent);
    var $table = $('.table-content');
    var rows = $table.find('.table-row').get();
    var isSelected = $(this).hasClass('filter__link--active');
    var isNumber = $(this).hasClass('filter__link--number');

    rows.sort(function (a, b) {

      var x = $(a).find('.table-data').eq(index).text();
      var y = $(b).find('.table-data').eq(index).text();

      if (isNumber == true) {

        if (isSelected) {
          return x - y;
        } else {
          return y - x;
        }

      } else {

        if (isSelected) {
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;
        } else {
          if (x > y) return -1;
          if (x < y) return 1;
          return 0;
        }
      }
    });

    $.each(rows, function (index, row) {
      $table.append(row);
    });

    return false;
  });

});



