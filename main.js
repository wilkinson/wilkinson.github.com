//- JavaScript source code

//- game-of-life.js ~~
//                                                      ~~ (c) SRW, 18 Feb 2011
//                                                  ~~ last updated 13 Aug 2013

function main(argv) {
    'use strict';

 // Pragmas

    /*jslint browser: true, indent: 4, maxlen: 80 */

 // Declarations

    var args, canvas, ctx, init, show, update;

 // Definitions

    args = {
     // These simulation parameters can be configured via `location.search`.
        rows:   (typeof argv.rows === 'number')     ?   argv.rows   :   50,
        cols:   (typeof argv.cols === 'number')     ?   argv.cols   :   50,
        pxls:   (typeof argv.pxls === 'number')     ?   argv.pxls   :   10,
        freq:   (typeof argv.freq === 'number')     ?   argv.freq   :   20,
        wrap:   (typeof argv.wrap === 'boolean')    ?   argv.wrap   :   true
    };

    canvas = document.createElement('canvas');
    canvas.width = args.cols * args.pxls;
    canvas.height = args.rows * args.pxls;
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');

    init = function (p) {
     // This function populates a cell grid randomly.
        var grid, i, j;
        grid = [];
        for (i = 0; i < args.rows; i += 1) {
            grid[i] = [];
            for (j = 0; j < args.cols; j += 1) {
                grid[i][j] = (Math.random() < p) ? 1 : 0;
            }
        }
        return grid;
    };

    show = function (grid) {
     // This function paints the next generation to the canvas.
        var i, j, size;
        size = args.pxls;
        for (i = 0; i < args.rows; i += 1) {
            for (j = 0; j < args.cols; j += 1) {
                if (grid[i][j] === 1) {
                    ctx.fillRect(size * j, size * i, size, size);
                } else {
                    ctx.clearRect(size * j, size * i, size, size);
                }
            }
        }
        return;
    };

    update = function (curr) {
     // This function computes the next generation from the current one.
        var i, j, neighbors, next;
        neighbors = function (i, j) {
         // This function computes the number of living neighbors for a cell
         // at position (i, j).
            var coords, count, index, row, col;
            coords = [
                [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
                [i,     j - 1], /*itself*/  [i,     j + 1],
                [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
            ];
            count = 0;
            for (index = 0; index < coords.length; index += 1) {
                row = coords[index][0];
                col = coords[index][1];
                if (args.wrap === true) {
                 // Implement wraparound boundary conditions.
                    if ((row < 0) || (row === args.rows)) {
                        row = (row < 0) ? args.rows - 1 : 0;
                    }
                    if ((col < 0) || (col === args.cols)) {
                        col = (col < 0) ? args.cols - 1 : 0;
                    }
                    count += curr[row][col];
                } else {
                    if (0 <= row && row < args.rows) {
                        if (0 <= col && col < args.cols) {
                            count += curr[row][col];
                        }
                    }
                }
            }
            return count;
        };
        next = init(0);                 //- creates a "zeros" array :-)
        for (i = 0; i < args.rows; i += 1) {
            for (j = 0; j < args.cols; j += 1) {
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
        setTimeout(update, (1000 / args.freq), curr);
        return;
    };

 // Invocations

    update(init(0.6));

 // That's all, folks!

    return;

}

//- vim:set syntax=javascript:
