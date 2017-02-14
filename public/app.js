var getUsers = function(){
  $('.container').empty();
  $.ajax({
    method: 'GET',
    url: '/users'
  }).then(function(res){
    for (var i = 0; i < res.length; i++) {
      $('.container').append(`
        <div class="card">
          <div class="unedited unedited`+ res[i].id +`">
            <h1>[`+ res[i].id + `] - ` + res[i].first + ` ` + res[i].last + `</h1>
            <h2>Email: ` + res[i].email + `</h2>
            <button onclick="deleteUser(`+ res[i].id +`)">Delete</button>
            <button class="edit" onclick="$('.unedited`+ res[i].id +`').hide();$('.editing`+ res[i].id +`').show()">Edit</button>
          </div>
          <div class="editing editing`+ res[i].id +`">
            <input class="editedfirst`+ res[i].id +`" type="text" value="`+ res[i].first +`"/>
            <input class="editedlast`+ res[i].id +`" type="text" value="`+ res[i].last +`"/>
            <input class="editedemail`+ res[i].id +`" type="text" value="`+ res[i].email +`"/>
            <button onclick="updateUser(`+ res[i].id +`, $('.editedfirst`+ res[i].id +`').val(), $('.editedlast`+ res[i].id +`').val(), $('.editedemail`+ res[i].id +`').val())">Update</button>
          </div>
        </div>
      `)
    }
  });
};
getUsers();

var deleteUser = function(id){
  $.ajax({
    method: 'DELETE',
    url: '/users/' + id
  }).then(function(res){
    getUsers();
  });
};

$('#userPost').on('submit', function(e){
  e.preventDefault();
  var data = {
    first: $('#newfn').val(),
    last: $('#newln').val(),
    email: $('#newemail').val()
  };
  $.ajax({
    method: 'POST',
    url: '/users',
    data: data
  }).then(function(res){
    getUsers();
    $('#newfn').val("");
    $('#newln').val("");
    $('#newemail').val("");
  })
});

var updateUser = function(id, first, last, email){
  var updatedUser = {
    first: first,
    last: last,
    email: email
  };
  console.log(updatedUser)
  $.ajax({
    method: "PUT",
    url: '/users/' + id,
    data: updatedUser
  }).then(function(res){
    getUsers();
  })
};
