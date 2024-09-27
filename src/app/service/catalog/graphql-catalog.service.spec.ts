import { TestBed } from '@angular/core/testing';
import { GraphqlCatalogService } from './graphql-catalog.service';

describe('GraphqlCatalogService', () => {
  let service: GraphqlCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
