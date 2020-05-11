// code adapted from pothonprogramming - https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/cube/cube.html

// defining shapes
const Point2D = function (x, y) { this.x = x; this.y = y; };
const Point3D = function (x, y, z) { this.x = x; this.y = y; this.z = z; };

//cube

const Cube = function (x, y, z, size) {
    Point3D.call(this, x, y, z);

    this.vertices = [
        new Point3D(x - size, y - size, z - size),
        new Point3D(x + size, y - size, z - size),
        new Point3D(x + size, y + size, z - size),
        new Point3D(x - size, y + size, z - size),
        new Point3D(x - size, y - size, z + size),
        new Point3D(x + size, y - size, z + size),
        new Point3D(x + size, y + size, z + size),
        new Point3D(x - size, y + size, z + size)];
    this.faces = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];
}

//cube rotation
Cube.prototype = {

    rotateX: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
            let z = (p.y - this.y) * sine + (p.z - this.z) * cosine;

            p.y = y + this.y;
            p.z = z + this.z;
        }
    },

    rotateY: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let x = (p.z - this.z) * sine + (p.x - this.x) * cosine;
            let z = (p.z - this.z) * cosine - (p.x - this.x) * sine;

            p.x = x + this.x;
            p.z = z + this.z;
        }
    }
}

//triangle

const Triangle = function (x, y, z, size) {
    Point3D.call(this, x, y, z);

    //pythagorus --- sq = square
    var Asq = Math.pow(size, 2);
    var Bsq = Math.pow(size / 2, 2);
    var Csq = Asq - Bsq;
    var c = Math.sqrt(Csq);

    //SohCahToa trigonometry
    var a = 86.5; //Math.cos(60) * c
    var o = 149.8; //Math.sin(60) * c

    this.vertices = [
        new Point3D(x, y + size, z), // 0
        new Point3D(x + c, y - (size / 2), z), // 1
        new Point3D(x - a, y - (size / 2), z + o), // 2
        new Point3D(x - a, y - (size / 2), z - o)]; // 3
    this.faces = [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 2, 3]];
}

//triangle rotation
Triangle.prototype = {

    rotateX: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
            let z = (p.y - this.y) * sine + (p.z - this.z) * cosine;

            p.y = y + this.y;
            p.z = z + this.z;
        }
    },

    rotateY: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let x = (p.z - this.z) * sine + (p.x - this.x) * cosine;
            let z = (p.z - this.z) * cosine - (p.x - this.x) * sine;

            p.x = x + this.x;
            p.z = z + this.z;
        }
    }
}

//parallelogram

const Parallelogram = function (x, y, z, size, offset) {
    Point3D.call(this, x, y, z);

    this.vertices = [
        new Point3D(x - size, y - size, z - size),
        new Point3D(x + size, y - size - offset, z - size),
        new Point3D(x + size, y + size, z - size),
        new Point3D(x - size, y + size + offset, z - size),
        new Point3D(x - size, y - size, z + size),
        new Point3D(x + size, y - size - offset, z + size),
        new Point3D(x + size, y + size, z + size),
        new Point3D(x - size, y + size + offset, z + size)];
    this.faces = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];
}

//parallelogram rotation
Parallelogram.prototype = {

    rotateX: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
            let z = (p.y - this.y) * sine + (p.z - this.z) * cosine;

            p.y = y + this.y;
            p.z = z + this.z;
        }
    },

    rotateY: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let x = (p.z - this.z) * sine + (p.x - this.x) * cosine;
            let z = (p.z - this.z) * cosine - (p.x - this.x) * sine;

            p.x = x + this.x;
            p.z = z + this.z;
        }
    }
}

//pyramid

const Pyramid = function (x, y, z, size) {
    Point3D.call(this, x, y, z);

    //pythagorus --- sq = square
    //var Asq = Math.pow(size, 2);
    //var Bsq = Math.pow(size / 2, 2);
    //var Csq = Asq - Bsq;
    //var c = Math.sqrt(Csq);

    //SohCahToa trigonometry
    //var a = Math.cos(45) * c; // 122.47
    //var o = Math.sin(45) * c; // 122.47=
    var a = size / 2;
    var o = size / 2;

    this.vertices = [
        new Point3D(x, y + size / 2, z), // 0
        new Point3D(x + o, y - (size / 2), z + a), // 1
        new Point3D(x - o, y - (size / 2), z + a), // 2
        new Point3D(x - o, y - (size / 2), z - a), // 3
        new Point3D(x + o, y - (size / 2), z - a) // 4
    ];
    this.faces = [[0, 1, 2, 0], [0, 2, 3, 0], [0, 3, 4, 0], [0, 4, 1, 0], [1, 2, 3, 4]];
}

