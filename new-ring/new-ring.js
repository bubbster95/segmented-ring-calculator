let design = {};
let n = 1;
let ringsOk = true;

newRing = (loc) => {
    let newExt, newInt, newSeg, overlap = 0;
    
    newExt = document.querySelector('.exterior').value;
    newInt = document.querySelector('.interior').value;
    newSeg = document.querySelector('.segments').value;
    overlap = document.querySelector('.overlap').value;
    visualAidCanvas = document.querySelector('.canvas');


    let angle = (180-(360/newSeg))/2;
    let innerAngle = (360-(angle*2))/2;
    let extEdge = Math.round(((Math.PI * newExt)/8)*100)/100;
    let trapHeight = (newExt-newInt)/2;

    if (newExt == '' ) {
       document.querySelector('.exterior').style.borderColor = 'red';
       alert("Missing exterior diameter!");
       return;
    } else {
        document.querySelector('.exterior').style.borderColor = 'rgba(0,0,0,0)';
    };
    if (newInt == '') {
        document.querySelector('.interior').style.borderColor = 'red';
        alert("Missing interior diameter!");
        return;
    } else if (newInt > newExt-overlap) {
        document.querySelector('.interior').style.borderColor = 'orange';
        alert("Interior diamiter is larger then total ring width");
    } else {
        document.querySelector('.interior').style.borderColor = 'rgba(0,0,0,0)';
    };
    if (newSeg == '') {
        document.querySelector('.segments').style.borderColor = 'red';
        alert("Missing number of segments!");
        return;
    } else {
        document.querySelector('.segments').style.borderColor = 'rgba(0,0,0,0)';
    };
    if (overlap == '') {
        document.querySelector('.overlap').style.borderColor = 'red';
        alert("Missing overlap depth!");
        return;
    } else {
        document.querySelector('.overlap').style.borderColor = 'rgba(0,0,0,0)';
    }

    design['ring'+n] = {
        ext: parseInt(newExt),
        int: parseInt(newInt),
        segments: parseInt(newSeg),
        overlap: parseInt(overlap),
        extAngle: angle,
        intAngle: innerAngle,
        extEdge: extEdge,
        trapHeight: trapHeight
    };
    
    // Create Ring
    let ring = document.createElement('div');
    ring.className = 'ring';
    ring.id = 'ring' + n;
    ring.addEventListener('mouseover', showOptions)
    ring.addEventListener("mouseout", hideOptions);

    // Create exterior diameter
    let ext = document.createElement('div');
    ext.className = 'exterior-ring';
    ext.style.width = (newExt*20) + 'px';

    // Create interior diameter
    let int = document.createElement('div');
    int.className = 'interior-ring';
    int.style.width = (newInt*20) + 'px';

    // Create delete button
    let remove = document.createElement('button');
    remove.className = 'null-remove';
    remove.innerHTML = 'X';
    remove.addEventListener('click', removeRing);

    // Append ext, int, and ring
    ring.appendChild(ext);
    ring.appendChild(int);
    ring.appendChild(remove);
    if (loc == 'top') visualAidCanvas.prepend(ring);
    else visualAidCanvas.appendChild(ring);

    checkRings(newExt, newInt, visualAidCanvas)
    n++;
}

checkRings = (newExt, newInt, canvas) => {
    console.log(canvas);

    // let intAbove = 
    // let intBelow = 
    // if (newExt >! intBelow && newExt >! intAbove) {
    //     console.log('we checked')
    //     return 
    // }
}
    // newExt must be larger then Int of above and below rings by at least overlap
    // newInt must be smaller then Ext of above and below rings by at least overlap
        // if either are not true, interior turns red

// Mouse Over Event
showOptions = (e) => {
    let xButtonRing = e.path[1].children[2]
    let xButtonDiv = e.path[0].children[2];
    if (xButtonDiv) {
        xButtonDiv.className = 'remove'
    } else{ xButtonRing.className = 'remove' } 
}
hideOptions = (e) => {
    let xButtonRing = e.path[1].children[2]
    let xButtonDiv = e.path[0].children[2];
    if (xButtonDiv) {
        xButtonDiv.className = 'null-remove'
    } else { xButtonRing.className = 'null-remove' }
}

// Remove Button
removeRing = (e) => {
    let thisRing = e.target.parentNode;
    let thisIdNum = parseInt(thisRing.id.match(/(\d+)/));
    let numOfRings = parseInt(Object.keys(design).length);

    // Changes reorders design object.
    for (i = thisIdNum; i <= numOfRings; i++) {
        design['ring' + i] = design['ring' + (i + 1)];
    }
    // Removes last ring
    delete design['ring' + numOfRings];

    n--
    thisRing.remove();
}