package com.tecazuay.example.restapi.services.impl;

import java.util.List;
import java.util.Optional;
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
    public Usuario save(Usuario usuario, Long rolId) {

        Rol rol = this.rolService.findById(rolId);

        if (rol != null) {
            usuario.setRol(rol);
            return this.usuarioRepository.save(usuario);
        } else {
            return null;
        }
    }

    @Override
    public Usuario update(Usuario usuario) {

        Usuario user = this.findById(usuario.getPersonaId());

        if (user != null) {

            //Se modifican solo los datos necesarios (añadir o quitar algún atributo)
            user.setApellidos(usuario.getApellidos());
            user.setNombres(usuario.getNombres());
            user.setCorreo(usuario.getCorreo());
            user.setTelefono(usuario.getTelefono());
            user.setPassword(usuario.getPassword());

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