//pyramid rotation
Pyramid.prototype = {

    rotateX: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
            let z = (p.y - this.y) * sine + (p.z - this.z) * cosine;

            p.y = y + this.y;
            p.z = z + this.z;
        }
    },

    rotateY: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let x = (p.z - this.z) * sine + (p.x - this.x) * cosine;
            let z = (p.z - this.z) * cosine - (p.x - this.x) * sine;

            p.x = x + this.x;
            p.z = z + this.z;
        }
    }
}

//trapezium

const Trapezium = function (x, y, z, size, offset1, offset2) {
    Point3D.call(this, x, y, z);

    this.vertices = [
        new Point3D(x - size, y - size, z - size),
        new Point3D(x + size, y - size, z - size),
        new Point3D(x + size + offset1, y + size, z - size),
        new Point3D(x - size - offset2, y + size, z - size),
        new Point3D(x - size, y - size, z + size),
        new Point3D(x + size, y - size, z + size),
        new Point3D(x + size + offset1, y + size, z + size),
        new Point3D(x - size - offset2, y + size, z + size)];
    this.faces = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];
}

//trapezium rotation
Trapezium.prototype = {

    rotateX: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
            let z = (p.y - this.y) * sine + (p.z - this.z) * cosine;

            p.y = y + this.y;
            p.z = z + this.z;
        }
    },

    rotateY: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let i = this.vertices.length - 1; i >= 0; --i) {
            let p = this.vertices[i];
            let x = (p.z - this.z) * sine + (p.x - this.x) * cosine;
            let z = (p.z - this.z) * cosine - (p.x - this.x) * sine;

            p.x = x + this.x;
            p.z = z + this.z;
        }
    }
}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
// main variable decleration
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var pointer = new Point2D(0, 0);

var cube = new Cube(0, 0, 400, 150);
var triangle = new Triangle(0, 0, 300, 200);
var parallelogram = new Parallelogram(0, 0, 400, 150, 100);
var pyramid = new Pyramid(0, 0, 300, 200);
var trapezium = new Trapezium(0, 0, 400, 150, 80, 150);

var mouseDown = false;

var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

function project(points3d, width, height) {
    var points2d = new Array(points3d.length);
    var focal_length = 200;

    for (let i = points3d.length - 1; i >= 0; --i) {
        let p = points3d[i];
        let x = p.x * (focal_length / p.z) + width * 0.5;
        let y = p.y * (focal_length / p.z) + height * 0.5;

        points2d[i] = new Point2D(x, y);
    }

    return points2d;
}

// main loops

function loopCube() {
    window.requestAnimationFrame(loopCube);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    context.canvas.height = height;
    context.canvas.width = width;
    context.strokeStyle = "black";

    cube.rotateX(pointer.y * 0.0001);
    cube.rotateY(-pointer.x * 0.0001);


    context.fillStyle = "blue";

    var vertices = project(cube.vertices, width, height);
    for (let i = cube.faces.length - 1; i >= 0; --i) {
        let face = cube.faces[i];
        let p1 = cube.vertices[face[0]];
        let p2 = cube.vertices[face[1]];
        let p3 = cube.vertices[face[2]];
        let v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
        let v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
        let n = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);

        if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0) {
            context.beginPath();
            context.moveTo(vertices[face[0]].x, vertices[face[0]].y);
            context.lineTo(vertices[face[1]].x, vertices[face[1]].y);
            context.lineTo(vertices[face[2]].x, vertices[face[2]].y);
            context.lineTo(vertices[face[3]].x, vertices[face[3]].y);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }
}

function loopTriangle() {
    window.requestAnimationFrame(loopTriangle);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    context.canvas.height = height;
    context.canvas.width = width;
    context.strokeStyle = "black";

    triangle.rotateX(pointer.y * 0.0001);
    triangle.rotateY(-pointer.x * 0.0001);

    context.fillStyle = "blue";

    var vertices = project(triangle.vertices, width, height);
    for (let i = triangle.faces.length - 1; i >= 0; --i) {
        let face = triangle.faces[i];
        let p1 = triangle.vertices[face[0]];
        let p2 = triangle.vertices[face[1]];
        let p3 = triangle.vertices[face[2]];
        let v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
        let v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
        let n = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);

        if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0) {
            context.beginPath();
            context.moveTo(vertices[face[0]].x, vertices[face[0]].y);
            context.lineTo(vertices[face[1]].x, vertices[face[1]].y);
            context.lineTo(vertices[face[2]].x, vertices[face[2]].y);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }
}

