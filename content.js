// Edit this file to maintain public content. Never put private/patient data here.
window.LAB = {
  name: 'RudhLab', domain: 'rudhlab.com',
  lead: 'Anirudh Kulkarni, PhD', institution: 'PDEU', location: 'Gandhinagar, India',
  // Public contact address used by the homepage contact link.
  email: 'anirudhk@outlook.in',
  // Add a reviewed CV PDF in assets/, then set e.g. 'assets/anirudh-kulkarni-cv.pdf'.
  cv: null,
  studies: [
  {
    "id": "cuda-two-phase",
    "category": "GPU · MULTIPHASE FLOW",
    "label": "Simulation · 0:21",
    "title": "3D two-phase flow on the GPU",
    "description": "A CUDA C++ Volume of Fluid solver on a 200 × 200 × 200 grid. Educational demonstration; not validated.",
    "detail": "A three-dimensional two-phase Navier–Stokes solver written from scratch in CUDA C++. The original post describes directional-split flux-corrected transport for interface capturing, an explicit projection method for momentum, and Jacobi iteration for the pressure Poisson equation. The author explicitly identifies this as an academic demonstration that has not been validated or verified.",
    "method": "CUDA C++ · 3D VOF · 200 × 200 × 200 cells · FCT interface capturing · projection method",
    "type": "simulation",
    "url": "https://www.linkedin.com/feed/update/urn:li:activity:7445532444616986624/",
    "linkLabel": "Original LinkedIn post",
    "media": {
      "type": "video",
      "src": "assets/media/cuda-two-phase.mp4",
      "poster": "assets/media/cuda-two-phase.jpg",
      "alt": "Three-dimensional rendering of two-phase interface dynamics and density separation from a CUDA solver."
    }
  },
  {
    "id": "falling-droplet",
    "category": "INTERFACE CAPTURING",
    "label": "Simulation · 0:08",
    "title": "Following a falling droplet",
    "description": "A C++ multiphase study with PLIC–VOF reconstruction, height-function curvature, and balanced surface tension.",
    "detail": "The original post describes a falling-drop study using analytical Scardovelli–Zaleski volume fractions for PLIC–VOF reconstruction, height-function curvature, Parker–Youngs normals, balanced-force CSF surface tension, TVD momentum advection, and Strang splitting. The implementation is described as a single-file C++ solver with no external libraries. This clip presents the author’s development study; no independent validation is claimed here.",
    "method": "C++ · PLIC–VOF · height-function curvature · balanced-force CSF · TVD advection",
    "type": "simulation",
    "url": "https://www.linkedin.com/feed/update/urn:li:activity:7446586163060150274/",
    "linkLabel": "Original LinkedIn post",
    "media": {
      "type": "video",
      "src": "assets/media/falling-droplet.mp4",
      "poster": "assets/media/falling-droplet.jpg",
      "alt": "A falling droplet and its evolving interface in a two-dimensional multiphase simulation."
    }
  },
  {
    "id": "square-cylinder-gpu",
    "category": "JULIA · CUDA · CFD",
    "label": "Simulation · 2:05",
    "title": "Vortex shedding past a square cylinder",
    "description": "GPU flow simulation at Re = 150 using Julia and CUDA.jl on a 1221 × 601 grid. Educational, unvalidated solver.",
    "detail": "A two-dimensional Navier–Stokes solver for flow past a square cylinder at Reynolds number 150, implemented in Julia and CUDA.jl. The post describes a fractional-step finite-difference method, Red–Black SOR pressure solution, surface-integral force calculations, pressure coefficients, and vortex-shedding frequency estimation. The author labels the implementation educational and unvalidated; it is presented here with that limitation.",
    "method": "Julia · CUDA.jl · Re = 150 · 1221 × 601 grid · fractional-step FDM · Red–Black SOR",
    "type": "simulation",
    "url": "https://www.linkedin.com/feed/update/urn:li:activity:7441542412931584000/",
    "linkLabel": "Original LinkedIn post",
    "media": {
      "type": "video",
      "src": "assets/media/square-cylinder-gpu.mp4",
      "poster": "assets/media/square-cylinder-gpu.jpg",
      "alt": "Time-varying vortex shedding and plotted flow quantities behind a square cylinder in a Julia CUDA simulation."
    }
  },
  {
    "id": "pdeu-wind-tunnel",
    "category": "BUILT ENVIRONMENT · LBM",
    "label": "Simulation · 0:23",
    "title": "PDEU in a virtual wind tunnel",
    "description": "Flow around the PDEU campus using a custom CUDA LBM–IBM solver with approximately six million cells.",
    "detail": "A virtual wind-tunnel visualization of PDEU using the author’s custom CUDA lattice-Boltzmann and immersed-boundary solver. The source post describes an approximately six-million-cell simulation and highlights the resulting vortex shedding. This is a computational visualization, not a claim of a validated campus wind assessment.",
    "method": "CUDA · lattice Boltzmann method · immersed boundary method · approximately 6 million cells",
    "type": "simulation",
    "url": "https://www.linkedin.com/feed/update/urn:li:activity:7430310372152143873/",
    "linkLabel": "Original LinkedIn post",
    "media": {
      "type": "video",
      "src": "assets/media/pdeu-wind-tunnel.mp4",
      "poster": "assets/media/pdeu-wind-tunnel.jpg",
      "alt": "Flow-field and vortex-shedding visualization around a model of the PDEU campus."
    }
  },
  {
    "id": "porous-body-rotation",
    "category": "POROUS MEDIA · ROTATION",
    "label": "Simulation · 0:12",
    "title": "Permeability changes the rotating wake",
    "description": "A comparison of rotating bodies at different permeabilities using an extended Darcy–Brinkman–Forchheimer model.",
    "detail": "A comparative study of a forced-rotation porous body using an extended Darcy–Brinkman–Forchheimer formulation. The source post compares almost-solid, intermediate-permeability, and highly porous cases at the same Reynolds number and rotation rate, changing only the permeability. It discusses differences in wake deflection, shear, and rotation-induced asymmetry. Consult the original post for the author’s interpretation.",
    "method": "Darcy–Brinkman–Forchheimer · forced rotation · permeability comparison · matched Re and rotation rate",
    "type": "simulation",
    "url": "https://www.linkedin.com/feed/update/urn:li:activity:7407835945258971136/",
    "linkLabel": "Original LinkedIn post",
    "media": {
      "type": "video",
      "src": "assets/media/porous-body-rotation.mp4",
      "poster": "assets/media/porous-body-rotation.jpg",
      "alt": "Side-by-side flow visualizations comparing rotating porous bodies with low, intermediate, and high permeability."
    }
  },
  {
    "id": "sphere-wake",
    "category": "3D FLOW · GPU LBM",
    "label": "Simulation · 0:20",
    "title": "A three-dimensional wake behind a sphere",
    "description": "A ParaView render from a GPU D3Q19 SGS-LBM solver using approximately twenty million cells.",
    "detail": "A three-dimensional sphere-wake visualization rendered in ParaView from a custom D3Q19 SGS lattice-Boltzmann solver. The post reports a twenty-million-cell setup and identifies this as an initial demonstration focused on GPU optimization, rather than high-fidelity physics. The author’s timing claim is not reproduced as a benchmark here because a complete benchmarking protocol is not provided.",
    "method": "GPU · D3Q19 · SGS lattice Boltzmann method · approximately 20 million cells · ParaView",
    "type": "simulation",
    "url": "https://www.linkedin.com/feed/update/urn:li:activity:7404584899862687744/",
    "linkLabel": "Original LinkedIn post",
    "media": {
      "type": "video",
      "src": "assets/media/sphere-wake.mp4",
      "poster": "assets/media/sphere-wake.jpg",
      "alt": "Three-dimensional vortex structures in the wake of a sphere, rendered in ParaView."
    }
  },
  {
    "id": "cylinder-viv",
    "category": "FLUID–STRUCTURE INTERACTION",
    "label": "Simulation · 0:32",
    "title": "Vortex-induced vibration of a cylinder",
    "description": "An in-house Julia immersed-boundary implementation for VIV around a circular cylinder.",
    "detail": "The source post shares an in-house Julia implementation of a fast immersed-boundary method for vortex-induced vibration around a circular cylinder. This entry focuses on that simulation clip; the time-sensitive recruitment announcement in the original post is not reproduced. No independent validation or performance claim is added here.",
    "method": "Julia · immersed boundary method · circular cylinder · vortex-induced vibration",
    "type": "simulation",
    "url": "https://www.linkedin.com/feed/update/urn:li:activity:7400929821339332608/",
    "linkLabel": "Original LinkedIn post",
    "media": {
      "type": "video",
      "src": "assets/media/cylinder-viv.mp4",
      "poster": "assets/media/cylinder-viv.jpg",
      "alt": "A circular cylinder moving with the surrounding unsteady vortex field in a fluid–structure interaction simulation."
    }
  },
  {
    "id": "cuda",
    "type": "code",
    "category": "GPU COMPUTING",
    "label": "Public repository",
    "title": "CUDA-computing: LBM, IBM and FVM",
    "description": "GPU implementations of lattice-Boltzmann, immersed-boundary, and finite-volume methods.",
    "language": "CUDA C++",
    "detail": "Public source code maintained by Anirudh Kulkarni. Follow the repository for implementation details and any available documentation. No speed-up or validation claim is made here.",
    "method": "CUDA · lattice Boltzmann · immersed boundary · finite volume",
    "url": "https://github.com/rudhkul/cuda-lbm-ibm-fvm"
  },
  {
    "id": "julia",
    "type": "code",
    "category": "NUMERICAL METHODS",
    "label": "Public repository",
    "title": "Lid-driven cavity in Julia",
    "description": "A Julia cavity-flow example at Re = 1000, with Ghia validation described in the repository.",
    "language": "Julia",
    "detail": "The public repository describes a lid-driven cavity implementation in Julia at Reynolds number 1000 with Ghia validation. See the source for numerical details and verification materials.",
    "method": "Julia · CFD · Re = 1000",
    "url": "https://github.com/rudhkul/cfdjulia"
  },
  {
    "id": "fsi",
    "type": "code",
    "category": "FLUID–STRUCTURE INTERACTION",
    "label": "Public repository",
    "title": "Fluid–structure interaction",
    "description": "The fsicavity repository: C++ research code for fluid–structure interaction.",
    "language": "C++",
    "detail": "Explore the public fsicavity repository. Consult its files for the implemented formulation and assumptions; this website does not independently validate the code.",
    "method": "C++ · computational fluid dynamics",
    "url": "https://github.com/rudhkul/fsicavity"
  }
]
};
