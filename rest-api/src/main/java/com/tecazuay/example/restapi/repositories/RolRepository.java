package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.models.Rol;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RolRepository extends JpaRepository<Rol, Long> {

	@Query("SELECT r FROM roles r WHERE r.rolId <> " + Types.ROL_DEVELOPER)
	public List<Rol> listAvaliable();

}