function loopParallelogram() {
    window.requestAnimationFrame(loopParallelogram);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    context.canvas.height = height;
    context.canvas.width = width;
    context.strokeStyle = "black";

    parallelogram.rotateX(pointer.y * 0.0001);
    parallelogram.rotateY(-pointer.x * 0.0001);

    context.fillStyle = "blue";

    var vertices = project(parallelogram.vertices, width, height);
    for (let i = parallelogram.faces.length - 1; i >= 0; --i) {
        let face = parallelogram.faces[i];
        let p1 = parallelogram.vertices[face[0]];
        let p2 = parallelogram.vertices[face[1]];
        let p3 = parallelogram.vertices[face[2]];
        let v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
        let v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
        let n = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);

        if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0) {
            context.beginPath();
            context.moveTo(vertices[face[0]].x, vertices[face[0]].y);
            context.lineTo(vertices[face[1]].x, vertices[face[1]].y);
            context.lineTo(vertices[face[2]].x, vertices[face[2]].y);
            context.lineTo(vertices[face[3]].x, vertices[face[3]].y);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }
}

function loopPyramid() {
    window.requestAnimationFrame(loopPyramid);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    context.canvas.height = height;
    context.canvas.width = width;
    context.strokeStyle = "black";

    pyramid.rotateX(pointer.y * 0.0001);
    pyramid.rotateY(-pointer.x * 0.0001);

    context.fillStyle = "blue";

    var vertices = project(pyramid.vertices, width, height);
    for (let i = pyramid.faces.length - 1; i >= 0; --i) {
        let face = pyramid.faces[i];
        let p1 = pyramid.vertices[face[0]];
        let p2 = pyramid.vertices[face[1]];
        let p3 = pyramid.vertices[face[2]];
        let v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
        let v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
        let n = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);

        if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0) {
            context.beginPath();
            context.moveTo(vertices[face[0]].x, vertices[face[0]].y);
            context.lineTo(vertices[face[1]].x, vertices[face[1]].y);
            context.lineTo(vertices[face[2]].x, vertices[face[2]].y);
            context.lineTo(vertices[face[3]].x, vertices[face[3]].y);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }
}

function loopTrapezium() {
    window.requestAnimationFrame(loopTrapezium);

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    context.canvas.height = height;
    context.canvas.width = width;
    context.strokeStyle = "black";

    trapezium.rotateX(pointer.y * 0.0001);
    trapezium.rotateY(-pointer.x * 0.0001);

    context.fillStyle = "blue";

    var vertices = project(trapezium.vertices, width, height);
    for (let i = trapezium.faces.length - 1; i >= 0; --i) {
        let face = trapezium.faces[i];
        let p1 = trapezium.vertices[face[0]];
        let p2 = trapezium.vertices[face[1]];
        let p3 = trapezium.vertices[face[2]];
        let v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
        let v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
        let n = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);

        if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0) {
            context.beginPath();
            context.moveTo(vertices[face[0]].x, vertices[face[0]].y);
            context.lineTo(vertices[face[1]].x, vertices[face[1]].y);
            context.lineTo(vertices[face[2]].x, vertices[face[2]].y);
            context.lineTo(vertices[face[3]].x, vertices[face[3]].y);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }
}

const btnCube = document.getElementById("btnCube");
const btnTriangle = document.getElementById("btnTriangle");
const btnParallelogram = document.getElementById("btnParallelogram");
const btnPyramid = document.getElementById("btnPyramid");
const btnTrapezium = document.getElementById("btnTrapezium");

loopCube();
btnCube.style.backgroundColor = "slategray";

// event handlers

btnCube.addEventListener("click", () => {
    loopCube();
    resetBtns();
    btnCube.style.backgroundColor = "slategray";
});
btnTriangle.addEventListener("click", () => {
    loopTriangle();
    resetBtns();
    btnTriangle.style.backgroundColor = "slategray";
});
btnParallelogram.addEventListener("click", () => {
    loopParallelogram();
    resetBtns();
    btnParallelogram.style.backgroundColor = "slategray";
});
btnPyramid.addEventListener("click", () => {
    loopPyramid();
    resetBtns();
    btnPyramid.style.backgroundColor = "slategray";
});
btnTrapezium.addEventListener("click", () => {
    loopTrapezium();
    resetBtns();
    btnTrapezium.style.backgroundColor = "slategray";
});

function resetBtns() {
    btnCube.style.backgroundColor = "lightslategray";
    btnTriangle.style.backgroundColor = "lightslategray";
    btnParallelogram.style.backgroundColor = "lightslategray";
    btnPyramid.style.backgroundColor = "lightslategray";
    btnTrapezium.style.backgroundColor = "lightslategray";
}

// rotation movements

canvas.addEventListener("mousemove", (event) => {
    if (mouseDown) {
        pointer.x = event.pageX - (width / 2);
        pointer.y = event.pageY - (height / 2);
    }
});

canvas.addEventListener("mousedown", () => {
    canvas.style.cursor = "pointer";
    mouseDown = true;
    pointer.x = event.pageX - (width / 2);
    pointer.y = event.pageY - (height / 2);
});

canvas.addEventListener("mouseup", () => {
    canvas.style.cursor = "default";
    mouseDown = false;
    pointer.x = 0;
    pointer.y = 0;
});