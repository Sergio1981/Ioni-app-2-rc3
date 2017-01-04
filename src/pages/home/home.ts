import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder } from '@angular/forms';

/*import { NgForm } from '@angular/forms';*/

import { NavController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service-provider';


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

      constructor(public navCtrl: NavController, public formBuilder : FormBuilder, public service : ServiceProvider) {
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
                        data=>console.log(data.message),
                        err=>console.log(err)
                  );
      }


      mostraNome() {
            this.nomes = !this.nomes;
      }
}
