package br.com.teste.poc.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.teste.poc.entity.Empresa;
import br.com.teste.poc.service.EmpresaService;

@RestController
@RequestMapping("/empresa")
@CrossOrigin
public class EmpresaResource {

  @Autowired
  private EmpresaService empresaService;

  @RequestMapping(path = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> get(@PathVariable("id") final Integer id) {
    Empresa e = this.empresaService.get(id);
    return ResponseEntity.ok(e);
  }

  @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> save(@RequestBody final Empresa empresa) {
    Empresa e = this.empresaService.save(empresa);
    return ResponseEntity.ok(e);
  }

  @RequestMapping(path = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> update(@PathVariable("id") final Integer id, @RequestBody final Empresa empresa) {
    empresa.setId(id);
    Empresa e = this.empresaService.update(empresa);
    return ResponseEntity.ok(e);
  }

  @RequestMapping(path = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> delete(@PathVariable("id") final Integer id) {
    this.empresaService.delete(id);
    return ResponseEntity.ok().build();
  }

  @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> pesquisar(@RequestParam(name = "q", required = false) final String query, final Pageable pageable) {
    Page<Empresa> page = this.empresaService.list(query, pageable);
    return ResponseEntity.ok(page);
  }

}
