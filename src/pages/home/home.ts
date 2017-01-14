import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder } from '@angular/forms';

/*import { NgForm } from '@angular/forms';*/

import { NavController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service-provider';

import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
      cadastro : any = {};
      users : any[];
      nomes : boolean = true;
      teste:any ={
            text: 'entra'      
      };

      constructor(public navCtrl: NavController, 
                  public formBuilder : FormBuilder, 
                  public service : ServiceProvider,
                  public alertCtrl: AlertController) {
            this.cadastro = this.formBuilder.group({
                  nome:['', Validators.required],
                  email:['', Validators.required],
                  senha:['', Validators.required]
            });
      }

      ngOnInit() {
            this.getDados();
      }

      getDados() {
      //retorno de Dados
      this.service.getData()
            .subscribe(
                  data=> this.users = data,
                  err=> console.log(err)
            );
      }

      /*postDados() {
            console.log(this.cadastro.value);
      }*/
      postDados() {
            this.service.postData(this.cadastro.value)
                  .subscribe(
                        data=>{console.log(data.mensage);
                              this.getDados();      
                        },
                        err=>console.log(err)
                  );
      }
      deletarPerfil(user) {
            // console.log(user);
            // console.log(user.id);
            this.service.deleteData(user.id)
                  .subscribe(
                        data=>{
                              console.log(data.mensage);
                              this.getDados();
                        },
                        err=>console.log(err)
                  );
      }
      editarPerfil(req) {
          let prompt = this.alertCtrl.create({
            title: 'Edita Perfil',
            inputs: [
              {
                name: 'nome',
                placeholder: 'nome',
                value:req.nome
              },
              {
                name: 'email',
                placeholder: 'email',
                value:req.email
              },
            ],
            buttons: [
              {
                text: 'Cancelar',
                handler: data => {}
              },
              {
                text: 'Salvar',
                handler: data => {

                  let params:any={
                        id: req.id,
                        nome: data.nome,
                        email: data.email
                  }
                  console.log(data);
                  this.service.updateData(params)
                  .subscribe(
                        data=>{
                              console.log(data.mensage);
                              this.getDados();
                              },
                        err=>console.log(err)
                  );
                }
              }
            ]
          });
          prompt.present();
        }


      mostraNome() {
            this.nomes = !this.nomes;
      }
}
