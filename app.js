
// ===== BUSCADOR =====
document.getElementById("buscar").addEventListener("input", function(){
    let filtro=this.value.toLowerCase();
    document.querySelectorAll(".canto").forEach(c=>{
        let titulo=c.dataset.titulo;
        c.style.display=titulo.includes(filtro)?"block":"none";
    });
});

// ===== TRANSPOSICIÓN =====
const notas=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const equivalentes={"Db":"C#","Eb":"D#","Gb":"F#","Ab":"G#","Bb":"A#"};

function normalizar(a){ return equivalentes[a]||a; }

function transponer(pasos){
    document.querySelectorAll(".acorde").forEach(el=>{
        let t=el.innerText;
        let m=t.match(/^([A-G][b#]?)(.*)$/);
        if(!m)return;
        let base=normalizar(m[1]);
        let resto=m[2];
        let i=notas.indexOf(base);
        if(i===-1)return;
        el.innerText=notas[(i+pasos+12)%12]+resto;
    });
}

// ===== MOSTRAR/OCULTAR =====
let visibles=true;
function toggleAcordes(){
    visibles=!visibles;
    document.querySelectorAll(".acorde").forEach(a=>{
        a.style.display=visibles?"block":"none";
    });
}

// ===== CREAR MISA =====

// llenar selects automáticamente
document.querySelectorAll(".canto").forEach(c=>{
    let grupo=c.dataset.grupo;
    let id=c.dataset.id;
    let titulo=c.querySelector("h3").innerText;

    let select=document.querySelector(`select[onchange*="${grupo}"]`);
    if(select){
        let option=document.createElement("option");
        option.value=id;
        option.textContent=titulo;
        select.appendChild(option);
    }
});

// mostrar solo seleccionados
function seleccionarMisa(grupo,id){
    document.querySelectorAll(`.canto[data-grupo="${grupo}"]`)
    .forEach(c=>{
        c.style.display=(c.dataset.id===id)?"block":"none";
    });
}


//seleccionar cantos por grupo

function filtrar(grupo) {
  const cantos = document.querySelectorAll('.canto');

  cantos.forEach(canto => {
    if (grupo === 'todos') {
      canto.style.display = 'block';
    } else {
      if (canto.dataset.grupo === grupo) {
        canto.style.display = 'block';
      } else {
        canto.style.display = 'none';
      }
    }
  });
}

// cargar archivos canciones

function cargarCancion(archivo) {
  fetch("canciones/" + archivo)
    .then(response => response.text())
    .then(data => {
      document.getElementById("contenedor-cancion").innerHTML = data;
      window.scrollTo(0, 0);
    })
    .catch(error => {
      console.error("Error cargando canción:", error);
    });
}
