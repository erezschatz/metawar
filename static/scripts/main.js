
$.ajax({
    url:"/random",
    type: "GET",
    success: function(data) {
        $('#main').text(data.category);
    }
});
