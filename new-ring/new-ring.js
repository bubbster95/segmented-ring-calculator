let design = {};
let n = 1;

newRing = () => {
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
        console.log("Exterior", newExt);
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
        console.log("Interior", newInt);
    };
    if (newSeg == '') {
        document.querySelector('.segments').style.borderColor = 'red';
        alert("Missing number of segments!");
        return;
    } else {
        document.querySelector('.segments').style.borderColor = 'rgba(0,0,0,0)';
        console.log("Segments", newSeg);
    };
    if (overlap == '') {
        document.querySelector('.overlap').style.borderColor = 'red';
        alert("Missing overlap depth!");
        return;
    } else {
        document.querySelector('.overlap').style.borderColor = 'rgba(0,0,0,0)';
        console.log("Overlap", overlap);
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

    // Create exterior diameter
    let ext = document.createElement('div');
    ext.className = 'exterior-ring';
    ext.style.width = (newExt*20) + 'px';

    // Create interior diameter
    let int = document.createElement('div');
    int.className = 'interior-ring';
    int.style.width = (newInt*20) + 'px';

    // Append ext, int, and ring
    ring.appendChild(ext);
    ring.appendChild(int);
    visualAidCanvas.appendChild(ring);

    n++;
    console.log(design, visualAid);
    
}