//Array que armazena as tarefas
let tarefas=JSON.parse(localStorage.getItem('tarefas'))||[];
Atualizahtml(tarefas);

//Função que gera um id  
function idGerador(){
let id = Math.random();
id=id.toString();
return id;
}

//Função construtora de tarefa
function criarTarefa(){
let descricaoTarefa = document.querySelector("#novaTarefa").value;
if(descricaoTarefa != ""){
let tarefa={
    id:idGerador(),
    desc:descricaoTarefa
}
tarefas.push(tarefa);
Atualizahtml(tarefas);
salvarDadosStorag();
}
}

//Função que atualiza a lista de tarefas do html
function Atualizahtml(n){
    let list="<ui>";
    n.forEach(tarefa=>{
        list +="<li>"+"<p>"+'<input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="...">'+tarefa.desc+
         "<input readonly onclick=deletartarefa("+(tarefa.id)+")"+" class="+'"btn1"'+"/>"+"</p>"+
         //Modal Editar Tarefa
         
         //'<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalExemplo">  Abrir modal de demonstração </button>'+
         '<div class="modal fade" id="'+tarefa.id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'+
         '<div class="modal-dialog" role="document">'+
         ' <div class="modal-content">'+
         ' <div class="modal-header">'+
         '<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">'+
         '<span aria-hidden="true">&times;</span>'+
         ' </button>'+
         '</div>'+
         '<div class="modal-body">'+
         '...'+
         '</div>'+
         ' <div class="modal-footer">'+
         '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>'+
         ' <button type="button" class="btn btn-primary">Salvar mudanças</button>'+
             '</div>'+
           '</div>'+
         '</div>'+
         ' </div>'+
         "</li>"
        ;
    });
    list+="</ul>";

    document.getElementById("lista").innerHTML=list;
    document.getElementById("novaTarefa").value="";
}

//Função que apaga a tarefa definida
function deletartarefa(n){
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == n);
    tarefas.splice(pos, 1);
    Atualizahtml(tarefas);
    salvarDadosStorag();
}

//Função que apaga todas as tarefas
function deletarTodas(){
    tarefas= [];
    Atualizahtml(tarefas);
    salvarDadosStorag();
}

//Função que editar uma tarefa definida
function editarTarefa(n){
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == n);
    let inputEditartarefa = document.querySelector("#editar").value;
    if(inputEditartarefa != ""){  
        tarefas[pos].desc=inputEditartarefa;
        Atualizahtml(tarefas);
        salvarDadosStorag(); 
    }
    }

//Evento que detecta quando o enter e pressionado e adicionar um item a lista
document.addEventListener("keypress",function(e){
    if(e.key==="Enter"){
		const btn = document.querySelector("#botao");
		btn.click();
	}
});

//Função que salva as tarefas no storage
function salvarDadosStorag(){
    localStorage.setItem("tarefas",JSON.stringify(tarefas));
}