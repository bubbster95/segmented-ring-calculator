/* 
    0 landing page "Welcome pop up"
        0 "Welcome to the segmented Ring Caluculator, a handy tool for any wood worker to get started on making segmented bowls!"
        0 <button> Get started </button>
    
    0 Creation panel
        0 Input Panel 
            0 Exterior Diameter = [User Input]
            0 Interior Diameter = [User Input]
            0 Number of Segments = [User Input]
            0 Overlap Depth = [User Input]
            0 Add New Ring = [submit]
        
        0 Visual Aid
            0 <div classname='ring{n}'> one for each submmited ring and one live one indicating the input vlaues
                0 remove button that removes rings in visual aid and object
                0 <div classname='exterior-diameter' color='blue'> Indicates the Exterior Ring Diameter </div>
                0 <div classname='interior-diameter-true' color='green'> Indicates interior Diameter if Overlap Depth is met </div>
                0 <div classname='interior-diameter' color='red'> Indicates interior Diameter if Overlap Depth is not met </div>
            </div>

        0 Submit Rings 
            0 "button that prints results on Info Sheet"
    0 Info Sheet    
        0 Finished Visual Aid
            0 all completed rings nice and pretty
        0 Trapazoids
            0 To scale trapazoid for each ring 
            X Inside angles written on two corners
            X Length across trapazoids long and short side
            X width across center of trapazoid 
        0 Specs
            0 Ring Organized by number
                0 Exterior
                0 Interior
                0 number of segments
                0 Overlap Depth
                0 Inside angles 
                0 length a
                0 length b
                0 width
            X Calculate length and width of each plank needed per ring  
*/ 