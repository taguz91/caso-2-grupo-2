package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.definitions.TicketCountChart;
import com.tecazuay.example.restapi.definitions.UserList;
import com.tecazuay.example.restapi.models.Rol;
import com.tecazuay.example.restapi.models.Usuario;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	@Query(value = "SELECT u FROM usuarios u WHERE u.correo = :correo AND u.password = :password")
	Optional<Usuario> findByCorreoAndPassword(@Param("correo") String correo, @Param("password") String password);

	@Query(value = "SELECT u FROM usuarios u WHERE u.correo = :correo")
	Optional<Usuario> findByCorreo(@Param("correo") String correo);

	@Query(value = "SELECT u FROM usuarios u")
	Page<Usuario> findAllPage(Pageable pageable);

	@Query(value = "SELECT usuario_id, nombres || ' ' || apellidos AS nombre_completo FROM usuarios WHERE rol_id = :idRol", nativeQuery = true)
	List<UserList> findAllComboByUserType(Long idRol);

	@Query(value = "SELECT u FROM usuarios u WHERE u.rol = :rol")
	List<Usuario> findAllByRol(Rol rol);

	@Query(value = "SELECT nombre, count(estado_id) AS total FROM public.ticket JOIN public.parametros ON parametros_id = estado_id WHERE usuario_id = :idUser GROUP BY estado_id, nombre", nativeQuery = true)
	List<TicketCountChart> countTicketsEstadoByUser(@Param("idUser") Long idUser);
	
	@Query(value = "SELECT u FROM usuarios u WHERE u.correo = :q ")
	Usuario findByIndentificationOrCorreo(@Param("q") String correo);
}