package com.tecazuay.example.android_app.services;

import com.tecazuay.example.android_app.models.Usuario;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface UsuarioService {

    String API_ROUTE = "usuario/";

    //@POST(API_ROUTE)

    @POST(API_ROUTE + "{rolId}")
    Call<Usuario> createUser(@Body Usuario usuario, @Path("rolId") Long rolId);

    @GET(API_ROUTE + "{id}")
    Call<Usuario> readUserById(@Path("id") Long id);

    @PUT(API_ROUTE)
    Call<Usuario> updateUser(@Body Usuario usuario);

    @PUT(API_ROUTE + "{usuarioId}/{rolId}")
    Call<Usuario> updateUserRol(@Path("usuarioId") Long usuarioId, @Path("rolId") Long rolId);

    @DELETE(API_ROUTE + "{id}")
    Call<Usuario> deleteUserById(@Path("id") Long id);
}