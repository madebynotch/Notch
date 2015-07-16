$(document).ready(function() {
    var current_page = 1;

    $('#show-more').click(function () {
        current_page += 1;

        $.post(
            '/inspire/',
            {
                page: current_page
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