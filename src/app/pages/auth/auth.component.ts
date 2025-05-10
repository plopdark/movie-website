import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Icons } from '../../utils/enums/icons.enum';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  private auth = inject(AuthService);

  private router = inject(Router);

  public inputType: string = 'password';

  public icon: string = Icons.OpenedEye;

  public isPasswordShown: boolean = false;

  public authForm!: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  public ngOnInit() {
    this.initializeForm();
  }

  public initializeForm() {
    this.authForm = this.fb.group({
      username: '',
      password: '',
    });
  }

  public onSubmit() {
    const { username, password } = this.authForm.value;
    this.auth.logIn(username!, password!).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: () => {
        alert('Login is failed');
      },
    });
  }

  public showPassword(): void {
    this.isPasswordShown = !this.isPasswordShown;
    if (this.isPasswordShown) {
      this.inputType = 'text';
      this.icon = Icons.ClosedEye;
    } else {
      this.inputType = 'password';
      this.icon = Icons.OpenedEye;
    }
  }
}
