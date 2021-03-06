import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm, Usuario } from 'src/app/models/usuario';
import { SessionService } from 'src/app/services/session.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  loading: boolean = false;
  loginResponse: LoginForm;

  constructor(
    private userService: UsuarioService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sessionService.isLoged()) {
      const user = this.sessionService.user;
      if (user) {
        this.sessionService.redirect();
      } else {
        this.sessionService.getUser().subscribe((_) => {
          this.sessionService.redirect();
        });
      }
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.userService
        .login(this.loginForm.value.correo, this.loginForm.value.password)
        .subscribe((response) => {
          this.loading = false;
          if ('message' in response) {
            this.loginResponse = response;
          } else if ('token' in response) {
            this.sessionService.saveToken(response);
          }
        });
    }
  }
  get correo() {
    return this.loginForm.get('correo');
  }
  get password() {
    return this.loginForm.get('password');
  }

  register() {
    this.router.navigate(['registrarse']);
  }
}
