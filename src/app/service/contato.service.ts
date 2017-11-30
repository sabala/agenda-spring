import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { containsTree } from '@angular/router/src/url_tree';

@Injectable()
export class ContatoService {

  urlServicos = 'http://localhost:8080/contatos';

  constructor(private http: HttpClient) { }
  
  cadastrar(contato: any) {
    return this.http.post(this.urlServicos, contato);
  }
  
  listar() {
    return this.http.get<any[]>(this.urlServicos);
  }

  pegar(id: any) {
    return this.http.get<any[]>(this.urlServicos + '/' + id);
  }

  editar(contato: any) {
    return this.http.put(this.urlServicos, contato);
  }

  remover(id: any) {
    return this.http.delete(this.urlServicos + '/' + id);
  }
}