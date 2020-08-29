let design = {};
let n = 1;
let ringsOk = true;

let newExt, newInt, newSeg, overlap = 0, angle, innerAngle, extRdge, trapHeight;

newRing = (loc) => {
    newExt = document.querySelector('.exterior').value;
    newInt = document.querySelector('.interior').value;
    newSeg = document.querySelector('.segments').value;
    overlap = document.querySelector('.overlap').value;
    canvas = document.querySelector('.canvas');

    angle = (180-(360/newSeg))/2;
    if (newInt == 0) {
        innerAngle = 360/newSeg;
    } else {
        innerAngle = (360-(angle*2))/2;
    }
    extEdge = Math.round(((Math.PI * newExt)/8)*100)/100;
    intEdge = Math.round(((Math.PI * newInt)/8)*100)/100;
    trapHeight = (newExt-newInt)/2;
    let defaultColor = 'rgba(140, 120, 65, 0.5)';

    // Check Input correctness
    if (newExt == '' ) {
        document.querySelector('.exterior').style.borderColor = 'red';
        alert("Missing exterior diameter!");
        return;
     } else {
         document.querySelector('.exterior').style.borderColor = defaultColor;
     };
     if (newInt == '') {
         document.querySelector('.interior').style.borderColor = 'red';
         alert("Missing interior diameter!");
         return;
     } else if (newInt > newExt-overlap) {
         document.querySelector('.interior').style.borderColor = 'orange';
         alert("Interior diamiter is larger then total ring width");
     } else {
         document.querySelector('.interior').style.borderColor = defaultColor;
     };
     if (newSeg == '') {
         document.querySelector('.segments').style.borderColor = 'red';
         alert("Missing number of segments!");
         return;
     } else {
         document.querySelector('.segments').style.borderColor = defaultColor;
     };
     if (overlap == '') {
         document.querySelector('.overlap').style.borderColor = 'red';
         alert("Missing overlap depth!");
         return;
     } else {
         document.querySelector('.overlap').style.borderColor = defaultColor;
     }

    // Create Ring
    let ring = document.createElement('div');
    ring.className = 'ring';
    if (loc == 'top') {
        ring.id = n;
    } else if (loc == 'bot') {
        if (n == 1) {
            ring.id = n;
        } else {
            ring.id = 1;
            bumpId();
        }
    }
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
    if (loc == 'top') canvas.prepend(ring);
    else canvas.appendChild(ring);
    
    addToObject(ring)
    checkRing()
    n++;
}

liveView = () => {
    let liveExt = document.querySelector('.live-view');
    let liveInt = document.querySelector('.int-live-view');
    newExt = document.querySelector('.exterior').value;
    newInt = document.querySelector('.interior').value;

    liveExt.style.width = (newExt*20) + 'px';
    liveInt.style.width = (newInt*20) + 'px';

}

bumpId = (removed) => {
    let rings = document.getElementsByClassName('ring')
    let topId;
    if (removed == true) {
        topId = rings.length;
    } else {
        topId = rings.length + 1;
    }
    for (let i = 0; i < rings.length; i++) {
        rings[i].id = topId;
        topId--; 
    } 
}
    
addToObject = (ring) => {
    if (design['ring' + ring.id]) {
        // Reorders design object by id.
        for (i = n; i > 1; i--) {
            design['ring' + (i)] = design['ring' + (i - 1)];
        }
    }

    design['ring' + ring.id] = {
        ext: parseInt(newExt),
        int: parseInt(newInt),
        segments: parseInt(newSeg),
        overlap: parseInt(overlap),
        extAngle: angle,
        intAngle: innerAngle,
        extEdge: extEdge,
        intEdge: intEdge,
        trapHeight: trapHeight,
    };
}

checkRing = (remove) => {
    // loop through rings
    let rings = document.getElementsByClassName('ring')
    let stop;
    if (remove) stop = n-2;
    else stop = n-1;

    for (i = 0; i <= stop; i++) {
        rings[i].childNodes[1].style.backgroundColor = 'rgba(144, 238, 144, 0.5)';
        let thisExt = design['ring' + rings[i].id].ext;
        let thisInt = design['ring' + rings[i].id].int;
        let thisOver = design['ring' + rings[i].id].overlap;

        if (rings[i-1]) {
            let nextExt = design['ring' + rings[i-1].id].ext;
            let nextInt = design['ring' + rings[i-1].id].int;
            let nextOver = design['ring' + rings[i-1].id].overlap;
            if (thisExt - thisOver < nextInt || nextExt-nextOver < thisInt){
                rings[i].childNodes[1].style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            }
        } 
    }
}

