import {
  trigger,
  transition,
  style,
  query,
  animate,
  group
} from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [

    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' })
    ], { optional: true }),

    group([
      query(':leave', [
        animate('200ms ease-out', style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }))
      ], { optional: true }),

      query(':enter', [
        animate('300ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ], { optional: true })
    ])
  ])
]);
