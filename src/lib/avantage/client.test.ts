import {avantageFetch, RawSearchResponse} from './client';
import { describe, it, expect } from "vitest";

describe('avantage client', () => {
  it('should find nothing on empty input', async () => {
    const result = await avantageFetch<RawSearchResponse>('SEARCH', '', {} as AbortSignal, true);
    expect(result.bestMatches).toHaveLength(0);
  });

  it('should find results in mocks given input', async () => {
    const result = await avantageFetch<RawSearchResponse>('SEARCH', 'p', {} as AbortSignal, true);
    expect(result.bestMatches).toHaveLength(4);
    expect(result.bestMatches[0]["1. symbol"]).toBe("PLTR");
  });

  it('should not find results in mocks given bad input', async () => {
    const result = await avantageFetch<RawSearchResponse>('SEARCH', 'nothing', {} as AbortSignal, true);
    expect(result.bestMatches).toHaveLength(0);
  });
})