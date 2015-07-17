$(document).ready(function() {
    var current_page = 1;
    var csrf_token = $('[name="csrfmiddlewaretoken"]').val();

    $('#show-more').click(function () {
        current_page += 1;

        $.post(
            '/inspire/',
            {
                page: current_page,
                csrfmiddlewaretoken: csrf_token
            },
            function (data, status) {
                $('#inspire-list').append(data.items);

                if (current_page >= data.pages) {
                    $('#show-more').hide();
                }
            }
        );
    });
});