package br.com.teste.poc.entity;

import java.io.Serializable;

public class Empresa implements Serializable {

  private static final long serialVersionUID = 1L;
  private Integer id;
  private String cnpj;
  private String nome;
  private String razaoSocial;
  private String telefone;
  private String email;
  private String cep;
  private String estado;
  private String bairro;
  private String cidade;
  private String logradouro;
  private String complemento;
  private String tipo;

  public Empresa() {
    super();
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(final Integer id) {
    this.id = id;
  }

  public String getCnpj() {
    return this.cnpj;
  }

  public void setCnpj(final String cnpj) {
    this.cnpj = cnpj;
  }

  public String getNome() {
    return this.nome;
  }

  public void setNome(final String nome) {
    this.nome = nome;
  }

  public String getRazaoSocial() {
    return this.razaoSocial;
  }

  public void setRazaoSocial(final String razaoSocial) {
    this.razaoSocial = razaoSocial;
  }

  public String getTelefone() {
    return this.telefone;
  }

  public void setTelefone(final String telefone) {
    this.telefone = telefone;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(final String email) {
    this.email = email;
  }

  public String getCep() {
    return this.cep;
  }

  public void setCep(final String cep) {
    this.cep = cep;
  }

  public String getEstado() {
    return this.estado;
  }

  public void setEstado(final String estado) {
    this.estado = estado;
  }

  public String getBairro() {
    return this.bairro;
  }

  public void setBairro(final String bairro) {
    this.bairro = bairro;
  }

  public String getCidade() {
    return this.cidade;
  }

  public void setCidade(final String cidade) {
    this.cidade = cidade;
  }

  public String getLogradouro() {
    return this.logradouro;
  }

  public void setLogradouro(final String logradouro) {
    this.logradouro = logradouro;
  }

  public String getComplemento() {
    return this.complemento;
  }

  public void setComplemento(final String complemento) {
    this.complemento = complemento;
  }

  public String getTipo() {
    return this.tipo;
  }

  public void setTipo(final String tipo) {
    this.tipo = tipo;
  }

}
