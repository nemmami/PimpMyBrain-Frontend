import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';
import { RatingsService } from 'src/app/services/ratings.service';
import { UserService } from 'src/app/services/user.service';
import {FavoriteService} from "../../../services/favorite.service";
import {Subscription} from "rxjs";
import {NavbarService} from "../../../services/navbar.service";
import {getIdUserConnected} from "../../../utils/utils";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent {
  idUserProfile!: number;
  userProfile: User = {average_rating: 1,email:""};
  idUserConnected?:number;
  isLiked!: boolean;
  isMyProfile:boolean = true;
  numberStars!:number;

  ratingForm = new FormGroup({
    descriptionRating: new FormControl("", Validators.required),
    numberRating: new FormControl(1, Validators.required)
  });
  notificationAddRating: string = "";

  newRating: Rating = {
    rating_text: "",
    rating_number: 1,
    id_rater: -1,
    id_rated: this.idUserProfile
  };

  constructor(private route: ActivatedRoute, private userService: UserService, private ratingsService: RatingsService, private favoriteService: FavoriteService, private navbarService: NavbarService) {}

  ngOnInit() {
    this.idUserProfile = +this.route.snapshot.params['id_user'];
    this.newRating.id_rated = this.idUserProfile;
    // get user connected
    this.userService.getUserByToken()
      .subscribe({
        next: data => {
          this.idUserConnected = data.id_user
          this.newRating.id_rater = data.id_user;
          this.numberStars=Math.round(this.userProfile.average_rating!);
        },
        error: err => {
          console.error(err)
        }
      });
      // get user for this profile
    this.userService.getTeacherById(this.idUserProfile).subscribe({
      next: (data) => {
        this.userProfile = data
        this.numberStars=Math.round(this.userProfile.average_rating!);
      },
      error: err => {
        console.error(err)
      }
    })
    this.favoriteService.getUserProfileLike(this.idUserProfile).subscribe({
      next: _ => {
        this.isLiked = true;
        if (this.idUserConnected !== this.idUserProfile) {
          this.isMyProfile = false;
        }
      },
      error: err => {
        if (this.idUserConnected !== this.idUserProfile) {
          this.isMyProfile = false;
        }
        this.isLiked = false;
    }
    });
  }

  addRating() {
    //verify fields
    if (this.ratingForm!.get("numberRating")!.value! <= 0 ||
      this.ratingForm!.get("numberRating")!.value! > 5) {
      this.notificationAddRating = "Le nombre d'étoiles entré est incorrecte";
      return;
    }
    if (this.ratingForm!.get("descriptionRating")!.value!.trim().length == 0) {
      this.notificationAddRating = "Vous devez remplir la description de la note";
      return;
    }

    //set new fields for the rating
    this.newRating.rating_text = this.ratingForm!.get("descriptionRating")!.value!.trim()
    this.newRating.rating_number = this.ratingForm!.get("numberRating")!.value!

    //add rating
    this.ratingsService.createOneRating(this.newRating).subscribe({
      next: (data) => {
        this.notificationAddRating = "La note a bien été publiée !"
        this.ratingForm!.get("descriptionRating")!.setValue("");
      },
      error: (error) => {
        if (error.status === 409) {
          this.notificationAddRating = "Vous avez déjà publié un avis pour ce professeur";
        } else if (error.status === 404) {
          this.notificationAddRating = "Le professeur n'est plus présent sur notre site"
        } else if (error.status === 403) {
          this.notificationAddRating = "Il faut avoir fini un cours avec un professeur pour lui mettre un avis"
        } else {
          console.warn("Server error");
        }
      }
    });
  }
  changeLike() {
    if (this.isLiked) {
      // DELETE
      this.favoriteService.removeLike(this.idUserProfile).subscribe({
        next: _ => {
          this.isLiked = false
        },
        error: e => {
          console.log(e)
        }
      });
    } else {
      //ADD
      this.favoriteService.addLike(this.idUserProfile).subscribe({
        next: _ => {
          this.isLiked = true
        },
        error: e => {
          console.log(e)
        }
      });
    }
  }

}
