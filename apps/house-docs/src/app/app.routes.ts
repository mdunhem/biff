import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: async () =>
      (await import('@biff/house-docs/features/home'))
        .HouseDocsFeaturesHomeModule,
  },
];
