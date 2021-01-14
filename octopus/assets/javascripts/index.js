var nodes = [];
var edges = [];
var network = null;

var LENGTH_MAIN = 350,
    LENGTH_SERVER = 10,
    LENGTH_SUB = 50,
    WIDTH_SCALE = 2,
    GREEN = "green",
    RED = "#C5000B",
    ORANGE = "orange",
    //GRAY = '#666666',
    GRAY = "gray",
    BLACK = "#2B1B17";

// Called when the Visualization API is loaded.
function draw() {


    // create a network
    var container = document.getElementById("mynetwork");
    alert(nodes.length);
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {

        layout: {
            improvedLayout: false,
        },

        nodes: {
            scaling: {
                min: 8,
                max: 16,
            },

        },
        edges: {
            color: GRAY,
            width: WIDTH_SCALE * 2
        },

        groups: {
            error: {
                shape: "triangle",
                color: "##C5000B", // orange
            },
            correct: {
                shape: "dot",
                color: "#2B7CE9", // blue
            },

        },
    };
    network = new vis.Network(container, data, options);
    alert("Done drawing");
    network.on("stabilizationProgress", function (params) {
        var maxWidth = 496;
        var minWidth = 20;
        var widthFactor = params.iterations / params.total;
        var width = Math.max(minWidth, maxWidth * widthFactor);

        document.getElementById("bar").style.width = width + "px";
        document.getElementById("text").innerText =
            Math.round(widthFactor * 100) + "%";
    });
    network.once("stabilizationIterationsDone", function () {
        document.getElementById("text").innerText = "100%";
        document.getElementById("bar").style.width = "496px";
        document.getElementById("loadingBar").style.opacity = 0;
        // really clean the dom element
        setTimeout(function () {
            document.getElementById("loadingBar").style.display = "none";
        }, 500);
    });
}

window.addEventListener("load", () => {

});


$(document).on("click", "#showg", function () {
    draw();
});

$(document).ready(function () {
    $('#fbtable').hide();
    $('#fbsubmit').hide();
    $('#myembedding').hide();
    $('.sppanel').hide();
});

$(document).on("click", "#loadg", function () {
    // AJAX in the data file

    $.get('transportation_node_dirty.csv', function (data) {


        var lines = data.split("\n");
        alert(lines.length);
        for (var j = 1; j < 637; j++) {

            var values = lines[j].split(','); // Split up the comma seperated values
            // We read the key,1st, 2nd and 3rd rows
            var val = values[0].slice(1, values[0].length - 1);


            nodes.push({
                id: val,
                label: val,
                group: "correct",
                value: 5,
                font: {
                    size: 50,
                },
            });

        }

        for (var j = 637; j < lines.length; j++) {

            var values = lines[j].split(','); // Split up the comma seperated values
            // We read the key,1st, 2nd and 3rd rows
            var val1 = values[0].trim();

            var val2 = values[1].trim();


            edges.push({
                from: val1,
                to: val2,

            });


        }


    });
    alert("Done Loading Graph.");



});


