import { TestBed, inject } from '@angular/core/testing';

import { BikeMarketService } from './bike-market.service';

describe('BikeMarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BikeMarketService]
    });
  });

  it('should be created', inject([BikeMarketService], (service: BikeMarketService) => {
    expect(service).toBeTruthy();
  }));
});
