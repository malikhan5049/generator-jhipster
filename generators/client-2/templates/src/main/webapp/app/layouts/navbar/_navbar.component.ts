import { Component, OnInit, Inject } from '@angular/core';
import { StateService } from "ui-router-ng2";
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ProfileService } from '../profiles/profile.service'; //barrel doesnt work here
import { <% if (enableTranslation){ %><%=jhiPrefixCapitalized%>LanguageService, <% } %>Principal, AuthService, LoginService } from '../../shared';

@Component({
    selector: 'navbar',
    templateUrl: 'app/layouts/navbar/navbar.html'
})
export class NavbarComponent implements OnInit {

    changeLanguage: Function;
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;

    constructor(
        private $state: StateService,
        private loginService : LoginService,
        <%_ if (enableTranslation){ _%>
        private languageService: <%=jhiPrefixCapitalized%>LanguageService,
        <%_ } _%>
        private principal: Principal,
        private authService: AuthService,
        private profileService: ProfileService
    ) { }

    ngOnInit() {
        <%_ if (enableTranslation){ _%>
        this.languageService.getAll().then((languages) => {
            this.languages = languages;
        });

        this.changeLanguage = this.languageService.changeLanguage;
        <%_ } _%>

        this.profileService.getProfileInfo().subscribe(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login(template) {
        this.modalRef = this.loginService.open(template);
    }

    logout() {
        this.collapseNavbar();
        this.authService.logout();
        this.$state.go('home');
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }
}