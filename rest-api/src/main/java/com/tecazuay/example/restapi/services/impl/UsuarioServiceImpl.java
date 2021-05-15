package com.tecazuay.example.restapi.services.impl;

import java.util.List;
import java.util.Optional;
import com.tecazuay.example.restapi.api.params.UsuarioParam;
import com.tecazuay.example.restapi.models.Rol;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.UsuarioRepository;
import com.tecazuay.example.restapi.services.RolService;
import com.tecazuay.example.restapi.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolService rolService;

    @Override
    public Usuario findById(Long id) {
        Optional<Usuario> uOptional = this.usuarioRepository.findById(id);

        if (uOptional.isPresent()) {
            return uOptional.get();
        } else {
            return null;
        }
    }

    @Override
    public List<Usuario> findAll() {
        return this.usuarioRepository.findAll();
    }

    @Override
    public Usuario save(UsuarioParam up, Long rolId) {

        Usuario usuario = new Usuario( null, up.getNombres(), up.getApellidos(), up.getCorreo(), up.getPassword(), up.getTelefono());
        Rol rol = this.rolService.findById(rolId);

        if (rol != null) {
            usuario.setRol(rol);
            return this.usuarioRepository.save(usuario);
        } else {
            return null;
        }
    }

    @Override
    public Usuario update(UsuarioParam up) {

        Usuario user = this.findById(up.getPersonaId());

        if (user != null) {

            //Se modifican solo los datos necesarios (añadir o quitar algún atributo)
            user.setApellidos(up.getApellidos());
            user.setNombres(up.getNombres());
            user.setCorreo(up.getCorreo());
            user.setTelefono(up.getTelefono());
            user.setPassword(up.getPassword());

            return this.usuarioRepository.save(user);
        } else {
            return null;
        }
    }

    @Override
    public Usuario deleteById(Long usuarioId) {
        Usuario user = this.findById(usuarioId);

        if (user != null) {
            user.setDeleted(true);
            return this.usuarioRepository.save(user);
        } else {
            return null;
        }
    }

    @Override
    public Usuario updateRol(Long userId, Long rolId) {

        Usuario user = this.findById(userId);
        Rol rol = this.rolService.findById(rolId);

        if (user != null && rol != null) {
            user.setRol(rol);
            return this.usuarioRepository.save(user);
        } else {
            return null;
        }
    }
}