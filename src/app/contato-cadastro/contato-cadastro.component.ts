import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ContatoService } from '../service/contato.service';

import { Message } from 'primeng/components/common/api';
import { ConfirmationService, DialogModule } from 'primeng/primeng';



@Component({
  selector: 'app-contato-cadastro',
  templateUrl: './contato-cadastro.component.html',
  styleUrls: ['./contato-cadastro.component.css']
})
export class ContatoCadastroComponent implements OnInit {

  titulo = 'Contatos';
  contatos = [];
  contato = [];
  display: boolean = false;
  favorito: boolean = false;

  showDialog(){
    this.display = true;
  }
  hideDialog(){
    this.display = false;
  }

  constructor(private service: ContatoService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.carregar();
  }

  cadastrar(formulario: FormControl) {
    this.service.cadastrar(formulario.value).subscribe(() => {
      formulario.reset();
      this.carregar();
    });
  }

  carregar() {
    this.service.listar().subscribe((dados) => {
      this.contatos = dados;
    });
  }
  
  carregarFavoritos(){
    this.service.listar().subscribe((dados) => {
      if (this.favorito){
        this.contatos = dados.filter(function (fav) {
          if (fav.favorito){
            return fav
          }
        })
      } else {
        this.contatos = dados;
      }
    })
  }
  
  pegar(contato) {
    this.showDialog();
    this.service.pegar(contato.id).subscribe((dados) => {
      this.contato = dados;
    })
  }

  mostrarFavoritos(contato){
    this.favorito = !this.favorito;
    this.carregarFavoritos();
  }

  marcarFavorito(contato) {
    this.confirmationService.confirm({
      message: 'Confirmar ação para: "' + contato.nome + '"?',
      header: 'Favorito',
      icon: 'fa fa-star',
      accept: () => {
        this.service.editar(contato).subscribe(() => {
          this.carregar();
        });
      },
      reject: () => { }
    });
  }

  editar(contato, formulario: FormControl) {
    this.confirmationService.confirm({
      message: 'Deseja realmente atualizar os dados?',
      header: 'Confirmar atualização',
      icon: 'fa fa-pencil',
      accept: () => {
        this.service.editar(contato).subscribe(() => {
          formulario.reset();
          this.hideDialog();
          this.carregar();
        });
      },
      reject: () => { }
    });
  }

  remover(contato) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir o contato: "' + contato.nome + '"?',
      header: 'Confirmar exclusão',
      icon: 'fa fa-trash',
      accept: () => {
        this.service.remover(contato.id).subscribe(() => {
          this.carregar();
        });
      },
      reject: () => { }
    });
  }
}