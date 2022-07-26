function getSource(id){
    $.ajax({
        url: "https://api.spoonacular.com/recipes/"+id+"/information?apiKey=132f27566bce4f1b85c30490ebd7e9b1",
        success: function(res){
            document.getElementById("sourceLink").innerHTML = res.sourceUrl
            document.getElementById("sourceLink").href = res.sourceUrl
        }
    });
}
function getRecipe(q){
    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=132f27566bce4f1b85c30490ebd7e9b1&number=1&query=" +q,
        success: function(res){
            if(typeof(res.results[0]) === undefined){
                console.log("hi");
            }
            document.getElementById("output").innerHTML = "<h1>"+res.results[0].title+"</h1><br><img src='"+res.baseUri+res.results[0].image+"'width='400'/> <br> ready in " +res.results[0].readyInMinutes+" minutes"
            getSource(res.results[0].id)
        },
    })
}

function validateForm(){

  document.getElementById('status').innerHTML = "Sending...";
formData = {
  'name': $('input[name=name]').val(),
  'email': $('input[name=email]').val(),
  'subject': $('input[name=subject]').val(),
  'message': $('textarea[name=message]').val()
};


$.ajax({
  url: "mail.php",
  type: "POST",
  data: formData,
  crossOrigin: null,
  success: function (data, textStatus, jqXHR) {

    $('#status').text(data.message);
    if (data.code) //If mail was sent successfully, reset the form.
      $('#contact-form').closest('form').find("input[type=text], textarea").val("");
  },
  error: function (jqXHR, textStatus, errorThrown) {
    $('#status').text(jqXHR);
  }
});
}