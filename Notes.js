function test(x) {
    console.log(x);
}
/* 
    O landing page "Welcome pop up"
        O "Welcome to the segmented Ring Caluculator, a handy tool for any wood worker to get started on making segmented bowls!"
        O <button> Get started </button>
    
    O Creation panel
        0 Input Panel 
            0 Exterior Diameter = [User Input]
            0 Interior Diameter = [User Input]
            0 Number of Segments = [User Input]
            0 Overlap Depth = [User Input]
            0 Add New Ring = [submit]
        
        O Visual Aid
            O <div classname='ring{n}'> one for each submmited ring and one live one indicating the input vlaues
                0 remove button that removes rings in visual aid and object
                0 <div classname='exterior-diameter' color='blue'> Indicates the Exterior Ring Diameter </div>
                0 <div classname='interior-diameter-true' color='green'> Indicates interior Diameter if Overlap Depth is met </div>
                0 <div classname='interior-diameter' color='red'> Indicates interior Diameter if Overlap Depth is not met </div>
                O arrow buttons to move rings up and down
            </div>

        O Submit Rings 
            O "button that prints results on Info Sheet"
    O Info Sheet    
        O Finished Visual Aid
            O all completed rings nice and pretty
        O Trapazoids
            O To scale trapazoid for each ring 
            O Inside angles written on two corners
            O Length across trapazoids long and short side
            O width across center of trapazoid 
        O Specs
            O Ring Organized by number
                O Exterior
                O Interior
                O number of segments
                O Overlap Depth
                O Inside angles 
                O length a
                O length b
                O width
            !!Calculate length and width of each plank needed per ring

            




"ring" + numberOfRings + 1 
add top ring
    is there already a ring?
        yes: ringId = numberOfRings + 1
        no: ringId = numberOfRings + 1
add bottom ring   
    is there already a ring?
        yes: 
            ringId = 1
            bump id of all rings above
        no: ringId = numberOfRings + 1     
*/ 