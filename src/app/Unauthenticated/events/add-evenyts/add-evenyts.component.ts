
import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Authentication/shared/auth.service';
import { ACrudService } from 'src/app/Authentication/shared/acrud.service';
import { ECalendarValue, IDatePickerConfig } from 'ng2-date-picker';
import * as moment from 'moment';
import { IgxDatePickerComponent } from 'igniteui-angular';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-evenyts',
  templateUrl: './add-evenyts.component.html',
  styleUrls: ['./add-evenyts.component.css']
})
export class AddEvenytsComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  isPorfileset: boolean = false;
  selectedDate:any;
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
  model: NgbDateStruct;
  date: {year: number, month: number};
  constructor(private authService: AuthService,
    private acrud: ACrudService,
    private router: Router,calendar: NgbCalendar) { }

  ngOnInit(): void {

  }
 
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {


      this.authService.SignIn(email, password)
        .then(d => {
          this.isLoading = false
          this.authService.LoginData.subscribe(x => {

            if (x.user.emailVerified) {
              this.getProfileByUid(x.user.uid)
            }
          })

        })
        .catch(e => {
          this.isLoading = false
          this.error = e.message
        })

    } else {

      this.authService.SignUp(email, password).then(d => {

        this.isLoading = false
        this.authService.logout()
      })
        .catch(e => {
          this.authService.logout()
          this.isLoading = false
          this.error = e
        })

    }


    form.reset();
  }


  tryGoogleLogin() {
    this.isLoading = true
    this.authService.doGoogleLogin()
      .then(res => {

        this.isLoading = false
        this.getProfileByUid(res.uid)

      })
  }


  getProfileByUid(uid) {

    this.acrud.getProfileFromUid(uid).subscribe(data => {




      let x = this.acrud.seprate(data)
      this.isPorfileset = x[0];

      this.isLoading = false

      if (this.isPorfileset) {
        this.router.navigate(['']);
      }
      else {

        this.router.navigate(['myprofile'])
      }

    })

  }

}