// Mouse Over Event
showOptions = (e) => {
    let xButtonRing = e.path[1].children[2]
    let xButtonDiv = e.path[0].children[2];
    console.log('hello?')
    console.log(xButtonRing, xButtonDiv)
    if (xButtonDiv) xButtonDiv.className = 'remove'
    else xButtonRing.className = 'remove'
}

hideOptions = (e) => {
    let xButtonRing = e.path[1].children[2]
    let xButtonDiv = e.path[0].children[2];
    if (xButtonDiv) xButtonDiv.className = 'null-remove'
    else xButtonRing.className = 'null-remove'
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
    console.log('removed', design)
    n--
    thisRing.remove();

    bumpId(true);
    checkRing(true);
}

helpPopUp = () => {
    let popUp = document.querySelector('.help-pop-up');
    popUp.style.display = 'block';
    popUp.scrollIntoView();
}

hidePopUp = () => {
    let popUp = document.querySelector('.help-pop-up');
    popUp.style.display = 'none';
}

//Printing when the submit button is clicked
submit = () => {
    //creating content that will be printed in the print window
    let content = '<html>';
    content += '<link rel="stylesheet" href="index.css">';
    content += '<body onload="window.print()">';
    content += `
        <h1>Design Blueprints</h1>
        <p class="center">Print these pages as a handy guide to building your segmented rings!</p>
        <p class="center">Trapezoids are to scale. Fair warning program rounds to the nearest hundreths place.</p>
        <p class="center">Avoid printing page 1 unless you like wasting paper and killing trees.</p>
        <p class="center">If this helped you in the woodshop please send me a photo of what you made on insta!</p>
        <p class="center">My Instagram: <a href="https://www.instagram.com/stiles.billy/">@stiles.billy</a></p>
        <p class="center">Check out some of my work as well, it's not just wood work tho.</p>
    `
    //for each ring, make a new page when printing
    Object.keys(design).forEach(i => {
        let extEdge = design[i].extEdge;
        let intEdge = design[i].intEdge;
        let trapHeight = design[i].trapHeight;
        let start = (extEdge - intEdge)/2;
        let res = 96;
        console.log(design[i])
        content += `<p style="page-break-before: always"></p>`;
        content += `<h2>Ring ${i.slice(4)}</h2>`;
        content += `<p>Segments: ${design[i].segments}</p>`;
        content += `<p>Long Side: ${design[i].extEdge}</p>`;
        content += `<p>Short Side: ${design[i].intEdge}</p>`;
        content += `<p>Trapizoid Height: ${design[i].trapHeight}</p>`;
        content += `<p>Long Side Angle: ${design[i].extAngle}</p>`;
        content += `<p>Short Side Angle: ${design[i].intAngle}</p>`;
        content += `<canvas id='canvas${i}' width=600 height=600></canvas>`
        content += `<script>
                        let canvas${i} = document.getElementById('canvas${i}');
                        let context${i} = canvas${i}.getContext('2d');

                        context${i}.beginPath();
                        context${i}.strokeStyle = 'black';

                        context${i}.moveTo(${start*res},0);
                        context${i}.lineTo(${((start*res) + (intEdge*res))},0);
                        context${i}.lineTo(${((intEdge*res) + (start*res) +(start*res))}, ${trapHeight*res});
                        context${i}.lineTo(0, ${trapHeight*res});

                        context${i}.closePath();
                        context${i}.stroke();
                    </script>`
    });
    content += '</body>';
    content += '</html>';
    //creating a new window to print
    let printWindow = window.open('left = 0, top = 0, width = 1000, height = 1000, toolbar = 0, scrollbars = 0, status = 1');
    //write the content on the document
    printWindow.document.write(content);
    //close the docucment when finished writing -> need this or else onload will never be called
    printWindow.document.close();
}
