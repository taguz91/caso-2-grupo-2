package com.tecazuay.example.restapi.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Where;

@Where(clause = "is_deleted = false")
@Entity(name = "medioComunicacion")
public class medioComunicacion extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4356546281793282780L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "medio_id", nullable = false)
	private Long medio_id;


    public Long getMedio_id() {
        return this.medio_id;
    }

    public void setMedio_id(Long medio_id) {
        this.medio_id = medio_id;
    }

    public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
	