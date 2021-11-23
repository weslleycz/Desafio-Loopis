//Array que armazena as tarefas
let tarefas=JSON.parse(localStorage.getItem('tarefas'))||[];
Atualizahtml(tarefas);

//variáveis de controle 
let IdControle;

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
    desc:descricaoTarefa,
    status:"false",
}
tarefa.desc=tarefa.desc.charAt(0).toUpperCase()+tarefa.desc.slice(1);
tarefas.push(tarefa);
tarefas.sort(OrganizaTarefa);
Atualizahtml(tarefas);
salvarDadosStorag();
}
Buscar();
}

//Função que atualiza a lista de tarefas do html
function Atualizahtml(n){
    let list="<ui>";
    n.forEach(tarefa=>{
        let tarefaconculida=MudaCorTarefa(tarefa.id);
        let CheckboxStatus=MarcaTarefa(tarefa.id); 
         list +='<li class="'+tarefaconculida+'">'+'<p>'+'<input onclick=MudarStatusTarefa('+tarefa.id+') class="form-check-input position-static"'+ CheckboxStatus + 
         ' type="checkbox" id="'+(tarefa.id)+'" >'+'<i onclick=MudarStatusTarefa('+tarefa.id+')'+'>'+tarefa.desc+'</i>'+
         '<img class="btn-editar" data-toggle="modal" data-target="#Deletar"'+ 'src="../assets/icons/lixeira.png"'+'onclick=recebeId('+tarefa.id+')'+'>'+
         '<img class="btn-editar"'+ 'src="../assets/icons/lapis.png" data-toggle="modal" data-target="#EditarTarefa"'+'onclick=recebeId('+tarefa.id+')'+'>'+
         "</p>"
         ;
    });
    list+="</ul>";

    document.getElementById("lista").innerHTML=list;
    document.getElementById("novaTarefa").value="";
}

//Função que apaga a tarefa definida
function deletartarefa(){
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == IdControle);
    tarefas.splice(pos, 1);
    Atualizahtml(tarefas);
    salvarDadosStorag();
    Buscar();
}

//Função que apaga todas as tarefas
function deletarTodas(){
    tarefas= [];
    Atualizahtml(tarefas);
    salvarDadosStorag();
    document.getElementById("Buscar").value="";
}

//Função que que recebe o Id
function recebeId(n){
    IdControle=n;
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == IdControle);
    document.getElementById("citar").innerHTML=tarefas[pos].desc;
    document.getElementById("editar").value=tarefas[pos].desc;
}

//Função que editar uma tarefa definida
function editarTarefa(){
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == IdControle);
    let inputEditartarefa = document.querySelector("#editar").value;
    if(inputEditartarefa != ""){  
        tarefas[pos].desc=inputEditartarefa;
        tarefas[pos].desc=tarefas[pos].desc.charAt(0).toUpperCase()+tarefas[pos].desc.slice(1);
        document.getElementById("editar").value="";
        Atualizahtml(tarefas);
        salvarDadosStorag();
        Buscar(); 
    }
    }

//Função que atualiza o status da tarefa 
function MudarStatusTarefa(n){
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == n);
    if(tarefas[pos].status==="true"){
    tarefas[pos].status="false"
    }else{tarefas[pos].status="true"}
    Atualizahtml(tarefas);
    salvarDadosStorag();
    Buscar();
}

//Função que muda a cor das tarefas concluídas
function MudaCorTarefa(n){
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == n);
    if(tarefas[pos].status==="true"){
    return "tarefaconculida"
    }
}

//Função que marcar tarefa concluída no html
function MarcaTarefa(n){
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == n);
    if(tarefas[pos].status==="true"){
        return "checked"
    }
}

//Função que organiza as tarefa em ordem alfabética
function OrganizaTarefa(a,b) {
    if (a.desc < b.desc)
       return -1;
    if (a.desc > b.desc)
      return 1;
    return 0;
  }

//Função que limpa o input definido
function LimparInput(n){
if(n==1){n="editar"
document.getElementById(n).value="";
}else{
    n="novaTarefa"
    document.getElementById(n).value="";
}
}

//Evento que detecta quando o enter e pressionado e adicionar um item a lista
document.addEventListener("keypress",function(e){
    if(e.key==="Enter"){
		const btn = document.querySelector("#botao");
		btn.click();
	}
    if(e.key==="Enter"){
		const btn = document.querySelector("#botao_editar");
		btn.click();
	}
});

//Função que salva as tarefas no storage
function salvarDadosStorag(){
    localStorage.setItem("tarefas",JSON.stringify(tarefas));
}

//Função que busca as tarefas 
function Buscar(){
let Pesquisa=[];
 let inputPesquisa=document.querySelector("#Buscar").value;
 if(inputPesquisa != ""){
let TamanhoString=inputPesquisa.length;
 tarefas.forEach(tarefa=>{
 if(tarefa.desc.substring(0, TamanhoString).toUpperCase()===inputPesquisa.toUpperCase()){
 Pesquisa.push(tarefa);
 }
 });
 Atualizahtml(Pesquisa);
}else{ Atualizahtml(tarefas);}
}
