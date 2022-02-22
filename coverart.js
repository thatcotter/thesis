
let canvas
let header
let header2
let header3

function preload() 
{
    header = loadFont('./assets/Source_Sans_Pro/SourceSansPro-Bold.ttf')
    header2 = loadFont('./assets/Source_Sans_Pro/SourceSansPro-Regular.ttf')
    header3 = loadFont('./assets/Source_Sans_Pro/SourceSansPro-Light.ttf')
}

function centerCanvas() 
{
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function resizeCover()
{
    let x = floor(windowWidth)
    let y = floor(windowHeight*0.8)
    resizeCanvas(x, y)
}

function setup()
{
    canvas = createCanvas(0, 0)
    canvas.parent('sketch-holder')
    resizeCover()
}

function draw()
{
    background(0)

    drawflowfield(50)
    // console.log(frameRate())

    fill(255)
    stroke(255)

    textFont(header)
    textSize(64)
    text("Grokking Creative Code", width*0.15, height*0.33)

    textFont(header2)
    textSize(36)
    text("A Field Guide to Programming as Expression", width*0.15, height*0.4)

    textFont(header3)
    textSize(48)
    text("Andrew Cotter", width*0.15, height*0.52)
}

function windowResized() 
{
    resizeCover()
}

const drawflowfield = (res) =>
{
    let r = floor(width/res)
    let t = frameCount*0.005
    for(let i = 0; i < width/r+1; i++)
    {
        for(let j = 0; j < height/r+1; j++)
        {
            let x = i * r
            let y = j * r
            fill(noise(i+t, j-t, t)*128+128, 0, 128)
            noStroke()
            rect(x, y, r, r)
        }
    }
}

// function keyPressed() 
// {
//     return false; // prevent any default behaviour
// }