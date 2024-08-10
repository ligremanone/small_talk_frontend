import {Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeaderComponent} from '../../common ui/profile-header/profile-header.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {AvatarUploadComponent} from './avatar-upload/avatar-upload.component';
import {RouterLink} from "@angular/router";
import {SvgIconComponent} from "../../common ui/svg-icon/svg-icon.component";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent, RouterLink, SvgIconComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;
  form = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });
  }

  ngAfterViewInit() {
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar),
      );
    }
    //@ts-ignore
    firstValueFrom(this.profileService.pathProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      }),
    );
  }

  onExit() {
    return this.authService.logout()
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;
    return stack.split(',');
  }

  mergeStack(stack: string | null | []) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');
    return stack;
  }
}
