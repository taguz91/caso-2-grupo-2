package com.tecazuay.example.android_app.services;

import com.tecazuay.example.android_app.models.Login;
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

    @POST(API_ROUTE + "/login")
    Call<Usuario> login(@Body Login login);

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

    /*
        public void login(String correo, String password) {
        Retrofit retrofit = new Retrofit.Builder().baseUrl("http://ec2-54-227-48-41.compute-1.amazonaws.com:8080/api/v1/").addConverterFactory(GsonConverterFactory.create()).build();
        UsuarioService service = retrofit.create(UsuarioService.class);
        Call<Usuario> call = service.login(new Login(correo, password));

        call.enqueue(new Callback<Usuario>() {
            @Override
            public void onResponse(Call<Usuario> call, Response<Usuario> response) {

                assert response.body() != null;
                Usuario usuario = response.body();
                loginViewModel.login(usuario.getCorreo(), usuario.getPassword());
                Log.println(Log.ERROR, usuario.getNombres(), usuario.getApellidos());
            }
            @Override
            public void onFailure(Call<Usuario> call, Throwable t) {}
        });
    }
                <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
     */
}