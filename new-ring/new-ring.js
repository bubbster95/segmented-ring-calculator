let design = {};
let n = 1;

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

    // Create delete button
    let remove = document.createElement('button');
    remove.className = 'remove';
    remove.innerHTML = 'X';
    remove.addEventListener('click', removeRing);

    // Append ext, int, and ring
    ring.appendChild(ext);
    ring.appendChild(int);
    ring.appendChild(remove);
    if (loc == 'top') {
        visualAidCanvas.prepend(ring);
    } else {
    visualAidCanvas.appendChild(ring);
    }

    n++;
    console.log(design, visualAidCanvas);
    
}

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
    console.log('object', design);
    thisRing.remove();
    console.log("Removed ", thisRing);
}

//Printing when the submit button is clicked
submit = () => {
    //creating content that will be printed in the print window
    let content = '<html>';
    content += '<body onload="window.print()">';
    content += '<h1>Welcome to the Print Window</h1><p>Each page will provide dimensions for each ring in your design!</p><p>More description about disclaimers, terms of use, instructions, etc.</p>'
    //for each ring, make a new page when printing
    Object.keys(design).forEach(i => {
        console.log(design[i])
        content += `<p style="page-break-before: always"></p>`;
        content += `<h1>Segmented Ring Calculator</h1>`;
        content += `<h2>Ring ${i.slice(4)}</h2>`;
        content += `<p>Segments: ${design[i].segments}</p>`;
        content += `<canvas id='canvas${i}' width=600 height=600></canvas>`
        content += `<script>
                        let canvas${i} = document.getElementById('canvas${i}');
                        let context${i} = canvas${i}.getContext('2d');

                        context${i}.beginPath();
                        context${i}.strokeStyle = 'brown';
                        context${i}.moveTo(0,0);
                        context${i}.lineTo(${design[i].extEdge*100},0);
                        context${i}.lineTo(${(design[i].extEdge*100)/*-((design[i].trapHeight*100)/Math.tan(design[i].extAngle))*/},${design[i].trapHeight*100});
                        context${i}.lineTo(${(design[i].trapHeight*100)/Math.tan(design[i].extAngle)},${design[i].trapHeight*100});
                        context${i}.fillStyle = '#DEB887';
                        context${i}.fill();
                        context${i}.closePath();
                        context${i}.stroke();
                    </script>`
    });
    content += '</body>';
    content += '</html>';
    //creating a new window to print
    let printWindow = window.open('','printWindow','left = 0, top = 0, width = 1000, height = 1000, toolbar = 0, scrollbars = 0, status = 1');
    //write the content on the document
    printWindow.document.write(content);
    //close the docucment when finished writing -> need this or else onload will never be called
    printWindow.document.close();
    console.log(design);
}