const showGradient = document.querySelector('.gradient-generate');

function start(){
    const colorOne = document.querySelector('input[name=inp-1-text]').value|| document.querySelector('input[name=inp-1]').value;
    const colorTwo = document.querySelector('input[name=inp-2-text]').value || document.querySelector('input[name=inp-2]').value;
    const step = document.querySelector('input[name=inp-num]').value

    console.log(colorOne, colorTwo, step);

    gradient(hex2rgb(colorOne), hex2rgb(colorTwo), step)
}

function hex2rgb(color){
    const r = color.slice(1, 3).toString();
    const g = color.slice(3, 5).toString();
    const b = color.slice(5, 7).toString();

    return [parseInt(r, 16) , parseInt(g, 16), parseInt(b, 16)]
}

function gradient(col1, col2, step){
    const deltaR = subColor(col1[0], col2[0], step)
    const deltaG = subColor(col1[1], col2[1], step)
    const deltaB = subColor(col1[2], col2[2], step)

    const colorPalette = new Array()

    colorPalette.push({"r": col1[0], "g": col1[1], "b": col1[2]})

    for ( let i = 0; i < step; i++){
        colorPalette.push({
            "r": col1[0] + deltaR * ( i + 1),
            "g": col1[1] + deltaG * ( i + 1),
            "b": col1[2] + deltaB * ( i + 1)
        })
    }

    colorPalette.push({"r": col2[0], "g": col2[1], "b": col2[2]})
    
    console.log(deltaR, deltaG, deltaB, step)
    createColorBlock(colorPalette, col1, col2);
}

function subColor(tom1, tom2, step){
    const sub = Math.abs(tom2 - tom1)
    let delta =  Math.round(sub/step) 

    delta *= tom1 + sub > tom2 ? (-1) : (1) 

    console.log(sub, delta, sub)
    return delta 
}

function createColorBlock(colorPalette){
    let html = ""
    for ( let i in colorPalette){
        const col = colorPalette[i];
        html += `<div class="block" style="background: rgb(${col.r}, ${col.g}, ${col.b})">${col.r}, ${col.g}, ${col.b}</div>`

        console.log(col)
    }

    showGradient.innerHTML = html;
}

function rgb2hex(color){
    return '#'+color[0].toString(16)+color[1].toString(16)+color[2].toString(16)
}

