package br.com.teste.poc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.teste.poc.entity.Empresa;

@Service
public class EmpresaService {

  private int count;

  private final Map<Integer, Empresa> map;

  public EmpresaService() {
    super();
    this.map = new HashMap<>();
//    for (int i = 0; i < 10; i++) {
//      Empresa empresa = new Empresa();
//      empresa.setCnpj("CNPJ" + i);
//      empresa.setRazaoSocial("Teste " + i);
//      this.save(empresa);
//    }
  }

  public Empresa get(final Integer id) {
    return this.map.get(id);
  }

  public Empresa save(final Empresa obj) {
    Integer id = Integer.valueOf(this.count++);
    obj.setId(id);
    this.map.put(id, obj);
    return obj;
  }

  public Empresa update(final Empresa obj) {
    if (this.map.containsKey(obj.getId())) {
      this.map.put(obj.getId(), obj);
    }
    return obj;
  }

  public boolean delete(final Integer id) {
    if (this.map.containsKey(id)) {
      this.map.remove(id);
    }
    return false;
  }

  public Page<Empresa> list(final String query, final Pageable pageable) {
    // List<Empresa> list = this.map.values().stream().filter(e -> e.getRazaoSocial().contains(query)).collect(Collectors.toList());
    List<Empresa> list = this.map.values().stream().collect(Collectors.toList());
    return new PageImpl<>(list, pageable, this.map.size());
  }

}
