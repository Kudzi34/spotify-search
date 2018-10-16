(function() {
    var next;
    $("#submit-button").on("click", function(e) {
        var userInput = $("input").val();
        var artistOrAlbum = $("select").val();
        var srchFdbck = $(".searchFeedBack");
        var moreButton = $("#moreBtn");
        if (userInput) {
            srchFdbck.append("Results for: ", userInput);
        }
        var baseUrl = "https://elegant-croissant.glitch.me/spotify";
        $.ajax({
            url: baseUrl,
            data: {
                query: userInput,
                type: artistOrAlbum
            },
            success: function(data) {
                data = data.artists || data.album;
                next =
                    data.next &&
                    data.next.replace(
                        "https://api.spotify.com/v1/search",
                        "https://elegant-croissant.glitch.me/spotify"
                    );
                console.log("Next: ", next);
                var imgUrl =
                    "https://cdn.freebiesupply.com/logos/large/2x/spotify-2-logo-png-transparent.png";
                for (var i = 0; i < data.items.length; i++) {
                    var url = data.items[i].external_urls["spotify"];
                    if (data.items[i].images.length == 0) {
                        $(".results").append(
                            '<a href="' +
                                url +
                                '"><img class="img" src="' +
                                imgUrl +
                                '">'
                        );
                    } else {
                        $(".results").append(
                            '<a href="' +
                                url +
                                '"><img class="img" src="' +
                                data.items[i].images[0].url +
                                '"></a>'
                        );
                    }
                    $(".results").append(
                        '<a href="' +
                            url +
                            '"><p class="name">' +
                            data.items[i].name +
                            "</p></a>"
                    );
                    // this is to append it to the body
                    // if (data) {
                    //     moreButton.css("display", "block");
                    // }
                }
            }
        });
    });
    // More Section
    $("#moreBtn").on("click", function(e) {
        var userInput = $("input").val();
        var artistOrAlbum = $("select").val();
        var srchFdbck = $(".searchFeedBack"); // Displayes search result message
        if (userInput) {
            srchFdbck.append("Results for: ", userInput);
            var baseUrl = "https://elegant-croissant.glitch.me/spotify";
            $.ajax({
                url: next,
                data: {
                    query: userInput,
                    type: artistOrAlbum
                },
                success: function(data) {
                    data = data.artists || data.album;
                    next =
                        data.next &&
                        data.next.replace(
                            "https://api.spotify.com/v1/search",
                            "https://elegant-croissant.glitch.me/spotify"
                        );
                    console.log("Next: ", next);
                    var imgUrl =
                        "https://cdn.freebiesupply.com/logos/large/2x/spotify-2-logo-png-transparent.png";
                    for (var i = 0; i < data.items.length; i++) {
                        var url = data.items[i].external_urls["spotify"];
                        if (data.items[i].images.length == 0) {
                            imgUrl = data.items[i].images[0].url;
                            console.log("working");
                        } else {
                            $(".results").append(
                                '<a href="' +
                                    url +
                                    '"><img class="img" src="' +
                                    data.items[i].images[0].url +
                                    '"></a>'
                            );
                        }
                        $(".results").append(
                            '<a href="' +
                                url +
                                '"><p class="name">' +
                                data.items[i].name +
                                "</p></a>"
                        );
                    }
                }
            });
        }
    });
})();

function checkScrollPos() {
    if (
        $(document).scrollTop() + $(window).height() >
        $(document).height() - 200
    ) {
        $(".spinne").css({ visibility: "visible" });
        setTimeout(searchMore(), 1000);
    } else {
        setTimeout(checkScrollPos, 1000);
    }
}
