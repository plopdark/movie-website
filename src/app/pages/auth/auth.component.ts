import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup, NonNullableFormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  private auth = inject(AuthService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  public authForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  public ngOnInit() {
    this.initializeForm();
  }

  public initializeForm() {
    this.authForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  public onSubmit() {
    const { email, password } = this.authForm.value;
    this.auth.logIn(email!, password!).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
  }
}
