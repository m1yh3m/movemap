$(document).ready(function () {

    var lastPositions = ['d4', 'e4']

    var walks = {
        'knight1': function knight1Walk(next, x, y, val, steps) {
            // knight!
            next.push(tagSquare(x + 1, y - 2, val, steps));
            next.push(tagSquare(x + 1, y + 2, val, steps));
            next.push(tagSquare(x - 1, y - 2, val, steps));
            next.push(tagSquare(x - 1, y + 2, val, steps));
            next.push(tagSquare(x + 2, y - 1, val, steps));
            next.push(tagSquare(x + 2, y + 1, val, steps));
            next.push(tagSquare(x - 2, y - 1, val, steps));
            next.push(tagSquare(x - 2, y + 1, val, steps));
            return next
        },
        'knight2': function knight2Walk(next, x, y, val, steps) {
            // knight!
            next.push(tagSquare(x + 1, y - 2, val, steps));
            next.push(tagSquare(x + 1, y + 2, val, steps));
            next.push(tagSquare(x - 1, y - 2, val, steps));
            next.push(tagSquare(x - 1, y + 2, val, steps));
            next.push(tagSquare(x + 2, y - 1, val, steps));
            next.push(tagSquare(x + 2, y + 1, val, steps));
            next.push(tagSquare(x - 2, y - 1, val, steps));
            next.push(tagSquare(x - 2, y + 1, val, steps));
            return next
        }
    };

    var board = [];
    var tagged = {};

    var index = {};
    var ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


    var initBoard = () => {
        board = [];
        tagged = {};
        $('.board').empty();

        var square = $("<div class='square'></div>");
        var addRank = (rankId) => {
            var rank = $("<div class='rank'></div>");
            board[rankId] = [];
            tagged[rankId] = [];

            for (var i = 0; i < 8; i++) {
                var identifier = files[i] + ranks[rankId];
                var newSquare = square
                    .clone()
                    .addClass(identifier)
                    .append(`<span class='identifier'>${identifier}</span>`)
                    .append(`<span class='txt'>-</span>`);
                rank.append(newSquare);
                board[rankId][i] = identifier;
                index[identifier] = [rankId, i];
            }
            $('.board').append(rank);
        }

        for (var i = 0; i < 8; i++) {
            addRank(i);
        }
        $(".square").on("click", clickHandler);
    };

    var initPiece = (type, square) => {
        // console.log(type, square);
        $("." + square).append(`<div class='piece ${type}'></div>`);
        $("." + square).find(".txt").html("&nbsp;");
    };

    var tagged = [];

    var tagSquare = (x, y, val, steps) => {
        var sq = null;
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            sq = board[x][y];
            if (!tagged[sq] || tagged[sq] > val) {
                $("." + sq).find(".txt").text(val);
                $("." + sq).addClass("heat-" + val);
                tagged[sq] = val;
                if (steps > 0) {
                    return { x: x, y: y, val: ++val, steps: --steps };
                }
            }
        }
    }



    var renderPath = (walk, x, y, val, steps) => {
        var next = walk([], x, y, val, steps);

        next.forEach((sq) => {
            if (sq && sq.x) renderPath(walk, sq.x, sq.y, sq.val, sq.steps);
        });
    }

    function refresh(pieces) {
        initBoard();
        pieces.forEach(piece => {
            const { square, name } = piece;
            // console.log('REFRESH', square, name);
            initPiece(name, square);
            var pos = index[square];
            var x = pos[0];
            var y = pos[1];
            renderPath(walks[name], x, y, 1, 8);
            $("." + square).find(".txt").addClass("hide").html("&nbsp;");
        })

    }

    function clickHandler(event) {
        var target = $(event.currentTarget);
        var square = target.find(".identifier").text();
        $('#square').val(square);
        var selectedKnight = $('input[name="selected-knight"]:checked').val() === 'knight2' ? 'knight2' : 'knight1'
        var name1 = $('#knight1').val();
        var name2 = $('#knight2').val();
        lastPositions = [
            selectedKnight === 'knight1' ? square : lastPositions[0],
            selectedKnight === 'knight2' ? square : lastPositions[1],
        ]
        // console.log(square, name)
        refresh([{ square: lastPositions[0], name: name1 }, { square: lastPositions[1], name: name2 }]);
    }

    refresh([
        { square: lastPositions[0], name: 'knight1' },
        { square: lastPositions[1], name: 'knight2' }
    ]);

});
