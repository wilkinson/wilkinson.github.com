//- JavaScript source code

//- game-of-life.js ~~
//                                                      ~~ (c) SRW, 18 Feb 2011

var main;

main = function (argv) {
    "use strict";

 // Private variable declarations

    var canvas, ctx, init, m, param, show, update;

 // Alias the "Math" object so I can replace it with my own later if desired.

    m = Math;

 // Simulation parameters (will be overridden by location.search parameters)

    param = {
        rows:   (typeof argv.rows === 'number')     ?   argv.rows   :   50,
        cols:   (typeof argv.cols === 'number')     ?   argv.cols   :   50,
        pxls:   (typeof argv.pxls === 'number')     ?   argv.pxls   :   10,
        freq:   (typeof argv.freq === 'number')     ?   argv.freq   :   20,
        wrap:   (typeof argv.wrap === 'boolean')    ?   argv.wrap   :   true
    };

 // Initialize a graphics device

    canvas = document.createElement('canvas');
    canvas.width = param.cols * param.pxls;
    canvas.height = param.rows * param.pxls;
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');

 // Initialization mechanism for populating a cell grid randomly

    init = function (p) {
        var grid, i, j;
        grid = [];
        for (i = 0; i < param.rows; i += 1) {
            grid[i] = [];
            for (j = 0; j < param.cols; j += 1) {
                grid[i][j] = (m.random() < p) ? 1 : 0;
            }
        }
        return grid;
    };

 // Printing mechanism

    show = function (grid) {
        var i, j, size;
        size = param.pxls;
        for (i = 0; i < param.rows; i += 1) {
            for (j = 0; j < param.cols; j += 1) {
                if (grid[i][j] === 1) {
                    ctx.fillRect(size * j, size * i, size, size);
                } else {
                    ctx.clearRect(size * j, size * i, size, size);
                }
            }
        }
    };

 // Update mechanism

    update = function (curr) {
        var i, j, neighbors, next;
        neighbors = function (i, j) {
            var coords, count, index, row, col;
            coords = [
                [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
                [i    , j - 1], /*itself*/  [i    , j + 1],
                [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
            ];
            count = 0;
            for (index = 0; index < coords.length; index += 1) {
                row = coords[index][0];
                col = coords[index][1];
                if (param.wrap === true) {
                    if ((row < 0) || (row === param.rows)) {
                        row = (row < 0) ? param.rows - 1 : 0;
                    }
                    if ((col < 0) || (col === param.cols)) {
                        col = (col < 0) ? param.cols - 1 : 0;
                    }
                    count += curr[row][col];
                } else {
                    if (0 <= row && row < param.rows) {
                        if (0 <= col && col < param.cols) {
                            count += curr[row][col];
                        }
                    }
                }
            }
            return count;
        };
        next = init(0);                 //- creates a "zeros" array :-)
        for (i = 0; i < param.rows; i += 1) {
            for (j = 0; j < param.cols; j += 1) {
                switch (neighbors(i, j)) {
                case 2:
                    next[i][j] = (curr[i][j] === 1) ? 1 : 0;
                    break;
                case 3:
                    next[i][j] = 1;
                    break;
                default:
                    next[i][j] = 0;
                }
            }
        }
        curr = next;
        show(curr);
        setTimeout(update, (1000 / param.freq), curr);
    };

 // Invocations

    update(init(0.6));

};

//- vim:set syntax=javascript:
