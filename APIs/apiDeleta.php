<?php
//ESTA API ESTÁ UTILIZANDO O BENCO DE DADOS AULA COM A TABELA
//USUÁRIOS E UTILIZA ENVIO E RETORNO EM OBJETOS
header("Access-Control-Allow-Origin:http://localhost:8100");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $banco="mysql:host=localhost;dbname=aula";
    $user="root";
    $pass="";

    //RECUPERAÇÃO DO FORMULÁRIO
    $data = file_get_contents("php://input");
    $id = json_decode($data);


    // TRANSFORMA OS DADOS
    $id = trim($id);
    $dados; // RECEBE ARRAY PARA RETORNO

    // INSERE OS DADOS
    @$db = new PDO($banco,$user,$pass);

   //VERIFICA SE TEM CONEXÃO
    if($db){
        $sql = "DELETE FROM usuarios WHERE id=".$id;
        $query = $db->prepare($sql);
        $query ->execute();
        if(!$query){
                   $dados = array('mensage' => "Não foi possivel apagar os dados ");
                   echo json_encode($dados);
         }
        else{
                   $dados = array('mensage' => "Os dados foram apagados com sucesso.");
                  echo json_encode($dados);
         };
    }
   else{
          $dados = array('mensage' => "Não foi possivel apagar os dados! Tente novamente mais tarde.");
          echo json_encode($dados);
    };
