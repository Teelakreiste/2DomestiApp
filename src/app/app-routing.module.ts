import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfilesComponent } from './Components/profiles/profiles.component';
import { OffertsComponent } from './Components/offerts/offerts.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContributeComponent } from './Components/contribute/contribute.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { PqrsComponent } from './Components/pqrs/pqrs.component';
import { PrivacyPolicyComponent } from './Components/privacy-policy/privacy-policy.component';
import { SitemapComponent } from './Components/sitemap/sitemap.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'profiles', component: ProfilesComponent},
  { path: 'offers', component: OffertsComponent},
  { path: 'setting-profile/:id', component: RegisterComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'contribute', component: ContributeComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'pqrs', component: PqrsComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'sitemap', component: SitemapComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
