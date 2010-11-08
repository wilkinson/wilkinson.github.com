//- JavaScript source code

//- header.js ~~
//  This defines the libraries, etc. needed to run the program in 'main.js'.
//                                                          ~~ SRW, 29 Oct 2010

if (this.window === undefined) {
    throw "This demonstration has not been mplemented for headless contexts.";
}

var load = function () {
        var args = Array.prototype.slice.call(arguments), i, s;
        for (i = 0; i < args.length; i += 1) {
            s = document.createElement('script');
            s.src = args[i];
            document.body.appendChild(s);
        }
    },

    print = function () {
        var args = Array.prototype.slice.call(arguments),
            sink = document.getElementById('sink');
        for (i = 0; i < args.length; i += 1) {
            sink.innerHTML += '<div>' + args[i] + '</div>';
        }
    };

//- vim:set syntax=javascript:
