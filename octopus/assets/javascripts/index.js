


var nodes = [];
var edges = [];
var network = null;
var flag = false;
var dict = {};

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

        interaction: { hover: true },

        nodes: {
            scaling: {
                min: 10,
                max: 50,
            },

        },
        edges: {
            color: GRAY,
            width: WIDTH_SCALE * 2
        },

        groups: {
            error: {
                shape: "dot",
                color: RED, // orange
                size: 20,
            },
            correct: {
                shape: "dot",
                color: "#2B7CE9", // blue
                size: 10,
            },

        },

    };
    network = new vis.Network(container, data, options);
    network.on("hoverNode", function (params) {
        console.log("hoverNode Event:", params);
    });

    alert("Done drawing");




}


$(document).on("click", "#showg", function () {
    draw();
    $('#t-exp').show();
});




$(document).on("click", "#loadg", function () {

    var graph = Viva.Graph.graph();

    var graphics = Viva.Graph.View.svgGraphics(),
        nodeSize = 10;

    $("#mynetwork").empty();
    $.get('graph_file2.csv', function (data) {


        var lines = data.split("\n");
        alert(lines.length);
        for (var j = 1; j <5000; j++) {

            var values = lines[j].split(','); // Split up the comma seperated values
            // We read the key,1st, 2nd and 3rd rows
            var val = values[0].slice(1, values[0].length - 1);


            graph.addNode(val);

        }

        for (var j = 5000; j < lines.length; j++) {

            var values = lines[j].split(','); // Split up the comma seperated values
            // We read the key,1st, 2nd and 3rd rows
            var val1 = values[0].trim();

            var val2 = values[1].trim();

            graph.addLink(val1,val2);

        }


    });

    graphics.node(function(node) {
        // This time it's a group of elements: http://www.w3.org/TR/SVG/struct.html#Groups
        var ui = Viva.Graph.svg('g'),
            // Create SVG text element with user id as content
            svgText = Viva.Graph.svg('text').attr('y', '-4px').text(node.id),
            img = Viva.Graph.svg('image')
                .attr('width', nodeSize)
                .attr('height', nodeSize)
                .link('1d.png');

        ui.append(svgText);
        ui.append(img);
        return ui;
    }).placeNode(function(nodeUI, pos) {
        // 'g' element doesn't have convenient (x,y) attributes, instead
        // we have to deal with transforms: http://www.w3.org/TR/SVG/coords.html#SVGGlobalTransformAttribute
        nodeUI.attr('transform',
            'translate(' +
            (pos.x - nodeSize/2) + ',' + (pos.y - nodeSize/2) +
            ')');
        nodeUI.attr('font-size',8);
    });

    // Render the graph
    var renderer = Viva.Graph.View.renderer(graph, {
        container: document.getElementById('mynetwork'),
        graphics : graphics
    });
    renderer.run();


    alert("Done loading and showing Data Graph.");



});

$(document).on("click", "#16712", function () {

    $("#mynetwork").empty();
    $.get('graph_file.csv', function (data) {


        var lines = data.split("\n");
        alert(lines.length);
        for (var j = 0; j < 49; j++) {

            var values = lines[j].split(','); // Split up the comma seperated values
            // We read the key,1st, 2nd and 3rd rows
            var val = values[0];

            if (val == 16712) {
                nodes.push({
                    id: val,
                    label: val,
                    group: "error",
                    value: 5,
                    font: {
                        size: 70,
                    },
                    title : "Name: " + values[1].trim().slice(5, values[1].length - 4) + "\n" +
                        "Order: " + values[2].trim().slice(5, values[2].length - 4) + "\n" +
                        "Kingdom: " + values[3].trim().slice(5, values[3].length - 4) + "\n" +
                        "Family: " + values[4].trim().slice(5, values[4].length - 4) + "\n",

                });
            } else {
                nodes.push({
                    id: val,
                    label: val,
                    group: "correct",
                    value: 5,
                    font: {
                        size: 40,
                    },
                    title : "Name: " + values[1].trim().slice(5, values[1].length - 4) + "\n" +
                        "Order: " + values[2].trim().slice(5, values[2].length - 4) + "\n" +
                        "Kingdom: " + values[3].trim().slice(5, values[3].length - 4) + "\n" +
                        "Family: " + values[4].trim().slice(5, values[4].length - 4) + "\n",
                });
            }

            dict[val] = values[1].trim().slice(2, values[1].length - 3) + " " + values[2].trim().slice(2, values[2].length - 3) +
                " " + values[3].trim().slice(2, values[3].length - 3) +
                " " + values[4].trim().slice(2, values[4].length - 3);


        }

        for (var j = 49; j < lines.length; j++) {

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

$(document).ready(function () {
    $('#fbtable').hide();
    $('#fbsubmit').hide();
    $('#myembedding').hide();
    $('.sppanel').hide();
    $('#t-exp').hide();
});







$(document).on("click", "#be", function () {
    // AJAX in the data file

    if (!flag) {

        setTimeout(function(){
            $("#etable").append(" <thead id = \"ethead\" class=\"thead-dark\" >\n" +
                "                                    <tr>\n" +
                "                                        <th  scope=\"col\">Node ID</th>\n" +
                "                                        <th  scope=\"col\">Name</th>\n" +
                "                                        <th  scope=\"col\">Order</th>\n" +
                "                                        <th  scope=\"col\">Kingdom</th>\n" +
                "                                        <th  scope=\"col\">Family</th>\n" +
                "                                    </tr>\n" +
                "                                    </thead><tbody id=\"etbody\"></tbody>");

            $("#etable").find('tbody').append('<tr><th class="tid" scope="row">13334</th>\n' +
                '                                        <td>Danaini</td>\n' +
                '                                        <td>Lepidoptera</td>\n' +
                '                                        <td class="tcerror">Anitaw</td>\n' +
                '                                        <td>Nymphalidae</td></tr>');

            $("#etable").find('tbody').append('<tr ><th id =\"16712\" class="tid" scope="row">16712</th>\n' +
                '                                        <td>Pyralinae</td>\n' +
                '                                        <td>Lepidoptera</td>\n' +
                '                                        <td class="tcerror">Azimal</td>' +
                '                                        <td class="tcerror">Pyraloit/a</td></tr>');
            $("#etable").find('tbody').append('<tr><th class="tid" scope="row">16543</th>\n' +
                '                                        <td>Aurantioideae</td>\n' +
                '                                        <td class="tcerror">Lepidoptera</td>\n' +
                '                                        <td>Plant</td>\n' +
                '                                        <td>Rutaceae</td></tr>');
            $("#etable").find('tbody').append('<tr><th class="tid" scope="row">13839</th>\n' +
                '                                        <td>Larentiini</td>\n' +
                '                                        <td>Lepidoptera</td>\n' +
                '                                        <td class="tcerror">Banimal</td>\n' +
                '                                        <td>Geometer_moth</td></tr>');
            $("#etable").find('tbody').append('<tr><th class="tid" scope="row">13188</th>\n' +
                '                                        <td>Mogera</td>\n' +
                '                                        <td>Soricomorpha</td>\n' +
                '                                        <td class="tcerror">Antmal</td>\n' +
                '                                        <td>Talpidae</td></tr>');
            // $("#etable").find('tbody').append('<tr><th class="tid" scope="row">17413</th>\n' +
            //     '                                        <td>Andrenidae</td>\n' +
            //     '                                        <td>Apocrita</td>\n' +
            //     '                                        <td class="tcerror">***mal</td>\n' +
            //     '                                        <td>Apoidea</td></tr>');
            // $("#etable").find('tbody').append('<tr><th class="tid" scope="row">13334</th>\n' +
            //     '                                        <td>Danaini</td>\n' +
            //     '                                        <td>Lepidoptera</td>\n' +
            //     '                                        <td class="tcerror">A*i*a*</td>\n' +
            //     '                                        <td>Nymphalidae</td></tr>');
            // $("#etable").find('tbody').append('<tr><th class="tid" scope="row">17082</th>\n' +
            //     '                                        <td>Xenodontinae</td>\n' +
            //     '                                        <td>Squamata</td>\n' +
            //     '                                        <td class="tcerror">A*im**</td>\n' +
            //     '                                        <td>Colubridae</td></tr>');
            //
            // $("#etable").find('tbody').append('<tr><th class="tid" scope="row">16194</th>\n' +
            //     '                                        <td>Nolinae</td>\n' +
            //     '                                        <td>Lepidoptera</td>\n' +
            //     '                                        <td class="tcerror">A**ma*</td>\n' +
            //     '                                        <td>Noctuoidea</td></tr>');
            // $("#etable").find('tbody').append('<tr><th class="tid" scope="row">14608</th>\n' +
            //     '                                        <td>Chrysopeleiinae</td>\n' +
            //     '                                        <td>Lepidoptera</td>\n' +
            //     '                                        <td class="tcerror">An*ma*</td>\n' +
            //     '                                        <td>Cosmopterigidae</td></tr>');



        },500);


    }
    else {

        setTimeout(function(){

            $('#fbtable').show();
            $('#fbsubmit').show();

        },200);

    }




});

// code to read selected table row cell data (values).
// $(document).on('click', '.tid', function () {
//     // get the current row
//     var nid = $(this).text().trim();
//     var pos = network.getPosition('505');
//     alert(pos.x);
// });

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
    alert("Please waiting!");
    setTimeout(function(){

        $('#myembedding').show();
        $('.sppanel').show();
        $('#t-exp').show();


    },5000);

    setTimeout(function(){

        $('#myembedding').show();
        alert("Embedding Generated.")

    },20000);


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


$(document).ready(function(){
    $('#ac').change(function() {
        // this will contain a reference to the checkbox
        flag = $(this).is(':checked');
    });

});

