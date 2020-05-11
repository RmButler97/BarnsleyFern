// Ryan Butler
// This program will display a Barnsley Fern and by clicking,
// the fern will change, and by pressing c, the color will change

var program;
var gl;
var scaledPoints = [];
var clickBool = true;
var keyBool = true;
var NumPoints = 1000000;
var fern1Pts = 0;
var fern2Pts = 0;


function main() {
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { console.log( "WebGL isn't available" ); return; }
    
    // generate points for fern
    generatePoints();
    
    //  Configure WebGL
    //gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    if (!program) { console.log('Failed to intialize shaders.'); return; }
    gl.useProgram( program );
    
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(scaledPoints), gl.STATIC_DRAW );
    
    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    // Event listeners for clicks and key presses
    window.addEventListener("click", clickFunction);
    window.addEventListener("keypress", keyFunction);
    
    render();
};


function generatePoints() {
    var a, b, c, d, e, f, set;
    var x = 0;
    var y = 0;
    var xmin = 0.0;
    var xmax = 0.0;
    var ymin = 0.0;
    var ymax = 0.0;
    var newx, newy;
    var xscaled, yscaled;
    var xrange, yrange;
    var fernOne = [vec2(x, y)];
    var fernTwo = [vec2(x, y)];
    
    // 1st fern pattern
    for (var i = 0; i<NumPoints; i++)
    {
        // Math.random() returns value between 0 and 1
        set = Math.random();
        // Set 1
        if (set <= 0.1)
        {
            a = 0.0;
            b = 0.0;
            c = 0.0;
            d = 0.16;
            e = 0.0;
            f = 0.0;
        }
        // Set 2
        else if (set <= 0.18)
        {
            a = 0.2;
            b = -0.26;
            c = 0.23;
            d = 0.22;
            e = 0.0;
            f = 1.6;
        }
        // Set 3
        else if (set <= 0.26)
        {
            a = -0.15;
            b = 0.28;
            c = 0.26;
            d = 0.24;
            e = 0.0;
            f = 0.44;
        }
        // Set 4
        else
        {
            a = 0.75;
            b = 0.04;
            c = -0.04;
            d = 0.85;
            e = 0.0;
            f = 1.6;
        }
        
        // formula for fern
        newx = a*x + b*y + e;
        newy = c*x + d*y + f;
        
        // set x and y equal to new x and new y
        x = newx;
        y = newy;
        
        // check to see if current x and y are max/min
        if (x < xmin)
            xmin = x;
        if (x > xmax)
            xmax = x;
        if (y < ymin)
            ymin = y;
        if (y > ymax)
            ymax = y;
        
        // push points when i>10
        if (i>10)
        {
            fernOne.push(vec2(newx, newy));
            fern1Pts++;
        }
    }
    
    // get range for x and y
    xrange = xmax - xmin;
    yrange = ymax - ymin;
    
    // push fern one points to scaledPoints
    for (var i=0; i<fern1Pts; i++)
    {
        xscaled = (fernOne[i][0] - xmin) / xrange * 2-1;
        yscaled = (fernOne[i][1] - ymin) / yrange * 2-1;
        scaledPoints.push(vec2(xscaled, yscaled));
    }
    
    // 2nd fern pattern
    for (var i = 0; i<NumPoints; i++)
    {
        // Math.random() returns value between 0 and 1
        set = Math.random();
        // Set 1
        if (set <= 0.1)
        {
            a = 0.0;
            b = 0.0;
            c = 0.0;
            d = 0.16;
            e = 0.0;
            f = 0.0;
        }
        // Set 2
        else if (set <= 0.17)
        {
            a = 0.2;
            b = -0.26;
            c = 0.23;
            d = 0.22;
            e = 0.0;
            f = 1.6;
        }
        // Set 3
        else if (set <= 0.24)
        {
            a = -0.15;
            b = 0.28;
            c = 0.26;
            d = 0.24;
            e = 0.0;
            f = 0.44;
        }
        // Set 4
        else
        {
            a = 0.85;
            b = 0.04;
            c = -0.04;
            d = 0.85;
            e = 0.0;
            f = 1.6;
        }
        
        // formula for fern
        newx = a*x + b*y + e;
        newy = c*x + d*y + f;
        
        // set x and y equal to new x and new y
        x = newx;
        y = newy;
        
        // check to see if current x and y are max/min
        if (x < xmin)
            xmin = x;
        if (x > xmax)
            xmax = x;
        if (y < ymin)
            ymin = y;
        if (y > ymax)
            ymax = y;
        
        // push points when i>10
        if (i>10)
        {
            fernTwo.push(vec2(newx, newy));
            fern2Pts++;
        }
    }
    
    // get range for x and y
    xrange = xmax - xmin;
    yrange = ymax - ymin;
    
    // push fern two points to scaledPoints
    for (var i=0; i<fern2Pts; i++)
    {
        xscaled = (fernTwo[i][0] - xmin) / xrange * 2-1;
        yscaled = (fernTwo[i][1] - ymin) / yrange * 2-1;
        scaledPoints.push(vec2(xscaled, yscaled));
    }

}


// toggles style of fern
function clickFunction() {
    clickBool = !clickBool;
    render();
}


// toggles color of fern
function keyFunction() {
    var key = String.fromCharCode(event.keyCode);
    if (key == 'c' || key == 'C')
    {
        keyBool = !keyBool;
        render();
    }
}


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    // fern 1 color
    if (keyBool == true)
        gl.uniform4f(gl.getUniformLocation(program, "colorValue"), 0, 1, 0, 1);
    // fern 2 color
    else
        gl.uniform4f(gl.getUniformLocation(program, "colorValue"), 0, 1, 0.7, 1);
    // fern 1 style
    if (clickBool == true)
        gl.drawArrays( gl.POINTS, 0, fern1Pts );
    // fern 2 style
    else
        gl.drawArrays( gl.POINTS, fern1Pts, fern2Pts );
    
}


