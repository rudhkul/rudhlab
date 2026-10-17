// Edit this file to maintain public content. Never put private/patient data here.
window.LAB = {
  name: 'RudhLab', domain: 'rudhlab.com',
  lead: 'Anirudh Kulkarni, PhD', institution: 'PDEU', location: 'Gandhinagar, India',
  // Set a public email address to replace the GitHub contact link.
  email: null,
  // Add a reviewed CV PDF in assets/, then set e.g. 'assets/anirudh-kulkarni-cv.pdf'.
  cv: null,
  studies: [
    {id:'vortex', type:'simulation', category:'FLOW VISUALISATION', label:'Illustrative demo', title:'Patterns in a vortex field', description:'An interactive analytical flow illustration. Explore the moving field in the homepage visual.', art:'flow', detail:'This is a website illustration, not solver output or a validated research result. Particles follow a prescribed, divergence-free, two-dimensional streamfunction. Moving the pointer changes the illustration’s vortex centre.', method:'ψ(x,y) = sin²(πx) sin²(πy); u = ∂ψ/∂y, v = −∂ψ/∂x', url:null},
    {id:'dental', type:'simulation', category:'DENTAL MODELLING', label:'Illustrative schematic', title:'A computational view of dental systems', description:'A conceptual tooth mesh introducing the lab’s dental simulation work.', art:'dental', detail:'The mesh is an original schematic created for this website. Its colours and elements are illustrative: they do not represent a patient, a finite-element solution, stress values, or a clinical finding. Released research samples can replace this schematic.', method:'Conceptual geometry · illustrative triangulation · no patient data', url:null},
    {id:'cuda', type:'code', category:'GPU COMPUTING', label:'Public repository', title:'CUDA · LBM · IBM · FVM', description:'Explore the public CUDA computing repository and its source files.', art:'cuda', detail:'Public source code maintained by Anirudh Kulkarni. Follow the repository for implementation details and any available documentation. No speed-up or validation claim is made here.', method:'CUDA · lattice Boltzmann · immersed boundary · finite volume', url:'https://github.com/rudhkul/cuda-lbm-ibm-fvm'},
    {id:'julia', type:'code', category:'NUMERICAL METHODS', label:'Public repository', title:'Lid-driven cavity in Julia', description:'A Julia cavity-flow example at Re = 1000, with Ghia validation described in the repository.', art:'julia', detail:'The public repository describes a lid-driven cavity implementation in Julia at Reynolds number 1000 with Ghia validation. See the source for numerical details and verification materials.', method:'Julia · CFD · Re = 1000', url:'https://github.com/rudhkul/cfdjulia'},
    {id:'fsi', type:'code', category:'FLUID–STRUCTURE INTERACTION', label:'Public repository', title:'Fluid–structure interaction', description:'Browse the public C++ fsicavity research code.', art:'fsi', detail:'Explore the public fsicavity repository. Consult its files for the implemented formulation and assumptions; this website does not independently validate the code.', method:'C++ · computational fluid dynamics', url:'https://github.com/rudhkul/fsicavity'}
  ]
};