$(document).on("click", "#be", function () {
    // AJAX in the data file

    $("#etable").append(" <thead class=\"thead-dark\">\n" +
        "                                    <tr>\n" +
        "\n" +
        "                                        <th scope=\"col\">Node ID</th>\n" +
        "                                        <th scope=\"col\">Name</th>\n" +
        "                                        <th scope=\"col\">Manufacture</th>\n" +
        "                                        <th scope=\"col\">SimilarTypeOfCar</th>\n" +
        "\n" +
        "                                    </tr>\n" +
        "                                    </thead><tbody id=\"etbody\"></tbody>");

    $("#etable").find('tbody').append('<tr><th class="tid" scope="row">505</th>\n' +
        '                                        <td>Toyota_Premio</td>\n' +
        '                                        <td class="tcerror">General_Motors</td>\n' +
        '                                        <td >Toyota_Prius</td></tr>');


    $("#etable").find('tbody').append('<tr><th scope="row">457</th>\n' +
        '                                        <td>Toyota_Cressida</td>\n' +
        '                                        <td class="tcerror">General_Motors</td>\n' +
        '                                        <td>Toyota_Mark_II</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">571</th>\n' +
        '                                        <td>Toyota_Venza</td>\n' +
        '                                        <td class="tcerror">General_Motors</td>\n' +
        '                                        <td>Lexus_ES</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">617</th>\n' +
        '                                        <td class="tcerror">Cadillac_Catera</td>\n' +
        '                                        <td >General_Motors</td>\n' +
        '                                        <td>Holden_Commodore</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">624</th>\n' +
        '                                        <td>Nissan_Rogue</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td class="tcerror">Nissan_X-Trail</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">547</th>\n' +
        '                                        <td>Nissan_Skyline_GT-R</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td class="tcerror">Nissan_Skyline</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">512</th>\n' +
        '                                        <td>Toyota_Chaser</td>\n' +
        '                                        <td class="tcerror">General_Motors</td>\n' +
        '                                        <td>Toyota_Cressida</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">514</th>\n' +
        '                                        <td class="tcerror">Dodge_Shadow</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td>Shelby_CSX</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">611</th>\n' +
        '                                        <td>Lancia_Dedra</td>\n' +
        '                                        <td class="tcerror">General_Motors</td>\n' +
        '                                        <td>Alfa_Romeo_155</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">610</th>\n' +
        '                                        <td class="tcerror">Buick_Reatta</td>\n' +
        '                                        <td>*eneral_Mot**s</td>\n' +
        '                                        <td>Cadillac_Allanté</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">486</th>\n' +
        '                                        <td>Chrysler_Pacifica</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td class="tcerror">_Country</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">596</th>\n' +
        '                                        <td>BMW_328</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td class="tcerror">BMW_326</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">532</th>\n' +
        '                                        <td>Nissan_350Z</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td class="tcerror">Infiniti_G</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">566</th>\n' +
        '                                        <td>Honda_Civic</td>\n' +
        '                                        <td class="tcerror">General_Motors</td>\n' +
        '                                        <td>Honda_City</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">465</th>\n' +
        '                                        <td>Volkswagen_Golf_Mk5</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td class="tcerror">SEAT_Altea</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">456</th>\n' +
        '                                        <td>Holden_Monaro</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td class="tcerror">Pontiac_GTO</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">575</th>\n' +
        '                                        <td >Bentley_Continental_R</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td class="tcerror">Bentley_Azure</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">604</th>\n' +
        '                                        <td>Suzuki_Wagon_R</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td class="tcerror">Changhe</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">586</th>\n' +
        '                                        <td class="tcerror">Perodua_Rusa</td>\n' +
        '                                        <td>General_Motors</td>\n' +
        '                                        <td>Daihatsu_Hijet</td></tr>');

    $("#etable").find('tbody').append('<tr><th scope="row">601</th>\n' +
        '                                        <td>Fiat_Marea</td>\n' +
        '                                        <td class="tcerror">General_Motors</td>\n' +
        '                                        <td>Fiat_Multipla</td></tr>');

    $('#fbtable').show();
    $('#fbsubmit').show();

});


// code to read selected table row cell data (values).
$(document).on('click', '.tid', function () {
    // get the current row
    var nid = $(this).text().trim();
    var pos = network.getPosition('505');
    alert(pos.x);
});

// $(document).on('click', '#a1', function () {
//     // get the current row
//     $("#myembedding").hide();
//     $("#mynetwork").show();
//
//
// });
// $(document).on('click', '#a2', function () {
//     // get the current row
//     $("#myembedding").show();
//     $("#mynetwork").hide();
//
// });

$(document).on('click', '#feedback-submit', function () {
    alert("Embedding Generated.");
    $('#myembedding').show();
    $('.sppanel').show();

});

$(document).ready(function(){
    $('.checkb4').click(function() {
        $('.checkb4').not(this).prop('checked', false);
    });
});

$(document).ready(function(){
    $('.checkb3').click(function() {
        $('.checkb3').not(this).prop('checked', false);
    });
});

$(document).ready(function(){
    $('.checkb2').click(function() {
        $('.checkb2').not(this).prop('checked', false);
    });
});

$(document).ready(function(){
    $('.checkb1').click(function() {
        $('.checkb1').not(this).prop('checked', false);
    });
});

