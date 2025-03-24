import { Routes } from '@angular/router';
import { CommonSignupPromptComponent } from './common-signup-prompt/common-signup-prompt.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { AddEventFormComponent } from './add-event-form/add-event-form.component';
import { VendorSignupComponent } from './vendor-signup/vendor-signup.component';
import { ViewEventsOfSelectedVendorComponent } from './view-events-of-selected-vendor/view-events-of-selected-vendor.component';
import { EventConfigureComponent } from './event-configure/event-configure.component';
import { DayPickerComponent } from './Modals/day-picker/day-picker.component';
import { EventImageModalComponent } from './Modals/event-image-modal/event-image-modal.component';

import { TicketPurchaseComponent } from './ticket-purchase/ticket-purchase.component';
import { ViewEventsOfAllVendorsComponent } from './view-events-of-all-vendors/view-events-of-all-vendors.component';

import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { TicketSoldHistoryComponent } from './ticket-sold-history/ticket-sold-history.component';
import { ViewTicketSoldHistoryComponent } from './view-ticket-sold-history/view-ticket-sold-history.component';
import { VendordashbordnavbarComponent } from './vendordashbordnavbar/vendordashbordnavbar.component';
import { VendordashboardComponent } from './vendordashboard/vendordashboard.component';
import { TicketSalesChartComponent } from './ticket-sales-chart/ticket-sales-chart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'CommonSignupPromptComponent',
    component: CommonSignupPromptComponent,
  },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerAsCustomer', component: CustomerSignupComponent },
  { path: 'vendorDashboard', component: VendordashboardComponent },
  {path:'registerAsVendor',component:VendorSignupComponent},
  {
    path: 'viewEventsOfSelectedVendor',
    component: ViewEventsOfSelectedVendorComponent,
  },
  { path: 'eventConfigDashboard', component: EventConfigureComponent },
  { path: 'eventConfigDashboard/:eventId', component: EventConfigureComponent },
  { path: 'addEventForm', component: AddEventFormComponent },
  { path: 'dayPicker', component: DayPickerComponent },
  { path: 'eventImageModal', component: EventImageModalComponent },
  {
    path: 'viewEventsOfAllVendors',
    component: ViewEventsOfAllVendorsComponent,
  },
  { path: 'ticketPurchase/:id', component: TicketPurchaseComponent },
  
  { path: 'ticketPurchase/:id', component: TicketPurchaseComponent },
  { path: 'bookingHistory', component: BookingHistoryComponent },
  { path: 'ticketSoldHistoy', component: TicketSoldHistoryComponent },
  { path: 'ticketSoldHistoy/:eventId', component: TicketSoldHistoryComponent },
  { path: 'viewTicketSoldHistory', component: ViewTicketSoldHistoryComponent },
  {path:'vendorDashboardNavBar',component:VendordashbordnavbarComponent},
  {path:'chart',component:TicketSalesChartComponent}
];
